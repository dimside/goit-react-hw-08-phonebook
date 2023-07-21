import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import { RotatingLines } from 'react-loader-spinner';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { getContactsThunk } from 'redux/contacts/operations';

import { Box, Container, Text } from '@chakra-ui/react';

export const Contacts = () => {
  const dispatch = useDispatch();
  const {
    isLoading: { isLoadingAll },
  } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  return (
    <Box as="main" py={10}>
      <Container maxW="container.md">
        <Text
          as="h2"
          textAlign="center"
          fontWeight="bold"
          fontSize={46}
          marginBottom={4}
          color="#ba001b"
          textShadow="1px 1px 2px rgba(255,255,255,0.8)"
        >
          Phonebook
        </Text>
        <ContactForm />
        {isLoadingAll ? (
          <strong>
            Loading...
            <RotatingLines strokeColor="purple" width="30" />
          </strong>
        ) : (
          <>
            <Text
              as="h2"
              textAlign="center"
              fontWeight="bold"
              fontSize={46}
              my={4}
              color="#ba001b"
              textShadow="1px 1px 2px rgba(255,255,255,0.8)"
            >
              Contacts
            </Text>
            <Filter />
          </>
        )}
        <ContactList />
      </Container>
    </Box>
  );
};
