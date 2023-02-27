import { Alert, Box, Button, Collapse, FormControl, IconButton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/authSlice'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate=useNavigate()
    const auth=useSelector((state)=> state.auth);
    const dispatch=useDispatch()
    useEffect(()=>{
        if(auth._id){
            navigate('/cart')

        }
    },[auth.token])



    const [open,setopen]=useState(true)
    const [user,setUser]=useState({
        email:"",
        password:""
    })



    const handlesubmit=(e)=>{
    e.preventDefault();
dispatch(loginUser(user))
    }



  return (
    <div>
        <Box display={'flex'} justifyContent='center' mt={5}>
            
      <FormControl sx={{width:'35vw'}}>
        <h2>Login</h2>
        <TextField variant='outlined' placeholder='email' type={'email'}
         onChange={(e)=>setUser({...user,email:e.target.value})}
         sx={{mb:'5px'}}
        ></TextField>
        <TextField variant='outlined' placeholder='password' type={'password'}
         onChange={(e)=>setUser({...user,password:e.target.value})}
         sx={{mb:'5px'}}
        ></TextField>
        <Button variant='contained' onClick={handlesubmit}>Login</Button>
      </FormControl>
      </Box>
      <Box mx={'auto'} mb={5} width='50vw' mt={'2vh'}>
   
        {auth.loginStatus==='rejected' ?
    ( <Collapse in={open}>
        <Alert
        severity='error'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setopen(!open);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
       
        >
          {auth.loginError}
        </Alert>
      </Collapse>)  : null  
    }
      </Box>
    </div>
  )
}

export default Register
