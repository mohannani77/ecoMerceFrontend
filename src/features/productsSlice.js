import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { api, setHeaders } from "./api";
const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus:null,
  editStatus:null
};
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const response = await axios.get(`${api}/products`);
    return response?.data;
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values,{ rejectWithValue }) => {
  
    try {
      const response = await axios.post(
        `${api}/products`,
        values,
        setHeaders()
      )
  //  toast.success("Producted created successfully")
    } catch (error) {
     
      console.log(error.message);
      toast.error(error.response?.data)

    }
  }
);


export const productDelete = createAsyncThunk(
  "products/productdelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${api}/products/${id}`,
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


export const productEdit = createAsyncThunk(
  "products/productEdit",
  async (values) => {
    try {
      // console.log(values.product._id)
      // console.log(values)
      const response = await axios.put(
        `${api}/products/${values.product._id}`,
        values,
        setHeaders()
      )
      // console.log(response.data)
   return response.data
    } catch (error) {
   console.log(error)
   toast.error(error.response?.data)
    }
  }
);



const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {

  },
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.status = "Sucess";
      state.items = action.payload;
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "Sucess";
      toast.success("Product Created")
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
      toast.error("Access denied not Authorized..")
    },
    [productDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productDelete.fulfilled]: (state, action) => {
      // console.log(state.items)
      const newL=state.items.filter((item)=> item._id !== action.payload)
      state.items=newL
      // console.log(state.items)
      state.deleteStatus = "Sucess";
      toast.success("Product Deleted")
    },
    [productDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
      toast.error("Access denied not Authorized..")
    },
    [productEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [productEdit.fulfilled]: (state, action) => {
      // console.log("action pay",action.payload)
      // console.log("api : ",action.payload)
      const newL=state.items.map((item)=> item._id === action.payload._id ? action.payload : item)
      state.items=newL
      // console.log(state.items)
      state.editStatus = "Sucess";
      toast.info("Product Edited Sucessfully")
    },
    [productEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
      toast.error("Access denied not Authorized..")
    },
  },
});

export default productsSlice.reducer;
