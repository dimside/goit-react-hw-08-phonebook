import { useSelector } from 'react-redux';
import {
  selectIsAuthWaiting,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
  selectUser,
} from 'redux/auth/selectors';

export const useAuth = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isAuthWaiting = useSelector(selectIsAuthWaiting);

  return {
    user,
    token,
    isLoggedIn,
    isRefreshing,
    isAuthWaiting,
  };
};
