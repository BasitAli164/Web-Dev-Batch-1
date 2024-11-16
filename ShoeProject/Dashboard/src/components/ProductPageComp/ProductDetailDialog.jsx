import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, Button } from '@mui/material';

const ProductDetailDialog = ({ open, onClose, currentProduct }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Product Details</DialogTitle>
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><Typography variant="h6">Product Name</Typography><Typography>{currentProduct.productName}</Typography></Grid>
        {/* Add similar fields for other product details */}
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">Close</Button>
    </DialogActions>
  </Dialog>
);

export default ProductDetailDialog;
