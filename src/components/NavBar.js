import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputAdornment,
  Link,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "../features/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { api, setHeaders } from "../features/api";
import { serachItem } from "../features/searchSlice";
const NavBar = () => {
  const dispatch = useDispatch();
  const { cartQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [order, setpro] = useState([]);
  // console.log("auth ;:",auth)
  const [loading, setLoading] = useState(false);
  const [pimg, setpimg] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: false,
    image: "",
    password: "",
  });

  const handleChange=(e)=>{
    let val=e.target.value
    dispatch(serachItem(val))
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        console.log(auth._id);
        const res = await axios.get(
          `${api}/users/${auth._id}`,
          setHeaders()
        );
        setUser({
          ...res.data,
        });
        setpimg(user.image.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    setLoading(false);
  }, [auth._id]);

  const navigate = useNavigate();
  return (
    // <Box sx={{top: "0" }}>
      <AppBar position="sticky" >
        <Toolbar>
          <Link href="/" sx={{textDecoration:'none'}}>
            <Typography
              variant="contained"
              color={"white"}
              mx={2}
              sx={{ color: "white", cursor: "pointer", top: "0",textDecoration:'none' }}
            >
              Home
            </Typography>
          </Link>
          <Box sx={{ mx: "auto" }}>
            <Badge
              badgeContent={cartQuantity}
              color="error"
              sx={{ cursor: "pointer", flexGrow: "1" }}
            >
              <ShoppingBasketIcon
                sx={{ cursor: "pointer", flexGrow: "1" }}
                onClick={() => {
                  navigate("/cart");
                }}
              />
            </Badge>
          </Box >
          <Box sx={{ mx: "5rem",backgroundColor:'white',borderRadius:'2px' }}>
          <TextField  placeholder="search"   InputProps={{
          endAdornment: (
           <InputAdornment position="end">
           <SearchIcon/></InputAdornment>
          ),
        }}
        variant='standard'
        onChange={handleChange}
        />
          </Box>

          <Box>
            {auth._id ? (
              <Box display={"flex"}>
                <Box display={'flex'}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(logoutuser(null));
                    toast.warning("Logged out", {
                      position: "bottom-left",
                    });
                  }}
                >
                  Logout
                </Box>
              { !auth.isAdmin ? (<Link href="/myprofile" sx={{ color: "white", marginLeft: "50px" }}>
                    <Avatar
                      type={"file"}
                      src={user.image?.url}
                      alt={user.name}
                      sx={{ height: 30, width: 30 }}
                      gutterBottom
                    >
                      {user.name}
                    </Avatar>
                  </Link>) : null}
                {auth.isAdmin ? (
                  <Link
                    href="/admin"
                    sx={{ textDecoration: "none", color: "white" }}
                    ml="2rem"
                  >
                    admin
                  </Link>
                ) : null}
              </Box>
            ) : (
              <>
                <Link
                  href="/login"
                  sx={{ textDecoration: "none", color: "white" }}
                  mr="2rem"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  sx={{ textDecoration: "none", color: "white" }}
                  mr="2rem"
                >
                  Register
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    // </Box>
  );
};

export default NavBar;
