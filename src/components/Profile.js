import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { maxHeight } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api, setHeaders } from "../features/api";

const Profile = () => {
  const params = useParams();
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

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        console.log(auth._id);
        const res = await axios.get(
          `${api}/orders/profile/${auth._id}`,
          setHeaders()
        );
        setpro([...res.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
    setLoading(false);
  }, [auth._id]);

  return (
    <Box>
      <Box display={"flex"} justifyContent="center">
        <h1>My Profile</h1>
      </Box>
      <Box display={"flex"} justifyContent="center">
        <Avatar
          type={"file"}
          src={user.image?.url}
          alt={user.name}
          sx={{ height: 100, width: 100 }}
          gutterBottom
        >{user.name}</Avatar>
      </Box>
      <Box display={"flex"} justifyContent="center">
        <h3>{user.name}</h3>
      </Box>
      <Box>
        <Box>
          {loading ? (
            <p>Loading.....</p>
          ) : (
            <>
              <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 12, sm: 4, md: 3 }}
              >
                  {order?.map((order, index) => (
                    <Grid item key={index}>
                      <Box display={"flex"} justifyContent="center" mt="20px">
                        <Card sx={{ maxWidth: 700,maxHeight:300,overflowY:'scroll' }} elevation={5}>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              fontWeight={"bold"}
                            >
                              Order Details
                            </Typography>
                            <Typography variant="body" component="div">
                              Delivary Status:
                              <span
                                style={{
                                  backgroundColor: "#95BDFF",
                                  color: "#2B3467",
                                  padding: "4px",
                                  marginLeft: "10px",
                                  borderRadius: "2px",
                                }}
                              >
                                {order?.delivary_status === "pending"
                                  ? "pending"
                                  : order?.delivary_status === "dispatched"
                                  ? "Dispatched"
                                  : order?.delivary_status === "delivered"
                                  ? "Delivered"
                                  : "error"}
                              </span>
                            </Typography>
                            <Typography sx={{ mb: 1.5, mt: 1.5 }} variant="h6">
                              Ordered Products
                            </Typography>
                            <Typography variant="body2">
                              <ul>
                                {order?.products?.map((product, index) => (
                                  <li>
                                    <Box
                                      key={index}
                                      display="flex"
                                      justifyContent={"space-around"}
                                      width="300px"
                                    >
                                      <h5>{product.description}</h5>
                                      <h5>{product.quantity}</h5>
                                      <h5>
                                        {"$" +
                                          (
                                            product.amount_total / 100
                                          ).toLocaleString()}
                                      </h5>
                                    </Box>
                                  </li>
                                ))}
                              </ul>
                              <br />
                            </Typography>
                            <Box display={"flex"}>
                              <h3>Total price :</h3>
                              <Typography
                                variant="p"
                                sx={{ fontSize: "20px", ml: 2 }}
                              >
                                {"$" + (order?.subtotal / 100).toLocaleString()}
                              </Typography>
                            </Box>
                            {/* <Box mt="10px">
                        <h3>Shipping details</h3>
                        <p>Customer : {order?.shipping?.name}</p>
                        <p>City : {order?.shipping?.address.city}</p>
                        <p>Email : {order?.shipping?.email}</p>
                      </Box> */}
                            <Box>
                              <p>
                                Ordered On:{" "}
                                {order.createdAt.toString().split("T")[0]}
                              </p>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
