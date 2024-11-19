// src/components/Footer.js

import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import { Link } from 'react-router-dom';  // Import React Router's Link

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#111',
        color: '#fff',
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Jamal Pool Club
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Join us at Jamal Pool Club for the best pool games, music, and a great community. Dive into the fun today!
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quick Links</Typography>
            <Grid container direction="column" spacing={1} sx={{ marginTop: 2 }}>
              <Grid item>
                <Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link>
              </Grid>
              <Grid item>
                <Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
              </Grid>
            </Grid>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Follow Us</Typography>
            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
              <IconButton component="a" href="#" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton component="a" href="#" target="_blank" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton component="a" href="#" target="_blank" color="inherit">
                <Twitter />
              </IconButton>
              
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Contact Us</Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Email: contact@jamalpoolclub.com
            </Typography>
            <Typography variant="body2">
              Phone: +123 456 7890
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Address: 123 Pool St, Fun City, Country
            </Typography>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ borderTop: '1px solid #444', marginTop: 4, paddingTop: 2 }}>
          <Typography variant="body2" align="center">
            © 2024 Jamal Pool Club. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
