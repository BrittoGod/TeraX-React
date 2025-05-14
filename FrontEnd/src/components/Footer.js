import * as React from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub'; // Corrected import for GitHub icon
import TeraXIcon from './TeraXIcon';

function Copyright() {
  return (
    <div style={{ color: 'text.secondary', marginTop: '8px' }}>
      {'Copyright © '}
      <Link color="text.secondary" href="/">
        Tera-X
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </div>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          padding: '32px 0',
          textAlign: 'center',
        }}
      >
        {/* Centered TeraX Icon */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginLeft: '50px',
          }}
        >
          <TeraXIcon />
        </div>

        {/* Links and Copyright */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            width: '100%',
          }}
        >
          <div>
            <Link color="text.secondary" href="/privacy-policy">
              Privacy Policy
            </Link>
            <span style={{ margin: '0 4px', opacity: '0.5' }}>•</span>
            <Link color="text.secondary" href="/terms-of-service">
              Terms of Service
            </Link>
          </div>
          <Copyright />
        </div>

        {/* GitHub Icon */}
        <Stack
          direction="row"
          spacing={1}
          style={{ justifyContent: 'center', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/BrittoGod" // Updated GitHub link
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>
        </Stack>
      </Container>
    </React.Fragment>
  );
}