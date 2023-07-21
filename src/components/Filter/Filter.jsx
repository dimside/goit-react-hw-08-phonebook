import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contacts/filterSlice';
import { selectFilter } from 'redux/contacts/selectors';

import { FormLabel, Flex, Input, Icon } from '@chakra-ui/react';
import { PiMagnifyingGlassDuotone } from 'react-icons/pi';
import { formStyle } from 'style/style';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const changeFilter = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };

  return (
    <Flex direction="column" align="center" marginBottom={8} sx={formStyle}>
      <FormLabel alignSelf="start" fontSize={28}>
        <Icon as={PiMagnifyingGlassDuotone} marginRight={2} />
        Find contacts by name
      </FormLabel>
      <Input
        type="text"
        value={filter}
        onChange={changeFilter}
        fontSize={22}
        fontWeight="medium"
      />
    </Flex>
  );
};
