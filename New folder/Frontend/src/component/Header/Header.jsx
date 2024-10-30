import React,{useEffect, useState} from 'react'
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import logo from '../../assets/image/logo.png'
import { AccountCircle, Search, ShoppingCart } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
const Header = () => {
    const [anchorElProfile,setAnchorElProfile]=useState(null)
    const navigate = useNavigate();
    const location=useLocation();

    const sentence=[
        'Free Shipping on orders  over 50Pkr!',
        'Exclusive offers available now!',
        'Get 20% off your first Purchase!'
    ]
    const [currentSentence,setCurrentSentence]=useState(sentence[0])
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCurrentSentence((prevSentence)=>{
                const currentIndex=sentence.indexOf(prevSentence);
                const nextIndex=(currentIndex+1)%sentence.length;
                return sentence[nextIndex]

            })
        },2000)
    return ()=>clearInterval(interval)
    },[sentence])
    const isHomePage=location.pathname==='/'

    const handleProfileMenuOpen=(e)=>{
        setAnchorElProfile(e.currentTarget);

    }
    const handleProfileMenuClose=()=>{
        setAnchorElProfile(null)

    }
    
    return (
        <AppBar position='fixed' width='100%'>
            <Toolbar sx={{bgcolor:'#17a589'}}>
               <Box
                    component='img'
                    sx={{
                        height: 70,
                        display: { xs: 'inline', sm: "block" },
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        cursor:'pointer'

                    }}
                    onClick={()=>navigate('/')}
                    alt='Logo'
                    src={logo}
                    
                />
                <Box sx={{flexGrow:1,display:{xs:'inline',sm:'block',md:'flex'},justifyContent:'center'}}>
                   <Button color='inhirit' onClick={()=>navigate('/')}>Home</Button>
                   <Button color='inhirit' onClick={()=>('/service')}>Service</Button>
                   <Button color='inhirit' onClick={()=>('/contact')}>Contact</Button>
                   <Button color='inhirit' onClick={()=>('/about')}>About</Button>
                   

                </Box>
                <Box sx={{display:'flex',alignItem:'center', display:{xs:'inline',sm:'block', md:'flex'} }}>
                    <IconButton sx={{color:'white'}} size='large' aria-label='search'                   title='Search' onClick={()=>navigate('/search')}
                    >
                        <Search/>
                    </IconButton>

                    <IconButton sx={{color:'white'}} size='large' aria-label='show cart item' title='Shopping Cart Icon' onClick={()=>navigate('/cartPage')} >
                        <ShoppingCart/>
                    </IconButton>

                    <IconButton sx={{color:'white'}} size='large' aria-label='Account of current user' title='Account Icon' edge='end' aria-controls='primary-search-account menu' aria-haspopup='true' onClick={handleProfileMenuOpen}>
                    <AccountCircle/>

                    </IconButton>
                    <Menu
                    anchorEl={anchorElProfile}
                    open={Boolean(anchorElProfile)}                    
                    onClose={handleProfileMenuClose}
                    >
                        <MenuItem onClick={()=>navigate('/login')}>Login</MenuItem>
                        <MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem>
                    </Menu>
                </Box>





            </Toolbar>
            {
                isHomePage&&(
                    <Box sx={{backgroundColor:"#7dcea0",p:1}}>
                        <Typography variant='body1' textAlign="center">
                            {currentSentence}
                        </Typography>
                    </Box>
                )
            }

        </AppBar>
    )
}

export default Header
