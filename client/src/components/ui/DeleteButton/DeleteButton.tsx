import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import React from 'react'

interface DeleteButtonProps {
	id: string
	isLoading: boolean
	deleteSuperhero: (id: string) => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, isLoading, deleteSuperhero }) => {
	return (
		<IconButton loading={isLoading} size='small' onClick={() => deleteSuperhero(id)}>
			<DeleteIcon />
		</IconButton>
	)
}
