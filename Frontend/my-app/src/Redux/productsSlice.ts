import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import ProductModel from '../Models/Products';
import productsAPI, { CategoriesModel } from '../API/ProductsAPI';

export interface productsList {
  productsList: ProductModel[];
  categoriesList: CategoriesModel[];
  lastUpdate: Number;
}

const initialState: productsList = {
  productsList: [],
  categoriesList: [],
  lastUpdate: new Date().getTime(),
};


export const get_allAsync = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await productsAPI.getProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getCategoriesAsync = createAsyncThunk(
  'products/getCategories',
  async () => {
    const response = await productsAPI.getCategories();
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
    updateProducts: (state, action: PayloadAction<ProductModel[]>) => {
      console.log('updateProducts');
      action.payload.map((newProduct:ProductModel) => {
        const oldProductList = state.productsList.filter((oldProduct) =>oldProduct.id === newProduct.id)
        if (oldProductList){
          const oldProduct:ProductModel = oldProductList[0]
          oldProduct.amount = newProduct.amount
        } 
        return null;
      })
    }
  },
  
  extraReducers: (builder) => {
    builder
    .addCase(get_allAsync.fulfilled, (state, action) => {
      // console.log('Success')
      state.lastUpdate = new Date().getTime();
      state.productsList = action.payload;
    })
    .addCase(get_allAsync.pending, (state) => {
      // console.log('Waiting');
    })
    .addCase(get_allAsync.rejected, (state,action) => {
      console.log(action.error?.message);
      console.log('Failed');
    })

    .addCase(getCategoriesAsync.fulfilled, (state, action) => {
      state.lastUpdate = new Date().getTime();
      state.categoriesList = action.payload;
    })
    .addCase(getCategoriesAsync.pending, (state) => {
      // console.log('Waiting');
    })
    .addCase(getCategoriesAsync.rejected, (state,action) => {
      console.log(action.error?.message);
      console.log('Failed');
    });
  },
});

export const { increment, decrement, addProduct, updateProducts } = productsSlice.actions;


export const selectProducts = (state: RootState) => state.products.productsList;
export const selectCategories= (state: RootState) => state.products.categoriesList;
export const selectLastUpdate = (state: RootState) => state.products.lastUpdate;



export default productsSlice.reducer;
