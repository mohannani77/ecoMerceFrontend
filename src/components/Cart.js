import { Box, Button, ButtonGroup, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, decreaseCart, getToatl, removeFromCart } from '../features/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import PayButton from './PayButton';
const Cart = () => {
  const auth=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const cart=useSelector((state)=>state.cart);
const {cartTotalAmount}=useSelector((state)=>state.cart)
 useEffect(() => {
   dispatch(getToatl())
 }, [cart])
 
  const items=JSON.parse(localStorage.getItem("cart"))
  // console.log("items are : ",items)
  // console.log("cart is :",cart)


  const handlecart=(cartitem)=>{
dispatch(removeFromCart(cartitem))

  }
const decreseCartHandler=(cartItem)=>{
  dispatch(decreaseCart(cartItem))


}
   
const increaseCartHandler=(cartitem)=>{
  dispatch(addToCart(cartitem))

}
  return (
    <div>
      <Typography variant='h4' textAlign={'center'} mt={10}>Shopping Cart</Typography>
      <Box mx={10}>
      <TableContainer component={Paper} >
        <Table stickyHeader>
          <TableHead >
            <TableRow >
              <TableCell>PRODUCT</TableCell>
              <TableCell >PRICE</TableCell>
              <TableCell >QUANTITY</TableCell>
              <TableCell>TOTAL</TableCell>
         
            </TableRow>
          </TableHead>

          <TableBody >
            {items.map((x) => (
              <TableRow key={x._id} sx={{height:'200px'}}>
                <TableCell>
                <Box>
                  <Stack spacing={2} direction='row'>
                  <Link to={`/product/${x._id}`}>
                  <img src={x.image.url} alt={x.name} className='object-fit-cover' height={'150px'} width='150px'/>
                  </Link>
                    <Box>
                      <Typography variant='h6'>{x.name}</Typography>
                      {/* <Typography>{x.desc}</Typography> */}
                      <Button variant='text' color='secondary' size='small' sx={{mt:'5px'}} onClick={()=>handlecart(x)}>Remove</Button>
                    </Box>
                  </Stack>
                </Box>

                </TableCell>
                <TableCell><Typography variant='h4'><AttachMoneyIcon fontSize='large'/>{x.price}</Typography></TableCell>
                <TableCell>
                <ButtonGroup>
                  <Button onClick={()=>decreseCartHandler(x)}>-</Button>
                  <Button>{x.cartQuantity}</Button>
                  <Button onClick={()=> increaseCartHandler(x)}>+</Button>
                </ButtonGroup>

                </TableCell>
                <TableCell>
                  <Typography variant='h4'><AttachMoneyIcon fontSize='large'/>{x.price*x.cartQuantity}</Typography>
                </TableCell>
            
              </TableRow>
             
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     <Box mt={5}>
     <Stack justifyContent={'space-between'} direction='row'>
        <Button variant='outlined' sx={{height:'7vh'}} onClick={()=> dispatch(clearCart())}>Clear cart</Button>
        <Box>
          <Box display={'flex'} justifyContent="space-between" width={'20vw'}>
            <Typography variant='h5'>Subtotal</Typography>
            <Typography variant='h5'>${cartTotalAmount}</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant='body2' >Taxes and shipping charges  at checkout</Typography>
          </Box>
                <Box>
               {
                auth._id? (
                 <PayButton cartItems={cart.cartItems}/>
                ):(
                  <Button variant='contained' sx={{width:'20vw',marginBottom:'20px'}} onClick={()=> navigate('/login')}>Login to CheckOut</Button>
                )
               }
                </Box>
                <Box display={'flex'} justifyContent='center' alignItems={'center'}>
               
                    <Button><IconButton><ArrowBackIcon sx={{color:'blue'}}/></IconButton>Continue shopping</Button>
      
                </Box>
        </Box>
      </Stack>
     </Box>
      </Box>
    </div>
  )
}

export default Cart
