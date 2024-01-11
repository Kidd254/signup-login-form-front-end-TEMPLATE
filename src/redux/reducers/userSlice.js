import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import userRequests from '../../requests/userRequests';

const initialState = {
    user: null,
    loading: false,
    error: false,
    isAuthenticated: false,
    email: null
}

export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData, {rejectWithValue}) => {
        try{
        const response = await userRequests.createUsers(userData);
        return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (userData, {rejectWithValue}) => {
        try{
        const response = await userRequests.loginUsers(userData);
        return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'users/logout', 
    async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('email');
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  });

const userSlice = createSlice({
    name: 'users',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = false;
    })
    .addCase(createUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(logoutUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  }
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;