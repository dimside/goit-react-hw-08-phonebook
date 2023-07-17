import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectContacts, selectSortedContacts } from 'redux/contactsSlice';
import { selectFilter } from 'redux/filterSlice';
import { getContactsThunk, deleteContactThunk } from 'redux/operations';

import { Contact } from 'components/Contact/Contact';
import css from './ContactList.module.css';


export const ContactList = () => {
  const [deletedId, setDeletedId] = useState(null)
  const [isSorted, setIsSorted] = useState(false)

  const filter = useSelector(selectFilter);
  const { items: contacts } = useSelector(selectContacts);
  
  const sortedContacts = useSelector(selectSortedContacts);
  

  const contactsForRender = isSorted ? sortedContacts : contacts;

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contactsForRender.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const handleContactDelete = contactId => {
    setDeletedId(contactId);
    dispatch(deleteContactThunk(contactId));
  };

  const toggleSort = () => {
    setIsSorted(prev => !prev);
  }

  return (
    <div>
      <button type="button" onClick={toggleSort} className={css.sort_button}>
        Sort
      </button>
      <ul className={css.contact_list}>
        {filteredContacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
            deletedId={deletedId}
            onContactDelete={handleContactDelete}
          />
        ))}
      </ul>
    </div>
  );
};
