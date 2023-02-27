import React from 'react'
import axios from 'axios'
import { Box, Button, ButtonGroup, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { api } from '../features/api'
const PayButton = ({cartItems}) => {
    const user=useSelector((state)=> state.auth)
    const handleClick=()=>{
        axios.post(`${api}/stripe/create-checkout-session`,{cartItems,userId:user._id}).then((res)=>{
            if(res.data.url){
                window.location.href=res.data.url
            }
        }).catch((err)=> 
        {console.log(err.message)        
        })
    };
  return (
    <div>
    <Button variant='contained' sx={{width:'20vw',marginBottom:'20px'}} onClick={handleClick} >CheckOut</Button>
    </div>
  )
}

export default PayButton;
