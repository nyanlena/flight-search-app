import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import type { Flight } from './types/flight';
import './App.css';

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchResults = (results: Flight[]) => {
    setFlights(results);
    setHasSearched(true);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Поиск авиабилетов</h1>
      
      <SearchForm onResults={handleSearchResults} />

      {hasSearched && (
        <div style={{ marginTop: '40px', maxWidth: '600px', margin: '40px auto' }}>
          <h2 style={{ textAlign: 'center' }}>Результаты поиска:</h2>
          {flights.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Билеты не найдены</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {flights.map(flight => (
                <li key={flight.id} style={{ border: '1px solid #eee', padding: '16px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong>{flight.from} ➔ {flight.to}</strong>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {flight.departureTime} - {flight.arrivalTime} | Пересадок: {flight.transfers}
                    </div>
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                    {flight.price} ₽
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