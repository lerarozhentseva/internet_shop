import React, {useState} from 'react';
import {Box, Button, FormControl, Input, InputAdornment, InputLabel, Typography} from "@mui/material";
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {Context} from "../../../index";
import {useForm} from "react-hook-form";
import {PRIVATE_ROOM_ROUTE} from "../../../route/constants";
import {login} from "../../../http/userAPI";
import theme from '../../../theme/theme';

const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validationSchema = yup.object({
  email: yup.string().required('Email must be required').matches(reg, 'Invalid email'),
  password: yup.string().required('Password must be required').matches(/\d{5,}/, 'Password must contain at least 5 digits'),
}).required();


const Form = observer(() => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema)
  });

  const {user} = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate()

  const loginClick = async () => {
    try {
      console.log('ok')
      let data;
      data = await login(email, password);
      user.setUser(data)
      user.setEmail(email);
      console.log(data)
      navigate(PRIVATE_ROOM_ROUTE, {replace: true})
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Box sx={{width: '500px'}}>
      <Typography variant={'h5'}>Вход</Typography>
      <form style={{display: 'flex', flexDirection: 'column'}}
            onSubmit={handleSubmit(loginClick)}>
        <FormControl sx={{m: 1, width: '460px'}} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Укажите Ваш E-mail</InputLabel>
          <Input
            value={email}
            {...register('email')}
            onChange={(e) => setEmail(e.target.value)}
            type={'text'}
            endAdornment={
              <InputAdornment position="end">
                <AttachEmailIcon/>
              </InputAdornment>
            }
          />
          <p>{errors?.email?.message}</p>
        </FormControl>
        <FormControl sx={{m: 1, width: '460px', mt: 3}} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
          <Input
            value={password}
            {...register('password')}
            onChange={(e) => setPassword(e.target.value)}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton sx={{mt: '-5px', mr: '-5px'}} onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
          />
          <p>{errors?.password?.message}</p>
        </FormControl>
        <Button type={'submit'} variant={'contained'} sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.primary.contrastText,
          width: '100px', mt: 4
        }}>Войти</Button>
      </form>
    </Box>
  );
});

export default Form;