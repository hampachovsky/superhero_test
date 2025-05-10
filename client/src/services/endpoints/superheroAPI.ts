import type { Superhero, SuperheroesResponse } from '@/types'
import { instance } from './instance'

export const superheroAPI = {
	async getAll(page: number = 1): Promise<SuperheroesResponse> {
		const response = await instance.get(`/superheroes?page=${page}`)
		return response.data
	},
	async getById(id: string): Promise<Superhero> {
		const response = await instance.get(`/superheroes/${id}`)
		return response.data
	},
}
