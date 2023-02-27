import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { api, setHeaders } from '../features/api'
import { Box, Typography } from '@mui/material'
const Transactions = () => {
    const [orders,setOrders]=useState([])
    const [loading,setloading]=useState(false);

    useEffect(()=>{
        async function fetchData(){
            setloading(true)
            try {
                const res=await axios.get(`${api}/orders/?new=true`,setHeaders())
                setOrders(res.data)
            // console.log(" : ",res.data)
            } catch (error) {
                console.log(error)
            }
            setloading(false)
        }
        fetchData()
    },[])
  return (
    <Box bgcolor='#00425A' color='white' borderRadius={2} maxHeight={'400px'}>
      {loading?(<p>Transactions Loading....</p>):(
        <Box>
           <Box ml={2} pt={2}> <h3>Latest transations</h3></Box>

<Box mb={2}>
{
    orders?.map((x,index)=>( <Box key={index} display='flex' justifyContent={'space-around'} bgcolor="#495C83" mb={2} ml={2} mr={2} alignItems='center' textAlign={'center'} borderRadius={1} height='50px'>
        <Typography variant='p'>{x.shipping.name}</Typography>
        <Typography variant='p'>${(x.Total /100).toLocaleString()}</Typography>
        <Typography variant='p' >{moment(x.createdAt).fromNow()}</Typography>
    </Box>))
}
</Box>
        </Box>
      )}
    </Box>
  )
}

export default Transactions
