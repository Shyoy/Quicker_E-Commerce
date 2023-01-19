import axios from "axios";
import ProductModel from "../Models/Products";
import config from "../Utils/Config";

export function getProducts() {
    return  new  Promise<{ data: ProductModel[] }>(async (resolve) =>
       resolve(
        {data : (await axios.get<ProductModel[]>(config.productsUrl)).data}
        ));
  }
  