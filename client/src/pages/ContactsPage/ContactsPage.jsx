import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {Box, Typography} from "@mui/material";

const ContactsPage = () => {
  return (
    <>
      <NavBar/>
      <Box sx={{width: '1200px', m: '60px auto'}}>
        <Typography variant={'h4'}>Контакты</Typography>
        <Typography variant={'h5'} sx={{m: '40px 0'}}> ООО Smart Electro – интернет-магазин современных техники</Typography>
        <Typography variant={'body1'}>Мы находимся по адресу: <br/> <br/>129281, г.Москва, Олонецкий пр-д,
          4К2 <br/><br/> Наш
          телефон: 8-480-953-70-65 <br/><br/> E-mail: support@appliances.com
        </Typography>
      </Box>
      <Footer/>
    </>
  );
};

export default ContactsPage;