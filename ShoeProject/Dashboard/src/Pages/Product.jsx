import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

// Helper function to generate SKU
const generateSKU = () => Math.random().toString(36).substr(2, 9).toUpperCase();

const Product = ({ isSidebarCollapsed }) => {
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: '',
    productName: '',
    productDescription: '',
    images: '',
    category: '',
    subcategory: {
      brand: '',
      color: '',
      size: '',
      stock: '',
      sku: '',
    },
    imagePreview: '',
  });
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch all products from backend
    axios.get('http://localhost:8000/api/product/get')
      .then(response => {
        const flattenedProducts = response.data.result.map(product => ({
          ...product,
          // Flatten the nested subcategory data for easy access
          brand: product.Subcategory?.brand,
          color: product.Subcategory?.color,
          size: product.Subcategory?.size,
          sku: product.Subcategory?.sku,
          stock: product.Subcategory?.stock,
          price: product.Subcategory?.price,
        }));
        setProducts(flattenedProducts);
        console.log('Flattened Products:', flattenedProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    console.log('Products state:', products);
  }, [products]);

  const handleOpenDialog = (product = null) => {
    setCurrentProduct(
      product || {
        _id: '',
        productName: '',
        productDescription: '',
        images: '',
        category: '',
        subcategory: {
          brand: '',
          color: '',
          size: '',
          stock: '',
          sku: generateSKU(),
        },
        imagePreview: '',
      }
    );
    setIsEditMode(!!product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentProduct({
      _id: '',
      productName: '',
      productDescription: '',
      images: '',
      category: '',
      subcategory: {
        brand: '',
        color: '',
        size: '',
        stock: '',
        sku: '',
      },
      imagePreview: '',
    });
  };

  const handleSaveProduct = () => {
    const productData = { ...currentProduct };
    console.log('Product Data:', productData);

    if (isEditMode) {
      // Update the product using _id
      axios.put(`http://localhost:8000/api/product/update/${currentProduct._id}`, productData)
        .then(response => {
          setProducts(products.map(prod => (prod._id === currentProduct._id ? response.data.result : prod)));
          handleCloseDialog();
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    } else {
      axios.post('http://localhost:8000/api/product/add', productData)
        .then(response => {
          setProducts([...products, response.data]);
          handleCloseDialog();
        })
        .catch(error => {
          console.error('Error adding product:', error);
        });
    }
  };

  const handleDeleteProduct = (productId) => {
    // Delete using _id
    axios.delete(`http://localhost:8000/api/product/del/${productId}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== productId));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleOpenDetailDialog = (product) => {
    axios.get(`http://localhost:8000/api/product/get/${product._id}`)
      .then(response => {
        setCurrentProduct(response.data);
        setIsDetailDialogOpen(true);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
  };

  // Handle Image URL Change
  const handleImageURLChange = (e) => {
    setCurrentProduct({
      ...currentProduct,
      images: e.target.value,
      imagePreview: e.target.value,
    });
  };

  // Handle Local Image File Change
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file); // Create a URL for the selected file
      setCurrentProduct({
        ...currentProduct,
        images: fileURL, // Store the URL of the file
        imagePreview: fileURL, // Store the preview URL of the file
      });
    }
  };

  // Define columns for MaterialReactTable
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
            onClick={() => handleDeleteProduct(row.original._id)}  // Use _id here
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      ),
    },
    {
      accessorKey: 'images', // The key from your data that contains the image path
      header: 'Image',
      size: 100,
      Cell: ({ cell }) => {
        // Assuming the image is stored as an array, and we want the first image
        const imageUrl = cell.getValue()[0]; // Get the first image URL from the array
    
        // Replace backslashes with forward slashes (this should ideally be handled by the backend)
        const formattedImageUrl = imageUrl.replace(/\\/g, '/'); 
    
        // Construct the full URL for the image
        const fullImageUrl = `http://localhost:8000/${formattedImageUrl}`;
    
        // Log to verify the full image URL is correct
        console.log('Full Image URL:', fullImageUrl);  // Check this URL in the browser
    
        return (
          <img
            src={fullImageUrl}
            alt="Product"
            style={{
              width: 50, // Set width for the image
              height: 50, // Set height for the image
              objectFit: 'cover', // Ensure the image fits within the box without distortion
            }}
          />
        );
      },
    },
    { accessorKey: 'productName', header: 'Product Name', size: 140 },
    { accessorKey: 'productDescription', header: 'Description', size: 180 },
    { accessorKey: 'category', header: 'Category', size: 100 },
    { accessorKey: 'brand', header: 'Brand', size: 100 },
    { accessorKey: 'color', header: 'Color', size: 80 },
    { accessorKey: 'size', header: 'Size', size: 60 },
    { accessorKey: 'sku', header: 'SKU', size: 100 },
    { accessorKey: 'stock', header: 'Stock', size: 80 },
    { accessorKey: 'price', header: 'Price (PKR)', size: 100 },
  ];

  return (
    <Box padding={2} sx={{
      display: 'flex', flexDirection: 'column', height: '100vh',
      marginLeft: { xs: 0, md: isSidebarCollapsed ? '90px' : '230px' },
      marginTop: '80px', transition: 'margin-left 0.3s ease', overflow: 'hidden'
    }}>
      <Box sx={{
        position: 'relative',
        height: 'calc(100vh - 160px)',
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
            zIndex: 2,
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
        <DialogContent sx={{ maxHeight: 450, overflowY: 'auto' }}>
          <TextField
            label="Product Name"
            fullWidth
            margin="normal"
            value={currentProduct.productName}
            onChange={(e) => setCurrentProduct({ ...currentProduct, productName: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={currentProduct.productDescription}
            onChange={(e) => setCurrentProduct({ ...currentProduct, productDescription: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={currentProduct.category}
              onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
            >
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
            </Select>
          </FormControl>

          {/* Subcategory Fields */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Brand</InputLabel>
            <Select
              value={currentProduct.subcategory?.brand || ''}
              onChange={(e) => setCurrentProduct({
                ...currentProduct,
                subcategory: { ...currentProduct.subcategory, brand: e.target.value },
              })}
            >
              <MenuItem value="Adidas">Adidas</MenuItem>
              <MenuItem value="Nike">Nike</MenuItem>
              <MenuItem value="Puma">Puma</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Color"
            fullWidth
            margin="normal"
            value={currentProduct.subcategory?.color || ''}
            onChange={(e) => setCurrentProduct({
              ...currentProduct,
              subcategory: { ...currentProduct.subcategory, color: e.target.value },
            })}
          />
          <TextField
            label="Size"
            fullWidth
            margin="normal"
            value={currentProduct.subcategory?.size || ''}
            onChange={(e) => setCurrentProduct({
              ...currentProduct,
              subcategory: { ...currentProduct.subcategory, size: e.target.value },
            })}
          />
          <TextField
            label="Stock"
            fullWidth
            margin="normal"
            value={currentProduct.subcategory?.stock || ''}
            onChange={(e) => setCurrentProduct({
              ...currentProduct,
              subcategory: { ...currentProduct.subcategory, stock: e.target.value },
            })}
          />
          <TextField
            label="SKU"
            fullWidth
            margin="normal"
            value={currentProduct.subcategory?.sku || ''}
            onChange={(e) => setCurrentProduct({
              ...currentProduct,
              subcategory: { ...currentProduct.subcategory, sku: e.target.value },
            })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSaveProduct} color="primary">{isEditMode ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

      {/* Product Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onClose={handleCloseDetailDialog}>
  <DialogTitle>Product Details</DialogTitle>
  <DialogContent>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Product Name</Typography>
        <Typography>{currentProduct.productName || "N/A"}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Category</Typography>
        <Typography>{currentProduct.category || "N/A"}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Brand</Typography>
        <Typography>{currentProduct.subcategory?.brand || "N/A"}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Color</Typography>
        <Typography>{currentProduct.subcategory?.color || "N/A"}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Size</Typography>
        <Typography>{currentProduct.subcategory?.size || "N/A"}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">Stock</Typography>
        <Typography>{currentProduct.subcategory?.stock || "N/A"}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6">SKU</Typography>
        <Typography>{currentProduct.subcategory?.sku || "N/A"}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Description</Typography>
        <Typography>{currentProduct.productDescription || "N/A"}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Price</Typography>
        <Typography>{currentProduct.price || "N/A"}</Typography>
      </Grid>
    </Grid>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDetailDialog} color="secondary">Close</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default Product;
