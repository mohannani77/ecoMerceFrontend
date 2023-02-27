import { Box, TextField, ThemeProvider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, setHeaders } from "../features/api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { ThemeContext } from "@emotion/react";
const Dusers = () => {
  const params = useParams();
  const [uimg,setuimg]=useState('');
  const [user, setUser] = useState({
    name:"",
    email:"",
    image:'',
    isAdmin:false,
    password:""

  });
  const [loading, setLoading] = useState(false);
const [updating,setUpdating]=useState(false);


const handleImageProduct = (e) => {
  const file = e.target.files[0];
  transformFile(file);
};

const transformFile = (file) => {
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setuimg(reader.result);
    };
  }else{
    setuimg("")
  }
};



  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        console.log(params.id);
        const res = await axios.get(
          `${api}/users/${params.id}`,
          setHeaders()
        );
        setUser({
          ...res.data,
          password:''
        });
   
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
    setLoading(false);
  }, [params.id]);

  const handleSubmit= async (e)=>{
    e.preventDefault()
    setUpdating(true)
    try {
      console.log("User L",user)
      const res=await axios.put(`${api}/users/${params.id}`,{
        ...user,uimg
      },setHeaders())
      console.log("res data ;",res.data)
      setUser({...res.data,password:""})
      toast.success("profile updated")

    } catch (error) {
      console.log(error)
    }
    setUpdating(false)
  }

  console.log("user  is ", user);
  const handleChange=()=>{

  }
  return (
    <Box>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <Box display={'flex'} justifyContent='center' mt='20px'>
          <Card sx={{ maxWidth:500 }} elevation={5}>
          <CardMedia
                        height="220"
                        component={"img"}
                        image={uimg ? (uimg): (user.image?.url)}
                        alt={user.name}
                        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                      />
            <CardContent>
              <TextField type={'file'} accept='/*image' onChange={handleImageProduct}/>
              <Typography
                gutterBottom
                variant="h6"
              >
                User Profile
              </Typography>
            
                {/* <TextField type="text"  ></TextField> */}
                <Box sx={{fontSize:'10',color:'#865DFF',backgroundColor:'#B4E4FF',padding:'3px',width:'80px',borderRadius:'2px'}}>{user.isAdmin ? ("Admin"):("Customer")}</Box>               

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                
              </Typography>
              <Typography variant="body2">
                <label>Name:</label>
                <br/>
             <TextField type="text" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}/>
             <br/>
             <label>Email:</label>
             <br/>
              <TextField type="text" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
              <br/>
              <label>Password:</label>
              <br/>
               <TextField type="text" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
                <br />
              </Typography>
             
            </CardContent>
            <CardActions>
    <Button size="small" onClick={handleSubmit}>{updating? ("updatinggg..."):("updated")}</Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Dusers;
