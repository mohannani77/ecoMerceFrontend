import React, { useEffect, useState } from "react";
import SpeedIcon from "@mui/icons-material/Speed";
import BarChartIcon from "@mui/icons-material/BarChart";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Box, Typography } from "@mui/material";
import Widget from "./Widget";
import axios from "axios";
import { api, setHeaders } from "../features/api";
import Chart from "./Chart";
import Transactions from "./Transactions";
import AllTimeData from "./AllTimeData";
const Summary = () => {
  const [users, setusers] = useState([]);
  const [Uperc, setUperc] = useState(0);

  const [orders, setOrders] = useState([]);
  const [Operc, setOperc] = useState(0);

  const [income, setIncome] = useState([]);
  const [Iperc, setIperc] = useState(0);

  // console.log("income :",income)
  // console.log("income perc :",Iperc)

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    } else if (a._id > b._id) {
      return -1;
    }
    return;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${api}/users/stats`,
          setHeaders()
        );
        res.data.sort(compare);
        // console.log("user stats",res.data)
        setusers(res.data);
        // console.log('rs 2',res.data[0],res.data[1])
        setUperc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${api}/orders/stats`,
          setHeaders()
        );
        res.data.sort(compare);
        console.log("orders stats:", res.data);
        setOrders(res.data);
        setOperc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${api}/orders/income/stats`,
          setHeaders()
        );
        res.data.sort(compare);
        // console.log("income stats:",res.data)
        setIncome(res.data);
        setIperc(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const data = [
    {
      icon: <GroupAddIcon />,
      digits: users[0]?.total,
      ismoney: false,
      tittle: "Users",
      color: "rgb(102,108,255)",
      bgColor: "rgba(102,108,255,0.12)",
      percentage: Uperc,
    },
    {
      icon: <ContentPasteIcon />,
      digits: orders[0]?.total,
      ismoney: false,
      tittle: "Orders",
      color: "rgb(38,198,249)",
      bgColor: "rgba(38,198,249,0.12)",
      percentage: Operc,
    },
    {
      icon: <BarChartIcon />,
      digits: income[0]?.total ? income[0]?.total / 100 : "",
      ismoney: true,
      tittle: "Earnings",
      color: "rgb(253,181,40)",
      bgColor: "rgba(253,181,40,0.12)",
      percentage: Iperc,
    },
  ];
  return (
    <Box display={'flex'}>
      <Box display={"flex"} flexDirection='column' width={'600px'}>
        <Box
          bgcolor="#00425A"
          color="white"
          height="30vh"
          borderRadius={5}
          flex={2}
        >
          <Box ml={5}>
            <Typography variant="h4" pt={2}>
              Overview
            </Typography>
          </Box>
          <Box ml={5}>
            <p>How your shop is performing compare to previous month</p>
          </Box>
          <Box
            display={"flex"}
            justifyContent="space-between"
            paddingLeft={5}
            paddingRight={5}
            mt={5}
            paddingBottom={5}
          >
            {data?.map((data, index) => (
              <Widget data={data} key={index} />
            ))}
          </Box>
        </Box>
        <Box flex={2} paddingRight={2}>
          <Chart />
        </Box>
      </Box>
      <Box display="flex" flexDirection={'column'} width={'300px'}>
        <Box flex={1} ml={2}>
          <Transactions />
        </Box>
        <Box flex={1} ml={2}>
          {" "}
          <AllTimeData />
        </Box>
      </Box>
    </Box>
  );
};

export default Summary;
