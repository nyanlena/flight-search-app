export interface Flight {
  id: string;
  from: string;
  to: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  transfers: number;
}