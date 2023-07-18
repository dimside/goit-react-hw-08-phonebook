import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  createUser,
  getCurrentUser,
  setAuthHeader,
  userLogIn,
  userLogOut,
} from 'services';

export const registerAuthThunk = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      return await createUser(formData);
    } catch (error) {
      toast.warn(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginAuthThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      return await userLogIn(credentials);
    } catch (error) {
      toast.warn(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await userLogOut();
    } catch (error) {
      toast.warn(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const {
        auth: { token },
      } = thunkAPI.getState();

      if (token) {
        setAuthHeader(token);
        return await getCurrentUser();
      }

      thunkAPI.abort();
    } catch (error) {
      toast.warn(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
