import { useDispatch } from "react-redux";
import { RotatingLines } from 'react-loader-spinner';
import { registerAuthThunk } from "redux/auth/operations";
import { useAuth } from "hooks/useAuth";


export const RegisterForm = () => {
  const dispatch = useDispatch()
  const { isAuthWaiting } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = {
            name: form.elements.name.value,
            email: form.elements.email.value,
            password: form.elements.password.value,
        }
        dispatch(registerAuthThunk(formData));
        form.reset()
    }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input type="text" name="name" />
      </label>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Password
        <input type="password" name="password" />
      </label>
      <button type="submit">
        Register
        {isAuthWaiting && <RotatingLines strokeColor="purple" width="10" />}
      </button>
    </form>
  );
};
