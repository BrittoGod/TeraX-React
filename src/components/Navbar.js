import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TeraXIcon from './TeraXIcon';
import { useLocation } from 'react-router-dom'; // Import useLocation

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: '12px', // Fixed value
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider, // Default theme value
  backgroundColor: alpha(theme.palette.background.default, 0.4), // Default theme value
  boxShadow: theme.shadows[1], // Default theme value
  padding: '8px 12px', // Fixed value
}));

export default function NavBar() {
  const location = useLocation(); // Get the current route location

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 'none',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)', // Fixed value
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 1 }}>
            <TeraXIcon />
          </Box>
          {/* Dynamic Button */}
          <Button
            variant="contained"
            href={location.pathname === '/terms-of-service' ? '/' : '/terms-of-service'} // Toggle between Home and ToS
            sx={{
              backgroundColor: '#4caf50', // Green color
              color: '#fff', // White text color
              '&:hover': {
                backgroundColor: '#388e3c', // Darker green on hover
              },
            }}
          >
            {location.pathname === '/terms-of-service' ? 'Home' : 'ToS'}
          </Button>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
} 