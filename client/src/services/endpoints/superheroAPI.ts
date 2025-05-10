import { instance } from './instance'

export const superheroAPI = {
	async getAll(): Promise<unknown> {
		const response = await instance.get('')
		return response.data
	},
	async getById(): Promise<unknown> {
		const response = await instance.get(``)
		return response.data
	},
}
