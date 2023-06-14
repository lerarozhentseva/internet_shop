import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import theme from "../../theme/theme";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {DEVICE_ROUTE} from "../../route/constants";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

export default function CardItem({title, price, image, id}) {
  const navigate = useNavigate();

  return (
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        component="img"
        height="194"
        sx={{width: '180px', m: '0 auto', height: '200px'}}
        src={image}
        image={image}
        alt="item"
      />
      <CardContent>
        <Link to={`${DEVICE_ROUTE}/${id}`} style={{
          textDecoration: 'none'
        }}><Typography variant="body1" sx={{
          color: theme.palette.secondary.contrastText, ':hover': {
            textDecoration: 'underline',
          }
        }} textAlign={'center'}>Смартфон {title}
        </Typography></Link>
        <Typography variant="body1" sx={{color: theme.palette.secondary.contrastText, fontWeight: 'bold'}}
                    textAlign={'center'}>
          {price} руб.
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{display: 'flex', justifyContent: 'space-between'}}>
        <IconButton aria-label="add to basket">
          <ShoppingCartIcon/>
        </IconButton>
        <Button onClick={() => navigate(`${DEVICE_ROUTE}/${id}`, {replace: true})}
                variant={'outlined'}>Подробнее</Button>
      </CardActions>
    </Card>
  );
}