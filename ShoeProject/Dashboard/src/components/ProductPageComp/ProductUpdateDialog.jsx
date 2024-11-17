import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, CircularProgress, Input } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

// SKU generation function
const generateSKU = () => {
  return 'SKU-' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

const ProductUpdateDialog = ({ open, onClose, onSave, currentProduct }) => {
  const [file, setFile] = useState(null);
  // console.log("Current Product is:", currentProduct);

  // Memoize initial values so they don't change on every render
  const initialValues = useMemo(() => ({
    productName: currentProduct.productName || '',
    productDescription: currentProduct.productDescription || '',
    category: currentProduct.category || 'men',
    color: currentProduct.color || '',
    size: currentProduct.size || 0,
    brand: currentProduct.brand || '',
    stock: currentProduct.stock || 0,
    price: currentProduct.price || 0,
    sku: currentProduct.sku || generateSKU(),
    file: null, // file state
  }), [currentProduct]);

  const validationSchema = Yup.object({
    productName: Yup.string().required('Product name is required'),
    productDescription: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    color: Yup.string().oneOf(['Grey', 'Black', 'Beige', 'Blue', 'Red', 'White', 'Gray', 'Purple'], 'Invalid color').required('Color is required'),
    size: Yup.number().oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 'Invalid size').required('Size is required'),
    brand: Yup.string().oneOf(['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour'], 'Invalid brand').required('Brand is required'),
    stock: Yup.number().min(0, 'Stock must be a positive number').required('Stock is required'),
    price: Yup.number().min(0, 'Price must be a positive number').required('Price is required'),
    file: Yup.mixed().nullable().test('fileSize', 'File is too large', (value) => !value || value.size <= 2000000), // Optional file validation
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true, // Enable reinitialization when the currentProduct changes
    onSubmit: async (values) => {
      // Handle file upload and update product
      const formData = new FormData();
      formData.append('file', values.file);
      formData.append('productName', values.productName);
      formData.append('productDescription', values.productDescription);
      formData.append('category', values.category);
      formData.append('color', values.color);
      formData.append('size', values.size);
      formData.append('brand', values.brand);
      formData.append('stock', values.stock);
      formData.append('price', values.price);
      formData.append('sku', values.sku);

      await onSave(formData);  // Pass form data to onSave handler
      formik.resetForm();
      setFile(null);
      onClose();
    },
  });

  useEffect(() => {
    if (open) {
      formik.setValues(initialValues);
    }
  }, [open, initialValues, formik]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{'Edit Product'}</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          {/* Product Name */}
          <TextField
            label="Product Name"
            name="productName"
            value={formik.values.productName}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            error={formik.touched.productName && Boolean(formik.errors.productName)}
            helperText={formik.touched.productName && formik.errors.productName}
          />

          {/* Product Description */}
          <TextField
            label="Description"
            name="productDescription"
            value={formik.values.productDescription}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={3}
            error={formik.touched.productDescription && Boolean(formik.errors.productDescription)}
            helperText={formik.touched.productDescription && formik.errors.productDescription}
          />

          {/* Category */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
            >
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
            </Select>
            {formik.touched.category && formik.errors.category && (
              <FormHelperText error>{formik.errors.category}</FormHelperText>
            )}
          </FormControl>

          {/* Color */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Color</InputLabel>
            <Select
              label="Color"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
              error={formik.touched.color && Boolean(formik.errors.color)}
            >
              <MenuItem value="Grey">Grey</MenuItem>
              <MenuItem value="Black">Black</MenuItem>
              <MenuItem value="Beige">Beige</MenuItem>
              <MenuItem value="Blue">Blue</MenuItem>
              <MenuItem value="Red">Red</MenuItem>
              <MenuItem value="White">White</MenuItem>
              <MenuItem value="Gray">Gray</MenuItem>
              <MenuItem value="Purple">Purple</MenuItem>
            </Select>
            {formik.touched.color && formik.errors.color && (
              <FormHelperText error>{formik.errors.color}</FormHelperText>
            )}
          </FormControl>

          {/* Size */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Size</InputLabel>
            <Select
              label="Size"
              name="size"
              value={formik.values.size}
              onChange={formik.handleChange}
              error={formik.touched.size && Boolean(formik.errors.size)}
            >
              {Array.from({ length: 13 }, (_, i) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.size && formik.errors.size && (
              <FormHelperText error>{formik.errors.size}</FormHelperText>
            )}
          </FormControl>

          {/* Brand */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Brand</InputLabel>
            <Select
              label="Brand"
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
            >
              <MenuItem value="Nike">Nike</MenuItem>
              <MenuItem value="Adidas">Adidas</MenuItem>
              <MenuItem value="Puma">Puma</MenuItem>
              <MenuItem value="Reebok">Reebok</MenuItem>
              <MenuItem value="Under Armour">Under Armour</MenuItem>
            </Select>
            {formik.touched.brand && formik.errors.brand && (
              <FormHelperText error>{formik.errors.brand}</FormHelperText>
            )}
          </FormControl>

          {/* Stock */}
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={formik.values.stock}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
          />

          {/* Price */}
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />

          {/* File Upload */}
         {/* File Upload */}
<FormControl fullWidth>
  <Input
    type="file"
    name="file"
    onChange={(e) => setFile(e.target.files[0])}
    fullWidth
    sx={{ marginTop: 2 }}  // Optional margin styling
  />
  {formik.touched.file && formik.errors.file && (
    <FormHelperText error>{formik.errors.file}</FormHelperText>
  )}
</FormControl>

          {/* Dialog Actions */}
          <DialogActions>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? <CircularProgress size={24} /> : 'Update Product'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductUpdateDialog;
