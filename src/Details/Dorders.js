import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, setHeaders } from "../features/api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { height } from "@mui/system";
const Dorders = () => {
  const params = useParams();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
let amount_total=0
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        console.log(params.id);
        const res = await axios.get(
          `${api}/orders/findOne/${params.id}`,
          setHeaders()
        );
        setOrder(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [params.id]);

  console.log("order is ", order);
  return (
    <Box>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <Box display={'flex'} justifyContent='center' mt='20px'>
          <Card sx={{ maxWidth:700 }} elevation={5}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                fontWeight={'bold'}
              >
                Order Details
              </Typography>
              <Typography variant="body" component="div">
                Delivary Status:<span style={{backgroundColor:'#95BDFF',color:'#2B3467',padding:'4px',marginLeft:'10px',borderRadius:'2px'}}>
                {order?.delivary_status === "pending"
                  ? "pending"
                  : order?.delivary_status === "dispatched"
                  ? "Dispatched"
                  : order?.delivary_status === "delivered"
                  ? "Delivered"
                  : "error"}
                  </span>
              </Typography>
              <Typography sx={{ mb: 1.5,mt:1.5 }} variant="h6">
                Ordered Products
              </Typography>
              <Typography variant="body2">
              <ul>
                <li>
                {order?.products?.map((product, index) => (
                  <Box key={index} display='flex' justifyContent={'space-around'} width='300px' >
                    <h5>{product.description}</h5>
                    <h5>{product.quantity}</h5>
                    <h5>
                      {"$" + ((product.amount_total) / 100).toLocaleString()}
                    </h5>
                  </Box>
                ))}
                </li>
              </ul>
                <br />
              </Typography>
              <Box display={'flex'} >
                <h3>Total price :</h3>
                <Typography variant="p" sx={{fontSize:'20px',ml:2}}>{"$" + (order?.subtotal / 100).toLocaleString()}</Typography>
              </Box>
              <Box mt='10px'>
                <h3>Shipping details</h3>
                <p>Customer : {order?.shipping?.name}</p>
                <p>City : {order?.shipping?.address.city}</p>
                <p>Email : {order?.shipping?.email}</p>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Dorders;
