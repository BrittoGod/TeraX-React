import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const TosPage = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Terms of Service
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing or using the <strong>Tera-X</strong> Video Downloader and Online Watch website (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. Description of Service
        </Typography>
        <Typography variant="body1" paragraph>
          The <strong>Tera-X</strong> Service allows users to download videos from Terabox and watch them online. The Service is provided "as is" and without any warranties.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          3. User Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to use the <strong>Tera-X</strong> Service only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of the Service complies with all applicable laws and regulations.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          4. Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          All content provided through the <strong>Tera-X</strong> Service, including but not limited to videos, text, and graphics, is the property of Terabox or its licensors and is protected by intellectual property laws.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          The <strong>Tera-X</strong> Service is provided "as is" without any warranties, express or implied. <strong>Tera-X</strong> shall not be liable for any damages arising from your use of the Service.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          6. Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Tera-X</strong> reserves the right to modify these Terms at any time. Your continued use of the Service after any changes constitutes your acceptance of the new Terms.
        </Typography>
      </Box>
    </Container>
  );
};

export default TosPage;