import { DeleteButton, EditButton } from '@/components'
import { paths } from '@/config'
import { useDeleteSuperhero } from '@/services'
import type { SuperheroInList } from '@/types'
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'

interface SuperheroCardProps {
	superhero: SuperheroInList
}

export const SuperheroCard: React.FC<SuperheroCardProps> = ({ superhero }) => {
	const { deleteSuperhero, isPending } = useDeleteSuperhero(superhero._id)
	return (
		<Card sx={{ width: 275 }}>
			<CardContent>
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Typography
						sx={{
							color: 'text.info',
							textDecoration: 'none',
							'&:hover': {
								textDecoration: 'underline',
								color: 'text.primary',
							},
						}}
						gutterBottom
						variant='h5'
						to={paths.superhero.getHref(superhero._id)}
						component={Link}
					>
						{superhero.nickname}
					</Typography>
				</Box>
				{superhero.Images.length > 0 ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<img
							src={`${import.meta.env.VITE_STATIC_URL}${superhero.Images[0]}`}
							alt={superhero.nickname}
							style={{ width: '200px', height: 'auto' }}
						/>
					</Box>
				) : (
					<Typography variant='h6' color='info' textAlign={'center'}>
						This hero currently has no images, but you can add image.
					</Typography>
				)}
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
				<EditButton id={superhero._id} />
				<DeleteButton id={superhero._id} isLoading={isPending} deleteSuperhero={deleteSuperhero} />
			</CardActions>
		</Card>
	)
}
