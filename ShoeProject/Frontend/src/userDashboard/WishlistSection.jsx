import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveIcon from '@mui/icons-material/Remove';
import image1 from '../../public/image/card/card1/1.avif'
import image2 from '../../public/image/card/card1/2.avif'
import { useAuthStore } from '../context/AuthContext';

const WishlistSection = () => {
  const {productDetails,removeFromWishlist}=useAuthStore();
  console.log("user from wishlist product details",productDetails);
  const {title,}=productDetails;
  console.log("user from wishlist title",title)
  // Sample wishlist data - in a real app, this would be fetched from an API
  const wishlistItems = [
    {
      id: 1,
      name: 'Modern Shoes',
      image: image1, // Replace with real product image URL
      price: 'PKR 3,500',
    },
    {
      id: 2,
      name: 'Stylish Backpack',
      image: image2, // Replace with real product image URL
      price: 'PKR 1,800',
    },
    // Add more items as needed
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        Wishlist
      </Typography>

      <Grid container spacing={4}>
        {wishlistItems.map(item => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                p: 2,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100%',
                  borderRadius: '5px',
                  objectFit: 'cover',
                  height: '150px', // Set a fixed height for uniformity
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {item.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                  {item.price}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                <Button
                  variant="contained" // Change to contained for a more vibrant button
                  sx={{
                    backgroundColor: '#1abc9c',
                    color: '#ffffff',
                    '&:hover': { backgroundColor: '#16a085' },
                    textTransform: 'none',
                    flexGrow: 1,
                    marginRight: 1, // Space between buttons
                  }}
                >
                  View
                </Button>
                <Tooltip title="Remove from wishlist" arrow>
                  <IconButton color="error" aria-label="remove from wishlist">
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WishlistSection;
