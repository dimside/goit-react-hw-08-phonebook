import { Outlet } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { AppBar } from '../AppBar/AppBar';

import { Box } from '@chakra-ui/react';
import bcg from 'images/bcgmin.jpg';

export const SharedLayout = () => {
  return (
    <Box
      style={{
        backgroundImage: `linear-gradient(rgba(46, 47, 66, 0.8), rgba(46, 47, 66, 0.8)), url(${bcg})`,
      }}
      fontFamily="roboto"
      h="100%"
    >
      <ToastContainer autoClose={2000} transition={Zoom} />
      <AppBar />
      <Outlet />
    </Box>
  );
};
