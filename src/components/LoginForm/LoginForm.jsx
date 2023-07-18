import { useDispatch } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { loginAuthThunk } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { isAuthWaiting } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const credentials = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };
    dispatch(loginAuthThunk(credentials));
    form.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">
        Log In
        {isAuthWaiting && <RotatingLines strokeColor="purple" width="10" />}
      </button>
    </form>
  );
};
