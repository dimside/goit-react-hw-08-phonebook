import { useDispatch } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { loginAuthThunk } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';

import { FormLabel, Flex, Button, Input } from '@chakra-ui/react';
import {formStyle, inputStyle} from "style/style"


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
    <>
      <Flex
        as="form"
        direction="column"
        align="center"
        onSubmit={handleSubmit}
        sx={formStyle}
      >
        <FormLabel alignSelf="start" fontSize={28}>
          Email
        </FormLabel>
        <Input
          type="email"
          name="email"
          required
          marginBottom={4}
          sx={inputStyle}
        />

        <FormLabel alignSelf="start" fontSize={28}>
          Password
        </FormLabel>
        <Input
          type="password"
          name="password"
          required
          marginBottom={8}
          sx={inputStyle}
        />

        <Button
          type="submit"
          variant="outline"
          size="md"
          w="50%"
          borderRadius={20}
          fontSize={22}
          _hover={{ backgroundColor: '#C5848D' }}
        >
          Log In
          {isAuthWaiting && <RotatingLines strokeColor="purple" width="10" />}
        </Button>
      </Flex>
    </>
  );
};
