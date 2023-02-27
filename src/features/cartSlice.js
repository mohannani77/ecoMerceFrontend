import { Alert, Snackbar } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} quantity increased`, {
          position: "bottom-left",
        });
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);
        toast.success(` ${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter((x)=>x._id !== action.payload._id)
      state.cartItems =nextCartItems
      // console.log("next cAet :",state.cartItems)
      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      toast.error(` ${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      console.log(itemIndex)
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        console.log("state,c,i,q ",state.cartItems[itemIndex].cartQuantity)
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${action.payload.name} cart qunatity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter((x)=> x._id !== action.payload._id)
        state.cartItems =nextCartItems

        toast.error(` ${action.payload.name} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem('cart',JSON.stringify(state.cartItems))
    },
    clearCart(state,action){
        state.cartItems=[]
        toast.error("all items are removed from cart",{
            position:'bottom-left'
        })
        localStorage.setItem("cart",JSON.stringify(state.cartItems))
    },
    getToatl(state,action){
        let {total,quantiy}=state.cartItems.reduce(
            (cartTotal,cartItem)=>{
                const {price,cartQuantity}=cartItem;
                const itemToatl=price*cartQuantity;
                cartTotal.total+=itemToatl
                cartTotal.quantiy+=cartQuantity
                return cartTotal;
            },{
                total:0,
                quantiy:0
            }
        );
        state.cartQuantity=quantiy;
        state.cartTotalAmount=total
    }
  },
});

export const { addToCart, removeFromCart,decreaseCart,clearCart,getToatl } = cartSlice.actions;
export default cartSlice.reducer;
