import { createAsyncThunk } from '@reduxjs/toolkit';
import { getContacts, postContact, deleteContact } from 'services/contactsApi';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await getContacts();
    } catch (error) {
      toast.warn(error.message);
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      return await postContact(contact);
    } catch (error) {
      toast.warn(error.message);
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      return await deleteContact(id);
    } catch (error) {
      toast.warn(error.message);
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
