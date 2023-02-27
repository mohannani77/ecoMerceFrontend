import { Box, Typography } from '@mui/material'
import { flexbox } from '@mui/system'
import React from 'react'

const NotFound = () => {
  return (
    <Box mx="auto" display="flex" justifyContent={"center"} alignItems={"center"} flexDirection="column" height="70vh">
      <Typography variant='h3'>404</Typography>
      <Typography variant='body'>Page not Found</Typography>
    </Box>
  )
}

export default NotFound
