import { useAuth } from 'hooks/useAuth';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { logOutThunk } from 'redux/auth/operations';

export const UserMenu = () => {
  const dispatch = useDispatch();

  const {
    user: { name },
    isAuthWaiting,
  } = useAuth();

  const handleLogOut = () => {
    dispatch(logOutThunk());
  };
  return (
    <div>
      <p>{name}</p>
      <button type="button" onClick={handleLogOut}>
        Logout{' '}
        {isAuthWaiting && <RotatingLines strokeColor="purple" width="10" />}
      </button>
    </div>
  );
};
