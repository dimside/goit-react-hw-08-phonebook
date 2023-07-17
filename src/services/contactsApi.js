import axios from 'axios';

axios.defaults.baseURL = 'https://64a964788b9afaf4844aa19d.mockapi.io/api/v1/';

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
