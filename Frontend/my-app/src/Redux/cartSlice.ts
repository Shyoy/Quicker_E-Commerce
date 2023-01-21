import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { getProducts } from '../API/ProductsAPI';
import ProductModel from '../Models/Products';
import axios from 'axios';
import config from '../Utils/Config';

export interface cartItem{
  id:number ,
  product:ProductModel,
  amount :number,
}

export interface cartList {
  inCart: cartItem[];
  lastUpdate: Number;
}

const initialState: cartList = {
  inCart: [],
  lastUpdate: new Date().getTime(),
};


// export const get_allAsync = createAsyncThunk(
//   'cart/getProducts',
//   async () => {
//     const response = await axios.get<ProductModel[]>(config.productsUrl);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state, action: PayloadAction<{id:Number}>) => {
      let id = action.payload.id
      state.inCart.filter((item) => item.id )
      
    },
    decrement: (state, action: PayloadAction<ProductModel>) => {
      state.inCart = [];
    },
    addItem: (state, action: PayloadAction<ProductModel>) => {
      console.log('addItem', state.inCart, action.payload.id);
      state.inCart.push({id:action.payload.id ,product:action.payload, amount:1});
      console.log(state.inCart);
    },
  },
  
  // extraReducers: (builder) => {
  //   builder
  //   .addCase(get_allAsync.fulfilled, (state, action) => {
  //     console.log('Success')
  //     state.lastUpdate = new Date().getTime();
  //     state.productsList = action.payload;
  //   })
  //   .addCase(get_allAsync.pending, (state) => {
  //     console.log('Waiting');
  //   })
  //   .addCase(get_allAsync.rejected, (state) => {
  //     console.log('Failed');
  //   });
  // },
});

export const { increment, decrement, addItem } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectInCart = (state: RootState) => state.cart.inCart;
export const selectLastUpdate = (state: RootState) => state.cart.lastUpdate;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(addProduct(amount));
//     }
//   };

export default cartSlice.reducer;
