import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductPageComp/ProductList';
import ProductDialog from '../components/ProductPageComp/ProductDialog';
import ProductDetailDialog from '../components/ProductPageComp/ProductDetailDialog';
import CRUDOperations from '../components/ProductPageComp/CRUDOperations';
import { Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

const ProductPage = ({ isSidebarCollapsed }) => {
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
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
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch all products from backend
    axios.get('http://localhost:8000/api/product/get')
      .then(response => {
        const flattenedProducts = response.data.result.map(product => ({
          ...product,
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

  // Handling dialog opening for Add/Edit product
  const handleOpenDialog = (product = null) => {
    setCurrentProduct(product || {
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

  const handleSaveProduct = (productData) => {
    console.log('Saving product data:', productData);

    if (isEditMode) {
      if (!currentProduct.id) {
        console.error('Error: currentProduct.id is missing');
        return; // Exit if id is missing
      }
      CRUDOperations.updateProduct(productData, setProducts, currentProduct);
    } else {
      CRUDOperations.addProduct(productData, setProducts);
    }
    handleCloseDialog();
  };

  const handleDeleteProduct = (productId) => {
    CRUDOperations.deleteProduct(productId, setProducts);
  };

  const handleOpenDetailDialog = (product) => {
    CRUDOperations.getProductDetails(product.id, setCurrentProduct, setIsDetailDialogOpen);
  };

  const handleCloseDetailDialog = () => setIsDetailDialogOpen(false);

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

        <ProductList
          products={products}
          onEdit={handleOpenDialog}
          onDelete={handleDeleteProduct}
          onViewDetails={handleOpenDetailDialog}
        />
      </Box>

      {/* Product Add/Edit Dialog */}
      <ProductDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveProduct}
        currentProduct={currentProduct}
        isEditMode={isEditMode}
      />

      {/* Product Detail Dialog */}
      <ProductDetailDialog
        open={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        currentProduct={currentProduct}
      />
    </Box>
  );
};

export default ProductPage;
