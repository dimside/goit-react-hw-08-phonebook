import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { FcContacts } from 'react-icons/fc';
import { PiPhoneCallDuotone } from 'react-icons/pi';
import { RotatingLines } from 'react-loader-spinner';

import { selectContacts } from 'redux/contacts/selectors';

import css from './Contact.module.css';

export const Contact = ({ contact, onContactDelete, deletedId }) => {
  const { name, number: phone, id } = contact;
  const {
    isLoading: { isDeleting },
  } = useSelector(selectContacts);
  return (
    <li className={css.contact_list_item}>
      <div>
        <div className={css.contact_info}>
          <span className={css.contact_list_item_name}>
            <FcContacts /> {name}:
          </span>
          <div className={css.phone_info}>
            <PiPhoneCallDuotone />
            <a href={`tel:${phone}`}> {phone}</a>
          </div>
        </div>
        <button type="button" onClick={() => onContactDelete(id)}>
          Delete
          {isDeleting && id === deletedId && (
            <RotatingLines strokeColor="red" width="16" />
          )}
        </button>
      </div>
    </li>
  );
};

Contact.protoTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onContactDelete: PropTypes.func.isRequired,
};
