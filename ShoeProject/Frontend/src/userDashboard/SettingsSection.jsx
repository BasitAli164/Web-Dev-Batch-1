import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LanguageIcon from '@mui/icons-material/Language';

const SettingsSection = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>Account Settings</Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', '&:hover': { boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)' } }}>
            <LockIcon sx={{ fontSize: 40, color: '#1abc9c', mr: 2 }} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Change Password</Typography>
              <Typography variant="body2" color="text.secondary">Update your password for better security.</Typography>
            </CardContent>
            <Button variant="outlined" color="primary">Edit</Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', '&:hover': { boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)' } }}>
            <NotificationsIcon sx={{ fontSize: 40, color: '#1abc9c', mr: 2 }} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Notification Preferences</Typography>
              <Typography variant="body2" color="text.secondary">Manage how we notify you about updates and promotions.</Typography>
            </CardContent>
            <Button variant="outlined" color="primary">Edit</Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', '&:hover': { boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)' } }}>
            <AccountCircleIcon sx={{ fontSize: 40, color: '#1abc9c', mr: 2 }} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Profile Information</Typography>
              <Typography variant="body2" color="text.secondary">Update your profile details like name and address.</Typography>
            </CardContent>
            <Button variant="outlined" color="primary">Edit</Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', '&:hover': { boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)' } }}>
            <PrivacyTipIcon sx={{ fontSize: 40, color: '#1abc9c', mr: 2 }} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Privacy Settings</Typography>
              <Typography variant="body2" color="text.secondary">Control your privacy settings and data sharing options.</Typography>
            </CardContent>
            <Button variant="outlined" color="primary">Edit</Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', '&:hover': { boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)' } }}>
            <LanguageIcon sx={{ fontSize: 40, color: '#1abc9c', mr: 2 }} />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">Language Preferences</Typography>
              <Typography variant="body2" color="text.secondary">Choose your preferred language for communication.</Typography>
            </CardContent>
            <Button variant="outlined" color="primary">Edit</Button>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default SettingsSection;
