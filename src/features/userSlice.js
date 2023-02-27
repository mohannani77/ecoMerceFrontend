import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { api, setHeaders } from "./api";
const initialState = {
  list:[],
  status:null,
  deleteStatus:null
};


export const userFetch = createAsyncThunk(
  "users/userFetch",
  async () => {
   try {
    const response = await axios.get(`${api}/users`,setHeaders());
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


export const userDelete = createAsyncThunk(
  "user/userdelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${api}/users/${id}`,
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


// export const orderEdit = createAsyncThunk(
//   "orders/ordersEdit",
//   async (values,{getState}) => {
//     const state=getState();
//     let currentOrder=state.orders.list.filter(
//         (order)=> order._id === values.id
//     )
//     const newOrder={
//         ...currentOrder[0],
//         delivary_status:values.delivary_status
//     }
//     try {
      
//       const response = await axios.put(
//         `http://localhost:5000/api/orders/${values.id}`,
//         newOrder,
//         setHeaders()
//       )
//       console.log(response.data)
//    return response.data
//     } catch (error) {
//    console.log(error)
//    toast.error(error.response?.data)
//     }
//   }
// );



const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers: {
    [userFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [userFetch.fulfilled]: (state, action) => {
        state.list= action.payload;
        state.status = "Sucess";
        console.log(state.list)
    },
    [userFetch.rejected]: (state, action) => {
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
    [userDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [userDelete.fulfilled]: (state, action) => {
      console.log(state.list)
      const newL=state.list.filter((item)=> item._id !== action.payload)
      state.lists=newL
      console.log(state.list)
      state.deleteStatus = "Sucess";
      toast.success("Product Deleted")
    },
    [userDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
      toast.error("Access denied not Authorized..")
    },
    // [orderEdit.pending]: (state, action) => {
    //   state.editStatus = "pending";
    // },
    // [orderEdit.fulfilled]: (state, action) => {
    //   console.log("api : ",action.payload)
    //   const newL=state.list.map((item)=> item._id === action.payload._id ? action.payload : item)
    //   state.list=newL
    //   console.log(state.items)
    //   state.editStatus = "Sucess";
    //   toast.info("Product Edited Sucessfully")
    // },
    // [orderEdit.rejected]: (state, action) => {
    //   state.editStatus = "rejected";
    //   toast.error("Access denied not Authorized..")
    // },
  },
});

export default userSlice.reducer;
