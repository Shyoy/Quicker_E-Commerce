import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import authAPI, { AuthForm } from '../API/AuthAPI';
import { LoginForm } from '../components/AuthArea/Login/Login';
import { RegisterForm } from '../components/AuthArea/Register/Register';
import jwt_decode from "jwt-decode";
import ProductModel from '../Models/Products';

export interface authList {
  tokenAccess: string;
  tokenRefresh: string;
  fullName: string;
  authWindow:boolean;
  isLogin: boolean;
  errMsg: string;
  status: 'idle' | 'loading' | 'failed';
  lastUpdate: Number;
}

const initialState: authList = {
  tokenAccess: '',
  tokenRefresh: '',
  fullName: '',
  authWindow: false,
  isLogin: false,
  errMsg:'',
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
export const tokenRefreshAsync = createAsyncThunk(
  'auth/tokenRefresh',
  async (token:string) => {
    const response = await authAPI.postRefresh(token);
    console.log('tokenRefresh sent successfully')
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const verifyTokenAsync = createAsyncThunk(
  'auth/verifyToken',
  async (args:void,ThunkAPI) => {
    const state:any = ThunkAPI.getState()
    const tokenAccess:string = state['auth']['tokenAccess']
    const tokenRefresh:string = state['auth']['tokenRefresh']
    let exp = jwt_decode<{exp:Date}>(tokenRefresh).exp
    await ThunkAPI.dispatch(tokenRefreshAsync(tokenRefresh))
    // const response = await authAPI.postRefresh(tokenRefresh);

    // The value we return becomes the `fulfilled` action payload
    // return response.data;
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.tokenAccess = '';
      state.tokenRefresh = '';
      state.fullName= '';
      state.isLogin = false;
      // state.productsList = [];
    },
    delMsg:(state)=>{
      state.errMsg = ''
    },
    openWindow:(state)=>{
      state.authWindow= true;

    },
    closeWindow:(state)=>{
      state.authWindow= false;
    },
    getToken:(state)=>{
      verifyTokenAsync()
      state.authWindow= false;
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
      state.errMsg = ''
      state.fullName = jwt_decode<{full_name:string}>(state.tokenAccess).full_name;

      
    })
    .addCase(registerAsync.pending, (state) => {
      
      state.status = 'loading';
    })
    .addCase(registerAsync.rejected, (state,action) => {
      if (action.error?.message == 'Rejected'){
        state.errMsg = 'Sorry there was an error connecting to the server'
      }
      else if (action.error?.message?.includes('UNIQUE')){
        state.errMsg = 'Sorry This email address is already taken'
      }
      else{
        state.errMsg = action.error?.message?.split('"')[3] || '';
      }
      console.log(state.errMsg);
      console.log(action.error?.message);
      state.status = 'failed';
    })
    .addCase(loginAsync.fulfilled, (state, action) => {
      state.lastUpdate = new Date().getTime();
      state.tokenAccess = action.payload.access;
      state.tokenRefresh = action.payload.refresh;
      state.status = 'idle';
      state.isLogin = true;
      state.errMsg = ''
      
      state.fullName = jwt_decode<{full_name:string}>(state.tokenAccess).full_name;
      
    })
    .addCase(loginAsync.pending, (state) => {
      
      state.status = 'loading';
    })
    .addCase(loginAsync.rejected, (state,action) => {
      if (action.error?.message == 'Rejected'){
        state.errMsg = 'Sorry there was an error connecting to the server'
      }
      else{
        state.errMsg = action.error?.message?.split('"')[3] || '';
      }
      console.log(state.errMsg);
      state.status = 'failed';
    })
    .addCase(tokenRefreshAsync.fulfilled, (state, action) => {
      state.lastUpdate = new Date().getTime();
      state.tokenAccess = action.payload.access;
      state.status = 'idle';
      state.isLogin = true;
      state.errMsg = ''
      
      state.fullName = jwt_decode<{full_name:string}>(state.tokenAccess).full_name;
      
    })
    .addCase(tokenRefreshAsync.rejected, (state,action) => {
      if (action.error?.message == 'Rejected'){
        state.errMsg = 'Sorry there was an error connecting to the server'
      }
      else{
        state.errMsg = action.error?.message?.split('"')[3] || '';
        logout()
        console.log(state.isLogin);

      }
      console.log(state.errMsg);
      state.status = 'failed';
    });
  },
});

export const { logout, delMsg,openWindow,closeWindow } = authSlice.actions;



export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectTokenAccess = (state: RootState) => state.auth.tokenAccess;
export const selectFullName = (state: RootState) => state.auth.fullName;
export const selectAuthWindow = (state: RootState) => state.auth.authWindow;
export const selectErrMsg = (state: RootState) => state.auth.errMsg;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectLastUpdate = (state: RootState) => state.auth.lastUpdate;


export const getToken =
  (): AppThunk =>
  (dispatch, getState) => {
    const tokenAccess = getState().auth.tokenAccess
    const tokenRefresh = getState().auth.tokenRefresh
    // dispatch(tokenRefreshAsync(tokenRefresh));
    let exp = jwt_decode<{exp:Date}>(tokenRefresh).exp
    console.log(exp);

    // if (jwt_decode(tokenRefresh). < Date.now() / 1000) {
    //   next(action);
    //   localStorage.clear();
    // }
    // const currentValue = selectInCart(getState());
    // if (currentValue % 2 === 1) {
    // }
    return 'new Token' + tokenAccess
  };

export default authSlice.reducer;
