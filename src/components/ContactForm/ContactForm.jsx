import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { selectContacts } from 'redux/contacts/selectors';
import { addContactThunk } from 'redux/contacts/operations';

import { FormLabel, Flex, Button, Input } from '@chakra-ui/react';
import { formStyle, inputStyle } from 'style/style';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const {
    items: contacts,
    isLoading: { isLoadingContact },
  } = useSelector(selectContacts);
  const formInfo = { name, number };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isContactIncuded = contacts.some(({ name }) => {
      return name === formInfo.name;
    });

    if (isContactIncuded) {
      toast.warn(`${formInfo.name} is already in contacts`);
    } else {
      dispatch(addContactThunk(formInfo));
    }

    setName('');
    setNumber('');
  };

  return (
    <Flex
      as="form"
      direction="column"
      align="center"
      onSubmit={handleSubmit}
      sx={formStyle}
    >
      <FormLabel alignSelf="start" fontSize={28}>
        {' '}
        Name
      </FormLabel>

      <Input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
        marginBottom={4}
        sx={inputStyle}
      />

      <FormLabel alignSelf="start" fontSize={28}>
        Number
      </FormLabel>

      <Input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
        marginBottom={8}
        sx={inputStyle}
      />

      <Button
        type="submit"
        variant="outline"
        size="md"
        w="50%"
        borderRadius={20}
        fontSize={22}
        _hover={{ backgroundColor: '#C5848D' }}
      >
        Add contact{' '}
        {isLoadingContact && <RotatingLines strokeColor="green" width="20" />}
      </Button>
    </Flex>
  );
};
