import { superheroAPI } from '@/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import toast from 'react-hot-toast'

export const useDeleteSuperhero = (superheroId?: string) => {
	const queryClient = useQueryClient()

	const toastId = useRef<string | null>(null)

	const {
		mutate: deleteSuperhero,
		isPending,
		isSuccess,
	} = useMutation({
		mutationFn: (id: string) => superheroAPI.delete(id),
		onSuccess: () => {
			if (toastId.current) {
				toast.dismiss(toastId.current)
			}
			queryClient.invalidateQueries({
				queryKey: ['superheroes'],
			})
			toastId.current = toast.success('Superhero deleted', {
				position: 'bottom-right',
				id: `delete-superhero-${superheroId}-${Date.now()}`,
			})
		},
		onError: (error) => {
			console.log('ERROR', error)
			if (toastId.current) {
				toast.dismiss(toastId.current)
			}
			toast.error(error.message)

			toastId.current = toast.error(error.message, {
				position: 'bottom-right',
				id: `delete-superhero-error-${superheroId}-${Date.now()}`,
			})
		},
	})

	return { deleteSuperhero, isPending, isSuccess }
}
