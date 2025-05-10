import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { superheroAPI } from '../endpoints'

export const useUpdateSuperhero = () => {
	const queryClient = useQueryClient()
	const {
		mutate: update,
		isPending,
		isSuccess,
	} = useMutation({
		mutationFn: ({ superhero, id }: { superhero: FormData; id: string }) => superheroAPI.update(superhero, id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['superheroes'],
			})
			toast.success('Superhero updated', { position: 'bottom-right' })
		},
		onError: (error: AxiosError<{ error?: string }>) => {
			console.error('ERROR', error)
			if (error.response?.data?.error && typeof error.response.data.error === 'string') {
				toast.error(error.response.data.error)
			} else {
				toast.error('Something went wrong')
			}
		},
	})

	return { update, isPending, isSuccess }
}
