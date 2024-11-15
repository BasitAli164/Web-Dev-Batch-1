import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Grid,
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { MaterialReactTable } from 'material-react-table';

const generateSKU = () => Math.random().toString(36).substr(2, 9).toUpperCase();

const Product = ({ isSidebarCollapsed }) => {
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    productName: '',
    productDescription: '',
    images: '',
    category: '',
    brand: '',
    color: '',
    size: '',
    stock: '',
    price: '',
    sku: '',
    imagePreview: '',
  });
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    const dummyProducts = [
      {
        id: 1,
        productName: 'Product 1',
        productDescription: 'Description 1',
        images: 'https://via.placeholder.com/50',
        category: 'men',
        brand: 'Brand 1',
        color: 'Red',
        size: 42,
        stock: 20,
        price: 1000,
        sku: generateSKU(),
      },
      {
        id: 2,
        productName: 'Product 2',
        productDescription: 'Description 2',
        images: 'https://via.placeholder.com/50',
        category: 'women',
        brand: 'Brand 2',
        color: 'Blue',
        size: 38,
        stock: 15,
        price: 1500,
        sku: generateSKU(),
      },
    ];
    setProducts(dummyProducts);
  }, []);

  const handleOpenDialog = (product = null) => {
    setCurrentProduct(
      product || {
        id: '',
        productName: '',
        productDescription: '',
        images: '',
        category: '',
        brand: '',
        color: '',
        size: '',
        stock: '',
        price: '',
        sku: generateSKU(),
        imagePreview: '',
      }
    );
    setIsEditMode(!!product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentProduct({
      id: '',
      productName: '',
      productDescription: '',
      images: '',
      category: '',
      brand: '',
      color: '',
      size: '',
      stock: '',
      price: '',
      sku: '',
      imagePreview: '',
    });
  };

  const handleSaveProduct = () => {
    if (isEditMode) {
      setProducts(products.map(prod => (prod.id === currentProduct.id ? currentProduct : prod)));
    } else {
      setProducts([...products, { ...currentProduct, id: products.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleOpenDetailDialog = (product) => {
    setCurrentProduct(product);
    setIsDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
  };

  // Handle Image URL Change
  const handleImageURLChange = (e) => {
    setCurrentProduct({
      ...currentProduct,
      images: e.target.value,
      imagePreview: e.target.value, // Store the URL preview for the image
    });
  };

  // Handle Local Image File Change
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // Create a URL for the selected file
      setCurrentProduct({
        ...currentProduct,
        images: file.name, // Optionally store the file name or path here
        imagePreview: fileURL, // Store the preview URL of the file
      });
    }
  };

  const columns = [
    {
      header: 'Actions',
      size: 100,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Visibility
            color="info"
            onClick={() => handleOpenDetailDialog(row.original)}
            sx={{ cursor: 'pointer', marginRight: 1 }}
          />
          <Edit
            color="primary"
            onClick={() => handleOpenDialog(row.original)}
            sx={{ cursor: 'pointer', marginRight: 1 }}
          />
          <Delete
            color="error"
            onClick={() => handleDeleteProduct(row.original.id)}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      ),
    },
    { accessorKey: 'images', header: 'Image', size: 100, Cell: ({ cell }) => <img src={cell.getValue()} alt="Product" style={{ width: 50, height: 50, objectFit: 'cover' }} /> },
    { accessorKey: 'productName', header: 'Product Name', size: 140 },
    { accessorKey: 'stock', header: 'Stock', size: 80 },
    { accessorKey: 'price', header: 'Price (PKR)', size: 100 },
    { accessorKey: 'color', header: 'Color', size: 50 },
    { accessorKey: 'brand', header: 'Brand', size: 50 },
  ];

  return (
    <Box padding={2} sx={{
      display: 'flex', flexDirection: 'column', height: '100vh',
      marginLeft: { xs: 0, md: isSidebarCollapsed ? '90px' : '230px' },
      marginTop: '80px', transition: 'margin-left 0.3s ease', overflow: 'hidden'
    }}>
      {/* Table Container with the Fixed Button */}
      <Box sx={{
        position: 'relative',
        height: 'calc(100vh - 160px)', // Adjust for other UI parts like header/footer
        overflow: 'hidden',
      }}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 2, // Ensure it's above the table content
            padding: '8px',
            borderRadius: '4px',
            boxShadow: 3,
          }}
        >
          Add Product
        </Button>

        <MaterialReactTable
          columns={columns}
          data={products}
          enableSorting
          enablePagination
          muiTablePaperProps={{
            sx: { overflowX: 'auto', maxWidth: '100%', maxHeight: 'calc(100vh - 160px)' }
          }}
          muiTableContainerProps={{
            sx: { maxHeight: 'calc(100vh - 160px)', overflowX: 'auto', overflowY: 'auto', position: 'relative' }
          }}
          muiTableHeadProps={{
            sx: {
              position: 'sticky',
              top: 0,
              backgroundColor: 'white',
              zIndex: 1,
            },
          }}
        />
      </Box>

      {/* Product Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditMode ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent
          sx={{
            maxHeight: 450,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <TextField
            label="Product Name"
            fullWidth
            margin="normal"
            value={currentProduct.productName}
            onChange={(e) => setCurrentProduct({ ...currentProduct, productName: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={currentProduct.productDescription}
            onChange={(e) => setCurrentProduct({ ...currentProduct, productDescription: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            value={currentProduct.images}
            onChange={handleImageURLChange}
            sx={{ mb: 2 }}
          />
          {/* Local Image File Upload */}
          <Box sx={{ mb: 2 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              style={{ marginBottom: 8 }}
            />
            {currentProduct.imagePreview && (
              <Box
                component="img"
                src={currentProduct.imagePreview}
                alt="Preview"
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: '4px',
                  mt: 1,
                }}
              />
            )}
          </Box>

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={currentProduct.category}
              onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
            >
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="kids">Kids</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Brand"
            fullWidth
            margin="normal"
            value={currentProduct.brand}
            onChange={(e) => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Color"
            fullWidth
            margin="normal"
            value={currentProduct.color}
            onChange={(e) => setCurrentProduct({ ...currentProduct, color: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Size"
            type="number"
            fullWidth
            margin="normal"
            value={currentProduct.size}
            onChange={(e) => setCurrentProduct({ ...currentProduct, size: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Stock"
            type="number"
            fullWidth
            margin="normal"
            value={currentProduct.stock}
            onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price (PKR)"
            type="number"
            fullWidth
            margin="normal"
            value={currentProduct.price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProduct} variant="contained" color="primary">
            {isEditMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Product Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onClose={handleCloseDetailDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Product Details
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            maxHeight: 450,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box
                component="img"
                src={currentProduct.images || 'https://via.placeholder.com/150'}
                alt="Product"
                sx={{
                  width: { xs: 120, sm: 150 },
                  height: { xs: 120, sm: 150 },
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                <strong>Product Name:</strong> {currentProduct.productName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary">
                <strong>Description:</strong> {currentProduct.productDescription}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Category:</strong> {currentProduct.category}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Brand:</strong> {currentProduct.brand}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Color:</strong> {currentProduct.color}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Size:</strong> {currentProduct.size}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Stock:</strong> {currentProduct.stock}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Price:</strong> PKR {currentProduct.price}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', py: 2 }}>
          <Button
            onClick={handleCloseDetailDialog}
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: '20px', px: 4, py: 1 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
