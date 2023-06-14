import React, {useContext, useEffect} from 'react';
import {Box, Typography, Grid} from "@mui/material";
import theme from "../../../../theme/theme";
import CardItem from "../../../../components/CardItem/CardItem";
import {Context} from "../../../../index";
import {toJS} from "mobx";
import {getDevices} from "../../../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const Catalog = ({devices}) => {
  const REACT_APP_API_URL='http://localhost:5000/';
  return (
    <Box sx={{width: '1200px', m: '0 auto'}}>
      <Typography variant='h4' sx={{fontWeight: 'bold', color: theme.palette.secondary.contrastText}}>Популярные
        товары</Typography>
      <Grid container spacing={2} m={5} sx={{width: '1200px', m: '0 auto'}}>
        {devices.map(item => {
          return (<Grid item md={3} key={item.id}>
            <CardItem title={item.name} image={REACT_APP_API_URL + item.img} price={item.price} id={item.id}/>
          </Grid>)
        })}
      </Grid>
    </Box>
  );
};

export default Catalog;