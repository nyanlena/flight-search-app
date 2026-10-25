import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import type { Flight } from './types/flight';
import { calculateDuration } from './utils/dateUtils';
import './App.css';

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Cостояния для фильтров и валюты
  const [onlyDirect, setOnlyDirect] = useState(false);
  const [currency, setCurrency] = useState<'RUB' | 'USD' | 'EUR'>('RUB');

  const handleSearchResults = (results: Flight[]) => {
    setFlights(results);
    setHasSearched(true);
    // Сбрасываем фильтры при новом поиске
    setOnlyDirect(false);
    setCurrency('RUB');
  };

  // Логика фильтрации и сортировки
  const filteredFlights = flights
    .filter(f => onlyDirect ? f.transfers === 0 : true)
    .sort((a, b) => a.price - b.price); // Сортируем от дешевых к дорогим

  // Логика конвертации валют
  const getPrice = (priceInRub: number) => {
    const rates = { RUB: 1, USD: 0.011, EUR: 0.010 };
    const symbols = { RUB: '₽', USD: '$', EUR: '€' };
    const converted = priceInRub * rates[currency];
    
    const formattedPrice = currency === 'RUB' 
      ? Math.round(converted) 
      : converted.toFixed(2);

    return `${formattedPrice} ${symbols[currency]}`;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✈️ Поиск авиабилетов</h1>
        <p>Найдите лучшие предложения для вашего путешествия</p>
      </header>
      
      <div className="search-section">
        <SearchForm onResults={handleSearchResults} />
      </div>

      {hasSearched && (
        <div className="results-section">
          <div className="filters-panel">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={onlyDirect} 
                onChange={(e) => setOnlyDirect(e.target.checked)} 
              />
              Только прямые рейсы
            </label>

            <select 
              className="currency-select"
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as 'RUB' | 'USD' | 'EUR')}
            >
              <option value="RUB">₽ RUB</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </select>
          </div>

          {filteredFlights.length === 0 ? (
            <p className="no-results">Билетов, подходящих под фильтры, не найдено 😔</p>
          ) : (
            <ul className="flights-list">
              {filteredFlights.map(flight => (
                <li key={flight.id} className="flight-card">
                  <div className="flight-info">
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