import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ProductModel from "../Models/Products";
import config from "../Utils/Config";

export function getProducts() {
    return  new  Promise<{ data: ProductModel[] }>(async (resolve) =>
       resolve(
        {data : (await axios.get<ProductModel[]>(config.productsUrl)).data}
        ));
  }
  
export const get_allAsync = createAsyncThunk(
'products/getProducts',
async () => {
    const response = await axios.get<ProductModel[]>(config.productsUrl);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
}
);