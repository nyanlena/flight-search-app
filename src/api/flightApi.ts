import type { Flight } from '../types/flight';

const mockFlights: Flight[] = [
  // Сочи
  { id: '1', from: 'Москва', to: 'Сочи', price: 5500, departureTime: '10:00', arrivalTime: '12:30', departureDate: '2026-11-10T10:00:00', arrivalDate: '2026-11-10T12:30:00', transfers: 0, meal: 'included' },
  { id: '2', from: 'Москва', to: 'Сочи', price: 4200, departureTime: '15:00', arrivalTime: '18:00', departureDate: '2026-11-10T15:00:00', arrivalDate: '2026-11-10T18:00:00', transfers: 1, meal: 'none', transfersDetails: [{ city: 'Ростов-на-Дону', airport: 'ROV', duration: '1ч 15м' }] },
  { id: '3', from: 'Москва', to: 'Сочи', price: 3800, departureTime: '07:00', arrivalTime: '09:15', departureDate: '2026-11-10T07:00:00', arrivalDate: '2026-11-10T09:15:00', transfers: 0, meal: 'paid' },
  { id: '4', from: 'Москва', to: 'Сочи', price: 6100, departureTime: '20:00', arrivalTime: '23:30', departureDate: '2026-11-10T20:00:00', arrivalDate: '2026-11-10T23:30:00', transfers: 1, meal: 'included', transfersDetails: [{ city: 'Краснодар', airport: 'KRR', duration: '2ч 00м' }] },
  
  // Шанхай
  { id: '5', from: 'Москва', to: 'Шанхай', price: 51500, departureTime: '19:30', arrivalTime: '08:00', departureDate: '2026-11-10T19:30:00', arrivalDate: '2026-11-11T08:00:00', transfers: 0, meal: 'included' },
  { id: '6', from: 'Москва', to: 'Шанхай', price: 23200, departureTime: '14:00', arrivalTime: '14:50', departureDate: '2026-11-10T14:00:00', arrivalDate: '2026-11-11T14:50:00', transfers: 1, meal: 'paid', transfersDetails: [{ city: 'Пекин', airport: 'PEK', duration: '3ч 20м' }] },
  { id: '7', from: 'Москва', to: 'Шанхай', price: 40800, departureTime: '17:00', arrivalTime: '06:00', departureDate: '2026-11-10T17:00:00', arrivalDate: '2026-11-11T06:00:00', transfers: 0, meal: 'included' },
  { id: '8', from: 'Москва', to: 'Шанхай', price: 28700, departureTime: '18:30', arrivalTime: '14:30', departureDate: '2026-11-10T18:30:00', arrivalDate: '2026-11-11T14:30:00', transfers: 1, meal: 'none', transfersDetails: [{ city: 'Урумчи', airport: 'URC', duration: '4ч 10м' }] },

  // Пхукет
  { id: '9', from: 'Москва', to: 'Пхукет', price: 78000, departureTime: '23:50', arrivalTime: '16:30', departureDate: '2026-11-10T23:50:00', arrivalDate: '2026-11-11T16:30:00', transfers: 0, meal: 'included' },
  { id: '10', from: 'Москва', to: 'Пхукет', price: 45000, departureTime: '10:00', arrivalTime: '08:15', departureDate: '2026-11-10T10:00:00', arrivalDate: '2026-11-11T08:15:00', transfers: 1, meal: 'paid', transfersDetails: [{ city: 'Стамбул', airport: 'IST', duration: '2ч 45м' }] },
  { id: '11', from: 'Москва', to: 'Пхукет', price: 52000, departureTime: '14:30', arrivalTime: '13:00', departureDate: '2026-11-10T14:30:00', arrivalDate: '2026-11-11T13:00:00', transfers: 1, meal: 'included', transfersDetails: [{ city: 'Дубай', airport: 'DXB', duration: '1ч 50м' }] },
  { id: '12', from: 'Москва', to: 'Пхукет', price: 39000, departureTime: '18:00', arrivalTime: '19:45', departureDate: '2026-11-10T18:00:00', arrivalDate: '2026-11-11T19:45:00', transfers: 2, meal: 'none', transfersDetails: [{ city: 'Ташкент', airport: 'TAS', duration: '3ч 00м' }, { city: 'Бангкок', airport: 'BKK', duration: '2ч 15м' }] },

    // Стамбул
  { id: '13', from: 'Москва', to: 'Стамбул', price: 21000, departureTime: '08:00', arrivalTime: '12:30', departureDate: '2026-11-10T08:00:00', arrivalDate: '2026-11-10T12:30:00', transfers: 0, meal: 'included' },
  { id: '14', from: 'Москва', to: 'Стамбул', price: 12500, departureTime: '16:45', arrivalTime: '23:00', departureDate: '2026-11-10T16:45:00', arrivalDate: '2026-11-10T23:00:00', transfers: 1, meal: 'none', transfersDetails: [{ city: 'Анталья', airport: 'AYT', duration: '2ч 10м' }] },
  { id: '15', from: 'Москва', to: 'Стамбул', price: 18900, departureTime: '13:00', arrivalTime: '18:15', departureDate: '2026-11-10T13:00:00', arrivalDate: '2026-11-10T18:15:00', transfers: 1, meal: 'paid', transfersDetails: [{ city: 'Сочи', airport: 'AER', duration: '1ч 40м' }] },
  { id: '16', from: 'Москва', to: 'Стамбул', price: 28500, departureTime: '10:30', arrivalTime: '14:00', departureDate: '2026-11-10T10:30:00', arrivalDate: '2026-11-10T14:00:00', transfers: 0, meal: 'included' },
];

export const searchFlights = async (from: string, to: string): Promise<Flight[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (from.toLowerCase() === 'ошибка' || to.toLowerCase() === 'ошибка') {
        reject(new Error('Не удалось загрузить билеты. Попробуйте позже.'));
        return;
      }
      const results = mockFlights.filter(
        (f) => f.from.toLowerCase() === from.toLowerCase() && f.to.toLowerCase() === to.toLowerCase()
      );
      resolve(results);
    }, 5000);
  });
};