export interface Flight {
  id: string;
  from: string;
  to: string;
  price: number;
  departureTime: string; // Формат HH:mm
  arrivalTime: string;
  departureDate: string; // Формат YYYY-MM-DDTHH:mm:ss
  arrivalDate: string;   // Формат YYYY-MM-DDTHH:mm:ss
  transfers: number;
}