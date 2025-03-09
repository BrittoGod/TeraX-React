import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicyPage = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Privacy Policy
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to <strong>Tera-X</strong>. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you use our website.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect the following types of information:
          <ul>
            <li>Personal information (e.g., name, email address)</li>
            <li>Usage data (e.g., IP address, browser type)</li>
            <li>Cookies and tracking technologies</li>
          </ul>
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          3. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use your information to:
          <ul>
            <li>Provide and improve our services</li>
            <li>Communicate with you</li>
            <li>Analyze website usage</li>
          </ul>
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          4. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement appropriate security measures to protect your data from unauthorized access, alteration, or disclosure.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to:
          <ul>
            <li>Access your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Opt-out of data collection</li>
          </ul>
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          6. Changes to This Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review this policy periodically.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          7. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us at <strong>github.com/BrittoGod</strong>.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyPage;