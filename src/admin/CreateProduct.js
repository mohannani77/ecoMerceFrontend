import React, { useState, } from "react";
import { Box, Button, Link, MenuItem, Select, TextField, Typography } from "@mui/material";

import {useDispatch} from 'react-redux'
import { productsCreate } from "../features/productsSlice";

const CreateProduct = () => {
  const dispatch=useDispatch()
  const [productImg, setProductImg] = useState("");
  const [brand,setBrand] = useState("");
  const [name,setName] = useState("");
  const [price,setprice] = useState("");
  const [desc,setDesc] = useState("");
 

  const handleImageProduct = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    }else{
      setProductImg("")
    }
  };
  
const submitHandler=e=>{
  e.preventDefault()
  dispatch(productsCreate({
    name,brand,price,desc,image:productImg
  }))
  setProductImg('')
  setBrand('')
  setDesc('')
  setName('')
  setprice('')

}
  return (
    <div>
      <h1>create product</h1>
      <Box display={'flex'} justifyContent='space-between'>
      <Box display="flex" flexDirection={"column"} width="400px">
        <TextField
          type={"file"}
          inputProps={{ accept: "image/" }}
          onChange={handleImageProduct}
          sx={{marginBottom:'5px'}}
       
        />
        <TextField type="text" placeholder="name" sx={{marginBottom:'5px'}} label='name' onChange={(e)=> setName(e.target.value)} required/>
        <Select onChange={(e)=>setBrand(e.target.value)} required>
          <MenuItem value="iphone">iphone</MenuItem>
          <MenuItem value="samsung">samsung</MenuItem>
          <MenuItem value="nokia">Nokia</MenuItem>
          <MenuItem value="vivo">vivo</MenuItem>
          <MenuItem value="oppo">oppo</MenuItem>
          <MenuItem value="redmi">Redmi</MenuItem>
          <MenuItem value="realme">realme</MenuItem>
          <MenuItem value="iqoo">iqoo</MenuItem>
          <MenuItem value="lava">lava</MenuItem>
          <MenuItem value="other">other</MenuItem>

        </Select>
        <TextField type="text" placeholder="desc" sx={{marginBottom:'5px'}} label='desc'  onChange={(e)=> setDesc(e.target.value)} required/>
        <TextField type='number' placeholder="price" sx={{marginBottom:'5px'}} label='price'  onChange={(e)=> setprice(e.target.value)} required/>
   <Button variant="contained" onClick={submitHandler}>Submit</Button>
      </Box>
      <Box height='200px' width='200px' sx={{border:'2px solid black'}} >
        {productImg? <>
        
        <img src={productImg} alt="no image" height={'200px'} width='200px'/>
        </>:<p>image preview will apper here</p>}

   
      </Box>
      </Box>
    </div>
  );
};

export default CreateProduct;
