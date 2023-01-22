import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
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
      let updateItem = state.inCart.filter((item) => item.id === action.payload.id)
      if (updateItem){
        // let index = state.inCart.indexOf(updateItem[0]);
        if (updateItem[0].amount === updateItem[0].product.amount){
          console.log('amount not enough ')
          // state.inCart.splice(index, 1);
          console.log(current(updateItem[0]))
          return;
        }
        updateItem[0].amount += 1
        console.log('adding to ')
        // state.inCart[index] = updateItem[0]
        console.log(current(updateItem[0]))
      }
    },
    decrement: (state, action: PayloadAction<{id:Number}>) => {
      let updateItem = state.inCart.filter((item) => item.id === action.payload.id)
      if (updateItem){
        let index = state.inCart.indexOf(updateItem[0]);
        updateItem[0].amount -= 1
        if (updateItem[0].amount <= 0){
          state.inCart.splice(index, 1);
          return;
        }
        // state.inCart[index] = updateItem[0]
        console.log(current(updateItem[0]))
      }
    },

    addItem: (state:cartList, action: PayloadAction<ProductModel>) => {
      // console.log('addItem', current(state.inCart), action.payload.id);
      let currentItem: cartItem = {id:action.payload.id ,product:action.payload, amount:1}
      let oldItem = state.inCart.filter((item) => item.id === currentItem.id);
      if (oldItem.length < 1){
        console.log('Adding to cart');
        state.inCart.push(currentItem);
        
      }
      // console.log(i);
      console.log(current(state.inCart));
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

export const { increment, decrement, addItem  } = cartSlice.actions;

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
