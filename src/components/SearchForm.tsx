import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const searchSchema = z.object({
  from: z.string().min(1, 'Укажите город вылета'),
  to: z.string().min(1, 'Укажите город прилета'),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchFormProps {
  onSearch: (from: string, to: string) => void; 
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.from, data.to); 
  };

  return (
    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <label>Откуда:</label>
        <input type="text" placeholder="Москва" {...register('from')} />
        {errors.from && <span className="error-text">{errors.from.message}</span>}
      </div>

      <div className="input-group">
        <label>Куда:</label>
        <input type="text" placeholder="Пхукет" {...register('to')} />
        {errors.to && <span className="error-text">{errors.to.message}</span>}
      </div>

      <button type="submit" className="submit-btn">
        Найти билеты
      </button>
    </form>
  );
};