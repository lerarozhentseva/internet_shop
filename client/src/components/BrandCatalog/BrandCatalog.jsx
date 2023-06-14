import React, {useContext, useEffect} from 'react';
import {Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {DEVICES_ROUTE} from "../../route/constants";
import {getDevicesByBrand} from "../../http/deviceAPI";

const BrandCatalog = ({id, title}) => {
  const {device} = useContext(Context);

  return (
    <Paper>
      <Link to={`${DEVICES_ROUTE}/${id}`}><Typography>{title}</Typography></Link>
    </Paper>
  );
};

export default BrandCatalog;