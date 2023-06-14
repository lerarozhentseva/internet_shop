import React from 'react';
import NavBar from "../../../components/NavBar/NavBar";
import {Box} from "@mui/material";
import Form from "./Form";
import Footer from "../../../components/Footer/Footer";
import PaperComponent from "../components/Form/PaperComponent";
import {LOGIN_ROUTE} from "../../../route/constants";


const RegistrationPage = () => {
  return (
    <>
      <NavBar/>
      <Box sx={{width: '1200px', m: '50px auto', display: 'flex', justifyContent: 'space-between'}}>
        <Form/>
        <PaperComponent sx={{height: '310px'}} text={'Зарегистрировавшись на сайте, Вы сможете получить ' +
          'личный кабинет, что позволит Вам отслеживать историю заказов, быстрее оформлять заказы в нашем Интернет магазине. Вся информация о Вас будет доступна в любое время, и ее не нужно будет вводить повторно.'}
                        linkText={'У меня уже есть аккаунт'} href={LOGIN_ROUTE}
                        title={'Зачем нужна регистрация?'}/>
      </Box>
      <Footer/>
    </>
  );
};

export default RegistrationPage;