import { Box, Button } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Products = () => {
    const navigate=useNavigate()

  return (
    <div>
      <Box >
        <Box>
        <Outlet/>
        </Box>
      </Box>
    </div>
  )
}

export default Products
