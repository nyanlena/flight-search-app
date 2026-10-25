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
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>Откуда:</label>
        <input 
          type="text" 
          placeholder="Москва"
          {...register('from')} 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {errors.from && <span style={{ color: 'red', fontSize: '12px' }}>{errors.from.message}</span>}
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>Куда:</label>
        <input 
          type="text" 
          placeholder="Сочи"
          {...register('to')} 
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {errors.to && <span style={{ color: 'red', fontSize: '12px' }}>{errors.to.message}</span>}
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        style={{ padding: '10px', backgroundColor: '#0099ffff', color: 'white', border: 'none', borderRadius: '4px', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
      >
        {isLoading ? 'Загрузка...' : 'Найти билеты'}
      </button>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </form>
  );
};