import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { FcContacts } from 'react-icons/fc';
import { PiPhoneCallDuotone } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RotatingLines } from 'react-loader-spinner';

import { selectContacts } from 'redux/contacts/selectors';

import { Flex, Button, Icon, Text, Link } from '@chakra-ui/react';
import { EditModal } from 'components/Modal/Modal';

export const Contact = ({
  contact,
  onContactDelete,
  deletedId,
  onChangeId,
  changedId,
}) => {
  const { name, number: phone, id } = contact;
  const {
    isLoading: { isDeleting },
  } = useSelector(selectContacts);

  return (
    <Flex as="li" align="center">
      <Flex w={370} textTransform="capitalize">
        <Icon as={FcContacts} marginRight={2} boxSize={6} />{' '}
        <Text fontSize={22} fontWeight="bold">
          {name}
        </Text>
      </Flex>
      <Flex grow={1}>
        <Icon as={PiPhoneCallDuotone} marginRight={2} boxSize={6} />
        <Link
          href={`tel:${phone}`}
          fontSize={22}
          fontWeight="medium"
          textDecoration="underline"
        >
          {' '}
          {phone}
        </Link>
      </Flex>
      <EditModal
        contact={contact}
        changedId={changedId}
        onChangeId={onChangeId}
      />
      <Button
        type="button"
        onClick={() => onContactDelete(id)}
        variant="outline"
        px={2}
      >
        <Icon as={RiDeleteBin6Line} boxSize={6} color="red" />
        {isDeleting && id === deletedId && (
          <RotatingLines strokeColor="red" width="16" />
        )}
      </Button>
    </Flex>
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
  deletedId: PropTypes.string.isRequired,
  changedId: PropTypes.string.isRequired,
  onContactDelete: PropTypes.func.isRequired,
  onChangeId: PropTypes.func.isRequired,
};
