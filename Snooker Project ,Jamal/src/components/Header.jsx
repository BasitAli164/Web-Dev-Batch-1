import React, { useState } from 'react';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = () => {
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control mobile drawer
  const navigate = useNavigate();

  // Function to handle the opening of the profile menu
  const handleProfileMenuOpen = (e) => {
    setAnchorElProfile(e.currentTarget);
  };

  // Function to handle the closing of the profile menu
  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear the user details from localStorage
    localStorage.removeItem('userDetails');

    // Redirect to the login page
    navigate('/');
  };

  // Function to toggle the drawer on mobile
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Menu items for the mobile drawer
  const menuItems = [
    { text: 'Home', path: '/landing' },
    { text: 'Service', path: '/services' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' }
  ];

  return (
    <AppBar position="fixed" width="100%">
      <Toolbar sx={{ bgcolor: '#17a589' }}>
        <Box
          component="img"
          sx={{
            height: 50,
            display: { xs: 'inline', sm: 'block' },
            marginLeft: 'auto',
            marginRight: 'auto',
            cursor: 'pointer',
            borderRadius: '30%',
          }}
          onClick={() => navigate('/landing')}
          alt="Logo"
          src={logo}
        />
        
        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, marginLeft: 'auto' }}>
          <IconButton sx={{ color: 'white' }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Desktop Menu */}
        <Box
  sx={{
    flexGrow: 1,
    display: { xs: 'none', sm: 'flex' },  // Hide links on small screens, show on medium and larger
    justifyContent: 'center',
    gap: 3,  // Adjust gap for better spacing
  }}
>
  <Link
    to="/landing"
    style={{
      fontSize: '18px',  // Adjust font size for better readability
      textDecoration: 'none',
      color: '#fff',
      padding: '10px 20px',  // Add padding for clickable area
      borderRadius: '5px',  // Rounded corners for links
      transition: 'all 0.3s ease',  // Smooth transition for hover effect
    }}
  >
    Home
  </Link>
  <Link
    to="/services"
    style={{
      fontSize: '18px',
      textDecoration: 'none',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      transition: 'all 0.3s ease',
    }}
  >
    Service
  </Link>
  <Link
    to="/about"
    style={{
      fontSize: '18px',
      textDecoration: 'none',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      transition: 'all 0.3s ease',
    }}
  >
    About
  </Link>
  <Link
    to="/contact"
    style={{
      fontSize: '18px',
      textDecoration: 'none',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      transition: 'all 0.3s ease',
    }}
  >
    Contact
  </Link>
</Box>


        {/* Profile Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            sx={{ color: 'white' }}
            size="large"
            aria-label="Account of current user"
            title="Account Icon"
            edge="end"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
