import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from "../../../../theme/theme";
import NewsItem from "../../../../components/NewsItem/News";
import CardItem from "../../../../components/CardItem/CardItem";

const NewsBlog = () => {
  return (
    <Box sx={{width: '1200px', m: '100px auto'}}>
      <Link to={'/'} style={{textDecoration: 'none'}}>
        <Typography variant='h4' sx={{
          fontWeight: 'bold', color: theme.palette.secondary.contrastText, ':hover': {
            textDecoration: 'underline'
          }
        }}>
          Популярные новости
          <ArrowForwardIcon sx={{ml: 1}}/>
        </Typography>
      </Link>
      <Grid container spacing={4} mt={2}>
        <Grid item md={4}>
          <NewsItem/>
        </Grid>
        <Grid item md={4}>
          <NewsItem/>
        </Grid>
        <Grid item md={4}>
          <NewsItem/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewsBlog;