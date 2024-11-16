import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const ProductDialog = ({ open, onClose, onSave, currentProduct, isEditMode, handleProductChange }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{isEditMode ? 'Edit Product' : 'Add Product'}</DialogTitle>
    <DialogContent sx={{ maxHeight: 450, overflowY: 'auto' }}>
      <TextField label="Product Name" fullWidth margin="normal" value={currentProduct.productName} onChange={e => handleProductChange('productName', e.target.value)} />
      <TextField label="Description" fullWidth margin="normal" multiline rows={3} value={currentProduct.productDescription} onChange={e => handleProductChange('productDescription', e.target.value)} />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={currentProduct.category} onChange={e => handleProductChange('category', e.target.value)}>
          <MenuItem value="men">Men</MenuItem>
          <MenuItem value="women">Women</MenuItem>
        </Select>
      </FormControl>
      {/* Add similar fields for subcategory (brand, color, size, etc.) */}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">Cancel</Button>
      <Button onClick={onSave} color="primary">{isEditMode ? 'Update' : 'Add'}</Button>
    </DialogActions>
  </Dialog>
);

export default ProductDialog;
