import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Button, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';

const ProfileSection = () => {
  // Simulating a loading state
  const isLoading = false; // Change this to true to see the skeleton loader

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 4 }}>
      {/* Make the card transparent */}
      <Card sx={{ p: 3, borderRadius: 3, boxShadow: 'none', backgroundColor: 'transparent' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            alt="User Profile"
            src="https://via.placeholder.com/150" // Replace with real user avatar URL
            sx={{ width: 100, height: 100, mr: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
          />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>John Doe</Typography>
            <Typography variant="body1" color="text.secondary">johndoe@example.com</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <CardContent sx={{ padding: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>Personal Information</Typography>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ color: '#1abc9c', mr: 1 }} />
              <Typography variant="body1"><strong>Email:</strong> john@example.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ color: '#1abc9c', mr: 1 }} />
              <Typography variant="body1"><strong>Phone:</strong> +123456789</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <HomeIcon sx={{ color: '#1abc9c', mr: 1 }} />
              <Typography variant="body1"><strong>Address:</strong> 123 Main St, City, Country</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>Bio</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            A brief bio or description about the user can be placed here. This could include interests, hobbies, or professional background.
          </Typography>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              backgroundColor: '#1abc9c',
              '&:hover': { backgroundColor: '#16a085', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' },
              py: 1,
              px: 4,
              fontWeight: 'bold',
              borderRadius: '20px',
              textTransform: 'none',
              mt: 2,
            }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileSection;
