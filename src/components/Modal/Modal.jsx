import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Icon,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editContactThunk } from 'redux/contacts/operations';
import { LuEdit } from 'react-icons/lu';
import { RotatingLines } from 'react-loader-spinner';
import { selectContacts } from 'redux/contacts/selectors';

export const EditModal = ({
  contact: { name, number, id },
  onChangeId,
  changedId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contact, setContact] = useState({ name, number });
  const dispatch = useDispatch();

  const {
    isLoading: { isChanging },
  } = useSelector(selectContacts);

  const initialRef = React.useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    onChangeId(id);
    dispatch(editContactThunk({ id, contact }));
    onClose();
  };

  const handleChange = e => {
    const newData =
      e.target.name === 'name'
        ? { name: e.target.value }
        : { number: e.target.value };
    const newContact = { ...contact, ...newData };
    setContact(newContact);
  };
  return (
    <>
      <Button onClick={onOpen} variant="outline" px={2} mr={2}>
        <Icon as={LuEdit} boxSize={6} color="blue" />{' '}
        {isChanging && id === changedId && (
          <RotatingLines strokeColor="blue" width="16" />
        )}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor="rgba(180, 255, 255)"
          boxShadow="0px 8px 30px rgba(12, 4, 35, 0.9)"
        >
          <ModalHeader>Contact editor</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Edit name</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  placeholder="Name"
                  name="name"
                  required
                  value={contact.name}
                  onChange={handleChange}
                  backgroundColor="rgba(255, 255, 255)"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Edit number</FormLabel>
                <Input
                  type="tel"
                  pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  placeholder="Number"
                  name="number"
                  required
                  value={contact.number}
                  onChange={handleChange}
                  backgroundColor="rgba(255, 255, 255)"
                />
              </FormControl>
              <ModalFooter mt={4}>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

EditModal.protoTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  changedId: PropTypes.string.isRequired,
  onChangeId: PropTypes.func.isRequired,
};
