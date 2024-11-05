import React from 'react'
import Cart from '../Cart/Cart'
import image from '../../assets/image/card/card1/1.avif'

const Service = () => {
  return (
    <div style={{display:'flex', paddingTop:100}}>
      <Cart title="Product 1" price={500} image={image}/>
      <Cart title="Product 1" price={500} image={image}/>
      <Cart title="Product 1" price={500} image={image}/>
      <Cart title="Product 1" price={500} image={image}/>
      <Cart title="Product 1" price={500} image={image}/>
      <Cart title="Product 1" price={500} image={image}/>
     
    </div>
  )
}

export default Service
