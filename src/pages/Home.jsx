import { Link as ReachLink } from 'react-router-dom';
import { Box, Text, Flex, Container, Link } from '@chakra-ui/react';

import { useAuth } from 'hooks/useAuth';


export const Home = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Box as="main" paddingTop={20} h="100vh">
      <Container maxW="container.md">
        <Flex
          direction="column"
          align="center"
          color="#ba001b"
          textShadow="1px 1px 2px rgba(255,255,255,0.8)"
        >
          <Text as="h1" fontWeight="bold" fontSize={46}>
            Phonebook application{' '}
          </Text>

          <Text fontSize={28}>Welcome to the contact storage app.</Text>
          {!isLoggedIn && (
            <Text fontSize={28}>
              To use the application you need to{' '}
              {
                <Link as={ReachLink} to="register" fontWeight="bold">
                  Register
                </Link>
              }{' '}
              or{' '}
              {
                <Link as={ReachLink} to="login" fontWeight="bold">
                  Login
                </Link>
              }
            </Text>
          )}
        </Flex>
      </Container>
    </Box>
  );
};
