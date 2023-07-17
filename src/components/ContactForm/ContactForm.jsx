import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';


import { selectContacts } from 'redux/contactsSlice';
import { addContactThunk } from 'redux/operations';

import css from './ContactForm.module.css';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const {
    items: contacts,
    isLoading: { isLoadingContact },
  } = useSelector(selectContacts);
  const formInfo = { name, phone: number };

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
      alert(`${formInfo.name} is already in contacts`);
    } else {
      dispatch(addContactThunk(formInfo));
    }

    setName('');
    setNumber('');
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={css.contact_form}>
        <label className={css.form_label}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
            className={css.form_input}
          />
        </label>
        <label className={css.form_label}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
            className={css.form_input}
          />
        </label>
        <button type="submit" className={css.form_button}>
          Add contact{' '}
          {isLoadingContact && <RotatingLines strokeColor="green" width="20" />}
        </button>
      </form>
    </div>
  );
};
