import { LoginForm } from 'components/LoginForm/LoginForm';

import { Box, Container } from '@chakra-ui/react';

export const Login = () => {
  return (
    <Box as="main" py={10} h="100vh">
      <Container maxW="container.md">
        <LoginForm />
      </Container>
    </Box>
  );
};
