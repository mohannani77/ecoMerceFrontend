import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productDelete } from "../../features/productsSlice";
import EditProduct from "../EditProduct";
import { orderEdit, OrderFetch } from "../../features/ordersSlice";
import moment from "moment";
const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { list } = useSelector((state) => state.orders);
  console.log("list are : ", list);

  const handleDelete=(id)=>{
    dispatch()
  
  }
  const handleOrderDispatch=(id)=>{
    dispatch(orderEdit({id,
        delivary_status:'dispatched'
    }))
  }

  const handleOrderDelivered=(id)=>{
    dispatch(orderEdit({id,
        delivary_status:'delivered'
    }))
  }

  useEffect(() => {
    dispatch(OrderFetch());
  }, [dispatch]);

  const fields=[
    {field:'id',headerName:'ID',width:220},
    {field:'cName',headerName:'Name',width:120,},
    {field:'amount',headerName:'Amount',width:150},
    {field:'dStatus',headerName:'Status',width:150,
    renderCell:(params)=>{
        return (
            <Box>
                {
                    
                    params.row.dStatus === "pending"?("pending"):
                    params.row.dStatus === "dispatched" ? ("Dispatched"):
                    params.row.dStatus === "delivered" ? ("Delivered") : "error"
                }
                
            </Box>
        )
    }
},
    {field:'date',headerName:'Date',width:150},
     {field:'Actions',headerName:'Actions',width:350,
     sortable:false,
     renderCell:(params)=>{
      return(
       <Box display={'flex'} justifyContent='space-around'>
         <Button  sx={{backgroundColor:"#FF0032",width:'100%',marginRight:'5px',overflowX:'hidden'}} variant='contained' onClick={()=>handleOrderDispatch(params.row.id)}>Dispatched</Button>
         <Button  sx={{backgroundColor:"#FF0032",width:'100%',marginRight:'5px'}} variant='contained' onClick={()=>handleOrderDelivered(params.row.id)}>Delivered</Button>
        <Button  sx={{backgroundColor:"#16FF00",width:'100%',marginLeft:'5px',marginRight:'10px'}} variant='contained'  onClick={()=> navigate(`/order/${params.row.id}`)}>View</Button>
       </Box>
      )
     }
    }

  ]

  const rows= list && list.map(x=>{
    return{
      id:x._id,
      cName:x.shipping.name,
      amount:(x.subtotal/100)?.toLocaleString(),
      dStatus:x.delivary_status,
      date:moment(x.createdAt).fromNow()
    }
  })
  const createClick=(e)=>{
    navigate('/admin/products/create-product')
  }



  
  return (
    <div>
      <Box display={"flex"} justifyContent="space-between">
        <h1>Orders List</h1>
        <Box
          display={"flex"}
          justifyContent="end"
          alignItems={"center"}
          sx={{ position: "relative" }}
        >
          {" "}
          <Button onClick={createClick} variant="contained">
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: "400px" }}>
        <DataGrid
          rows={rows}
          columns={fields}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default OrdersList;
