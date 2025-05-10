import { AppLayout } from '@/components'
import { paths } from '@/config'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SuperheroesPage } from '@/pages/SuperheroesPage'
import { SuperheroPage } from '@/pages/SuperheroPage'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: paths.superheroes.path,
				element: <SuperheroesPage />,
			},
			{
				path: paths.superhero.path,
				element: <SuperheroPage />,
			},
		],
	},
	{ element: <NotFoundPage />, path: '*' },
])
