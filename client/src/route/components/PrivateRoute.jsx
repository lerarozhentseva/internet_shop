import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../constants";
import {Context} from "../../index";

export const PrivateRoute = ({children}) => {
  //const {user} = useContext(Context)

  if (localStorage.getItem('token') == null) {
    return <Navigate to={LOGIN_ROUTE} replace/>;
  }

  return <>{children}</>;
};