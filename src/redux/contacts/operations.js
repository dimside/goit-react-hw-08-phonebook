import { createAsyncThunk } from '@reduxjs/toolkit';
import { getContacts, postContact, deleteContact, editContact } from 'services';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await getContacts();
    } catch (error) {
      toast.warn(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const res = await postContact(contact);
      toast.success(`${res.name} added to contacts`);
      return res;
    } catch (error) {
      toast.warn(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const res = await deleteContact(id);
      toast.info(`${res.name} deleted from contacts`);
      return res;
    } catch (error) {
      toast.warn(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContactThunk = createAsyncThunk(
  'contacts/editContact',
  async ({ id, contact }, thunkAPI) => {
    try {
      const res = await editContact(id, contact);
      toast.info(`Contact ${res.name} changed`);
      return res;
    } catch (error) {
      console.log('errorEdit', error);
      toast.warn(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
