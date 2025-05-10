export const paths = {
	superheroes: {
		path: '/',
		getHref: () => '/',
	},
	superhero: {
		path: '/superhero/:id',
		getHref: (id: string) => `/superhero/${id}`,
	},
	superheroForm: {
		path: '/superhero/form',
		getHref: () => `/superhero/form`,
	},
	notFound: {
		path: '/notFound',
		getHref: () => `/notFound`,
	},
} as const
