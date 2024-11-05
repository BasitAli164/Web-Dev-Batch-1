import React from 'react'
import  Button  from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const ButtonCom = ({title,sx}) => {
    const navigate=useNavigate();
    
  return (
   <>
    <Button 
    variant='outlined' 
     sx={sx}
    onClick={()=>navigate('/service')}
    
        
        >{title}</Button>
   </>
  )
}

export default ButtonCom
