import React from 'react';
import Menu from '@mui/material/Menu';
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../route/constants";
import {MenuItem} from "@mui/material";
import theme from "../../theme/theme";

const AuthMenu = ({anchorEl, handleClose, open}) => {
  const navigate = useNavigate()
  const handleClick = (link) => {
    navigate(link, {replace: true})
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={() => handleClick(LOGIN_ROUTE)}
                sx={{fontSize: '0.8rem', color: theme.palette.secondary.contrastText}}>
        Вход
      </MenuItem>
      <MenuItem onClick={() => handleClick(REGISTRATION_ROUTE)}
                sx={{fontSize: '0.8rem', color: theme.palette.secondary.contrastText}}>
        Регистрация
      </MenuItem>
    </Menu>
  );
};

export default AuthMenu;