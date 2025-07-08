import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        textAlign: 'center',
        background: 'linear-gradient(135deg, #dce3ff, #f5f7ff)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 3D blob decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(102, 126, 234, 0.3)',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{ zIndex: 1 }}
      >
        Manage Your Workforce Smarter
      </Typography>

      <Typography
        variant="h6"
        sx={{ mb: 4, zIndex: 1, color: '#555' }}
      >
        Attendance, hiring, and employee control in one simple dashboard.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ borderRadius: '30px', px: 4, py: 1.5, zIndex: 1 }}
        onClick={() => {
          const section = document.getElementById('services');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        Explore Features
      </Button>
    </Box>
  );
};

export default HeroSection;
