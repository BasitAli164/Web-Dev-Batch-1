import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ open, onClose }) => {
  // State for each field
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for error messages
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    let isValid = true;
    // Reset errors
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    // Username validation
    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  // Handle login action
  const handleLogin = () => {
    if (validate()) {
      // Simulate successful login by storing user details (you can store a token as well)
      localStorage.setItem('authToken', 'someRandomToken');
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      onClose(); // Close the modal
      navigate('/'); // Redirect to homepage or the previous page
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>Please enter your details to log in</Typography>
        
        {/* Username Field */}
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          error={!!usernameError}
          helperText={usernameError}
        />

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          error={!!emailError}
          helperText={emailError}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          error={!!passwordError}
          helperText={passwordError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
