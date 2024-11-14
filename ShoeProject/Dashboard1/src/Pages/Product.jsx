import React, { useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';

const Product = ({ isSidebarCollapsed }) => {
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    price: '',
    category: '',
    stock: ''
  });
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // For product detail modal

  // Using dummy data for products
  useEffect(() => {
    const dummyProducts = [
      { id: 1, name: 'Product 1', price: '1000', category: 'Category 1', stock: '20' },
      { id: 2, name: 'Product 2', price: '1500', category: 'Category 2', stock: '30' },
      { id: 3, name: 'Product 3', price: '2000', category: 'Category 3', stock: '15' },
    ];
    setProducts(dummyProducts);
  }, []);

  const handleOpenDialog = (product = null) => {
    setCurrentProduct(product || { id: '', name: '', price: '', category: '', stock: '' });
    setIsEditMode(!!product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentProduct({ id: '', name: '', price: '', category: '', stock: '' });
  };

  const handleSaveProduct = () => {
    if (isEditMode) {
      // Update product
      setProducts(products.map(prod => (prod.id === currentProduct.id ? currentProduct : prod)));
    } else {
      // Add new product
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
    setCurrentProduct({ id: '', name: '', price: '', category: '', stock: '' });
  };

  const columns = [
    { accessorKey: 'name', header: 'Name', size: 140 },
    { accessorKey: 'price', header: 'Price (PKR)', size: 120 },
    { accessorKey: 'category', header: 'Category', size: 120 },
    { accessorKey: 'stock', header: 'Stock', size: 80 },
    {
      header: 'Actions',
      size: 180,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Visibility 
            color="info" 
            onClick={() => handleOpenDetailDialog(row.original)} // Open product details
            sx={{ cursor: 'pointer', marginRight: 1 }}
          />
          <Edit 
            color="primary" 
            onClick={() => handleOpenDialog(row.original)} // Edit product
            sx={{ cursor: 'pointer', marginRight: 1 }}
          />
          <Delete 
            color="error" 
            onClick={() => handleDeleteProduct(row.original.id)} // Delete product
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box
      padding={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        marginLeft: { xs: 0, md: isSidebarCollapsed ? '90px' : '230px' },
        marginTop: '80px',
        transition: 'margin-left 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <Button startIcon={<Add />} variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Add Product
      </Button>

      <Box
        sx={{
          overflowX: 'auto',
          marginTop: '16px',
          flex: 1,
        }}
      >
        <MaterialReactTable
          columns={columns}
          data={products}
          enableSorting
          enablePagination
          muiTableProps={{
            sx: {
              overflowX: 'auto',
              maxHeight: 'calc(100vh - 120px)',
            },
          }}
        />
      </Box>

      {/* Product Edit / Add Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditMode ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={currentProduct.name}
            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price (PKR)"
            type="number"
            fullWidth
            value={currentProduct.price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            value={currentProduct.category}
            onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Stock"
            type="number"
            fullWidth
            value={currentProduct.stock}
            onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
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
      <Dialog open={isDetailDialogOpen} onClose={handleCloseDetailDialog}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={currentProduct.name}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="dense"
            label="Price (PKR)"
            type="number"
            fullWidth
            value={currentProduct.price}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            value={currentProduct.category}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="dense"
            label="Stock"
            type="number"
            fullWidth
            value={currentProduct.stock}
            InputProps={{ readOnly: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
