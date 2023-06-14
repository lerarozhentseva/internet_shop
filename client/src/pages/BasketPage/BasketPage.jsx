import React, {useContext, useEffect, useState} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {addToBasket, getBasket, removeFromBasket} from "../../http/basketAPI";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import {Context} from "../../index";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import {getBrands, getDevices, getTypes} from "../../http/deviceAPI";

const BasketPage = observer(() => {
  const {device} = useContext(Context);
  const basket = toJS(device.allDevicesInBasket);
  const allDevices = toJS(device.allDevices);
  const allBrands = toJS(device.allBrands);
  const allTypes = toJS(device.allTypes);

  const [counter, setCounter] = useState(1);

  const countMap = {};

  const add = async (id) => {
    const formData = new FormData();
    formData.append('deviceId', id);
    formData.append('quantity', 1);

    try {
      await addToBasket(formData);
      const updatedBasket = await getBasket();
      device.setBasket(updatedBasket);
      console.log("Item added to the basket");
    } catch (error) {
      console.log('Error:', error);
    }
  };
  // const remove = async (id) => {
  //   const formData = new FormData();
  //   formData.append('id', id);
  //
  //   try {
  //     await removeFromBasket(formData);
  //     const updatedBasket = await getBasket();
  //     device.setBasket(updatedBasket);
  //     console.log("Item deleted from basket");
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // }

  const remove = async (id) => {
    try {
      await removeFromBasket(id);
      const updatedBasket = await getBasket();
      device.setBasket(updatedBasket);
      console.log("Item deleted from basket");
    } catch (error) {
      console.log('Error:', error);
    }
  }

  // Функция для увеличения значения счетчика
  const incrementCounter = (id) => {
    add(id);
    setCounter(prevCounter => prevCounter + 1);
  };


  const decrementCounter = (deviceId) => {
    remove(deviceId);
    if (counter > 1) {
      setCounter(prevCounter => prevCounter - 1);
    }
  };
  // const decrementCounter = (basketId, deviceId) => {
  //   remove(basketId, deviceId); // Вызов функции remove с передачей basketId
  //   if (countMap[deviceId] > 1) {
  //     setCounter(prevCounter => prevCounter - 1);
  //   }
  // };

  useEffect(() => {
    getBasket().then(resp => device.setBasket(resp));
    getDevices()
      .then(response => {
        device.setDevices(response.rows);
      });

    getTypes()
      .then(response => {
        device.setTypes(response);
      })

    getBrands()
      .then(response => {
        device.setBrands(response);
      });
  }, []);

  console.log(basket.map(item => item.device.price).reduce((acc, item) => acc + item, 0));
  console.log(basket)

  const REACT_APP_API_URL = 'http://localhost:5000/';
  return (
    <>
      <NavBar/>
      <Box sx={{width: '1200px', m: '0 auto'}}>
        <Typography variant={'h4'}>Корзина</Typography>
        <Box>
          {basket.map(item => {
            const deviceInfo = allDevices.find(device => +device.id === +item.deviceId);
            const brand = allBrands.find(brand => brand.id === deviceInfo.brandId);
            const type = allTypes.find(type => type.id === deviceInfo.typeId);
            if (countMap[deviceInfo.id]) {
              countMap[deviceInfo.id]++;
            } else {
              countMap[deviceInfo.id] = 1;
            }

            return null;

          })}

          {Object.keys(countMap).map(deviceId => {
            const deviceInfo = allDevices.find(device => +device.id === +deviceId);
            const brand = allBrands.find(brand => brand.id === deviceInfo.brandId);
            const type = allTypes.find(type => type.id === deviceInfo.typeId);
            // const basketId = basket.find(item => item.deviceId === +deviceId)?.id;
            const basketItem = basket.find(item => item.deviceId === +deviceId);
            console.log(basketItem)
            return (
              <Paper sx={{borderRadius: 0}}>
                <Grid container spacing={3} mt={2}>
                  <Grid item md={3}>
                    <Typography variant={'body2'}>Наименование товара</Typography>
                    <img src={REACT_APP_API_URL + deviceInfo.img} alt={'device'} style={{width: '80px'}}/>
                    <Typography>{type?.name.slice(0, type?.name.length - 1)} {brand?.name} {deviceInfo.name}</Typography>
                    <Typography>Код товара: {deviceInfo.id}</Typography>
                  </Grid>
                  <Grid item md={3}>
                    <Typography variant={'body2'}>Цена</Typography>
                    <Typography>{deviceInfo.price}</Typography>
                  </Grid>
                  <Grid item md={3}>
                    <Typography variant={'body2'}>Количество</Typography>
                    <Box>
                      <Typography>Количество: {countMap[deviceId]}</Typography>
                      <Button onClick={() => decrementCounter(basketItem?.id)}>-</Button>
                      <Button onClick={() => incrementCounter(deviceInfo.id)}>+</Button>
                    </Box>
                  </Grid>
                  <Grid item md={3}>
                    <Typography variant={'body2'}>Стоимость</Typography>
                    <Typography>{countMap[deviceId] === 1 ? deviceInfo.price : deviceInfo.price * countMap[deviceId]}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            )
          })}
        </Box>
        <Typography>{}</Typography>
      </Box>
      <Footer/>
    </>
  );
});

export default BasketPage;