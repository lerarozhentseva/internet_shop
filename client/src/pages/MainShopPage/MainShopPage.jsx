import React, {useContext, useEffect, useState} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import SliderItem from "./components/Slider/Slider";
import Catalog from "./components/Catalog/Catalog";
import {Box, Grid} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import ClassIcon from '@mui/icons-material/Class';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NewsBlog from "./components/NewsBlog/NewsBlog";
import theme from "../../theme/theme";
import Footer from "../../components/Footer/Footer";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {getBrands, getDevices, getTypes} from "../../http/deviceAPI";
import {toJS} from "mobx";

const MainShopPage = observer(() => {
  const { device } = useContext(Context);
  const allDevices = toJS(device.allDevices);
  const allBrands = toJS(device.allBrands);

  useEffect(() => {
    getDevices()
      .then(response => {
        device.setDevices(response.rows);
      });

    getBrands()
      .then(response => {
        device.setBrands(response);
      });
  }, []);


  return (
    <>
      <NavBar/>
      <SliderItem/>
      <Catalog devices={allDevices}/>
      <Grid container spacing={2} m={5} sx={{width: '1200px', m: '50px auto'}}>
        <Box sx={{fontSize: '1.2rem', color: theme.palette.secondary.contrastText}} mb={4}>
          "Smart Electro" - это удобный и надежный интернет-магазин, специализирующийся на продаже смартфонов,
          телевизоров
          и компьютеров. Мы предлагаем широкий ассортимент высококачественных устройств от ведущих производителей по
          конкурентным ценам. <br/>
          <br/>
          В "Smart Electro" вы найдете самые последние модели смартфонов с передовыми технологиями и функциональностью.
          Мы предлагаем широкий выбор смартфонов различных марок, операционных систем и характеристик, чтобы
          удовлетворить потребности каждого клиента.<br/>
          <br/>
          Наши телевизоры отличаются высоким качеством изображения, яркостью и реалистичными цветами. У нас представлены
          различные модели телевизоров с разрешением 4K и диагональю, чтобы подойти к вашим потребностям и предоставить
          непревзойденный опыт просмотра.<br/>
          <br/>
          Мы также предлагаем широкий выбор компьютеров - от ноутбуков до стационарных ПК. Наши компьютеры обеспечивают
          высокую производительность, позволяют запускать самые требовательные программы и игры, а также обеспечивают
          удобство использования и максимальную мобильность.
        </Box>
        <Grid item md={3}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
            <MapIcon sx={{mr: 1}}/>
            <div>Доставляем заказы по всей территории России</div>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
            <ClassIcon sx={{mr: 1}}/>
            <div>На всю продукцию предоставляется гарантия</div>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
            <AccountBalanceWalletIcon sx={{mr: 1}}/>
            <div>Покупатель может оплатить заказ любым удобным способом</div>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
            <LocalMallIcon sx={{mr: 1}}/>
            <div>Широкий ассортимент товаров от крупнейших поставщиков</div>
          </Box>
        </Grid>
      </Grid>
      <NewsBlog/>
      <Footer/>
    </>
  );
});

export default MainShopPage;