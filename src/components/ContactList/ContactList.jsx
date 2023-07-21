import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectContacts, selectSortedContacts } from 'redux/contacts/selectors';
import { selectFilter } from 'redux/contacts/selectors';
import { deleteContactThunk } from 'redux/contacts/operations';

import { Contact } from 'components/Contact/Contact';

import {  Flex, Button } from '@chakra-ui/react';


export const ContactList = () => {
  const [deletedId, setDeletedId] = useState(null);
  const [isSorted, setIsSorted] = useState(false);

  const filter = useSelector(selectFilter);
  const { items: contacts } = useSelector(selectContacts);

  const sortedContacts = useSelector(selectSortedContacts);

  const contactsForRender = isSorted ? sortedContacts : contacts;

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contactsForRender.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
  });

  const dispatch = useDispatch();

  const handleContactDelete = contactId => {
    setDeletedId(contactId);
    dispatch(deleteContactThunk(contactId));
  };

  const toggleSort = () => {
    setIsSorted(prev => !prev);
  };

  return (
    <Flex
      direction="column"
      gap={4}
      sx={{ outline: '1px solid grey', borderRadius: '10px' }}
      p={6}
      background="rgba(180, 255, 255, 0.4)"
      boxShadow="0px 8px 30px rgba(12, 4, 35, 0.9)"
    >
      <Button
        type="button"
        onClick={toggleSort}
        variant="outline"
        size="md"
        w="100px"
        borderRadius={20}
        fontSize={22}
        background="#51AC9F"
        _hover={{ backgroundColor: '#C5848D' }}
      >
        Sort
      </Button>
      <Flex as="ul" direction="column" gap={3}>
        {filteredContacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
            deletedId={deletedId}
            onContactDelete={handleContactDelete}
          />
        ))}
      </Flex>
    </Flex>
  );
};
