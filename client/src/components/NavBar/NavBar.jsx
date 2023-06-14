import React, {useContext, useEffect} from 'react';
import {StyledMenu} from "./NavBar.styles";
import {Link, useNavigate} from 'react-router-dom';
import {Box, List, ListItem} from "@mui/material";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AuthMenu from "../AuthMenu/AuthMenu";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/Smart_Electro.jpg'
import theme from "../../theme/theme";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {BASKET_ROUTE, BRANDS, CONTACTS, MAINSHOP_ROUTE, PAY_DELIVERY, PRIVATE_ROOM_ROUTE} from "../../route/constants";
import LogoutIcon from '@mui/icons-material/Logout';
import {getTypes} from "../../http/deviceAPI";
import {toJS} from "mobx";

const NavBar = observer(() => {
  const {device} = useContext(Context);

  useEffect(() => {
    getTypes()
      .then(response => {
        device.setTypes(response);
      })
  }, []);

  const listInfo = [{
    path: '/basket',
    value: 'Каталог',
    id: 1
  }, {
    path: '/basket',
    value: 'О компании',
    id: 2
  }, {
    path: PAY_DELIVERY,
    value: 'Доставка и оплата',
    id: 3
  }, {
    path: CONTACTS,
    value: 'Контакты',
    id: 4
  }]

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const phoneNumber = '8-480-953-70-65';

  let token = localStorage.getItem('token') != null;
  const {user} = useContext(Context)
  const navigate = useNavigate();

  const logOut = () => {
    user.setIsAuth(false);
    localStorage.removeItem('token')
    user.setUser({});
    navigate(MAINSHOP_ROUTE, {replace: true})
  }

  const goToProfile = () => {
    navigate(PRIVATE_ROOM_ROUTE, {replace: true})
  }

  return (
    <Box>
      <Box sx={{height: '140px', width: '1200px', m: '0 auto'}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <List sx={{display: 'flex', width: '200px', whiteSpace: 'nowrap'}}>
            {listInfo.map(({path, value, id}) => {
              return <ListItem sx={{fontSize: '1rem', p: 0, mr: 2}} key={id}><Link
                style={{textDecoration: 'none', color: '#333333'}}
                to={path}>{value}</Link></ListItem>
            })}
          </List>
          {token ? (<Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                 onClick={goToProfile}>{'Профиль'} <PermIdentityIcon sx={{ml: 0.7}}/></Box>
            <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer', ml: 6}}
                 onClick={logOut}>{'Выйти'} <LogoutIcon sx={{ml: 1}}/></Box>
          </Box>) : (
            <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                 onClick={handleClick}>{'Авторизация'} <PermIdentityIcon sx={{ml: 1}}/>
              <AuthMenu anchorEl={anchorEl} open={open} handleClose={handleClose}/>
            </Box>)}
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <img src={logo} alt={'logo'} style={{width: '180px', height: '100px'}}/>
          <Link style={{fontSize: '1.7rem', color: '#333333'}} to={`tel:${phoneNumber}`}>{phoneNumber}</Link>
          <Box
            component="form"
            sx={{
              p: 0.2,
              display: 'flex',
              alignItems: 'center',
              width: 400,
              borderRadius: '50px',
              border: '1px solid #333333',
              backgroundColor: '#F5F5F5'
            }}
          >
            <InputBase
              sx={{ml: 1, flex: 1, fontSize: '0.8rem'}}
              placeholder="Что будем искать?"
              inputProps={{'aria-label': 'Что будем искать?'}}
            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
              <SearchIcon/>
            </IconButton>
          </Box>
          <Box onClick={() => navigate(BASKET_ROUTE, {replace: true})} display={'flex'} alignItems={'center'}
               sx={{cursor: 'pointer'}}>
            0 руб. <ShoppingCartIcon sx={{ml: 1}}/>
          </Box>
        </Box>
      </Box>

      <StyledMenu>
        <Box sx={{
          margin: '0 auto',
          p: 2,
          display: 'flex',
          justifyContent: 'start',
          width: '1200px'
        }}>
          {
            device.allTypes.map((type) => {
              return (<Link to={`${BRANDS}/${type.id}`} style={{textDecoration: 'none'}}>
                  <Box
                    key={toJS(type.id)}
                    sx={{
                      fontSize: '1.2rem',
                      color: theme.palette.primary.contrastText,
                      mr: 3,
                      cursor: 'pointer',
                      ':hover': {
                        textDecoration: 'underline',
                      },
                      ...(toJS(type.id) === device.selectedType.id && {
                        textDecoration: 'underline',
                      }),
                    }}
                    onClick={() => {
                      device.setSelectedType(type);
                      localStorage.setItem('selectedType', JSON.stringify(type));
                    }}
                  >
                    {toJS(type.name)}
                  </Box> </Link>
              )
            })
          }
        </Box>
      </StyledMenu>
    </Box>
  );
});

export default NavBar;