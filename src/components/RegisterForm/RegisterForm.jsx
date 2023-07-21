import { useDispatch } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { registerAuthThunk } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';

import { FormLabel, Flex, Button, Input } from '@chakra-ui/react';
import { formStyle, inputStyle } from 'style/style';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { isAuthWaiting } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
    };
    dispatch(registerAuthThunk(formData));
    form.reset();
  };
  return (
    <Flex
      as="form"
      direction="column"
      align="center"
      onSubmit={handleSubmit}
      sx={formStyle}
    >
      <FormLabel fontSize={28}>Username</FormLabel>
      <Input
        type="text"
        name="name"
        required
        marginBottom={4}
        sx={inputStyle}
      />
      <FormLabel fontSize={28}>Email</FormLabel>
      <Input
        type="email"
        name="email"
        required
        marginBottom={4}
        sx={inputStyle}
      />

      <FormLabel fontSize={24}>Password</FormLabel>
      <Input
        type="password"
        name="password"
        required
        sx={inputStyle}
        marginBottom={8}
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
        Register
        {isAuthWaiting && <RotatingLines strokeColor="purple" width="10" />}
      </Button>
    </Flex>
  );
};
