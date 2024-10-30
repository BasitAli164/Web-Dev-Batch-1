import React, { useEffect, useState } from 'react'
import { Box, Typography, Link,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import image1 from '../../../assets/image/backgroundImage/backgroundImage1.avif'
import image2 from '../../../assets/image/backgroundImage/backgroundImage2.avif'
import image3 from '../../../assets/image/backgroundImage/bg3.avif'
import image4 from '../../../assets/image/backgroundImage/bg4.avif'

const HeroSection = () => {
    const navigate = useNavigate()
    const [currentImage,setCurrentImage]=useState(0)
    const bgImage=[image1,image2,image3,image4]
    useEffect(()=>{
        const interval=setInterval(() => {
            setCurrentImage((prevImage)=>(prevImage+1)%bgImage.length)  

        }, 2000);
        return ()=>clearInterval(interval)
    },[bgImage.length])
    return (
        <Box sx={{ 
            p: 17,
            textAlign:'center',
            color:'#fff',
            minHeight:'400px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            backgroundImage:`url(${bgImage[currentImage]})`,
            backgroundPosition:'center',
            backgroundSize:'cover',
            backgroundColor:'rgba(0,0,0,0.5)',
            backgroundBlendMode:'darken',
            transition:'background-image 1s ease-in-out'
             }}>
            <Typography variant='h3' sx={{ mb: 2, fontWeight: 'bold' }}>Welcome to our Shop</Typography>
            <Typography variant='h5' sx={{ mb: 4 }}>Discover our Latest Collection</Typography>
            <Typography variant='body1' sx={{ mb: 4, maxWidth: '600px' }}>Explore our wide range of high-quality products.We offer the best selection goods for
                <Link onClick={() => navigate('/service')} sx={{ cursor: 'pointer', textDecoration: 'none', fontSize: '20px', fontWeight: "550" }}>Men</Link>
                and
                <Link onClick={() => navigate('/service')} sx={{ cursor: 'pointer', textDecoration: 'none', fontSize: "20px", fontWeight: "550" }}>Women</Link>.
                Wheather you are looking for the latest trends or timeless classic, we have something for everyone.Our commitment to quality ensures that you get the best value for your money.</Typography>

                <Button 
                variant='outlined' 
                 sx={{
                    fontSize:17,
                    fontWeight:600,
                    background:'#17a589',
                    color:'white',
                    padding:2,
                    width:200,
                    borderRadius:50,
                    mt:8
                    }}
                onClick={()=>navigate('/service')}
                
                    
                    >Shop Now</Button>

        </Box>
    )
}

export default HeroSection
