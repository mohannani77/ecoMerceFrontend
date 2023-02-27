import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem, Select } from '@mui/material';
// import { useDispatch } from 'react-redux';
import {useDispatch, useSelector} from 'react-redux'
import { productEdit } from '../features/productsSlice';
export default function EditProduct({prodId}) {
  const [open, setOpen] = React.useState(false);
  let {items,editStatus}=useSelector((state)=> state.products)
  const dispatch=useDispatch()
  const [productImg, setProductImg] =useState("");
  const [brand,setBrand] = useState("");
  const [name,setName] = useState("");
  const [price,setprice] = useState("");
  const [desc,setDesc] = useState("");
 const [currentPro,setcurrentpro]=useState({})
 const [previewImg,setPreviewImg]=useState("")
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
        setPreviewImg(reader.result)
      };
    }else{
      setProductImg("")
    }
  };
  
const submitHandler=e=>{
  e.preventDefault()
  dispatch(productEdit({
    productImg,
    product:{
...currentPro,name:name,brand:brand,price:price,desc:desc
    }
}))
}
  const handleClickOpen = () => {
    setOpen(true);
    let selectedPro=items.filter((item)=> item._id === prodId )
    selectedPro=selectedPro[0]
    setProductImg("")
    setcurrentpro(selectedPro)
    setPreviewImg(selectedPro.image.url)
    setName(selectedPro.name)
    setBrand(selectedPro.brand)
    setprice(selectedPro.price)
    setDesc(selectedPro.desc)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{backgroundColor:'#FFEA20'}}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
        <Box display={'flex'} justifyContent='space-between' >
      <Box display="flex" flexDirection={"column"} width="300px">
        <TextField
          type={"file"}
          inputProps={{ accept: "image/" }}
          onChange={handleImageProduct}
          sx={{marginBottom:'5px'}}
       
        />
        <TextField type="text" placeholder="name" sx={{marginBottom:'5px'}} label='name' onChange={(e)=> setName(e.target.value)} value={name} required/>
        <Select onChange={(e)=>setBrand(e.target.value)} value={brand} required>
          <MenuItem value="iphone">iphone</MenuItem>
          <MenuItem value="samsung">samsung</MenuItem>
          <MenuItem value="vivo">vivo</MenuItem>
          <MenuItem value="oppo">oppo</MenuItem>
          <MenuItem value="redmi">Redmi</MenuItem>
          <MenuItem value="realme">realme</MenuItem>
          <MenuItem value="other">other</MenuItem>
        </Select>
        <TextField type="text" placeholder="desc" sx={{marginBottom:'5px'}} label='desc'  onChange={(e)=> setDesc(e.target.value)} value={desc} required/>
        <TextField type='number' placeholder="price" sx={{marginBottom:'5px'}} label='price'  onChange={(e)=> setprice(e.target.value)} value={price} required/>
   <Button variant="contained" onClick={submitHandler}>
    {editStatus === "pending" ? "Submitting" : "Submit"}
   </Button>
      </Box>
      <Box height='200px' width='200px' sx={{border:'2px solid black'}} >
        {previewImg? <>
        
        <img src={previewImg} alt="no image" height={'200px'} width='200px'/>
        </>:<p>image preview will apper here</p>}
      </Box>
      </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}