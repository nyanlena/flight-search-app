import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import type { Flight } from './types/flight';
import { calculateDuration } from './utils/dateUtils';
import './App.css';

// Компонент скелетона
const FlightSkeleton = () => (
  <li className="flight-card skeleton-card">
    <div className="flight-info">
      <div className="skeleton-line" style={{ width: '40%', height: '20px', marginBottom: '10px' }}></div>
      <div className="skeleton-line" style={{ width: '60%', height: '16px', marginBottom: '8px' }}></div>
      <div className="skeleton-line" style={{ width: '30%', height: '14px' }}></div>
    </div>
    <div className="flight-action">
      <div className="skeleton-line" style={{ width: '80px', height: '24px', marginBottom: '10px' }}></div>
      <div className="skeleton-line" style={{ width: '100px', height: '32px' }}></div>
    </div>
  </li>
);

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFetching, setIsFetching] = useState(false); 
  
  const [onlyDirect, setOnlyDirect] = useState(false);
  const [currency, setCurrency] = useState<'RUB' | 'USD' | 'EUR'>('RUB');
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'transfers'>('price');

  const handleSearch = async (from: string, to: string) => {
    setIsFetching(true);
    setHasSearched(true);
    try {
      const { searchFlights } = await import('./api/flightApi');
      const results = await searchFlights(from, to);
      setFlights(results);
      setOnlyDirect(false);
      setCurrency('RUB');
    } catch (error) {
      console.error(error);
      setFlights([]); // Если ошибка, очищаем список
    } finally {
      setIsFetching(false);
    }
  };

  const filteredFlights = flights
    .filter(f => onlyDirect ? f.transfers === 0 : true)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'transfers') return a.transfers - b.transfers;
      if (sortBy === 'duration') {
        const aDuration = new Date(a.arrivalDate).getTime() - new Date(a.departureDate).getTime();
        const bDuration = new Date(b.arrivalDate).getTime() - new Date(b.departureDate).getTime();
        return aDuration - bDuration;
      }
      return 0;
    });

  const getPrice = (priceInRub: number) => {
    const rates = { RUB: 1, USD: 0.011, EUR: 0.010 };
    const symbols = { RUB: '₽', USD: '$', EUR: '€' };
    const converted = priceInRub * rates[currency];
    const formattedPrice = currency === 'RUB' ? Math.round(converted) : converted.toFixed(2);
    return `${formattedPrice} ${symbols[currency]}`;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✈️ Поиск авиабилетов</h1>
        <p>Найдите лучшие предложения для вашего путешествия</p>
      </header>
      
      <div className="search-section">
        <SearchForm onSearch={handleSearch} />
      </div>

      {hasSearched && (
        <div className="results-section">
          <div className="filters-panel">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={onlyDirect} 
                onChange={(e) => setOnlyDirect(e.target.checked)} 
                disabled={isFetching}
              />
              Только прямые рейсы
            </label>

            <select 
              className="currency-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'price' | 'duration' | 'transfers')}
              disabled={isFetching}
            >
              <option value="price">Сначала дешевые</option>
              <option value="duration">Сначала быстрые</option>
              <option value="transfers">Меньше пересадок</option>
            </select>

            <select 
              className="currency-select"
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as 'RUB' | 'USD' | 'EUR')}
              disabled={isFetching}
            >
              <option value="RUB">₽ RUB</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </select>
          </div>

          {isFetching ? (
            // Показываем скелетоны во время загрузки
            <ul className="flights-list">
              <FlightSkeleton />
              <FlightSkeleton />
              <FlightSkeleton />
            </ul>
          ) : filteredFlights.length === 0 ? (
            <p className="no-results">Билетов, подходящих под фильтры, не найдено 😔</p>
          ) : (
            <ul className="flights-list">
              {filteredFlights.map(flight => (
                <li key={flight.id} className="flight-card">
                  <div className="flight-info">
                    <div className="airline-info">
                      {flight.airlineLogo && (
                        <img 
                          src={flight.airlineLogo} 
                          alt={flight.airline} 
                          className="airline-logo" 
                        />
                      )}
                      <span className="airline-name">{flight.airline}</span>
                    </div>

                    <div className="flight-route">
                      <strong>{flight.from}</strong>
                      <span className="arrow">➔</span>
                      <strong>{flight.to}</strong>
                    </div>
                    <div className="flight-time">
                      {flight.departureTime} - {flight.arrivalTime}
                      {flight.transfers === 0 ? (
                        <span className="badge badge-success">Без пересадок</span>
                      ) : (
                        <span className="badge badge-warning">{flight.transfers} пересадка</span>
                      )}
                    </div>
                    <div className="flight-duration">
                      В пути: {calculateDuration(flight.departureDate, flight.arrivalDate)}
                    </div>
                    <div className="flight-extras">
                      {/* Питание */}
                      <span className="extra-item">
                        {flight.meal === 'included' && '🍱 Питание включено'}
                        {flight.meal === 'paid' && '💳 Питание за доп. плату'}
                        {flight.meal === 'none' && '🚫 Без питания'}
                      </span>

                      {/* Пересадки */}
                      {flight.transfersDetails && flight.transfersDetails.length > 0 && (
                        <div className="extra-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                          <span>🔄 Пересадки:</span>
                          <ul style={{ paddingLeft: '20px', margin: 0 }}>
                            {flight.transfersDetails.map((t, idx) => (
                              <li key={idx}>
                                {t.city} ({t.airport}) — ожидание {t.duration}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                  </div>
                  
                  <div className="flight-action">
                  </div>
                  
                  <div className="flight-action">
                    <div className="price">{getPrice(flight.price)}</div>
                    <button className="buy-btn">Купить</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;