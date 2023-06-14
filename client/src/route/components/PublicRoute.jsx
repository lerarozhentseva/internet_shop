import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import {Context} from "../../index";
import {PRIVATE_ROOM_ROUTE} from "../constants";

export const PublicRoute = ({children}) => {
  //const {user} = useContext(Context)

  if (localStorage.getItem('token') != null) {
    return <Navigate to={PRIVATE_ROOM_ROUTE} replace/>;
  }

  return <>{children}</>;
};
