// src/components/Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Clear the input fields on component mount
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', {
        email,
        password,
      });
      
      if (response.status === 200) {
        toast.success('Login successful!');
        console.log('Login successful:', response.data);
        // Reset fields after successful submission
        setEmail('');
        setPassword('');
        // Delay navigation to allow the toast to display
        setTimeout(() => {
          navigate('/'); // Redirect to home or dashboard after delay
        }, 1500); // 1.5-second delay
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid email or password. Please try again.');
      toast.error('Login failed: Invalid email or password.');
    }
  };  
  return (
    <Box sx={{ padding: 2, textAlign: 'center', maxWidth: 400, margin: 'auto', marginTop: 15 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Login
      </Typography>
      {errorMessage && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ marginBottom: 3 }} // Increased marginBottom for spacing
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ marginBottom: 3 }} // Increased marginBottom for spacing
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ marginBottom: 2 }} // Margin for spacing
        >
          Login
        </Button>
      </form>
      <Typography variant="body2" sx={{ marginTop: 3 }}>
        Don't have an account?{' '}
        <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: 'blue' }}>
          Sign up
        </span>
      </Typography>
      
      {/* Toastify Container */}
      <ToastContainer />
    </Box>
  );
};

export default Login;
