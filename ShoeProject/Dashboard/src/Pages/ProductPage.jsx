import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductPageComp/ProductList';
import ProductAddDialog from '../components/ProductPageComp/ProductAddDialog';
import ProductUpdateDialog from '../components/ProductPageComp/ProductUpdateDialog';
import CRUDOperations from '../components/ProductPageComp/CRUDOperations';
import { Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

const ProductPage = ({ isSidebarCollapsed }) => {
  const [products, setProducts] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
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

  useEffect(() => {
    // Fetch all products from backend
    axios.get('http://localhost:8000/api/product/get')
      .then(response => {
        // Keep Subcategory intact and don't flatten
        const productDetail = response.data.result
          
        setProducts(productDetail); // Save to state
        console.log('Products with Subcategory:', productDetail);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Handling dialog opening for Add/Edit product
  const handleOpenAddDialog = () => {
    setCurrentProduct({
      id: '',
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
    setIsAddDialogOpen(true);
  };

  const handleOpenUpdateDialog = (product) => {
    setCurrentProduct(product);
    setIsUpdateDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  const handleSaveProduct = (productData) => {
    console.log('Saving product data:', productData);

    if (productData.id) {
      CRUDOperations.updateProduct(productData, setProducts, currentProduct);
    } else {
      CRUDOperations.addProduct(productData, setProducts);
    }

    handleCloseAddDialog();
    handleCloseUpdateDialog();
  };

  const handleDeleteProduct = (productId) => {
    CRUDOperations.deleteProduct(productId, setProducts);
  };

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
          onClick={handleOpenAddDialog}
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

        <ProductList
          products={products}
          onEdit={handleOpenUpdateDialog}
          onDelete={handleDeleteProduct}
        />
      </Box>

      {/* Product Add Dialog */}
      <ProductAddDialog
        open={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        onSave={handleSaveProduct}
      />

      {/* Product Update Dialog */}
      <ProductUpdateDialog
        open={isUpdateDialogOpen}
        onClose={handleCloseUpdateDialog}
        onSave={handleSaveProduct}
        currentProduct={currentProduct}
      />
    </Box>
  );
};

export default ProductPage;
