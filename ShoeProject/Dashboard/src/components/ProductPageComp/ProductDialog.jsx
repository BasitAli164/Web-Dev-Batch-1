import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Button, Input, FormHelperText, CircularProgress, Box } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// SKU generation function
const generateSKU = () => {
  return 'SKU-' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

const ProductDialog = ({ open, onClose, onSave, currentProduct, isEditMode }) => {
  const [imageFileName, setImageFileName] = useState(''); // Initialize with empty string

  // Initial form values
  const initialValues = {
    productName: currentProduct.productName || '',
    productDescription: currentProduct.productDescription || '',
    category: currentProduct.category || 'men',
    color: currentProduct.color || '',
    size: currentProduct.size || 0,
    brand: currentProduct.brand || '',
    stock: currentProduct.stock || 0,
    price: currentProduct.price || 0,
    sku: currentProduct.sku || generateSKU(),
    image: currentProduct.productImage || '',
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    productName: Yup.string().required('Product name is required'),
    productDescription: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    color: Yup.string().oneOf(['Grey', 'Black', 'Beige', 'Blue', 'Red', 'White', 'Gray', 'Purple'], 'Invalid color').required('Color is required'),
    size: Yup.number().min(0, 'Size cannot be less than 0').max(23, 'Size cannot be greater than 23').required('Size is required'),
    brand: Yup.string().oneOf(['Brand1', 'Brand2', 'Brand3', 'Brand4', 'Brand5'], 'Invalid brand').required('Brand is required'),
    stock: Yup.number().min(0, 'Stock must be a positive number').required('Stock is required'),
    price: Yup.number().min(0, 'Price must be a positive number').required('Price is required'),
    image: Yup.mixed().test('fileSize', 'File is too large', value => !value || (value && value.size <= 5000000)), // 5MB max
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setImageFileName(file.name); // Update the image file name (or path) in the state
      setFieldValue('image', file); // Update Formik field value with the selected file
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ padding: '20px' }}>
      <DialogTitle sx={{ fontWeight: 600, textAlign: 'center' }}>
        {isEditMode ? 'Edit Product' : 'Add Product'}
      </DialogTitle>
      <DialogContent
        sx={{
          maxHeight: 350,
          overflowY: 'auto',
          padding: '8px',
          '::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#1976d2',
            borderRadius: '10px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSave(values);
          }}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form>
              {/* Product Name */}
              <Field
                as={TextField}
                label="Product Name"
                name="productName"
                fullWidth
                margin="normal"
                variant="outlined"
                error={Boolean(values.productName && values.productName.length === 0)}
                helperText={<ErrorMessage name="productName" />}
              />

              {/* Product Description */}
              <Field
                as={TextField}
                label="Description"
                name="productDescription"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
                error={Boolean(values.productDescription && values.productDescription.length === 0)}
                helperText={<ErrorMessage name="productDescription" />}
              />

              {/* Category */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Field
                  as={Select}
                  name="category"
                  label="Category"
                  variant="outlined"
                >
                  <MenuItem value="men">Men</MenuItem>
                  <MenuItem value="women">Women</MenuItem>
                </Field>
              </FormControl>

              {/* Color */}
              <Field
                as={TextField}
                label="Color"
                name="color"
                fullWidth
                margin="normal"
                variant="outlined"
                error={Boolean(values.color && values.color.length === 0)}
                helperText={<ErrorMessage name="color" />}
              />

              {/* Size */}
              <Field
                as={TextField}
                label="Size"
                name="size"
                fullWidth
                margin="normal"
                type="number"
                variant="outlined"
                error={Boolean(values.size && (values.size < 0 || values.size > 23))}
                helperText={<ErrorMessage name="size" />}
              />

              {/* Brand */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Brand</InputLabel>
                <Field
                  as={Select}
                  name="brand"
                  label="Brand"
                  variant="outlined"
                >
                  <MenuItem value="Nike">Nike</MenuItem>
                  <MenuItem value="Adidas">Adidas</MenuItem>
                  <MenuItem value="Puma">Puma</MenuItem>
                  <MenuItem value="Reebok">Reebok</MenuItem>
                  <MenuItem value="Under Armour">Under Armour</MenuItem>

                </Field>
              </FormControl>

              {/* Stock */}
              <Field
                as={TextField}
                label="Stock"
                name="stock"
                fullWidth
                margin="normal"
                type="number"
                variant="outlined"
                error={Boolean(values.stock && values.stock < 0)}
                helperText={<ErrorMessage name="stock" />}
              />

              {/* Price */}
              <Field
                as={TextField}
                label="Price"
                name="price"
                fullWidth
                margin="normal"
                type="number"
                variant="outlined"
                error={Boolean(values.price && values.price <= 0)}
                helperText={<ErrorMessage name="price" />}
              />

              {/* SKU */}
              <Field
                as={TextField}
                label="SKU"
                name="sku"
                fullWidth
                margin="normal"
                value={values.sku || generateSKU()}
                variant="outlined"
                disabled
              />

              {/* Image File Name Display */}
              {imageFileName && (
                <Box sx={{ marginTop: 2 }}>
                  <TextField
                    label="Image Name"
                    name="image"
                    value={imageFileName}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    disabled
                  />
                </Box>
              )}

              {/* File Upload */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Upload Image</InputLabel>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input
                    type="file"
                    name="image"
                    onChange={(event) => handleImageChange(event, setFieldValue)}
                    accept="image/*"
                    sx={{ flex: 1 }}
                    inputProps={{
                      style: { opacity: 0, width: '100%', position: 'absolute', zIndex: -1 },
                    }}
                  />
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      padding: '6px 16px',
                      backgroundColor: '#1976d2',
                      color: 'white',
                      position: 'relative',
                      top: -20,
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                    }}
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      onChange={(event) => handleImageChange(event, setFieldValue)}
                      accept="image/*"
                    />
                  </Button>
                </div>
                <FormHelperText>Upload product image (optional, max 5MB)</FormHelperText>
                <ErrorMessage name="image" component="div" style={{ color: 'red' }} />
              </FormControl>

              {/* Dialog Actions (Buttons) */}
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button onClick={onClose} color="secondary" variant="outlined" sx={{ marginRight: 2 }}>Cancel</Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                    padding: '8px 16px',
                  }}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : (isEditMode ? 'Update' : 'Add')}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
