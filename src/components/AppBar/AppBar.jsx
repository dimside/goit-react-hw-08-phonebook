import { UserMenu } from '../UserMenu/UserMenu';
import { Navigation } from '../Navigation/Navigation';
import { AuthNav } from '../AuthNav/AuthNav';
import { useAuth } from 'hooks/useAuth';

import { Box, Container, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/ColorModeSwitcher';

export const AppBar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Box
      as="header"
      bgGradient="linear(to-l, #9F3242,  #C5848D)"
      p={3}
      boxShadow="0px 8px 30px rgba(12, 4, 35, 0.9)"
    >
      <Container maxW="container.md" mx="auto">
        <Flex align="center">
          <Navigation />
          {isLoggedIn ? (
            <Container>
              <UserMenu />
            </Container>
          ) : (
            <AuthNav />
          )}
          <ColorModeSwitcher />
        </Flex>
      </Container>
    </Box>
  );
};
