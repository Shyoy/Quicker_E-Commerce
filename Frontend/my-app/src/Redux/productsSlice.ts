import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import ProductModel from '../Models/Products';
import productsAPI, { CategoriesModel } from '../API/ProductsAPI';

export interface productsList {
  productsList: ProductModel[];
  categoriesList: CategoriesModel[];
  categoriesStatus: 'idle' | 'loading' | 'failed';
  productsStatus: 'idle' | 'loading' | 'failed';
  detailWindow: 'product'| 'add' | 'edit';
  lastUpdate: Number;
}

const initialState: productsList = {
  productsList: [],
  categoriesList: [],
  categoriesStatus: 'idle',
  productsStatus: 'idle',
  detailWindow: 'product',
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

export const editProductAsync = createAsyncThunk(
  'products/editProduct',
  async (form:FormData, ThunkAPI) => {
    if (form.has('id')){
      let id:string = form.get('id')?.toString()||'';
      form.delete('id');

      const response = await productsAPI.editProduct(id, form);
      console.log(response.data)
      // The value we return becomes the `fulfilled` action payload
      ThunkAPI.dispatch(updateProducts(Array(response.data)))
      return response.data;
      
    }
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
      action.payload.map((newProduct:ProductModel) => {
        const oldProductList = state.productsList.filter((oldProduct) =>oldProduct.id === newProduct.id)
        if (oldProductList){
          const oldProduct:ProductModel = oldProductList[0]
          
          oldProduct.amount = newProduct.amount
          oldProduct.price = newProduct.price
          oldProduct.image = newProduct.image
        } 
        return null;
      })
    },
    setDetailWindow: (state, action: PayloadAction<'product'| 'add' | 'edit'>) => {
      state.detailWindow = action.payload
    },
  },
  
  extraReducers: (builder) => {
    builder
    .addCase(get_allAsync.fulfilled, (state, action) => {
      // console.log('Success')
      state.lastUpdate = new Date().getTime();
      state.productsList = action.payload.filter((product) => product.amount > 0);
      state.productsStatus = 'idle';
    })
    .addCase(get_allAsync.pending, (state) => {
      state.productsStatus = 'loading';
    })
    .addCase(get_allAsync.rejected, (state,action) => {
      console.log(action.error?.message);
      state.productsStatus = 'failed';
    })
    .addCase(editProductAsync.fulfilled, (state, action) => {
      // console.log('Success')
      state.lastUpdate = new Date().getTime();
      state.detailWindow = 'product'
      state.productsStatus = 'idle';

    })
    .addCase(editProductAsync.pending, (state) => {
      state.productsStatus = 'loading';
    })
    .addCase(editProductAsync.rejected, (state,action) => {
      console.log(action.error?.message);
      state.productsStatus = 'failed';
    })

    .addCase(getCategoriesAsync.fulfilled, (state, action) => {
      state.lastUpdate = new Date().getTime();
      state.categoriesList = action.payload;
      state.categoriesStatus = 'idle';
    })
    .addCase(getCategoriesAsync.pending, (state) => {
      
      state.categoriesStatus = 'loading';
    })
    .addCase(getCategoriesAsync.rejected, (state,action) => {
      console.log(action.error?.message);
      state.categoriesStatus = 'failed';
    });
  },
});

export const { increment, decrement, addProduct, updateProducts, setDetailWindow } = productsSlice.actions;



export const selectProducts = (state: RootState) => state.products.productsList;
export const selectCategories= (state: RootState) => state.products.categoriesList;
export const selectProductsStatus = (state: RootState) => state.products.productsStatus;
export const selectCategoriesStatus = (state: RootState) => state.products.categoriesStatus;
export const selectDetailWindow = (state: RootState) => state.products.detailWindow;
export const selectLastUpdate = (state: RootState) => state.products.lastUpdate;



export default productsSlice.reducer;
