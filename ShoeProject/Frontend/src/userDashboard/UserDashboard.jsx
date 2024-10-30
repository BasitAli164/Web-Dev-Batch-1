import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Box, Grid, Typography, List, ListItem, ListItemText, Divider, Avatar, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ProfileSection from './ProfileSection';
import OrdersSection from './OrdersSection';
import WishlistSection from './WishlistSection';
import SettingsSection from './SettingsSection';
import image from '../../public/image/personal/my.png'

const UserDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('Profile');
  const navigate=useNavigate()

  // Render the right component based on the selected section
  const renderSection = () => {
    switch (selectedSection) {
      case 'Profile':
        return <ProfileSection />;
      case 'Orders':
        return <OrdersSection />;
      case 'Wishlist':
        return <WishlistSection />;
      case 'Settings':
        return <SettingsSection />;
        case 'Logout':
        return navigate('/')
      default:
        return <ProfileSection />;
    }
  };

  return (
    <Box sx={{ paddingTop: 8, display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
      {/* Sidebar */}
      <Grid item xs={12} sm={4} md={3} lg={2} sx={{ backgroundColor: '#2c3e50', color: '#ecf0f1', minHeight: '100vh', pt: 3, width:"20%" }}>
        {/* User Info */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar 
          sx={{ width: 80, height: 80, margin: 'auto', mb: 2 }}
          src={image}
          />
          <Typography variant="h6">Basit Ali</Typography>
        </Box>

        {/* Navigation List */}
        <List>
          <ListItem 
            button 
            onClick={() => setSelectedSection('Profile')} 
            sx={{ ...navItemStyles(selectedSection === 'Profile'), cursor: 'pointer' }} // Add cursor: pointer
          >
            <AccountCircleIcon sx={{ mr: 2 }} />
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => setSelectedSection('Orders')} 
            sx={{ ...navItemStyles(selectedSection === 'Orders'), cursor: 'pointer' }} // Add cursor: pointer
          >
            <ShoppingCartIcon sx={{ mr: 2 }} />
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => setSelectedSection('Wishlist')} 
            sx={{ ...navItemStyles(selectedSection === 'Wishlist'), cursor: 'pointer' }} // Add cursor: pointer
          >
            <FavoriteIcon sx={{ mr: 2 }} />
            <ListItemText primary="Wishlist" />
          </ListItem>
          <ListItem 
            button 
            onClick={() => setSelectedSection('Settings')} 
            sx={{ ...navItemStyles(selectedSection === 'Settings'), cursor: 'pointer' }} // Add cursor: pointer
          >
            <SettingsIcon sx={{ mr: 2 }} />
            <ListItemText primary="Settings" />
          </ListItem>
          <Divider sx={{ my: 2, backgroundColor: '#ecf0f1' }} />
          <ListItem 
            button 
            onClick={() => setSelectedSection('Logout')}
            sx={{...navItemStyles(selectedSection==='Logout'), cursor: 'pointer',
              
             }} // Add cursor: pointer
          >
            <ExitToAppIcon sx={{ mr: 2 }} />
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={8} md={9} lg={10} sx={{ p: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, backgroundColor: '#ffffff' }}>
          {renderSection()}
        </Paper>
      </Grid>
    </Box>
  );
};

// Function to dynamically style the active section
const navItemStyles = (isActive) => ({
  padding: '12px 24px',
  backgroundColor: isActive ? '#1abc9c' : 'transparent',
  color: isActive ? '#ffffff' : '#ecf0f1',
  '&:hover': {
    backgroundColor: '#16a085',
  },
});

export default UserDashboard;
