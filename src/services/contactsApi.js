import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const getContacts = async () => {
  const { data } = await axios.get('contacts');
  return data;
};

export const postContact = async contact => {
  const { data } = await axios.post('contacts', contact);
  return data;
};

export const deleteContact = async id => {
  const { data } = await axios.delete(`contacts/${id}`);
  return data;
};

export const editContact = async (id, contact) => {
  const { data } = await axios.patch(`contacts/${id}`, contact);
  return data;
}