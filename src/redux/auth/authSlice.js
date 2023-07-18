import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  registerAuthThunk,
  loginAuthThunk,
  logOutThunk,
  getCurrentUserThunk,
} from './operations';

const initialState = {
  user: {
    userName: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isAuthWaiting: false,
  isRefreshing: false,
};

const handleAuthFulfilled = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
  state.isAuthWaiting = false;
};
const handleAuthWaiting = status => {
  switch (status) {
    case 'true':
      return state => {
        state.isAuthWaiting = true;
      };
    case 'false':
      return state => {
        state.isAuthWaiting = false;
      };
    default:
      return;
  }
};
const handleLogOutFulfilled = state => {
  state.user = null;
  state.token = null;
  state.isLoggedIn = false;
  state.isAuthWaiting = false;
};
const handleRefreshingPending = status => {
  switch (status) {
    case 'true':
      return state => {
        state.isRefreshing = true;
      };
    case 'false':
      return state => {
        state.isRefreshing = false;
      };
    default:
      return;
  }
};
const handleGetUserFulfilled = (state, { payload }) => {
  state.user = payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      // .addCase(registerAuthThunk.pending, handleAuthWaiting('true'))
      // .addCase(registerAuthThunk.fulfilled, handleAuthFulfilled)
      // .addCase(registerAuthThunk.rejected, handleAuthWaiting('false'))
      // .addCase(loginAuthThunk.pending, handleAuthWaiting('true'))
      // .addCase(loginAuthThunk.fulfilled, handleAuthFulfilled)
      // .addCase(loginAuthThunk.rejected, handleAuthWaiting('false'))
      // .addCase(logOutThunk.pending, handleAuthWaiting('true'))
      .addCase(logOutThunk.fulfilled, handleLogOutFulfilled)
      .addCase(getCurrentUserThunk.pending, handleRefreshingPending('true'))
      .addCase(getCurrentUserThunk.fulfilled, handleGetUserFulfilled)
      .addCase(getCurrentUserThunk.rejected, handleRefreshingPending('false'))
      .addMatcher(
        isAnyOf(
          registerAuthThunk.pending,
          loginAuthThunk.pending,
          logOutThunk.pending
        ),
        handleAuthWaiting('true')
      )
      .addMatcher(
        isAnyOf(registerAuthThunk.fulfilled, loginAuthThunk.fulfilled),
        handleAuthFulfilled
      )
      .addMatcher(
        isAnyOf(
          registerAuthThunk.rejected,
          loginAuthThunk.rejected,
          logOutThunk.rejected
        ),
        handleAuthWaiting('false')
      );
  },
});

export const authReducer = authSlice.reducer;
