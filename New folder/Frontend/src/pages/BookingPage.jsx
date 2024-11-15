import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, CircularProgress, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const BookingPage = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tableType, setTableType] = useState('');
  const [gameType, setGameType] = useState('');
  const [floor, setFloor] = useState('');
  const [duration, setDuration] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [service, setService] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  // Validate form fields
  const validateForm = () => {
    if (!name || typeof name !== 'string') {
      setError('Please enter a valid name.');
      return false;
    }

    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      setError('Please select a valid date (today or later).');
      return false;
    }

    const currentTime = new Date().toISOString().split('T')[1].slice(0, 5);
    if (date === today && time < currentTime) {
      setError('Please select a time in the future.');
      return false;
    }

    // Validate required fields based on service selection
    if (!service || !date || !time || !floor || !duration) {
      setError('Please fill in all the required fields.');
      return false;
    }

    // If service is not 'Bar & Refreshments', check if other fields are filled
    if (service !== 'Bar & Refreshments') {
      if (!tableType || !gameType || !numPlayers) {
        setError('Please fill in all the required fields for table and game selection.');
        return false;
      }

      if (numPlayers < 1) {
        setError('Please enter a valid number of players (1 or more).');
        return false;
      }
    }

    if (duration < 1) {
      setError('Please enter a valid duration (1 hour or more).');
      return false;
    }

    setError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Prepare the confirmation message, excluding fields if service is 'Bar & Refreshments'
      let confirmationMessage = `Booking details: \nName: ${name}\nDate: ${date}\nTime: ${time}\nFloor: ${floor}\nDuration: ${duration}\nSpecial Request: ${specialRequest}\nService: ${service}`;

      if (service !== 'Bar & Refreshments') {
        confirmationMessage += `\nTable Type: ${tableType}\nGame Type: ${gameType}\nNumber of Players: ${numPlayers}`;
      }

      const emailConfirmed = window.confirm(
        `${confirmationMessage}\n\nDo you approve this booking?`
      );

      if (emailConfirmed) {
        setSuccess(true); // Simulate successful booking
        setTimeout(() => setSuccess(null), 2000); // Remove success message after 2 seconds
      } else {
        setSuccess(false); // Booking canceled
        setTimeout(() => setSuccess(null), 2000); // Remove success message after 2 seconds
      }

      // Reset form fields after confirmation
      setName('');
      setDate('');
      setTime('');
      setTableType('');
      setGameType('');
      setFloor('');
      setDuration('');
      setSpecialRequest('');
      setNumPlayers('');
      setService('');

      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '107vh',
        background: '#f9f9f9',
        padding: 5,
      }}
    >
      <Box
        sx={{
          background: '#fff',
          padding: 4,
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          width: { xs: '100%', sm: '70%', md: '50%' },
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: '2rem',
            fontWeight: 600,
            color: '#333',
            marginBottom: 3,
          }}
        >
          Book Your Snooker Table
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{
                  borderRadius: '8px',
                  background: '#f1f1f1',
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                sx={{
                  borderRadius: '8px',
                  background: '#f1f1f1',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
                sx={{
                  borderRadius: '8px',
                  background: '#f1f1f1',
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            {/* New Service Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Service</InputLabel>
                <Select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                >
                  <MenuItem value="Snooker">Snooker</MenuItem>
                  <MenuItem value="Pool">Pool</MenuItem>
                  <MenuItem value="Bar & Refreshments">Bar & Refreshments</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Other fields */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type of Table</InputLabel>
                <Select
                  value={tableType}
                  onChange={(e) => setTableType(e.target.value)}
                  required={service !== 'Bar & Refreshments'}
                  disabled={service === 'Bar & Refreshments'}
                >
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Professional">Professional</MenuItem>
                  <MenuItem value="Mini">Mini</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type of Game</InputLabel>
                <Select
                  value={gameType}
                  onChange={(e) => setGameType(e.target.value)}
                  required={service !== 'Bar & Refreshments'}
                  disabled={service === 'Bar & Refreshments'}
                >
                  <MenuItem value="Snooker">Snooker</MenuItem>
                  <MenuItem value="Pool">Pool</MenuItem>
                  <MenuItem value="9-Ball">9-Ball</MenuItem>
                  <MenuItem value="8-Ball">8-Ball</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Floor</InputLabel>
                <Select
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  required
                >
                  <MenuItem value="Ground">Ground</MenuItem>
                  <MenuItem value="First">First</MenuItem>
                  <MenuItem value="Second">Second</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration (hours)"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Math.max(1, e.target.value))}
                fullWidth
                sx={{
                  borderRadius: '8px',
                  background: '#f1f1f1',
                }}
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Special Requests"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                fullWidth
                sx={{
                  borderRadius: '8px',
                  background: '#f1f1f1',
                }}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Number of Players"
                type="number"
                value={numPlayers}
                onChange={(e) => setNumPlayers(Math.max(1, e.target.value))}
                fullWidth
                sx={{
                  borderRadius: '8px',
                  background: '#f1f1f1',
                }}
                required={service !== 'Bar & Refreshments'}
                disabled={service === 'Bar & Refreshments'}
                inputProps={{ min: 1 }}
              />
            </Grid>
          </Grid>

          {isLoading ? (
            <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: 2 }} />
          ) : (
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#1abc9c',
                color: '#fff',
                borderRadius: '50px',
                padding: '10px 30px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#17a589',
                },
                transition: 'all 0.3s ease-in-out',
                display: 'block',
                marginTop: 3,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Confirm Booking
            </Button>
          )}
        </form>

        {error && (
          <Typography
            sx={{
              textAlign: 'center',
              marginTop: 2,
              fontSize: '1.2rem',
              color: '#e74c3c',
            }}
          >
            {error}
          </Typography>
        )}

        {success !== null && (
          <Typography
            sx={{
              textAlign: 'center',
              marginTop: 2,
              fontSize: '1.2rem',
              color: success ? '#2ecc71' : '#e74c3c',
            }}
          >
            {success ? 'Booking Confirmed!' : 'Booking canceled. Please try again.'}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BookingPage;
