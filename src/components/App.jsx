import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { selectContacts } from 'redux/contactsSlice';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const {
    isLoading: { isLoadingAll },
  } = useSelector(selectContacts);
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
