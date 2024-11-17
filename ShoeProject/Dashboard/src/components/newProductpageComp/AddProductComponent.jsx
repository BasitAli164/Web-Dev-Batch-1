// src/components/AddProductComponent.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import {Formik} from 'formik';
import * as Yup from 'yup';

const AddProductComponent = ({ open, onClose }) => {
  const handleSubmit = async (values) => {
    const res = await fetch('http://localhost:8000/api/product/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      alert('Product added successfully!');
      onClose();
    } else {
      alert('Error adding product.');
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
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            productName: '',
            productDescription: '',
            category: '',
            productImage: '',
            brand: '',
            size: '',
            color: '',
            stock: '',
            price: '',
            sku: '',
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
              <TextField
                label="Product Description"
                fullWidth
                value={values.productDescription}
                onChange={handleChange}
              />
              <TextField
                select
                label="Category"
                value={values.category}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
              </TextField>
              {/* Add other fields similarly (image, brand, size, color, etc.) */}
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

export default AddProductComponent;
