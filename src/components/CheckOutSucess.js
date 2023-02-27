import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/material';
const CheckOutSucess = () => {
  return (
    <div>
      <Box display={'flex'} justifyContent='center' flexDirection={'column'} width='100vw' height={'100vh'} alignItems='center' color='#38E54D'>
      <CheckCircleIcon sx={{fontSize:'100px',color:'#38E54D'}}/>
      <h2>Checkout Sucess</h2>
     
      </Box>
    </div>
  )
}

export default CheckOutSucess
