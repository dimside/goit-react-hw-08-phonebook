import { useAuth } from 'hooks/useAuth';
import { NavLink } from 'react-router-dom';

import { Flex, Link } from '@chakra-ui/react';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Flex gap={8} fontSize={28} fontWeight="bold" flexGrow={1}>
      <Link
        as={NavLink}
        to="/"
        _activeLink={{
          color: '#51AC9F',
          textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
        }}
      >
        Home
      </Link>
      {isLoggedIn && (
        <Link
          as={NavLink}
          to="/contacts"
          _activeLink={{
            color: '#51AC9F',
            textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
          }}
        >
          Contacts
        </Link>
      )}
    </Flex>
  );
};
