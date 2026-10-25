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
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Поиск авиабилетов</h1>
      
      <SearchForm onResults={handleSearchResults} />

      {hasSearched && (
        <div style={{ marginTop: '40px' }}>
          {/* Панель фильтров */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px', marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={onlyDirect} 
                onChange={(e) => setOnlyDirect(e.target.checked)} 
              />
              Только прямые рейсы
            </label>

            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as 'RUB' | 'USD' | 'EUR')}
              style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="RUB">Рубли (₽)</option>
              <option value="USD">Доллары ($)</option>
              <option value="EUR">Евро (€)</option>
            </select>
          </div>

          {/* Список билетов */}
          {filteredFlights.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Билетов, подходящих под фильтры, не найдено</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {filteredFlights.map(flight => (
                <li key={flight.id} style={{ border: '1px solid #eee', padding: '16px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <div>
                    <strong>{flight.from} ➔ {flight.to}</strong>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                      {flight.departureTime} - {flight.arrivalTime} | Пересадок: {flight.transfers}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                      В пути: {calculateDuration(flight.departureDate, flight.arrivalDate)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#ff6b6b', marginBottom: '8px' }}>
                      {getPrice(flight.price)}
                    </div>
                    <button style={{ backgroundColor: '#ff6b6b', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                      Купить
                    </button>
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