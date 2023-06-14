import React, {useContext, useEffect} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {Box, Grid, Typography} from "@mui/material";
import {Context} from "../../index";
import {toJS} from "mobx";
import {getBrands} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import BrandCard from "../../components/BrandCatalog/BrandCard";

const BrandsPage = observer(() => {
  const {device} = useContext(Context);
  const allBrands = toJS(device.allBrands);

  useEffect(() => {
    getBrands()
      .then(response => {
        device.setBrands(response);
      });
  }, []);
  return (
    <>
      <NavBar/>
      <Box sx={{width: '1200px', m: '60px auto'}}>
        <Typography variant={'h4'}>Каталог производителей</Typography>
        <Grid container spacing={1} sx={{width: '1200px', m: '10px auto'}}>
          {
            allBrands.map(item => {
              return (
                <Grid item md={3} key={item.id}>
                  <BrandCard title={item.name} key={item.id} id={item.id} item={item}/>
                </Grid>
              )
            })
          }
        </Grid>
      </Box>
      <Footer/>
    </>
  );
});

export default BrandsPage;