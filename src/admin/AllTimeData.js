import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import axios from 'axios'
import { useEffect, useState } from 'react'
import {api,setHeaders} from '../features/api'
const AllTimeData = () => {
  const { items } = useSelector((state) => state.products);
  const [users,setusers]=useState([])


const [orders,setOrders]=useState([])


const [income,setIncome]=useState([])

function compare(a,b){
  if(a._id < b._id){
    return 1
  }
  else if(a._id > b._id){
    return -1
  }
  return
}

useEffect(()=>{
  async function fetchData(){
  try {
    const res= await axios.get(`${api}/users/stats`,setHeaders())
    res.data.sort(compare)
    setusers(res.data[0].total + res.data[1].total)
 
  } catch (error) {
    console.log(error)
  }
}
fetchData()
},[])


useEffect(()=>{
  async function fetchData(){
  try {
    const res= await axios.get(`${api}/orders/stats`,setHeaders())
    res.data.sort(compare)
    setOrders(res.data[0].total + res.data[1].total)
    console.log("all time dT",orders)
 
  } catch (error) {
    console.log(error)
  }
}
fetchData()
},[])


useEffect(()=>{
    async function fetchData(){
    try {
      const res= await axios.get(`${api}/orders/income/stats`,setHeaders())
      res.data.sort(compare)
      setIncome(res.data[0].total + res.data[1].total)
    } catch (error) {
      console.log(error)
    }
  }
  fetchData()
  },[])
  

  return (
    <div>
      <Box bgcolor={"#00425A"} borderRadius={1} color='white'>
        <Box ml={2}>  <h3>All Time</h3></Box>
        <Box
          display="flex"
          justifyContent={"space-around"}
          bgcolor="#495C83"
          mb={2}
          ml={2}
          mr={2}
          alignItems="center"
          textAlign={"center"}
          borderRadius={1}
          height="50px"
        >
          <Typography variant="p">Users</Typography>
          <Typography variant="p">{users}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent={"space-around"}
          bgcolor="#495C83"
          mb={2}
          ml={2}
          mr={2}
          alignItems="center"
          textAlign={"center"}
          borderRadius={1}
          height="50px"
        >
          <Typography variant="p">Products</Typography>
          <Typography variant="p">{items.length}</Typography>
        </Box>{" "}
        <Box
          display="flex"
          justifyContent={"space-around"}
          bgcolor="#495C83"
          mb={2}
          ml={2}
          mr={2}
          alignItems="center"
          textAlign={"center"}
          borderRadius={1}
          height="50px"
        >
          <Typography variant="p">Orders</Typography>
          <Typography variant="p">{orders}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent={"space-around"}
          bgcolor="#495C83"
          mb={2}
          ml={2}
          mr={2}
          alignItems="center"
          textAlign={"center"}
          borderRadius={1}
          height="50px"
        >
          <Typography variant="p">Earnings</Typography>
          <Typography variant="p">{income}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default AllTimeData;
