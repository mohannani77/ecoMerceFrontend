import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import jwtdecode from "jwt-decode";
import { api } from "./api";
const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  isAdmin:"",
  image:'',
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoad: false,
};

export const registerUser = createAsyncThunk(
  "auth/rehisterUser",
  async (values, { rejectWithValue }) => {
    try {
      console.log(values);
      const token = await axios.post(`${api}/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
        image:values.productImg
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/LoginUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${api}/login`, {
        // name: values.name,
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);




const authSLice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtdecode(token);
        return {
          ...state,
          token,
          name: user.user.name,
          email: user.user.email,
          _id: user.user.id,
          isAdmin:user.user.isAdmin,
          userLoad: true,
        };
      }
    },

    logoutuser(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        isAdmin:"",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoad: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("token is", action.payload);
        const user = jwtdecode(action.payload);
        console.log("user is : ", user);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user.user.id,
          isAdmin:user.user.isAdmin,
          registerStatus: "sucess",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

//------------------login------------------
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("token is", action.payload);
        const user = jwtdecode(action.payload);
        console.log("user is : ", user);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user.user.id,
          isAdmin:user.user.isAdmin,
          loginStatus: "sucess",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutuser } = authSLice.actions;
export default authSLice.reducer;
