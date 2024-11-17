// src/components/ViewProductById.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const ViewProductById = ({ open, onClose, product }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        <img src={product?.productImage} alt={product?.productName} width="100%" />
        <Typography variant="h6">{product?.productName}</Typography>
        <Typography>{product?.productDescription}</Typography>
        <Typography>Price: ${product?.price}</Typography>
        <Typography>Stock: {product?.stock}</Typography>
        <Typography>Category: {product?.category}</Typography>
        <Typography>Brand: {product?.brand}</Typography>
        <Typography>Size: {product?.size}</Typography>
        <Typography>Color: {product?.color}</Typography>
        <Typography>SKU: {product?.sku}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewProductById;
