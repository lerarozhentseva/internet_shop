import React from 'react';
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import Form from "./Form";
import {Box} from "@mui/material";
import PaperComponent from "../components/Form/PaperComponent";
import {REGISTRATION_ROUTE} from "../../../route/constants";

const LoginPage = () => {
  return (
    <>
      <NavBar/>
      <Box sx={{width: '1200px', m: '50px auto', display: 'flex', justifyContent: 'space-between'}}>
        <Form/>
        <PaperComponent title={'Я – новый покупатель'}
                        text={'Регистрация на сайте позволит быстро оформлять заказы, управлять заказами через ' +
                          'личный кабинет, в полном объеме использовать возможности нашего интернет магазина.'}
                        href={REGISTRATION_ROUTE} linkText={'Зарегистрироваться'}/>
      </Box>
      <Footer/>
    </>
  );
};

export default LoginPage;