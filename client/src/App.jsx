import React, { useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import OwnerDashboard from './pages/OwnerDashboard';
import getTheme from './theme/theme';

function App() {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/owner/dashboard"
          element={<OwnerDashboard toggleTheme={toggleTheme} mode={mode} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
