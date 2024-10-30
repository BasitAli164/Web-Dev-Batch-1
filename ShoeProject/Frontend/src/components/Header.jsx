import React, { useState, useEffect, useRef } from 'react';
import '../css/Header.css';
import logo from '../assets/image/logo.png';
import {
  AppBar, Toolbar, Typography, IconButton, Button,
  Box, Menu, MenuItem
} from '@mui/material';
import { Search, ShoppingCart, AccountCircle } from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const menuRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check local storage for login status on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorElProfile(null);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true); // Set login status in local storage
    handleProfileMenuClose();
    navigate('/login'); // Redirect after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false); // Clear login status from local storage
    handleProfileMenuClose();
    navigate('/'); // Redirect after logout
  };

  const sentences = [
    'Free Shipping on orders over 50pkr!',
    'Exclusive offers available now!',
    'Get 20% off your first purchase!',
  ];

  const [currentSentence, setCurrentSentence] = useState(sentences[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentence((prevSentence) => {
        const currentIndex = sentences.indexOf(prevSentence);
        const nextIndex = (currentIndex + 1) % sentences.length;
        return sentences[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [sentences]);

  const isHomePage = location.pathname === '/';

  return (
    <AppBar position="fixed">
      <Toolbar className="header">
        <Link to={"/"}>
          <Box
            component="img"
            sx={{
              height: 64,
              display: { xs: 'none', sm: 'block' },
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
            alt="Shop Logo"
            src={logo}
          />
        </Link>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/service')}>Service</Button>
          <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
            onClick={() => navigate('/search')}
          >
            <Search />
          </IconButton>

          <IconButton
            size="large"
            aria-label="show cart items"
            color="inherit"
            onClick={() => navigate(`/service/product/cart`)}
          >
            <ShoppingCart />
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={handleProfileMenuClose}
            ref={menuRef}
            onMouseLeave={() => {
              if (menuRef.current && !menuRef.current.contains(event.relatedTarget)) {
                handleProfileMenuClose();
              }
            }}
          >
            {isLoggedIn ? (
              <>
                <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem onClick={() => { handleProfileMenuClose(); handleLogin(); }}>Login</MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>

      {isHomePage && (
        <Box sx={{ backgroundColor: '#7dcea0', p: 1 }}>
          <Typography variant="body1" align="center">
            {currentSentence}
          </Typography>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
