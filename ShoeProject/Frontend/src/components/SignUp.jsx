// src/components/SignUp.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
} from '@mui/material';
import { Person, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material'; // Import icons
import axios from 'axios'; // Import Axios

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
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
        userName: name,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login'); // Redirect to login page after successful signup
      }
    } catch (error) {
      setErrorMessage('Failed to register. Please try again.'); // Set error message
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#f5f5f5', // Light grey background color
      }}
      mt={4}  
    >
      <Card sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 3 }}>
        <CardHeader title="Create Account" titleTypographyProps={{ align: 'center' }} />
        <CardContent>
          {errorMessage && (
            <Typography color="error" sx={{ marginBottom: 2, textAlign: 'center' }}>
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
              placeholder="Enter your name" // Added placeholder
              sx={{ marginBottom: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Person />
                  </InputAdornment>
                ),
              }}
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
              placeholder="Enter your email" // Added placeholder
              sx={{ marginBottom: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password" // Added placeholder
              sx={{ marginBottom: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginBottom: 2 }}
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
