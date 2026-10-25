import type { Flight } from '../types/flight';

// Имитация базы данных
const mockFlights: Flight[] = [
  { id: '1', from: 'Москва', to: 'Сочи', price: 5500, departureTime: '10:00', arrivalTime: '12:30', departureDate: '2026-11-10T10:00:00', arrivalDate: '2026-11-10T12:30:00', transfers: 0 },
  { id: '2', from: 'Москва', to: 'Сочи', price: 4200, departureTime: '15:00', arrivalTime: '18:00', departureDate: '2026-11-10T15:00:00', arrivalDate: '2026-11-10T18:00:00', transfers: 1 },
  { id: '3', from: 'Москва', to: 'Сочи', price: 3800, departureTime: '07:00', arrivalTime: '09:15', departureDate: '2026-11-10T07:00:00', arrivalDate: '2026-11-10T09:15:00', transfers: 0 },
  { id: '4', from: 'Москва', to: 'Сочи', price: 6100, departureTime: '20:00', arrivalTime: '23:30', departureDate: '2026-11-10T20:00:00', arrivalDate: '2026-11-10T23:30:00', transfers: 1 },
  
  { id: '5', from: 'Москва', to: 'Шанхай', price: 51500, departureTime: '19:30', arrivalTime: '08:00', departureDate: '2026-11-10T19:30:00', arrivalDate: '2026-11-11T06:00:00', transfers: 0 },
  { id: '6', from: 'Москва', to: 'Шанхай', price: 23200, departureTime: '14:00', arrivalTime: '14:50', departureDate: '2026-11-10T14:00:00', arrivalDate: '2026-11-11T14:50:00', transfers: 1 },
  { id: '7', from: 'Москва', to: 'Шанхай', price: 40800, departureTime: '17:20', arrivalTime: '04:10', departureDate: '2026-11-10T17:20:00', arrivalDate: '2026-11-11T04:10:00', transfers: 0 },
  { id: '8', from: 'Москва', to: 'Шанхай', price: 28700, departureTime: '18:30', arrivalTime: '14:30', departureDate: '2026-11-10T18:30:00', arrivalDate: '2026-11-11T14:30:00', transfers: 1 },

  { id: '9', from: 'Москва', to: 'Пхукет', price: 78000, departureTime: '23:50', arrivalTime: '09:30', departureDate: '2026-11-10T23:50:00', arrivalDate: '2026-11-11T09:30:00', transfers: 0 },
  { id: '10', from: 'Москва', to: 'Пхукет', price: 45000, departureTime: '10:00', arrivalTime: '08:15', departureDate: '2026-11-10T10:00:00', arrivalDate: '2026-11-11T08:15:00', transfers: 1 },
  { id: '11', from: 'Москва', to: 'Пхукет', price: 52000, departureTime: '19:30', arrivalTime: '05:00', departureDate: '2026-11-10T19:30:00', arrivalDate: '2026-11-11T05:00:00', transfers: 0 },
  { id: '12', from: 'Москва', to: 'Пхукет', price: 39000, departureTime: '18:00', arrivalTime: '19:45', departureDate: '2026-11-10T18:00:00', arrivalDate: '2026-11-11T19:45:00', transfers: 2 },
];

export const searchFlights = async (from: string, to: string): Promise<Flight[]> => {
  return new Promise((resolve, reject) => {
    // Имитируем задержку сети
    setTimeout(() => {
      // Имитируем ошибку
      if (from.toLowerCase() === 'ошибка' || to.toLowerCase() === 'ошибка') {
        reject(new Error('Не удалось загрузить билеты. Попробуйте позже.'));
        return;
      }
      
      const results = mockFlights.filter(
        (f) => f.from.toLowerCase() === from.toLowerCase() && f.to.toLowerCase() === to.toLowerCase()
      );
      
      // Если ничего не нашли, возвращаем пустой массив
      resolve(results);
    }, 5000);
  });
};