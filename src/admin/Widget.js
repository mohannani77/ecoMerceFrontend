import { Box, Icon } from '@mui/material'
import React from 'react'

const Widget = ({data}) => {
  // console.log("data",data)
  return (
    <Box display={'flex'} height='3rem' >
      <Box bgcolor={data.bgColor} width='3rem' height={'3rem'} justifyContent='center' alignItems={'center'} textAlign='center'>
        <Box display={'flex'} justifyContent='center' alignItems={'cnter'} mt color={data.color}>
        {data.icon}
        </Box>
      </Box>
      <Box display={'flex'} flexDirection='column' ml={2} justifyContent='center' flex={2}>
        <Box >
            <h5>{data.ismoney? "$" + data.digits : data.digits}</h5>
        </Box>
        <Box>
            {data.tittle}
        </Box>
      </Box>
      <Box display={'flex'} alignItems='center' justifyContent={'center'} ml={2}>
        {data.percentage < 0 ? <>
        <Box color={'#CD0404'}>
        {Math.floor(data.percentage)+"%"}</Box></> : <>
        <Box color={'#16FF00'}>{Math.floor(data.percentage)+"%"}</Box>
        </>}
      </Box>
   
    </Box>
  )
}

export default Widget
