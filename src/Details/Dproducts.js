import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, setHeaders } from "../features/api";
import axios from "axios";
const Dproducts = () => {
  const products = useSelector((state) => state.product);
  const params = useParams();
  const [product, setproduct] = useState({});
  const [loading, setloading] = useState(false);
  const [lis, setlis] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setloading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${api}/products/find/${params.id}`,
          setHeaders()
        );
        setproduct(res.data);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    }
    fetchData();
  }, []);

  const handleaddTocart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div>
      <Box display={"flex"} justifyContent="center">
        <Card
          spacing={1}
          elevation={5}
          sx={{
            height: "500px",
            width: "650px",
            display: "flex",
            flexDirection: "column",
            mt: "10px",
            mb: "10px",
          }}
        >
          <Box display={"flex"} alignItems="center" >
            <Box>
              <CardMedia
                component={"img"}
                image={product.image?.url}
                sx={{padding:'1em',objectFit: "contain",height:'400px',width:'300px' }}
              />
            </Box>
            <Box>
              <CardContent>
                <Typography variant="h4">{product.name}</Typography>
                <Box sx={{height:'300px',overflowY:'scroll'}} >
                  {product.desc?.split("|")?.map((x, index) => (
                    <ul key={index}>
                      <li>
                        <Typography variant="p">{x}</Typography>
                      </li>
                    </ul>
                  ))}
                </Box>
                {/* <Typography variant="body">{product.desc}</Typography> */}
                <Typography variant="h5">price :${product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ width: "80%" }}
                  onClick={() => handleaddTocart(product)}
                >
                  Add
                </Button>
                {/* <Button variant="contained" color="error">
              Remove
            </Button> */}
              </CardActions>
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default Dproducts;
