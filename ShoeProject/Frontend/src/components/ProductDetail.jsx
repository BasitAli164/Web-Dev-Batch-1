import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Modal,
  Typography,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCartStore } from '../context/CartContext';
import { useProductStore } from '../context/ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const { products } = useProductStore();
  const productDetail = products.productDetail; // to take only the array
  console.log("product in productDetail", productDetail);
  const navigate = useNavigate();

  // Find the product with the matching ID from the item array
  const product = Array.isArray(productDetail) ? productDetail.find((product) => product._id.toString() === id) : null;

  console.log("product in after find", product);

  if (!product) {
    return <Typography>No product found with the given ID.</Typography>;
  }

  // Component state and event handlers
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite toggle

  const handleAddToCart = () => {
    setModalOpen(true);
    addItem(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev); // Toggle the favorite state
  };

  // Function to handle Buy Now button
  const handleBuyNow = () => {
    addItem(product, quantity);
    // Navigate to the checkout or cart page (you can change the path as needed)
    navigate(`/checkout`, { state: { product, quantity } });
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', height: '130vh' }}>
      {/* Main Image Row */}
      <Grid container spacing={2} sx={{ height: '40%' }}>
        <Grid item xs={12} sx={{ position: 'relative', borderRadius: '5px', overflow: 'hidden', height: '100%', padding: 2 }}>
          <Box
            component="img"
            src={product.images[0]} // Directly display the first image from product.images
            alt={product.productName}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '5px',
              transition: 'transform 0.3s',
              padding: 2,
            }}
          />
        </Grid>
      </Grid>

      {/* Product Details Row */}
      <Box sx={{ marginTop: 2, backgroundColor: 'white', borderRadius: '5px', padding: 3, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
        <IconButton
          onClick={toggleFavorite}
          sx={{
            position: 'absolute',
            right: 20,
            top: 20,
            color: isFavorite ? 'red' : 'grey',
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 1 }}>
          {product.productName || 'Product Title'}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Price: {product.Subcategory.price} PKR
        </Typography>
        <Typography variant="body1" sx={{ position: 'relative' }}>
          Rating: <Rating sx={{ position: 'absolute' }} name="read-only" value={product.review.rating || 0} readOnly />
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Color: {product.Subcategory.color}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Description: {product.productDescription}
        </Typography>

        {/* Quantity Control */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <Typography>Quantity:</Typography>
          <IconButton onClick={decrementQuantity} disabled={quantity <= 1}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" sx={{ marginX: 2 }}>{quantity}</Typography>
          <IconButton onClick={incrementQuantity}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* Size Display */}
        <Typography variant="body1" sx={{ marginTop: 2 }}>Size: {product.Subcategory.size}</Typography>

        <Box sx={{ display: 'flex', marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              marginRight: 1,
              backgroundColor: '#3f51b5',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2c387e',
              },
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            onClick={handleBuyNow}
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2c387e',
              },
            }}
          >
            Buy Now
          </Button>
        </Box>
      </Box>

      {/* Modal for Cart Transaction */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={{ width: '80%', backgroundColor: 'white', padding: 4, borderRadius: '10px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', position: 'relative' }}>
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>You've Got Great Taste</Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>Congrats! You get free standard shipping.</Typography>
          <Divider sx={{ marginY: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Box>
              <Typography variant="body1">Product Image:</Typography>
              {/* Display the product image directly */}
              <Box component="img" src={product.images[0]} alt={product.productName} style={{ width: 100, height: 100, marginTop: 5 }} />
              <Typography variant="body1">{product.productName}</Typography>
              <Typography variant="body1">Price: {product.Subcategory.price} PKR</Typography>
              <Typography variant="body1">Size: {product.Subcategory.size}</Typography>
              <Typography variant="body1">Quantity: {quantity}</Typography>
            </Box>
            <Box>
              <Typography variant="h6">Subtotal</Typography>
              <Typography variant="body1">{product.Subcategory.price * quantity} PKR</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button variant="outlined" sx={{ marginRight: 1 }} onClick={() => navigate(`/service/product/${id}/Cart`, { state: { quantity } })}>
                  Proceed to Cart
                </Button>
                <Button variant="contained" sx={{ marginLeft: 1 }} onClick={() => setModalOpen(false)}>Continue Shopping</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductDetail;
