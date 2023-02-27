import { createSlice } from "@reduxjs/toolkit";


const initialState={
    search:''
}
 const searchSlice=createSlice({
name:'search',
initialState,
reducers:{
    serachItem(state,action) {
        state.search = action.payload
    },
}
})
export  const {serachItem} = searchSlice.actions
export default searchSlice.reducer