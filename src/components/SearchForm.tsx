import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import type { Flight } from '../types/flight';
import { searchFlights } from '../api/flightApi';

// Схема валидации
const searchSchema = z.object({
  from: z.string().min(1, 'Укажите город вылета'),
  to: z.string().min(1, 'Укажите город прилета'),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchFormProps {
  onResults: (flights: Flight[]) => void;
}

export const SearchForm = ({ onResults }: SearchFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = async (data: SearchFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const flights = await searchFlights(data.from, data.to);
      onResults(flights);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <label>Откуда:</label>
        <input 
          type="text" 
          placeholder="Москва"
          {...register('from')} 
        />
        {errors.from && <span className="error-text">{errors.from.message}</span>}
      </div>

      <div className="input-group">
        <label>Куда:</label>
        <input 
          type="text" 
          placeholder="Сочи"
          {...register('to')} 
        />
        {errors.to && <span className="error-text">{errors.to.message}</span>}
      </div>

      <button type="submit" disabled={isLoading} className="submit-btn">
        {isLoading ? 'Поиск...' : 'Найти билеты'}
      </button>

      {error && <p className="error-text" style={{ textAlign: 'center' }}>{error}</p>}
    </form>
  );
};