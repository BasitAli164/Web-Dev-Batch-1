import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import axios from 'axios';

const DeleteProductById = ({ open, onClose, product, setProducts }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/product/del/${product._id}`);
      if (response.status === 200) {
        // Remove the product from the state
        setProducts((prevProducts) => {
          return prevProducts.filter((p) => p._id !== product._id);
        });

        alert('Product deleted successfully!');
        onClose();  // Close the dialog
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete the product: {product?.productName}?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductById;
