import React from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { useCartStore } from '../../context/CartContext';
import { useAuthStore } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Confirmation = ({ values }) => {
  const { cart } = useCartStore();
  const { purchaseProduct } = useAuthStore();
  const navigate = useNavigate();

  // Handler for purchasing the product
  const handlePurchase = () => {
    // Prepare data for purchaseProduct
    const productDetail = cart.map(item => ({
      productName: item.productName,
      brand: item.brand,
      category: item.category,
      color: item.color,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
      description: item.productDescription,
      rating: item.review.rating,
      comment: item.review.comment,
      image: item.images ? item.images[0] : null,
    }));
    const shippingDetail = values.shipping;
    const paymentDetail = values.payment;
    const others = { orderDate: new Date() };

    // Call purchaseProduct with all required arguments
    purchaseProduct(productDetail, shippingDetail, paymentDetail, others, navigate);
  };

  return (
    <Box sx={{ width: '90%', textAlign: 'center', mx: 'auto', my: 4 }}>
      <Typography variant="h6">Order Summary</Typography>

      <Box sx={{ textAlign: 'left', mx: '10%', mt: 3 }}>
        <Typography variant="h6">Shipping Information:</Typography>
        {Object.keys(values.shipping).map((key) => (
          <Typography key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}: {values.shipping[key]}
          </Typography>
        ))}

        <Typography variant="h6" sx={{ mt: 2 }}>Payment Information:</Typography>
        {Object.keys(values.payment).map((key) => (
          <Typography key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}: {values.payment[key]}
          </Typography>
        ))}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6">Cart Items:</Typography>
        {cart.map((item, index) => (
          <Box key={index} sx={{ mt: 2, mb: 3 }}>
            <Typography><strong>Product Name:</strong> {item.productName}</Typography>
            <Typography><strong>Brand:</strong> {item.brand}</Typography>
            <Typography><strong>Category:</strong> {item.category}</Typography>
            <Typography><strong>Color:</strong> {item.color}</Typography>
            <Typography><strong>Size:</strong> {item.size}</Typography>
            <Typography><strong>Price:</strong> PKR {item.price}</Typography>
            <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
            <Typography><strong>Description:</strong> {item.productDescription}</Typography>
            <Typography><strong>Rating:</strong> {item.review.rating} ⭐</Typography>
            <Typography><strong>Review:</strong> {item.review.comment}</Typography>
            {item.images && (
              <Box component="img" src={item.images[0]} alt={item.productName} sx={{ width: '100px', mt: 1 }} />
            )}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}

        {/* Button to confirm purchase */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handlePurchase}>
            Confirm Purchase
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Confirmation;
