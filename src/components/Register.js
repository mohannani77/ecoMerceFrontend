import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log("auth is :", auth);
  useEffect(() => {
    console.log("auth id is :", auth._id);
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth.token]);

  const [productImg, setProductImg] = useState("");
  const [open, setopen] = useState(true);
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [value, setvalue] = useState(false);
  const style = {
    position: "absolute",
    width: 400,
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    border: "2px solid black",
  };

  const uploader = (e) => {
    setvalue(true);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name,email,password,productImg }));
  };

  const handleImageProduct = (e) => {
    const file = e.target.files[0];
    transformFile(file);
    setvalue(false);
  };
//   const handleChange =(e)=>{
// const {name,value}=e.target
//     setUser({...user,[name]:value})
//     console.log(user)
//   }

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  return (
    <div>
      <Box display={"flex"} justifyContent="center" mt={5}>
        <FormControl sx={{ width: "35vw" }}>
          <h2>Register</h2>
          <Box>
            <Box display={"flex"} justifyContent="center">
              <Avatar
                type={"file"}
                onClick={uploader}
                src={productImg}
                alt="pic not found"
                sx={{ height: 100, width: 100 }}
                gutterBottom
              ></Avatar>
              <Modal open={value} onClose={() => setvalue(false)}>
                <Box sx={{ ...style }}>
                  <TextField
                    type={"file"}
                    disableUnderline={false}
                    inputProps={{ accept: "image/" }}
                    onChange={handleImageProduct}
                    variant="standard"
                    sx={{ marginBottom: "5px", borderRadius: "50%" }}
                  />
                </Box>
              </Modal>
            </Box>
          </Box>
          <TextField
            variant="outlined"
            placeholder="name"
            type={"text"}
            onChange={(e)=> setname(e.target.value)}
            sx={{ mb: "5px" }}
          ></TextField>
          <TextField
            variant="outlined"
            placeholder="email"
            type={"email"}
            onChange={(e)=> setemail(e.target.value)}
            sx={{ mb: "5px" }}
          ></TextField>
          <TextField
            variant="outlined"
            placeholder="password"
            type={"password"}
            onChange={(e)=> setpassword(e.target.value)}
            sx={{ mb: "5px" }}
          ></TextField>
          <Button variant="contained" onClick={handlesubmit}>
            Register
          </Button>
        </FormControl>
      </Box>
      <Box mx={"auto"} mb={5} width="50vw" mt={"2vh"}>
        {auth.registerStatus === "rejected" ? (
          <Collapse in={open}>
            <Alert
              severity="error"
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
              {auth.registerError}
            </Alert>
          </Collapse>
        ) : null}
      </Box>
    </div>
  );
};

export default Register;
