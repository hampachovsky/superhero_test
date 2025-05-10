import { DeleteButton, EditButton, Spinner } from '@/components'
import { paths } from '@/config'
import { useDeleteSuperhero, useSuperhero } from '@/services'
import { Box, Chip, Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export const SuperheroPage: React.FC = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const { superhero, isPending } = useSuperhero(id)

	const {
		deleteSuperhero,
		isPending: isDeletePending,
		isSuccess: isDeletingSuccess,
	} = useDeleteSuperhero(superhero?._id)

	useEffect(() => {
		if (isDeletingSuccess) {
			navigate(paths.superheroes.path)
		}
	}, [isDeletingSuccess, navigate])

	if (isPending) {
		return <Spinner />
	}

	if (!superhero) {
		return (
			<Typography variant='h4' color='error' textAlign={'center'}>
				Superhero not found
			</Typography>
		)
	}

	const { nickname, real_name, origin_description, catch_phrase, superpowers, Images } = superhero
	return (
		<Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, overflow: 'hidden' }}>
			<Box sx={{ mb: 4 }}>
				<Typography
					variant='h3'
					component='h1'
					sx={{
						fontWeight: 700,
						textAlign: 'center',
						mb: 1,
						fontSize: { xs: '2rem', md: '3rem' },
					}}
				>
					{nickname}
				</Typography>
				<Typography
					variant='h5'
					color='text.secondary'
					sx={{
						textAlign: 'center',
						fontSize: { xs: '1.2rem', md: '1.5rem' },
					}}
				>
					{real_name}
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
				<Box
					sx={{
						bgcolor: 'primary.main',
						color: 'primary.contrastText',
						p: 3,
						borderRadius: 2,
					}}
				>
					<Typography
						variant='h6'
						sx={{
							fontStyle: 'italic',
							fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
							lineHeight: 1.5,
						}}
					>
						"{catch_phrase}"
					</Typography>
				</Box>

				<Box>
					<Typography
						variant='h5'
						component='h2'
						sx={{
							mb: 2,
							fontWeight: 600,
							fontSize: { xs: '1.3rem', md: '1.5rem' },
						}}
					>
						Origin
					</Typography>
					<Typography
						variant='body1'
						sx={{
							whiteSpace: 'pre-line',
							fontSize: { xs: '0.9rem', sm: '1rem' },
							lineHeight: 1.7,
						}}
					>
						{origin_description}
					</Typography>
				</Box>

				<Box>
					<Typography
						variant='h5'
						component='h2'
						sx={{
							mb: 2,
							fontWeight: 600,
							fontSize: { xs: '1.3rem', md: '1.5rem' },
						}}
					>
						Superpowers
					</Typography>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: 1,
						}}
					>
						{superpowers && superpowers.length > 0 ? (
							superpowers.map((power, index) => (
								<Chip
									key={index}
									label={power}
									color='secondary'
									sx={{
										fontWeight: 500,
										fontSize: { xs: '0.8rem', sm: '0.9rem' },
										py: 0.5,
									}}
								/>
							))
						) : (
							<Typography variant='body2' color='text.secondary'>
								superpowers not found
							</Typography>
						)}
					</Box>
				</Box>

				<Box sx={{ mt: 2 }}>
					<Typography
						variant='h5'
						component='h2'
						sx={{
							mb: 2,
							fontWeight: 600,
							fontSize: { xs: '1.3rem', md: '1.5rem' },
						}}
					>
						Gallery
					</Typography>

					{Images && Images.length > 0 ? (
						<Grid container spacing={2}>
							{Images.map((image, index) => (
								<Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
									<Paper
										elevation={2}
										sx={{
											overflow: 'hidden',
											borderRadius: 2,
											height: '100%',
											transition: 'transform 0.3s',
											'&:hover': {
												transform: 'scale(1.02)',
											},
										}}
									>
										<Box
											component='img'
											src={`${import.meta.env.VITE_STATIC_URL}${image}`}
											alt={`${nickname} image ${index + 1}`}
											sx={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
											}}
										/>
									</Paper>
								</Grid>
							))}
						</Grid>
					) : (
						<Paper
							elevation={2}
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								height: '200px',
								borderRadius: 2,
								bgcolor: 'grey.200',
							}}
						>
							<Typography variant='h6' color='text.secondary'>
								No images available
							</Typography>
						</Paper>
					)}
				</Box>

				<Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Divider sx={{ mb: 2 }} />
					<Box sx={{ width: '30%', display: 'flex', alignItems: 'center' }}>
						<Typography variant='body2' color='text.secondary'>
							ID: {superhero._id}
						</Typography>
					</Box>

					<Box sx={{ width: '70%', display: 'flex', justifyContent: 'right' }}>
						<EditButton id={superhero._id} />
						<DeleteButton id={superhero._id} isLoading={isDeletePending} deleteSuperhero={deleteSuperhero} />
					</Box>
				</Box>
			</Box>
		</Paper>
	)
}
