import React, {useContext, useEffect, useState} from 'react';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {toJS} from "mobx";
import theme from "../../theme/theme";
import userAvatar from '../../assets/user.jpg'
import admin from '../../assets/admin.jpg';
import StarIcon from '@mui/icons-material/Star';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {createBrand, createDevice, createType, getBrands, getDevices, getTypes} from "../../http/deviceAPI";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const PrivateRoom = observer(() => {
  const {user, device} = useContext(Context);
  const userInfo = toJS(user.user);
  const [openDeviceDialog, setOpenDeviceDialog] = React.useState(false);
  const [openTypeDialog, setOpenTypeDialog] = React.useState(false);
  const [openBrandDialog, setOpenBrandDialog] = React.useState(false);
  const [nameType, setNameType] = useState('');
  const [nameBrand, setNameBrand] = useState('');

  const [nameDevice, setNameDevice] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  }

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', nameDevice)
    formData.append('description', description)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))

    createDevice(formData).then(data => setOpenDeviceDialog(false))
  }

  const addType = (event) => {
    try {
      event.preventDefault();
      createType({name: nameType}).then(data => setNameType(''));
      setOpenTypeDialog(false)
    } catch (e) {

    } finally {

    }

  }

  const addBrand = (e) => {
    try {
      e.preventDefault();
      createBrand({name: nameBrand}).then(data => setNameBrand(''));
      setOpenBrandDialog(false)
    } catch (e) {

    } finally {

    }
  }

  useEffect(() => {
    getTypes()
      .then(response => {
        device.setTypes(response);
      });

    getBrands()
      .then(response => {
        device.setBrands(response);
      });
  }, []);

  return (
    <>
      <NavBar/>
      <Box sx={{width: '1200px', m: '60px auto'}}>
        <Typography variant={'h4'}>Личный кабинет</Typography>
        <Box sx={{display: 'flex', mt: 3, justifyContent: 'space-between'}}>
          <Paper sx={{width: '500px', mt: 5, p: '5px 10px'}}>
            <Typography variant={'h6'} fontWeight={'bold'} sx={{color: theme.palette.primary.main}}>Информация
              о пользователе</Typography>
            <Box sx={{display: 'flex', mt: 3, alignItems: 'center'}}>
              <Avatar alt="avatar" src={userInfo.role === 'ADMIN' ? admin : userAvatar}
                      sx={{width: '100px', height: '100px', mr: 2}}/>
              <Box>
                <Typography variant={'body1'}>Role: {userInfo.role}</Typography>
                <Typography variant={'body1'}>Email: {userInfo.email}</Typography>
              </Box>
            </Box>

          </Paper>
          {userInfo.role === 'ADMIN' && (<Paper sx={{width: '500px', mt: 5, p: '5px 10px'}}>
            <Typography variant={'h6'} fontWeight={'bold'}
                        sx={{color: theme.palette.primary.main, display: 'flex', alignItems: 'center'}}>Возможности
              администратора <StarIcon
                sx={{color: 'yellow', ml: 1}}/></Typography>
            <Box sx={{display: 'flex', mt: 3, flexDirection: 'column'}}>
              <Button variant={'contained'} onClick={() => setOpenDeviceDialog(true)}>Добавить новое устройство</Button>
              <Button variant={'contained'} onClick={() => setOpenTypeDialog(true)} sx={{mt: 2}}>Добавить новый
                тип</Button>
              <Button variant={'contained'} onClick={() => setOpenBrandDialog(true)} sx={{mt: 2, mb: 1}}>Добавить новый
                бренд</Button>
            </Box>
          </Paper>)}
        </Box>

        <Dialog
          open={openTypeDialog}
          onClose={() => setOpenTypeDialog(false)}
        >
          <DialogTitle>
            Добавить новый тип устройства
          </DialogTitle>
          <DialogContent>
            <TextField
              sx={{width: '100%'}}
              variant="standard"
              label="Название"
              value={nameType}
              onChange={(e) => setNameType(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setNameType('')
              setOpenTypeDialog(false)
            }}>Отклонить</Button>
            <Button onClick={(e) => addType(e)} autoFocus>
              Добавить
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openBrandDialog}
          onClose={() => setOpenBrandDialog(false)}
        >
          <DialogTitle>
            Добавить новый бренд устройства
          </DialogTitle>
          <DialogContent>
            <TextField
              sx={{width: '100%'}}
              variant="standard"
              label="Название"
              value={nameBrand}
              onChange={(e) => setNameBrand(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setNameBrand('')
              setOpenBrandDialog(false)
            }}>Отклонить</Button>
            <Button onClick={(e) => addBrand(e)} autoFocus>
              Добавить
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDeviceDialog}
          onClose={() => setOpenDeviceDialog(false)}
        >
          <DialogTitle>
            Добавить новое устройство
          </DialogTitle>
          <DialogContent>
            <TextField
              sx={{width: '100%', mt: 2.5}}
              variant="outlined"
              label="Название устройства"
              value={nameDevice}
              onChange={(e) => setNameDevice(e.target.value)}
            />
            <TextField
              sx={{width: '100%', mt: 2.5}}
              variant="outlined"
              label="Описание устройства"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              sx={{width: '100%', mt: 2.5}}
              variant="outlined"
              label="Цена"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <FormControl fullWidth sx={{mt: 2.5}}>
              <InputLabel>Тип</InputLabel>
              <Select
                label="Type"
              >
                {
                  device.allTypes.map(type => {
                    return <MenuItem value={type.name} key={type.id}
                                     onClick={() => device.setSelectedType(type)}>{type.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{mt: 2.5}}>
              <InputLabel id="demo-multiple-name-label">Бренд</InputLabel>
              <Select
                label="Brand"
              >
                {
                  device.allBrands.map(brand => {
                    return <MenuItem value={brand.name} key={brand.id}
                                     onClick={() => device.setSelectedBrand(brand)}>{brand.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
            <TextField
              sx={{width: '100%', mt: 2.5}}
              type={'file'}
              onChange={selectFile}
            />
            <Button sx={{mt: 2.5, mb: 1.5}}
                    onClick={addInfo}
            >
              Добавить новое свойство
            </Button>
            {info.map(i => {
              return (
                <Box sx={{display: 'flex', alignItems: "center"}}>
                  <TextField
                    sx={{mr: 1}}
                    value={i.title}
                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                    placeholder="Введите название свойства"
                  />
                  <TextField
                    sx={{mr: 1}}
                    value={i.description}
                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                    placeholder="Введите описание свойства"
                  />
                  <Button sx={{borderRadius: "50%", width: "50px", height: "50px"}}
                          onClick={() => removeInfo(i.number)}
                  >
                    <DeleteForeverIcon/>
                  </Button>
                </Box>
              )
            })}

          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setNameBrand('')
              setOpenDeviceDialog(false)
            }}>Отклонить</Button>
            <Button onClick={(e) => addDevice(e)} autoFocus>
              Добавить
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
      <Footer/>
    </>
  );
});

export default PrivateRoom;