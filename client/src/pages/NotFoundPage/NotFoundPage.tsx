import { paths } from '@/config';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router';

export const NotFoundPage: React.FC = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant='h2'>Not Found</Typography>
            <Typography variant='h6'>Could not find requested resource</Typography>
            <Link style={{ fontSize: '30px' }} to={paths.superheroes.path}>
                Return Home
            </Link>
        </Box>
    );
};
