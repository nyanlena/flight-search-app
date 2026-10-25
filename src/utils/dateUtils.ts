export const calculateDuration = (departure: string, arrival: string): string => {
  const start = new Date(departure).getTime();
  const end = new Date(arrival).getTime();
  
  const diffMs = end - start;
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}ч ${minutes}м`;
};