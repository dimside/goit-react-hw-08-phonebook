import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  getContactsThunk,
  addContactThunk,
  deleteContactThunk,
} from './operations';

const initialState = {
  items: [],
  isLoading: {
    isLoadingAll: false,
    isLoadingContact: false,
    isDeleting: false,
  },
  error: null,
};

const thunks = [getContactsThunk, addContactThunk, deleteContactThunk];
const handleTypeThunks = type => thunks.map(el => el[type]);

const handlePending = type => {
  switch (type) {
    case 'isLoadingAll':
      return state => {
        state.isLoading.isLoadingAll = true;
      };
    case 'isLoadingContact':
      return state => {
        state.isLoading.isLoadingContact = true;
      };
    case 'isDeleting':
      return state => {
        state.isLoading.isDeleting = true;
      };
    default:
      return;
  }
};

const handleEndOfLoading = state => {
  state.isLoading.isLoadingAll = false;
  state.isLoading.isLoadingContact = false;
  state.isLoading.isDeleting = false;
};

const handleReject = (state, { payload }) => {
  handleEndOfLoading(state);
  state.error = payload;
};

const handleFulfilledLoadingAndError = state => {
  handleEndOfLoading(state);
  state.error = null;
};
const handleFulfilled = type => {
  switch (type) {
    case 'get':
      return (state, { payload }) => {
        state.items = payload;
      };
    case 'add':
      return (state, { payload }) => {
        state.items.unshift(payload);
      };
    case 'delete':
      return (state, { payload }) => {
        state.items = state.items.filter(({ id }) => id !== payload.id);
      };
    default:
      return;
  }
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.fulfilled, handleFulfilled('get'))
      .addCase(addContactThunk.fulfilled, handleFulfilled('add'))
      .addCase(deleteContactThunk.fulfilled, handleFulfilled('delete'))
      .addCase(getContactsThunk.pending, handlePending('isLoadingAll'))
      .addCase(addContactThunk.pending, handlePending('isLoadingContact'))
      .addCase(deleteContactThunk.pending, handlePending('isDeleting'))
      .addMatcher(isAnyOf(...handleTypeThunks('rejected')), handleReject)
      .addMatcher(
        isAnyOf(...handleTypeThunks('fulfilled')),
        handleFulfilledLoadingAndError
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
