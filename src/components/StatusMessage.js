import React from 'react';
import { Alert } from '@mui/material';

function StatusMessage({ status }) {
  if (!status.message) return null;

  return (
    <Alert severity={status.type} sx={{ width: '100%', mb: 2 }}>
      {status.message}
    </Alert>
  );
}

export default StatusMessage;