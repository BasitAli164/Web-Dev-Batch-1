import React from 'react'
import {Box, Card, CardContent, CardMedia, Grid, Typography} from '@mui/material'

const Cart = ({title,image,price}) => {
  return (
  <Grid container spacing={1}>
     <Card sx={{margin:1, }}>
    <CardMedia
    component='img'
    height={200}
    width={400}
    alt={title}
    image={image}
    />
    <CardContent sx={{textAlign:'center'}}>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body1'>{price}</Typography>

    </CardContent>
   </Card>
  </Grid>
  )
}

export default Cart
