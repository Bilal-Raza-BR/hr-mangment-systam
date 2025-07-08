import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ onLoginClick, onRequestClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 2) {
      try {
        const res = await fetch(`http://localhost:5000/api/company/search?query=${value}`);
        const data = await res.json();
        setResults(data);
        setAnchorEl(e.currentTarget);
      } catch (err) {
        console.error(err);
      }
    } else {
      setResults([]);
      setAnchorEl(null);
    }
  };

  const handleSelect = (company) => {
    console.log("Selected company slug:", company.slug);
    setSearchTerm('');
    setAnchorEl(null);
  };

  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" mb={2}>Menu</Typography>
      <List>
        <ListItem button onClick={onLoginClick}>
          <ListItemText primary="Login for SuperAdmin" />
        </ListItem>
        <ListItem button onClick={onRequestClick}>
          <ListItemText primary="Request Service" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        background: 'linear-gradient(90deg,rgb(36, 79, 172) 0%, #1e293b 100%)',
        color: '#fff',
        px: { xs: 2, md: 4 },
        py: 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Left side */}
        <Box display="flex" alignItems="center" gap={2}>
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', md: '1.4rem' } }}>
            BilalRaza HRMS
          </Typography>
        </Box>

        {/* Center (Search Bar) */}
        {!isMobile && (
          <Box sx={{ width: 350, position: 'relative' }}>
            <TextField
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search company..."
              fullWidth
              size="small"
              sx={{
                backgroundColor: '#fff',
                borderRadius: '25px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                input: { px: 2 },
              }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && results.length > 0}
              onClose={() => setAnchorEl(null)}
              sx={{ mt: 1 }}
            >
              {results.map((company) => (
                <MenuItem key={company._id} onClick={() => handleSelect(company)}>
                  {company.companyName}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        {/* Right side buttons */}
        {!isMobile && (
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              onClick={onLoginClick}
              sx={{
                color: '#fff',
                borderColor: '#60a5fa',
                textTransform: 'none',
                borderRadius: 3,
                '&:hover': {
                  backgroundColor: 'rgba(96,165,250,0.1)',
                  borderColor: '#3b82f6'
                }
              }}
            >
              Login for SuperAdmin
            </Button>
            <Button
              variant="contained"
              onClick={onRequestClick}
              sx={{
                backgroundColor: '#3b82f6',
                color: '#fff',
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#2563eb'
                }
              }}
            >
              Request Service
            </Button>
          </Box>
        )}
      </Toolbar>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
