import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
// import { color } from "@mui/system";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { useGetAllProductsQuery } from "../features/productsApi";
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'

const Home = () => {
  const { items, status } = useSelector((state) => state.products);
  const {search}=useSelector((state) => state.search)
  console.log("search",search)
  console.log(items)
  let data=[]
  {!search? (data=items):(data=items.filter( (item)=> item.brand===search))}
  console.log("data",data)
  const { cartQuantity } = useSelector((state) => state.cart);
  // const { data, error, isLoading } = useGetAllProductsQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleaddTocart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart')
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center ml-1 ">
        <Box justifyContent={'center'} sx={{width:'90%'}}>
          {status === "Sucess" ? (
            <>
              <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 12, sm: 4, md: 3 }}
              >
                {data.map((x, index) => (
                  <Grid item key={index}>
                    <Card
                      key={index}
                      spacing={1}
                      elevation={5}
                      sx={{
                        height: "400px",
                        width: "250px",
                        display: "flex",
                        flexDirection: "column",
                        mt: "10px",
                        mb: "10px",
                      }}
                    >
                      {/* {console.log(x.image.url)} */}
                      <CardMedia
                        height="220"
                        component={"img"}
                        image={x.image.url}
                        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                        onClick={() => navigate(`/product/${x._id}`)}
                      />
                      <CardContent>
                        <Typography variant="h6">{x.name}</Typography>
                        {/* <Typography variant="body">{x.desc}</Typography> */}
                        <Typography variant="h5">price :${x.price}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="contained"
                          sx={{ width: "100%" }}
                          onClick={() => handleaddTocart(x)}
                        >
                          Add
                        </Button>
                        {/* <Button variant="contained" color="error">
                        Remove
                      </Button> */}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <p>Error occured</p>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Home;
