import { AsyncThunk, createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState} from '../app/store';
import cartAPI from '../API/CartAPI';
import ProductModel from '../Models/Products';
import { useSelector } from 'react-redux';

export interface cartItem{
  product:ProductModel,
  amount :number,
}

export interface cartList {
  inCart: cartItem[];
  sum: number;
  lastUpdate: Number;
}

const initialState: cartList = {
  inCart: [],
  sum: 0,
  lastUpdate: new Date().getTime(),
};


export const checkOut = createAsyncThunk(
  'cart/postCheckOut',
  async (arg:void ,ThunkAPI) => {
    const state:any = ThunkAPI.getState()
    const cart:cartItem[] = state['cart']['inCart']
    console.log(cart)
    const response = await cartAPI.postCheckOut(cart);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state, action: PayloadAction<{id:Number}>) => {
      let updateItem = state.inCart.filter((item) => item.product.id === action.payload.id)
      if (updateItem){
        if (updateItem[0].amount === updateItem[0].product.amount){
          console.log('amount not enough ')
          return;
        }
        updateItem[0].amount += 1
        state.sum += updateItem[0].product.price
        console.log(`+1 to ${updateItem[0].product.name}`)
      }
    },
    decrement: (state, action: PayloadAction<{id:Number}>) => {
      let updateItem = state.inCart.filter((item) => item.product.id === action.payload.id)
      if (updateItem){
        let index = state.inCart.indexOf(updateItem[0]);
        state.sum -= updateItem[0].product.price
        if (updateItem[0].amount <= 1){
          state.inCart.splice(index, 1);
          console.log(`${updateItem[0].product.name} was removed from cart`)
          return;
        }
        updateItem[0].amount -= 1
        console.log(`-1 to ${updateItem[0].product.name}`)
      }
    },

    addItem: (state:cartList, action: PayloadAction<ProductModel>) => {
      let currentItem: cartItem = {product:action.payload, amount:1}
      let oldItem = state.inCart.filter((item) => item.product.id === currentItem.product.id);
      if (oldItem.length < 1){
        console.log('Adding to cart');
        state.inCart.push(currentItem);
        state.sum += currentItem.product.price
      }
    },

    delItem: (state:cartList, action:PayloadAction<{id:Number}>) => {
      let currentItem = state.inCart.filter((item) => item.product.id === action.payload.id)
      if (currentItem){
        let index = state.inCart.indexOf(currentItem[0]);
        state.inCart.splice(index, 1);
        console.log('delete item');
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(checkOut.fulfilled, (state, action) => {
      console.log('Success')
      state.lastUpdate = new Date().getTime();
    
    })
    .addCase(checkOut.pending, (state) => {
      console.log('Waiting');
    })
    .addCase(checkOut.rejected, (state, action) => {
      console.log(action.error.message);
      console.log('Failed');
    });
  },
    
  });

export const { increment, decrement, addItem, delItem  } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectInCart = (state: RootState) => state.cart.inCart;
export const selectLastUpdate = (state: RootState) => state.cart.lastUpdate;
export const selectSumCart = (state: RootState) => state.cart.sum
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   async (): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(addProduct(amount));
//     }
//   };

export default cartSlice.reducer;
