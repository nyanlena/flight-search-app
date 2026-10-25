export interface TransferDetail {
  airport: string;
  city: string;     
  duration: string;
}

export type MealOption = 'included' | 'paid' | 'none';

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
  transfersDetails?: TransferDetail[];
  meal: MealOption; 
  airline: string;
  airlineLogo: string;
}