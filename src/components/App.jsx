import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { SharedLayout } from './SharedLayout/SharedLayout';
import { Contacts } from 'pages/Contacts';
import { Register } from 'pages/Register';
import { Login } from 'pages/Login';
import { Home } from 'pages/Home';
import { getCurrentUserThunk } from 'redux/auth/operations';
import { PrivateRoute } from './PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { useAuth } from 'hooks/useAuth';

// import { Container } from '@chakra-ui/react';
// import bcg from 'images/bcgmin.jpg';

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  return (
    
    <>
      {/* // style={{
      //   backgroundImage: `linear-gradient(rgba(46, 47, 66, 0.7), rgba(46, 47, 66, 0.7)), url(${bcg})`,
      // }} */}
    
      {!isRefreshing && (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route
              path="contacts"
              element={
                <PrivateRoute component={<Contacts />} redirection="/login" />
              }
            />
            <Route
              path="register"
              element={
                <RestrictedRoute
                  component={<Register />}
                  redirection="/contacts"
                />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute
                  component={<Login />}
                  redirection="/contacts"
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
};
