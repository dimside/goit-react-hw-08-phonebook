import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = token;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const createUser = async userFormData => {
  const { data } = await axios.post('/users/signup', userFormData);
  setAuthHeader(data.token);
  return data;
};

export const userLogIn = async credentials => {
  const { data } = await axios.post('/users/login', credentials);
  setAuthHeader(data.token);
  return data;
};

export const userLogOut = async () => {
  await axios.post('/users/logout');
  clearAuthHeader();
};

export const getCurrentUser = async () => {
  const { data } = await axios.get('/users/current');
  return data;
};
