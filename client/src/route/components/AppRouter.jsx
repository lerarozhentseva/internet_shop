import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {
  BASKET_ROUTE, BRANDS, CONTACTS,
  DEVICE_ROUTE, DEVICES_ROUTE, ERROR,
  LOGIN_ROUTE,
  MAINSHOP_ROUTE, PAY_DELIVERY, PRIVATE_ROOM_ROUTE,
  REGISTRATION_ROUTE
} from "../constants";
import MainShopPage from "../../pages/MainShopPage/MainShopPage";
import DevicePage from "../../pages/DevicePage/DevicePage";
import BasketPage from "../../pages/BasketPage/BasketPage";
import PrivateRoom from "../../pages/PrivateRoom/PrivateRoom";
import {PrivateRoute} from "./PrivateRoute";
import LoginPage from "../../pages/AuthPages/LoginPage/LoginPage";
import RegistrationPage from "../../pages/AuthPages/RegistrationPage/RegistrationPage";
import {PublicRoute} from "./PublicRoute";
import ContactsPage from "../../pages/ContactsPage/ContactsPage";
import PayAndDeliveryPage from "../../pages/PayAndDeliveryPage/PayAndDeliveryPage";
import BrandsPage from "../../pages/BrandsPage/BrandsPage";
import DevicesPage from "../../pages/DevicesPage/DevicesPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path={LOGIN_ROUTE}
        element={
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        }
      />
      <Route
        path={REGISTRATION_ROUTE}
        element={
          <PublicRoute>
            <RegistrationPage/>
          </PublicRoute>
        }
      />
      <Route
        path={MAINSHOP_ROUTE}
        element={<MainShopPage/>}
      />
      <Route path={`${DEVICE_ROUTE}/:id`} element={<DevicePage/>}/>
      <Route path={PAY_DELIVERY} element={<PayAndDeliveryPage/>}/>
      <Route path={CONTACTS} element={<ContactsPage/>}/>

      <Route
        path={BASKET_ROUTE}
        element={
          <PrivateRoute>
            <BasketPage/>
          </PrivateRoute>
        }
      />
      <Route path={PRIVATE_ROOM_ROUTE} element={<PrivateRoute>{<PrivateRoom/>}</PrivateRoute>}/>
      <Route path={`${BRANDS}/:id`} element={<BrandsPage/>}/>
      <Route path={`${DEVICES_ROUTE}/:id`} element={<DevicesPage/>}/>
      <Route path={ERROR} element={<MainShopPage/>}/>
    </Routes>
  );
};

export default AppRouter;