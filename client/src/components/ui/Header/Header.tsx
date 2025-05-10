import { AppBar, Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'

export const Header: React.FC = () => {
	return (
		<Box>
			<AppBar sx={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', flexDirection: 'row' }}>
				<Typography
					variant='h3'
					component='div'
					sx={{
						flexGrow: 1,
						fontWeight: 700,
						letterSpacing: '.1rem',
						color: 'inherit',
						textDecoration: 'none',
					}}
				>
					Superheroes
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<nav style={{ display: 'flex', gap: '2rem' }}>
						<Typography
							variant='h5'
							component={Link}
							to='/'
							sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
						>
							Superheroes list
						</Typography>

						<Typography
							sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
							variant='h5'
							color='secondary'
							component={Link}
							to='/superheroes'
						>
							Add new superhero
						</Typography>
					</nav>
				</Box>
			</AppBar>
		</Box>
	)
}
