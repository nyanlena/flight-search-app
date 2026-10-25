import type { Flight } from '../types/flight';

// Имитация базы данных
const mockFlights: Flight[] = [
  { id: '1', from: 'Москва', to: 'Сочи', price: 5500, departureTime: '10:00', arrivalTime: '12:30', transfers: 0 },
  { id: '2', from: 'Москва', to: 'Сочи', price: 4200, departureTime: '15:00', arrivalTime: '18:00', transfers: 1 },
  { id: '3', from: 'Москва', to: 'Сочи', price: 3800, departureTime: '07:00', arrivalTime: '09:15', transfers: 0 },
  { id: '4', from: 'Москва', to: 'Сочи', price: 6100, departureTime: '20:00', arrivalTime: '23:30', transfers: 1 },
];

export const searchFlights = async (from: string, to: string): Promise<Flight[]> => {
  return new Promise((resolve, reject) => {
    // Имитируем задержку сети (1 секунда)
    setTimeout(() => {
      // Имитируем ошибку, если ввели "Ошибка"
      if (from.toLowerCase() === 'ошибка' || to.toLowerCase() === 'ошибка') {
        reject(new Error('Не удалось загрузить билеты. Попробуйте позже.'));
        return;
      }
      
      const results = mockFlights.filter(
        (f) => f.from.toLowerCase() === from.toLowerCase() && f.to.toLowerCase() === to.toLowerCase()
      );
      
      // Если ничего не нашли, возвращаем пустой массив
      resolve(results);
    }, 1000);
  });
};