import axios from "axios";
import ProductModel from "../Models/Products";
import config from "../Utils/Config";

export interface CategoriesModel{
    name: string;
    products: Array<number>;
    
  }

class ProductsAPI{

    public async getProducts() {
        return await new  Promise<{data: ProductModel[]}>(async (resolve,reject) =>{
            await axios.get<ProductModel[]>(config.productsUrl)
                .then((response) =>  resolve({data: response.data}))
                .catch((error) => reject(error))
          
        });
    }
    public async getCategories() {
        return await new  Promise<{data: CategoriesModel[]}>(async (resolve,reject) =>{
            await axios.get<CategoriesModel[]>(config.categoriesUrl)
                .then((response) =>  resolve({data: response.data}))
                .catch((error) => reject(error))
          
        });
    }
    public async editProduct(id:string, form:FormData) {
        return await new  Promise<{data: ProductModel}>(async (resolve,reject) =>{
            console.log(form);
            await axios.put<ProductModel>(config.productsUrl+'/'+id, form)
                .then((response) =>  resolve({data: response.data}))
                .catch((error) => reject(error))
          
        });
    }

}


const productsAPI = new ProductsAPI();
export default productsAPI