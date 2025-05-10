import { Spinner } from '@/components'
import { SuperheroCard } from '@/features/superheroes'
import { useAllSuperheroes } from '@/services'
import { Box, Pagination, Typography } from '@mui/material'
import React from 'react'

export const SuperheroesPage: React.FC = () => {
	const [page, setPage] = React.useState(1)
	const { superheroes, isPending } = useAllSuperheroes(page)
	if (isPending) {
		return <Spinner />
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
			{!superheroes ? (
				<Typography variant='h3'>No superheroes :(</Typography>
			) : (
				<>
					<Typography variant='h3'>Superheroes lists</Typography>
					{superheroes.data.map((superhero) => (
						<Box sx={{ mt: 5 }} key={superhero._id}>
							<SuperheroCard superhero={superhero} />
						</Box>
					))}
					<Pagination
						count={superheroes.totalPages}
						page={page}
						onChange={(_, value) => setPage(value)}
						color='primary'
						sx={{ mt: 4 }}
					/>
				</>
			)}
		</Box>
	)
}
