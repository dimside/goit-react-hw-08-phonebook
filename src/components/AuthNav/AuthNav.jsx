import { NavLink } from 'react-router-dom';
import { Flex, Link } from '@chakra-ui/react';

export const AuthNav = () => {
  return (
    <Flex gap={4} justifyContent="flex-end" fontSize={22} fontWeight="bold">
      <Link as={NavLink} to="/register" _activeLink={{ color: 'blue' }}>
        Register
      </Link>
      <Link as={NavLink} to="/login" _activeLink={{ color: 'blue' }}>
        Log-In
      </Link>
    </Flex>
  );
};
