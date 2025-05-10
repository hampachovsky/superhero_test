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
    path: '/form/superhero',
    getHref: () => `/form/superhero`,
  },
  notFound: {
    path: '/notFound',
    getHref: () => `/notFound`,
  },
} as const;
