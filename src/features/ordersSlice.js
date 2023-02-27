import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { api, setHeaders } from "./api";
const initialState = {
  list:[],
  status:null
};
export const OrderFetch = createAsyncThunk(
  "orderss/ordersFetch",
  async () => {
   try {
    const response = await axios.get(`${api}/orders`,setHeaders());
    return response?.data;
   } catch (error) {
    console.log(error)
   }
  }
);

// export const ordersCreate = createAsyncThunk(
//   "products/productsCreate",
//   async (values,{ rejectWithValue }) => {
  
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/products",
//         values,
//         setHeaders()
//       )
   
//     } catch (error) {
     
//       // console.log(error.message);
//     // return rejectWithValue(error.response.data)
//     }
//   }
// );


// export const ordersDelete = createAsyncThunk(
//   "products/productdelete",
//   async (id) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/products/${id}`,
//         setHeaders()
//       )
//       console.log(response.data)
//   //  return response.data
//     } catch (error) {
     
//    console.log(error)
//    toast.error(error.response?.data)
//     }
//   }
// );


export const orderEdit = createAsyncThunk(
  "orders/ordersEdit",
  async (values,{getState}) => {
    const state=getState();
    let currentOrder=state.orders.list.filter(
        (order)=> order._id === values.id
    )
    const newOrder={
        ...currentOrder[0],
        delivary_status:values.delivary_status
    }
    try {
      
      const response = await axios.put(
        `${api}/orders/${values.id}`,
        newOrder,
        setHeaders()
      )
      console.log(response.data)
   return response.data
    } catch (error) {
   console.log(error)
   toast.error(error.response?.data)
    }
  }
);



const ordersSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [OrderFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [OrderFetch.fulfilled]: (state, action) => {
        state.list= action.payload;
        state.status = "Sucess";
        console.log(state.list)
    },
    [OrderFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    // [ordersCreate.pending]: (state, action) => {
    //   state.createStatus = "pending";
    // },
    // [ordersCreate.fulfilled]: (state, action) => {
    //   state.items.push(action.payload);
    //   state.createStatus = "Sucess";
    //   toast.success("Product Created")
    // },
    // [ordersCreate.rejected]: (state, action) => {
    //   state.createStatus = "rejected";
    //   toast.error("Access denied not Authorized..")
    // },
    // [ordersDelete.pending]: (state, action) => {
    //   state.deleteStatus = "pending";
    // },
    // [ordersDelete.fulfilled]: (state, action) => {
    //   console.log(state.items)
    //   const newL=state.items.filter((item)=> item._id !== action.payload)
    //   state.items=newL
    //   console.log(state.items)
    //   state.deleteStatus = "Sucess";
    //   toast.success("Product Deleted")
    // },
    // [ordersDelete.rejected]: (state, action) => {
    //   state.deleteStatus = "rejected";
    //   toast.error("Access denied not Authorized..")
    // },
    [orderEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [orderEdit.fulfilled]: (state, action) => {
      console.log("api : ",action.payload)
      const newL=state.list.map((item)=> item._id === action.payload._id ? action.payload : item)
      state.list=newL
      console.log(state.items)
      state.editStatus = "Sucess";
      toast.info("Product Edited Sucessfully")
    },
    [orderEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
      toast.error("Access denied not Authorized..")
    },
  },
});

export default ordersSlice.reducer;
