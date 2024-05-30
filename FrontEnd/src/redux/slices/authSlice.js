import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  password: '',
  token: '',
  error: '',
  isAuthenticated: false,
  darkTheme: false,
};

// Acción asíncrona para manejar el login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
    
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        return {user:email,token:data.access_token,password:password};
      } else {
        return rejectWithValue(data.message);
      }

    } catch (error) {
      return rejectWithValue('Error en la red');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token;
    try {
      const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return true;
      } else {
        console.log(data.message)
        return rejectWithValue(data.message);
      }

    } catch (error) {
      return rejectWithValue('Error en la red');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutL: (state) => {
      state.user = '';
      state.password = '';
      state.token = '';
      state.error = '';
      state.isAuthenticated = false;
    },
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token, password } = action.payload;
        state.user = user;
        state.password = password;
        state.token = token;
        state.isAuthenticated = true;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || 'Error en la red';
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled,(state,action)=>{
        state.user = '';
      state.password = '';
      state.token = '';
      state.error = '';
      state.isAuthenticated = false;
      });
  },
});

export const {  logoutL, toggleTheme } = authSlice.actions;
export default authSlice.reducer;
