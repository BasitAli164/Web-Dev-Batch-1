// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = () => (
  <AppBar sx={{width:'81%',}}    color="primary">
    <Toolbar  >
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Shoe Store Admin Dashboard
      </Typography>
      <IconButton color="inherit">
        <AccountCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Header;
