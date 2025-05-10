import { superheroAPI } from '@/services'
import { useQuery } from '@tanstack/react-query'

export const useSuperhero = (id: string | undefined) => {
	const { data: superhero, isPending } = useQuery({
		queryKey: ['superheroes', id],
		queryFn: () => superheroAPI.getById(id!),
		enabled: !!id,
	})

	return { superhero, isPending }
}
