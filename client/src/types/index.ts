export interface Superhero {
	_id: string
	nickname: string
	real_name: string
	origin_description: string
	superpowers: string[]
	catch_phrase: string
	Images: string[]
}

export type SuperheroInList = Pick<Superhero, '_id' | 'nickname' | 'Images'>

export interface SuperheroesResponse {
	data: SuperheroInList[]
	page: number
	totalPages: number
	totalItems: number
}
