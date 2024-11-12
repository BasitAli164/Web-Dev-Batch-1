import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, styled, IconButton } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useProductStore } from '../context/ProductContext.jsx';


// Styled components
const Thumbnail = styled('img')(({ theme }) => ({
  width: '50px',
  height: '50px',
  objectFit: 'cover',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '8px',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledCard = styled(Card)(({ theme, isHovered }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    transform: isHovered ? 'scale(1.05)' : 'none',
    boxShadow: theme.shadows[8],
    zIndex: 1,
  },
}));

const CustomSwitch = styled('div')(({ theme, isMenSelected }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '30px',
  padding: '5px',
  width: '180px',
  justifyContent: 'flex-end',
  backgroundColor: '#f0f0f0',
  position: 'relative',
  fontSize: '16px',
  fontWeight: 'bold',
  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
  transition: 'background-color 0.3s ease',
  '& .label': {
    width: '50%',
    textAlign: 'center',
    zIndex: 2,
    position: 'relative',
    transition: 'color 0.3s ease',
    lineHeight: '40px',
  },
  '& .label-men': {
    color: isMenSelected ? 'white' : theme.palette.text.primary,
  },
  '& .label-women': {
    color: !isMenSelected ? 'white' : theme.palette.text.primary,
  },
  '& .switch': {
    position: 'absolute',
    top: '0',
    left: isMenSelected ? '50%' : '0',
    width: '90px',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '30px',
    transition: 'left 0.3s ease',
    zIndex: 1,
  },
}));

const Service = () => {
  const { products, fetchData } = useProductStore();
  const [isMenSelected, setIsMenSelected] = useState(true);
  const [hoveredImage, setHoveredImage] = useState({});
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get the size and color from URL parameters or default to empty
  const selectedSize = searchParams.get('size') || '';
  const selectedColor = searchParams.get('color') || '';

  const colors = ['Grey', 'Black', 'Beige', 'Blue', 'Red', 'White', 'Gray', 'Purple'];
  const productDetail = products.result; // Assuming `products.result` is an array of product data
  console.log("proudct detail is :",productDetail)

  // Fetch data initially and on any filter change
  useEffect(() => {
    fetchData(selectedSize, selectedColor); // Pass selected size and color to fetch filtered data
  }, [selectedSize, selectedColor]);

  // Filter products based on the selected category and availability of size/color
 const filteredProducts = Array.isArray(productDetail)
  ? productDetail.filter(product => {
      const subcategory = product.Subcategory || {};

      // // Log product details for debugging
      // console.log("Product:", product.productName);
      // console.log("Product Size:", subcategory.size, "Selected Size:", selectedSize);
      // console.log("Product Color:", subcategory.color, "Selected Color:", selectedColor);
      // console.log("Product Category:", product.category, "Selected Category:", isMenSelected ? 'men' : 'women');
      
      // Case-insensitive and null-safe comparison for size
      const sizeMatches = selectedSize 
        ? subcategory.size && subcategory.size.toString().toLowerCase() === selectedSize.toLowerCase()
        : true;  // If no size filter, ignore size comparison

      // Case-insensitive and null-safe comparison for color
      const colorMatches = selectedColor 
        ? subcategory.color && subcategory.color.toString().toLowerCase() === selectedColor.toLowerCase()
        : true;  // If no color filter, ignore color comparison

      // Match category based on selected gender
      const categoryMatches = product.category === (isMenSelected ? 'men' : 'women');

      // Return product if all conditions are met
      return categoryMatches && sizeMatches && colorMatches;
  })
  : [];



    console.log("filter products" ,filteredProducts)
    

  // Update search parameters in the URL and trigger data fetch with filters
  const updateSearchParams = (newSize, newColor) => {
    const params = {};
    if (newSize) params.size = newSize;
    if (newColor) params.color = newColor;
    setSearchParams(params);
    fetchData(newSize, newColor); // Trigger data fetch immediately after updating the filters
  };

  // Reset filters and fetch all products
  const resetFilters = () => {
    setSearchParams({});
    fetchData(); // Fetch all products without filters
  };

  // Handle thumbnail click to show a specific image on hover
  const handleThumbnailClick = (productId, image) => {
    setHoveredImage(prevState => ({ ...prevState, [productId]: image }));
  };

  // Navigate to product details page
  const handleAddToCart = (product) => {
    navigate(`/service/product/${product._id}`);
  };

  return (
    <Box display="flex" p={3} mt={15}>
      <Box width="25%" pr={2}>
        <Typography variant="h6">Filter By:</Typography>

        {/* Sizes */}
        <Typography variant="h6" mt={2}>Sizes</Typography>
        <Typography>Select Your Size.....</Typography>
        <Box display="flex" flexWrap="wrap" mb={2} m={5}>
          {['5', '6', '7', '8', '9', '10', '11', '12', '13'].map(size => (
            <Box
              key={size}
              sx={{
                backgroundColor: size === selectedSize ? '#000' : 'grey',
                color: size === selectedSize ? '#fff' : '#ddd',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '8px',
                marginRight: '12px',
                marginTop: '15px',
                cursor: 'pointer',
                textAlign: 'center',
                '&:hover': { backgroundColor: '#ccc' },
              }}
              onClick={() => updateSearchParams(size, selectedColor)}
            >
              {size}
            </Box>
          ))}
        </Box>

        {/* Colors */}
        <Typography variant="h6" mt={2}>Color Base</Typography>
        <Typography>Select Your Color.....</Typography>
        <Box display="flex" flexDirection="row" flexWrap="wrap" mb={2} m={5}>
          {colors.map(color => (
            <Box key={color} display="flex" alignItems="center" onClick={() => updateSearchParams(selectedSize, color)}>
              <Box
                sx={{
                  backgroundColor: color,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: '1px solid #ddd',
                  marginLeft: '22px',
                  marginRight: '22px',
                  marginTop: '15px',
                  marginBottom: '15px'
                }}
              />
              <Typography variant="body2" style={{ color: selectedColor === color ? color : 'inherit' }}>{color}</Typography>
            </Box>
          ))}
        </Box>

        {/* Reset Filters Button */}
        <Box mt={20} mr={10} display="flex" justifyContent="flex-end">
          <button onClick={resetFilters} style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545', 
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}>
            Reset Filters
          </button>
        </Box>
      </Box>

      {/* Product Grid */}
      <Box width="75%">
        <Box display="flex" justifyContent="flex-end">
          <CustomSwitch onClick={() => setIsMenSelected(!isMenSelected)} isMenSelected={isMenSelected}>
            <Box className="switch" />
            <Typography className={`label label-men`}>Men</Typography>
            <Typography className={`label label-women`}>Women</Typography>
          </CustomSwitch>
        </Box>

        <Typography variant="h4" mt={2} mb={2}>
          {isMenSelected ? 'Men\'s Shoes' : 'Women\'s Shoes'}
        </Typography>

        <Grid container spacing={2}>
          {filteredProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <StyledCard isHovered={true} onClick={() => navigate(`/service/product/${product._id}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={hoveredImage[product._id] || product.images[0]}
                  alt={product.productName}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{product.productName}</Typography>
                  <Typography variant="body2">{product.Subcategory.price} PKR</Typography>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <IconButton onClick={() => handleAddToCart(product)} >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Service;