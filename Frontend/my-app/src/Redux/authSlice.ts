import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import authAPI, { AuthForm } from '../API/AuthAPI';
import { LoginForm } from '../components/AuthArea/Login/Login';
import { RegisterForm } from '../components/AuthArea/Register/Register';

export interface authList {
  tokenAccess: string;
  tokenRefresh: string;
  first_name: string;
  isLogin: boolean;
  status: 'idle' | 'loading' | 'failed';
  lastUpdate: Number;
}

const initialState: authList = {
  tokenAccess: '',
  tokenRefresh: '',
  first_name: '',
  isLogin: false,
  status: 'idle',
  lastUpdate: new Date().getTime(),
};


export const registerAsync = createAsyncThunk(
  'auth/register',
  async (form:RegisterForm) => {
    const response = await authAPI.register(form);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (form:LoginForm) => {
    const response = await authAPI.login(form);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      // state.productsList = [];
    },
    
    addProduct: (state, action: PayloadAction) => {
      // state.productsList.push(action.payload);
    },
    
  },
  
  extraReducers: (builder) => {
    builder
    .addCase(registerAsync.fulfilled, (state, action) => {
      state.lastUpdate = new Date().getTime();
      state.tokenAccess = action.payload.access;
      state.tokenRefresh = action.payload.refresh;
      state.status = 'idle';
      state.isLogin = true;
      
      
    })
    .addCase(registerAsync.pending, (state) => {
      
      state.status = 'loading';
    })
    .addCase(registerAsync.rejected, (state,action) => {
      console.log(action.error?.message);
      state.status = 'failed';
    })
    .addCase(loginAsync.fulfilled, (state, action) => {
      state.lastUpdate = new Date().getTime();
      state.tokenAccess = action.payload.access;
      state.tokenRefresh = action.payload.refresh;
      state.status = 'idle';
      state.isLogin = true;
      
      
    })
    .addCase(loginAsync.pending, (state) => {
      
      state.status = 'loading';
    })
    .addCase(loginAsync.rejected, (state,action) => {
      console.log(action.error?.message);
      state.status = 'failed';
    });
  },
});

export const { logout, addProduct } = authSlice.actions;



export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectTokenAccess = (state: RootState) => state.auth.tokenAccess;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectLastUpdate = (state: RootState) => state.auth.lastUpdate;



export default authSlice.reducer;
