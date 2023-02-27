
import { Avatar, Box, Button } from '@mui/material'
import React, { useEffect } from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {useDemoData} from '@mui/x-data-grid-generator'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { productDelete } from '../../features/productsSlice'
import EditProduct from '../EditProduct'
import { userDelete, userFetch } from '../../features/userSlice'

const UserList = () => {
  const dispatch=useDispatch()
const navigate=useNavigate()
let {list}=useSelector((state)=> state.users)
console.log("Items are : ",list)
const handleDelete=(id)=>{
  dispatch(userDelete(id))
}

useEffect(()=>{
  dispatch(userFetch())
},[dispatch])


const fields=[
  {field:'image',headerName:'Profile',width:70,
sortable:false,
renderCell:(params)=>{
  return(
    <Box>
        <Avatar
          type={"file"}
          src={params.row.image?.url}
          alt={params.row.name}
          sx={{ height: 30, width: 30 }}
          gutterBottom
        >{params.row.name}</Avatar>
    </Box>
  )
}
},
  {field:'uName',headerName:'name',width:150},
  {field:'uEmail',headerName:'email',width:150},
  {field:'isAdmin',headerName:'Admin',width:150,
  renderCell:(params)=>{
    return(
      <Box>
        {params.row.isAdmin ? ('Admin'): ("Customer")}
      </Box>
    )
  }
},
   {field:'Actions',headerName:'Actions',width:150,
   sortable:false,
   renderCell:(params)=>{
    return(
     <Box display={'flex'} justifyContent='space-around'>
       <Button sx={{backgroundColor:"#FF0032",width:'50px',marginRight:'5px'}} variant='contained' onClick={()=>handleDelete(params.row.id)}>Delete</Button>
       {/* <EditProduct prodId={params.row.id}/> */}
      <Button  sx={{backgroundColor:"#16FF00",width:'50px',marginLeft:'5px',marginRight:'10px'}} variant='contained'  onClick={()=> navigate(`/user/${params.row.id}`)}>View</Button>
     </Box>
    )
   }
  }

]


const rows= list && list.map(x=>{
  return{
    id:x._id,
    image:x.image,
    uName:x.name,
    uEmail:x.email,
    isAdmin:x.isAdmin
  }
})
const createClick=(e)=>{
  navigate('/admin/products/create-product')
}
  return (
    <div>
      <Box display={'flex'} justifyContent='space-between'>
        <h1>Users List</h1>
        {/* <Box display={'flex'} justifyContent='end' alignItems={'center'} sx={{position:'relative'}}>  <Button onClick={createClick} variant='contained'  >Create</Button></Box> */}
      </Box>
    <Box sx={{height:'400px'}}>
<DataGrid rows={rows} columns={fields}  
rowsPerPageOptions={[5]}
disableSelectionOnClick
/>

    </Box>
        </div>
  )
}

export default UserList
