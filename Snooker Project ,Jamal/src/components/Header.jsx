import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import logo from '../assets/logo.png'
import { AccountCircle, Search, ShoppingCart } from '@mui/icons-material'
import { Link,  useNavigate } from 'react-router-dom'
const Header = () => {
    const [anchorElProfile, setAnchorElProfile] = useState(null)
    const navigate = useNavigate();


    
    const handleProfileMenuOpen = (e) => {
        setAnchorElProfile(e.currentTarget);

    }
    const handleProfileMenuClose = () => {
        setAnchorElProfile(null)

    }

    return (
        <AppBar position='fixed' width='100%'>
            <Toolbar sx={{ bgcolor: '#17a589' }}>
                <Box
                    component='img'
                    sx={{
                        height: 50,
                        display: { xs: 'inline', sm: "block" },
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        cursor: 'pointer',
                        borderRadius:"30%"


                    }}
                    onClick={() => navigate('/')}
                    alt='Logo'
                    src={logo}

                />
                <Box sx={{ flexGrow: 1, display: { xs: 'inline', sm: 'flex', md: 'flex' }, justifyContent: 'center', gap: 10 }}>
                    <Link to='/' style={{ fontSize: "20px", textDecoration: "none", color: "#fff" }}>Home</Link>
                    <Link to='/services' style={{ fontSize: "20px", textDecoration: "none", color: "#fff" }}>Service</Link>
                    <Link to='/about' style={{ fontSize: "20px", textDecoration: "none", color: "#fff" }}>About</Link>
                    <Link to='/contact' style={{ fontSize: "20px", textDecoration: "none", color: "#fff" }}>Contact</Link>




                </Box>
                <Box sx={{ display: 'flex', alignItem: 'center', display: { xs: 'inline', sm: 'flex', md: 'flex' } }}>
                    

                    <IconButton sx={{ color: 'white' }} size='large' aria-label='Account of current user' title='Account Icon' edge='end' aria-controls='primary-search-account menu' aria-haspopup='true' onClick={handleProfileMenuOpen}>
                        <AccountCircle />

                    </IconButton>
                    <Menu
                        anchorEl={anchorElProfile}
                        open={Boolean(anchorElProfile)}
                        onClose={handleProfileMenuClose}
                    >
                        <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
                        <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                    </Menu>
                </Box>





            </Toolbar>


        </AppBar>
    )
}

export default Header
