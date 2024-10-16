import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${formData.email}\nPassword: ${formData.password}`);
    // Reset form fields
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', padding: '0 16px' }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            padding: 3,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 1,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Typography variant="body2" align="center" marginTop={2}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
