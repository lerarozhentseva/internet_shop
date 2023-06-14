import React, {useContext, useEffect, useState} from 'react';
import {getDevicesByBrand} from "../../http/deviceAPI";
import {useParams} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {Box, Grid, Typography} from "@mui/material";
import theme from "../../theme/theme";
import CardItem from "../../components/CardItem/CardItem";

const DevicesPage = observer(() => {
  const {id} = useParams();
  const {device} = useContext(Context);
  const [data, setData] = useState([])

  console.log(data)
  useEffect(() => {
    const savedSelectedType = localStorage.getItem('selectedType');
    if (savedSelectedType) {
      device.setSelectedType(JSON.parse(savedSelectedType));
    }

    const savedSelectedBrand = localStorage.getItem('selectedBrand');
    if (savedSelectedBrand) {
      device.setSelectedBrand(JSON.parse(savedSelectedBrand));
    }

    getDevicesByBrand(id).then(res => {
      const filteredDevices = res.filter(item => {
        return (
          item.typeId === device.selectedType.id &&
          item.brandId === device.selectedBrand.id
        );
      });
      setData(filteredDevices);
    });
    // getDevicesByBrand(id).then(res => device.setSelectedBrand(res))
  }, []);

  const REACT_APP_API_URL = 'http://localhost:5000/';

  return (
    <>
      <NavBar/>
      <Box sx={{width: '1200px', m: '60px auto'}}>
        <Typography variant={'h4'} sx={{color: theme.palette.primary.main}}
                    fontWeight={'bold'}>{device.selectedType.name} {device.selectedBrand.name}</Typography>
        <Grid container spacing={2} m={5} sx={{width: '1200px', m: '0 auto'}}>
          {data.map(item => {
            return (
              <Grid item key={item.id} md={3}>
                <CardItem title={item.name} price={item.price} id={item.id} image={REACT_APP_API_URL + item.img}/>
              </Grid>
            )
          })}
        </Grid>
      </Box>
      <Footer/>
    </>
  );
});

export default DevicesPage;