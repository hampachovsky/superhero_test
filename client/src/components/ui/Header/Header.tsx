import { paths } from '@/config';
import { AppBar, Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router';

export const Header: React.FC = () => {
  return (
    <Box>
      <AppBar
        sx={{
          padding: { xs: '0.5rem', sm: '1rem' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            width: '100%',
            gap: { xs: '1rem', sm: '0' },
          }}
        >
          <Typography
            variant='h3'
            component='div'
            sx={{
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
            }}
          >
            Superheroes
          </Typography>

          <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <nav
              style={{
                display: 'flex',
              }}
            >
              <Typography
                variant='h5'
                component={Link}
                to={paths.superheroes.path}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  marginRight: '1rem',
                }}
              >
                Superheroes list
              </Typography>
              <Typography
                variant='h5'
                component={Link}
                to={paths.superheroForm.path}
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }}
              >
                Add new superhero
              </Typography>
            </nav>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
};
