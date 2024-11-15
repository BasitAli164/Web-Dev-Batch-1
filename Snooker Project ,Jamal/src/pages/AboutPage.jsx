import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Custom styles for the AboutUs component
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'url(https://example.com/background-image.jpg)', // Replace with your background image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for readability
    padding: theme.spacing(4),
    borderRadius: '8px',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  paragraph: {
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  teamMember: {
    textAlign: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
  },
}));

const AboutUs = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container maxWidth="md" className={classes.content}>
        <Typography variant="h2" align="center" className={classes.header}>
          Welcome to [Your Snooker Club Name]
        </Typography>
        <Typography variant="body1" align="center" className={classes.paragraph}>
          At [Your Snooker Club Name], we create an inclusive and passionate community where snooker enthusiasts come together to
          learn, compete, and share their love for the game.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} className={classes.gridItem}>
            <div className={classes.teamMember}>
              <Typography variant="h6">John Doe</Typography>
              <Typography variant="body2">Founder & Coach</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={classes.gridItem}>
            <div className={classes.teamMember}>
              <Typography variant="h6">Jane Smith</Typography>
              <Typography variant="body2">Head of Operations</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4} className={classes.gridItem}>
            <div className={classes.teamMember}>
              <Typography variant="h6">Mark Brown</Typography>
              <Typography variant="body2">Event Coordinator</Typography>
            </div>
          </Grid>
        </Grid>

        <Typography variant="h4" align="center" className={classes.header}>
          Our Mission & Values
        </Typography>
        <Typography variant="body1" align="center" className={classes.paragraph}>
          We believe in sportsmanship, inclusivity, and excellence. Our mission is to provide a platform for players of all skill levels to
          improve, compete, and enjoy the game of snooker.
        </Typography>

        <Box textAlign="center">
          <Button variant="contained" className={classes.button} href="#membership">
            Join Us Today
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
