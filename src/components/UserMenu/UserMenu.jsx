import { useAuth } from 'hooks/useAuth';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { logOutThunk } from 'redux/auth/operations';

import { Flex, Icon, Button, Text } from '@chakra-ui/react';
import { LuLogOut } from 'react-icons/lu';
import { BsFillPersonCheckFill } from 'react-icons/bs';

export const UserMenu = () => {
  const dispatch = useDispatch();

  const {
    user: { name },
    isAuthWaiting,
  } = useAuth();

  const handleLogOut = () => {
    dispatch(logOutThunk());
  };
  return (
    <Flex gap={4} justifyContent="flex-end" align="center">
      <Icon as={BsFillPersonCheckFill} boxSize={6} />
      <Text fontSize={20}>{name}</Text>
      <Button type="button" onClick={handleLogOut} p={1} variant="outline">
        <Icon as={LuLogOut} boxSize={6} />
        {isAuthWaiting && <RotatingLines strokeColor="purple" width="15" />}
      </Button>
    </Flex>
  );
};
