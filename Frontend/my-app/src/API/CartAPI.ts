import axios from "axios";
import ProductModel from "../Models/Products";
import { cartItem} from "../Redux/cartSlice";
import config from "../Utils/Config";

export interface cartItemAPI{
    product:number,
    amount :number,
  }

class CartAPI{

    public async postCheckOut(fullCart:cartItem[],token:string) {
        return await new  Promise<{data: ProductModel[]}>(async (resolve,reject) =>{
            let auth = {headers:{ Authorization: `Bearer ${token}` }}
            console.log('Sending cart data')
            const fullCartAPI:cartItemAPI[] = []; 
            fullCart.map((item,i) => 
                fullCartAPI.push(
                    {product: item.product.id,amount:item.amount}))
            await axios.post<ProductModel[]>(config.checkOutUrl, fullCartAPI, auth)
                .then((response) =>  resolve({data: response.data}))
                .catch((error) => reject(error))
          
        });
    }

}


const cartAPI = new CartAPI();
export default cartAPI