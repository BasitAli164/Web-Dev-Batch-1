// src/components/SignUp.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField } from '@mui/material';
import axios from 'axios'; // Import Axios

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Clear the input fields on component mount
    setName('');
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/api/user/register', {
        userName:name,
        email,
        password,
      });
      
      if (response.status === 201) { // Check for successful registration
        console.log('Registration successful:', response.data);
        // Reset fields after successful submission
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login'); // Redirect to login page after successful signup
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Failed to register. Please try again.'); // Set error message
    }
  };

  return (
    <Box sx={{ padding: 2, textAlign: 'center', maxWidth: 400, margin: 'auto', marginTop: 14 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Sign Up
      </Typography>
      {errorMessage && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ marginBottom: 3 }} // Increased marginBottom for spacing
        />
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
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" sx={{ marginTop: 3 }}>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'blue' }}>
          Log in
        </span>
      </Typography>
    </Box>
  );
};

export default SignUp;
