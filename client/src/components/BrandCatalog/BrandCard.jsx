import React, {useContext} from 'react';
import CardContent from "@mui/material/CardContent";
import {Link, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import theme from "../../theme/theme";
import Card from "@mui/material/Card";
import {DEVICES_ROUTE} from "../../route/constants";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

const BrandCard = observer(({title, id, item}) => {
  const {device} = useContext(Context);
  const navigate = useNavigate();

  return (
    <Card sx={{
      maxWidth: 345,
      cursor: 'pointer',
      backgroundColor: theme.palette.primary.main, ...(toJS(item.id) === device.selectedBrand.id && {border: '2px solid white'})
    }} onClick={() => {
      device.setSelectedBrand(item);
      localStorage.setItem('selectedBrand', JSON.stringify(item));
      navigate(`${DEVICES_ROUTE}/${id}`, {replace: true});
    }}>
      <CardContent>
        <Link to={`${DEVICES_ROUTE}/${id}`} style={{
          textDecoration: 'none'
        }}><Typography variant="h6" sx={{
          color: theme.palette.primary.contrastText, ':hover': {
            textDecoration: 'underline',
          }
        }} textAlign={'center'}>{title}</Typography></Link>
      </CardContent>
    </Card>
  );
});

export default BrandCard;