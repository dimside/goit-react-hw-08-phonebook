import { RegisterForm } from "components/RegisterForm/RegisterForm";

import { Box, Container } from '@chakra-ui/react';


export const Register = () => {
  return (
    <Box as="main" py={10} h="100vh">
      <Container maxW="container.md">
        <RegisterForm />
      </Container>
    </Box>
  );
};


