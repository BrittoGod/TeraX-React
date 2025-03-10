import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TosPage from './pages/TosPage'; // Import the TosPage component
import PrivacyPolicyPage from './pages/PosPage'; // Import the PrivacyPolicyPage component

// Define dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue
    },
    background: {
      default: '#0a0a0a', // Dark gray
      paper: '#1e1e1e', // Slightly lighter dark gray
    },
    text: {
      primary: '#ffffff', // White
      secondary: '#b3b3b3', // Light gray
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <Router>
        <NavBar />
        <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Home Page */}
            <Route path="/terms-of-service" element={<TosPage />} /> {/* ToS Page */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> {/* Privacy Policy Page */}
            <Route path="*" element={<HomePage />} /> {/* 404 fallback */}
          </Routes>
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;