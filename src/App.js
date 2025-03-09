import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

// Define light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue
    },
    background: {
      default: '#121212', // Dark gray
      paper: '#1e1e1e', // Slightly lighter dark gray
    },
    text: {
      primary: '#ffffff', // White
      secondary: '#b3b3b3', // Light gray
    },
  },
});

function App() {
  const [theme, setTheme] = useState('dark'); // Default theme is dark

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline enableColorScheme />
      <NavBar />
      <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
        <HomePage />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;