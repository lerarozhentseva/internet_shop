import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";

const Dialog = ({handleClose, open, Transition, deviceOne, goToBasket}) => {
  return (
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
  );
};

export default Dialog;