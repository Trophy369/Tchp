// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signin, getUser, signout } from '../services'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
  };
  
  // Create the user slice
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action) {
        state.user = action.payload;
        state.error = null;
      },
      setError(state, action) {
        state.error = action.payload;
      },
      clearError(state) {
        state.error = null;
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      signInUser(state, action) {
        state.loading = true;
        state.error = null;
      },
      signInUserSuccess(state, action) {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      },
      signInUserFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        localStorage.removeItem('user');
      },
      checkAuthStatus(state) {
        state.loading = true;
        state.error = null;
      },
      checkAuthStatusSuccess(state, action) {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      },
      checkAuthStatusFailure(state, action) {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        localStorage.removeItem('user');
      },
      signOutUser(state) {
        state.loading = true;
        state.error = null;
      },
      signOutUserSuccess(state) {
        state.loading = false;
        state.user = null;
        localStorage.removeItem('user');
      },
      signOutUserFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      }
    }
  });
  
  // Export actions
  export const {
    setUser,
    setError,
    clearError,
    setLoading,
    signInUser,
    signInUserSuccess,
    signInUserFailure,
    checkAuthStatus,
    checkAuthStatusSuccess,
    checkAuthStatusFailure,
    signOutUser,
    signOutUserSuccess,
    signOutUserFailure
  } = userSlice.actions;
  
  // Async actions
  export const signInUserAsync = (emailInput, passwordInput) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await signin(emailInput, passwordInput);
      const {data, error} = response
      if (data.id) {
        dispatch(setUser(data));
        localStorage.setItem('user', JSON.stringify(data));
      } else {
        dispatch(setError(data.message || 'Login failed.'));
        localStorage.removeItem('user');
      }
    } catch (error) {
      dispatch(setError('An error occurred during sign-in.'));
      console.error('Sign-in error:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
//   export const signInUserAsync = (emailInput, passwordInput) => async dispatch => {
//     dispatch(signInUser());
//     try {
//       const { data, error } = await signin(emailInput, passwordInput);
//       if (error) {
//         dispatch(signInUserFailure(error));
//       } else {
//         dispatch(signInUserSuccess(data));
//       }
//     } catch (error) {
//       dispatch(signInUserFailure('An error occurred during sign-in.'));
//     }
//   };
  
  export const checkAuthStatusAsync = () => async dispatch => {
    dispatch(checkAuthStatus());
    try {
      const response = await getUser();
      if (response.id) {
        dispatch(checkAuthStatusSuccess(response));
      } else {
        dispatch(checkAuthStatusFailure('No user is currently authenticated.'));
      }
    } catch (error) {
      dispatch(checkAuthStatusFailure('Failed to check authentication status.'));
    }
  };
  
  export const signOutUserAsync = () => async dispatch => {
    dispatch(signOutUser());
    try {
      await signout();
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure('Failed to sign out.'));
    }
  };
  
  export default userSlice.reducer;
