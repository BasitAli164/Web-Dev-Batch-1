// src/components/UpdateProductById.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UpdateProductById = ({ open, onClose, product }) => {
  const handleSubmit = async (values) => {
    const res = await fetch(`http://localhost:8000/api/product/update/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      alert('Product updated successfully!');
      onClose();
    } else {
      alert('Error updating product.');
    }
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required('Product name is required'),
    price: Yup.number().positive('Price must be a positive number').required('Price is required'),
    stock: Yup.number().positive('Stock must be a positive number').required('Stock is required'),
    // add other validations as needed
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Product</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            productName: product?.productName || '',
            productDescription: product?.productDescription || '',
            category: product?.category || '',
            productImage: product?.productImage || '',
            brand: product?.brand || '',
            size: product?.size || '',
            color: product?.color || '',
            stock: product?.stock || '',
            price: product?.price || '',
            sku: product?.sku || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Product Name"
                fullWidth
                value={values.productName}
                onChange={handleChange}
                error={!!errors.productName}
                helperText={errors.productName}
              />
              {/* Add other fields (Description, Image, Brand, Category, etc.) */}
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductById;
