import React from "react";
import { useEffect } from "react"
import { useParams,useNavigate, useLocation} from "react-router-dom";
import {  useAppSelector, useQuery } from "../../../app/hooks";
import ProductModel from "../../../Models/Products";
import { selectCategories, selectProducts } from "../../../Redux/productsSlice";
import ProductCard from "../ProductCard/ProductCard";
import "./SearchQuery.css"

const SearchQuery = () => {
    const navigate  = useNavigate()
    // let { query } = useParams();
    // let [name, setName] = useSearchParams();
    let query = useQuery();
    // const categories = useAppSelector(selectCategories);
    const products = useAppSelector(selectProducts);
    const name = query.get("name")|| '';
    let filteredProducts:ProductModel[] = products
    if (name !== ''){
        filteredProducts = filteredProducts.filter(product => product.name.includes(name))
    }

    // useEffect(()=>{
    //     console.log(products)
        
    //     if (name){
    //         let filteredProducts = products.filter(product =>  product.name.includes(name))
    //         console.log('SearchQuery')
        
    //   }
      
    // },[query,navigate])

  return (
    <div className="SearchQuery">
        
        {filteredProducts.length !== 0 ?
        <>{name !== '' ?
        <h1 className="m-4">Search Result for "{name}"</h1> 
        : 
        <h1 className="m-4">All The Products</h1> }
        </>
        :
        <h1 className="m-4">No Result found for "{name}" </h1>
        }

        
        <div className="container">
        {filteredProducts.length !== 0 &&
        <>
        {filteredProducts.map(product => 
            <ProductCard key={product.id} product={product} />)}

        </>}
        
        
        </div>
        
    </div>
    
  )
}

export default SearchQuery