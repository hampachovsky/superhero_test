import { Box, Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'
import { Header } from '../ui/Header/Header'

export const AppLayout: React.FC = () => {
	return (
		<Box>
			<Header />
			<Box display='flex'>
				<Container sx={{ my: 10 }}>
					<Outlet />
				</Container>
			</Box>
		</Box>
	)
}
