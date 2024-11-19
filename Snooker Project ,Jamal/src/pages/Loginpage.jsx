import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, Container } from '@mui/material';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation for the inputs
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Save user details in localStorage for 10 minutes
    const userDetails = { username, email, password };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    // Set a timer to remove the user details from localStorage after 10 minutes
    setTimeout(() => {
      localStorage.removeItem('userDetails');
    }, 600000); // 600000 ms = 10 minutes

    // Redirect the user to the landing page after successful login
    navigate('/landing');
  };

  return (
    <Container maxWidth="xs" sx={{ paddingTop: '100px' }}>
      <Paper sx={{ padding: 4, maxWidth: 400, margin: 'auto', borderRadius: 3, boxShadow: 5, backgroundColor: '#fff' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 3 }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={{ marginBottom: 2 }}
            autoComplete="off" // Disable browser autofill
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={{ marginBottom: 2 }}
            autoComplete="off" // Disable browser autofill
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            variant="outlined"
            size="small"
            sx={{ marginBottom: 3 }}
            autoComplete="off" // Disable browser autofill
          />

          {errorMessage && (
            <Typography sx={{ color: 'error.main', textAlign: 'center', fontSize: '0.875rem', marginBottom: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#00796b',
              color: '#fff',
              '&:hover': { backgroundColor: '#004d40' },
              padding: '10px',
              borderRadius: '20px',
            }}
            size="large"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
