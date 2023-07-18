import { Outlet } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { AppBar } from '../AppBar/AppBar';

export const SharedLayout = () => {
  return (
    <div>
      <ToastContainer autoClose={2000} transition={Zoom} />
      <AppBar />
      <Outlet />
    </div>
  );
};
