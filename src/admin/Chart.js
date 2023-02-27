import { Box, ListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'
import {api,setHeaders} from '../features/api'

const Chart = () => {
    const [sales,setSales]=useState([])
    const [loading,setLoading]=useState(false)

    function compare(a,b){
        if(a._id < b._id){
          return 1
        }
        if(a._id > b._id){
          return -1
        }
        return 0
      }

      


    useEffect(()=>{
            async function fetchData(){
                setLoading(true)
                try {
                    const res= await axios.get(`${api}/orders/week-sales`,setHeaders())
                    res.data.sort(compare)
                    console.log("orders ::",res.data)
                    const newData=res.data.map((x)=>{
                        const DAYS=[
                            "SUN","MON","TUE","WED","THU","FRI","SAT",
                        ]
                        return {
                            day:DAYS[x._id-1],
                            amount:x.total/100
                        }
                    })
                    // console.log("newdata : : ",newData)
                    setSales(newData)
                    setLoading(false)
                  } catch (error) {
                    console.log(error)
                    setLoading(false)
                  }
                }
        fetchData()
    },[])


  return (
    <div>
        
    {loading? (<h1>Loading chart</h1>):(
         <Box border={'2px solid black'} height={'300px'} mt={5}>
         <h3>Last 7 days Earnings (us $)</h3>
      <ResponsiveContainer width="100%" height="100%">
         <LineChart
           width={500}
           height={300}
           data={sales}
           margin={{
             top: 5,
             right: 30,
             left: 20,
             bottom: 5,
           }}
         >
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="day" />
           <YAxis />
           <Tooltip />
           <Legend />
           <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
          
         </LineChart>
       </ResponsiveContainer>
      </Box>
    )}
    </div>
  )
}

export default Chart
