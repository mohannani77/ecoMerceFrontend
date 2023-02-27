import { Box, Link, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import Summary from './Summary'
import {useSelector} from'react-redux'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import GroupIcon from '@mui/icons-material/Group';
import SpeedIcon from '@mui/icons-material/Speed';
import '../App.css'
const Dashboard = () => {
  const [active,isActive]=useState()
  const auth=useSelector((state)=>state.auth)
  if(!auth.isAdmin) return <p>Access Denied.</p>

  const clickhandler=()=>{
    StyleSheet("activeLink")
  }
  return (
    <Box display={'flex'}>
      <Box sx={{height:'100vh',width:'200px',backgroundColor:'',position:'fixed',overflow:'auto'}}>
        <Box>
            <Typography variant='h6' mt={4} mx={4}>Quick Links</Typography>
        </Box>
        <Box display={'flex'} flexDirection='column'>
            <Link href='/admin/summary' sx={{textDecoration:'none',mx:'2rem',padding:'0.5rem'}} onClick={clickhandler}> <SpeedIcon/> Summary</Link>
            <Link href='/admin/products' sx={{textDecoration:'none',mx:'2rem',padding:'0.5rem'}}><LocalGroceryStoreIcon/> Products</Link>
            <Link href='/admin/orders' sx={{textDecoration:'none',mx:'2rem',padding:'0.5rem',}} > <MenuBookIcon/> Orders</Link>
            <Link href='/admin/users' sx={{textDecoration:'none',mx:'2rem',padding:'0.5rem'}}> <GroupIcon/> Users</Link>
        </Box>
      </Box>
      <Box sx={{width:'100vw',backgroundColor:'',borderLeft:'1px solid black',marginLeft:'200px',width:'100%',padding:'2rem 3rem'}}>     
    <Outlet/>
      </Box>
    </Box>
  )
}

export default Dashboard
