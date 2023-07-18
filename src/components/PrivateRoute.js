import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

export const PrivateRoute = ({ component, redirection }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? component : <Navigate to={redirection} />;
};
