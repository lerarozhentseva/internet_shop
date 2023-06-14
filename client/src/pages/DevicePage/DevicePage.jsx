import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getBrands, getDevice, getDevices, getTypes} from "../../http/deviceAPI";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {Box, Button, Typography} from "@mui/material";
import theme from "../../theme/theme";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import {Context} from "../../index";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {addToBasket} from "../../http/basketAPI";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {BASKET_ROUTE} from "../../route/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}/>;
});

function createData(name, calories, fat, carbs, protein) {
  return {name, calories, fat, carbs, protein};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const DevicePage = observer(() => {
  const [deviceOne, setDeviceOne] = useState({info: []});
  const {id} = useParams()
  const {device, user} = useContext(Context);
  const allTypes = toJS(device.allTypes);
  const allBrands = toJS(device.allBrands);

  const navigate = useNavigate();

  useEffect(() => {
    getDevice(id).then(data => setDeviceOne(data));
    getBrands()
      .then(response => {
        device.setBrands(response);
      });
  }, [])

  const REACT_APP_API_URL = 'http://localhost:5000/';

  const getTypeName = (typeId) => {
    const type = allTypes.find((type) => type.id === typeId);
    return type ? type.name.slice(0, type.name.length - 1) : '';
  };

  const getBrandName = (brandId) => {
    const brand = allBrands.find((brand) => brand.id === brandId);
    return brand ? brand.name : '';
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const add = async () => {
    const formData = new FormData();
    formData.append('deviceId', id);
    formData.append('quantity', 1);

    try {
      let resp = await addToBasket(formData);
      handleClickOpen();
      console.log(resp);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const goToBasket = () => {
    handleClose();
    navigate(BASKET_ROUTE, {replace: true});
  }


  return (
    <>
      <NavBar/>
      <Box sx={{width: '1200px', m: '60px auto'}}>
        <Typography variant={'h4'}
                    fontWeight={'bold'}>{getTypeName(deviceOne.typeId)} {getBrandName(deviceOne.brandId)} {deviceOne.name}</Typography>
        <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', mt: 3}}>
          <Typography>ID товара: {deviceOne.id}</Typography>
          <Box sx={{
            p: '3px 15px',
            borderRadius: '5px',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            ml: 5
          }}>В наличии</Box>
        </Box>

        <Box sx={{display: 'flex', mt: 3, justifyContent: 'space-evenly'}}>
          <Box>
            <img src={REACT_APP_API_URL + deviceOne.img} alt={'device'} style={{width: '500px', maxHeight: '500px'}}/>
          </Box>
          <Box sx={{alignContent: 'start'}}>
            <Typography variant={'h6'} fontWeight={'bold'}>Краткое описание товара</Typography>
            <Typography variant={'body1'} sx={{mt: 2, mb: 2}}>{deviceOne.description}</Typography>
            <hr style={{width: '700px', borderColor: '#F8F8F8'}}/>

            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center', mt: 2, mb: 2}}>
              <Button variant={'contained'} sx={{mr: 4}} onClick={() => add(id)}><ShoppingCartIcon sx={{mr: 1}}/> В
                корзину</Button>
              <Button variant={'contained'} sx={{mr: 4}}><PriceChangeIcon sx={{mr: 1}}/> Купить в 1 клик</Button>
              <Typography variant={'h5'}>{deviceOne.price} руб.</Typography>
            </Box>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>Товар {deviceOne.name} успешно добавлен в корзину!</DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>Остаться на странице</Button>
                <Button onClick={goToBasket}>Перейти в корзину</Button>
              </DialogActions>
            </Dialog>
            <hr style={{width: '700px', borderColor: '#F8F8F8'}}/>
            <Typography variant={'h6'} fontWeight={'bold'}>Характеристики</Typography>
            <Box sx={{mt: 2}}>
              <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

          </Box>
        </Box>
      </Box>
      <Footer/>
    </>
  );
});

export default DevicePage;