
import { Box, Button } from '@mui/material'
import React, { useEffect } from 'react'
import {DataGrid} from '@mui/x-data-grid'
import {useDemoData} from '@mui/x-data-grid-generator'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { productDelete, productsFetch } from '../../features/productsSlice'
import EditProduct from '../EditProduct'
const ProductsList = () => {
  const dispatch=useDispatch()
const navigate=useNavigate()
let {items}=useSelector((state)=> state.products)

const handleDelete=(id)=>{
  dispatch(productDelete(id))

}
useEffect(()=>{
  dispatch(productsFetch())
},[dispatch])
const fields=[
  {field:'id',headerName:'ID',width:220},
  {field:'imageUrl',headerName:'Image',width:80,
    renderCell:(params)=>{
     return( <Box>
        <img src={params.row.imageUrl} alt ="" height={'40px'}/>
      </Box>)
    }},
  {field:'pName',headerName:'Product name',width:150},
  {field:'pDesc',headerName:'Product Description',width:150},
  {field:'price',headerName:'Product price',width:150},
   {field:'Actions',headerName:'Actions',width:250,
   sortable:false,
   renderCell:(params)=>{
    return(
     <Box display={'flex'} justifyContent='space-around'>
       <Button sx={{backgroundColor:"#FF0032",width:'50px',marginRight:'5px'}} variant='contained' onClick={()=>handleDelete(params.row.id)}>Delete</Button>
       <EditProduct prodId={params.row.id}/>
      <Button  sx={{backgroundColor:"#16FF00",width:'50px',marginLeft:'5px',marginRight:'10px'}} variant='contained'  onClick={()=> navigate(`/product/${params.row.id}`)}>View</Button>
     </Box>
    )
   }
  }

]


const rows= items && items.map(x=>{
  return{
    id:x._id,
    imageUrl:x.image.url,
    pName:x.name,
    pDesc:x.desc,
    price:x.price.toLocaleString(),
    pBrand:x.brand
  }
})
const createClick=(e)=>{
  navigate('/admin/products/create-product')
}
  return (
    <div>
      <Box display={'flex'} justifyContent='space-between'>
        <h1>Products List</h1>
        <Box display={'flex'} justifyContent='end' alignItems={'center'} sx={{position:'relative'}}>  <Button onClick={createClick} variant='contained'  >Create</Button></Box>
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

export default ProductsList
