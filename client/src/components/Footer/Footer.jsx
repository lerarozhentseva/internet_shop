import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import logo from '../../assets/Smart_Electro-transformed.png';
import {Link} from "react-router-dom";
import theme from "../../theme/theme";
import FacebookIcon from '@mui/icons-material/Facebook';
import IconButton from "@mui/material/IconButton";
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Footer = () => {
  const phoneNumber = '8-480-953-70-65';

  return (
    <Box sx={{backgroundColor: '#F8F8F8', height: '400px'}}>
      <Grid container spacing={3} mt={2} sx={{width: '1200px', m: '0 auto'}}>
        <Grid item md={3}>
          <Box>
            <Link to={'/'}><img alt={'logo'} src={logo}
                                style={{width: '120px', padding: 0, margin: '0 0 10px 0'}}/></Link>
            <Typography sx={{fontSize: '0.9rem', color: theme.palette.secondary.contrastText}}>© 2023
              ТелеБит</Typography>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                fontSize: '0.9rem',
                color: theme.palette.secondary.contrastText,
                mt: 2,
                ':hover': {textDecoration: 'underline'}
              }}>Политика
              конфиденциальности</Typography></Link>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                fontSize: '0.9rem',
                color: theme.palette.secondary.contrastText,
                ':hover': {textDecoration: 'underline'}
              }}>Согласие на обработку
              персональных
              данных</Typography></Link>
            <Typography sx={{fontSize: '1rem', color: theme.palette.secondary.contrastText, mt: 2}}>
              Используя данный сайт, вы автоматически принимаете условия пользовательского соглашения и соглашаетесь с
              политикой конфиденциальности.
            </Typography>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box mt={5} ml={5}>
            <Typography sx={{fontSize: '1.2rem', color: theme.palette.secondary.contrastText, mb: 2}}>О
              магазине</Typography>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                mt: 1,
                fontSize: '1rem',
                color: theme.palette.secondary.contrastText,
                ':hover': {textDecoration: 'underline'}
              }}>Главная</Typography></Link>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                mt: 1,
                fontSize: '1rem',
                color: theme.palette.secondary.contrastText,
                ':hover': {textDecoration: 'underline'}
              }}>О компании</Typography></Link>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                mt: 1,
                fontSize: '1rem',
                color: theme.palette.secondary.contrastText,
                ':hover': {textDecoration: 'underline'}
              }}>Доставка и оплата</Typography></Link>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                mt: 1,
                fontSize: '1rem',
                color: theme.palette.secondary.contrastText,
                ':hover': {textDecoration: 'underline'}
              }}>Контакты</Typography></Link>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                mt: 1,
                fontSize: '1rem',
                color: theme.palette.secondary.contrastText,
                ':hover': {textDecoration: 'underline'}
              }}>Новости</Typography></Link>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                mt: 1,
                fontSize: '1rem',
                color: theme.palette.secondary.contrastText,
                ':hover': {textDecoration: 'underline'}
              }}>Статьи</Typography></Link>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box mt={5} ml={5}>
            <Typography
              sx={{fontSize: '1.2rem', color: theme.palette.secondary.contrastText, mb: 2}}>Каталог</Typography>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                mt: 1,
                fontSize: '1rem',
                color: theme.palette.secondary.contrastText,
                ':hover': {textDecoration: 'underline'}
              }}>Смартфоны</Typography></Link>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                mt: 1,
                fontSize: '1rem',
                color: theme.palette.secondary.contrastText,
                ':hover': {textDecoration: 'underline'}
              }}>Телевизоры</Typography></Link>
            <Link to={'/'} style={{textDecoration: 'none'}}><Typography
              sx={{
                mt: 1,
                fontSize: '1rem',
                color: theme.palette.secondary.contrastText,
                ':hover': {textDecoration: 'underline'}
              }}>Ноутбуки</Typography></Link>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box mt={5} ml={5}>
            <Typography sx={{fontSize: '1.2rem', color: theme.palette.secondary.contrastText, mb: 2}}>Свяжитесь с
              нами</Typography>
            <Typography sx={{
              mt: 1,
              fontSize: '1rem',
              color: theme.palette.secondary.contrastText,
            }}>101000, г.Москва, ул. Хачатуряна, владение 20, корп. 1</Typography>
            <Typography sx={{
              mt: 1,
              fontSize: '1rem',
              color: theme.palette.secondary.contrastText,
            }}>E-mail:
              <Typography sx={{':hover': {textDecoration: 'underline'}}}><Link to={'/'} style={{
                textDecoration: 'none',
                color: '#333333'
              }}> support@phone.com</Link></Typography></Typography>
            <Typography sx={{':hover': {textDecoration: 'underline'}, mt: 1}}><Link style={{
              textDecoration: 'none',
              color: '#333333'
            }} to={`tel:${phoneNumber}`}>{phoneNumber}</Link></Typography>
            <Box mt={2.5}>
              <IconButton sx={{mr: 3}}>
                <FacebookIcon sx={{color: theme.palette.secondary.contrastText}}/>
              </IconButton>
              <IconButton sx={{mr: 3}}>
                <InstagramIcon sx={{color: theme.palette.secondary.contrastText}}/>
              </IconButton>
              <IconButton>
                <YouTubeIcon sx={{color: theme.palette.secondary.contrastText}}/>
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;