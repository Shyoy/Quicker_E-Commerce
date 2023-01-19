import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { getProducts } from '../API/ProductsAPI';
import ProductModel from '../Models/Products';

export interface productsList {
  productsList: ProductModel[];
  lastUpdate: Number;
}

const initialState: productsList = {
  productsList: [],
  lastUpdate: new Date().getTime(),
};


export const get_allAsync = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await getProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      
      state.productsList = [];
    },
    decrement: (state) => {
      state.productsList = [];
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addProduct: (state, action: PayloadAction<ProductModel>) => {
      state.productsList.push(action.payload);
    },
  },
  
  extraReducers: (builder) => {
    builder
    .addCase(get_allAsync.fulfilled, (state, action) => {
      state.lastUpdate = new Date().getTime();
      state.productsList = action.payload;
    })
    // .addCase(get_allAsync.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(get_allAsync.rejected, (state) => {
    //   state.status = 'failed';
    // });
  },
});

export const { increment, decrement, addProduct } = productsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProducts = (state: RootState) => state.products.productsList;
export const selectLastUpdate = (state: RootState) => state.products.lastUpdate;

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

export default productsSlice.reducer;
