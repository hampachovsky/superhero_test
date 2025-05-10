import { paths } from '@/config';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

interface EditButtonProps {
    id: string;
}

export const EditButton: React.FC<EditButtonProps> = ({ id }) => {
    const navigate = useNavigate();
    return (
        <IconButton
            size='small'
            onClick={() => navigate(`${paths.superheroForm.path}?editId=${id}`)}
        >
            <EditIcon />
        </IconButton>
    );
};
