import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        py: 4,
        px: 2,
     background: 'rgb(19, 89, 136)',
        color: '#fff',
        textAlign: 'center',
        borderTop: '1px solid #334155',
        boxShadow: '0 -5px 20px rgba(0,0,0,0.2)',
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        BilalRaza HRMS
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: '#cbd5e1' }}>
        © {new Date().getFullYear()} All rights reserved. Built for Modern HR Solutions.
      </Typography>
    </Box>
  );
};

export default Footer;
