import { superheroAPI } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useAllSuperheroes = (page: number = 1) => {
  const { data: superheroes, isPending } = useQuery({
    queryKey: ['superheroes', page],
    queryFn: () => superheroAPI.getAll(page),
  });

  return { superheroes, isPending };
};
