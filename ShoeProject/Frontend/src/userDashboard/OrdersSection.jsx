import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip, Divider, IconButton } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';


const OrdersSection = () => {
  // Sample order data - in real apps, this would come from an API
  const orders = [
    {
      id: 12345,
      status: 'Delivered',
      date: 'Oct 20, 2023',
      total: 'PKR 5,000',
    },
    {
      id: 67890,
      status: 'In Transit',
      date: 'Oct 22, 2023',
      total: 'PKR 7,500',
    },
    // Add more orders as necessary
  ];

  // Function to render status with appropriate color
  const renderStatusChip = (status) => {
    if (status === 'Delivered') {
      return <Chip label="Delivered" color="success" icon={<CheckCircleIcon />} />;
    } else if (status === 'In Transit') {
      return <Chip label="In Transit" color="warning" icon={<LocalShippingIcon />} />;
    }
    return <Chip label={status} color="default" />;
  };

  return (
    <Box sx={{ width: "100%", mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>Order History</Typography>
      
      <Grid container spacing={4}>
        {orders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Order #{order.id}</Typography>
                    <Typography variant="body2" color="textSecondary">Date: {order.date}</Typography>
                  </Box>
                  <Box>
                    {renderStatusChip(order.status)}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#555' }}>Total: {order.total}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: '#1abc9c',
                        color: '#1abc9c',
                        '&:hover': { backgroundColor: '#e9f7f5' },
                        fontWeight: 'bold',
                        textTransform: 'none',
                        mr: 2,
                      }}
                    >
                      View Details
                    </Button>
                    <IconButton color="error" aria-label="delete order">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrdersSection;
