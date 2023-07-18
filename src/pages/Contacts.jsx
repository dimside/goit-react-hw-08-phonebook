import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import { RotatingLines } from 'react-loader-spinner';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { getContactsThunk } from 'redux/contacts/operations';

export const Contacts = () => {
  const dispatch = useDispatch();
  const {
    isLoading: { isLoadingAll },
  } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      {isLoadingAll ? (
        <strong>
          Loading...
          <RotatingLines strokeColor="purple" width="30" />
        </strong>
      ) : (
        <>
          <h2>Contacts</h2>
          <Filter />
        </>
      )}

      <ContactList />
    </div>
  );
};
