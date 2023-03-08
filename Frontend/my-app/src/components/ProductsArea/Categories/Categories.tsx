import { useEffect } from "react"
import { useParams,useNavigate} from "react-router-dom";
import {  useAppSelector } from "../../../app/hooks";
import ProductModel from "../../../Models/Products";
import { selectCategories, selectProducts } from "../../../Redux/productsSlice";
import ProductCard from "../ProductCard/ProductCard";
import "./Categories.css"

const Categories = () => {
    const navigate  = useNavigate()
    let { name } = useParams();

    const categories = useAppSelector(selectCategories);
    const products = useAppSelector(selectProducts);
    const category = categories.filter(c => c.name === name)[0] || null
    let productsByCategory:ProductModel[] = [];
    if (category) {
      productsByCategory = products.filter(product => category.products.includes(product.id))
    }
   
    useEffect(()=>{
      if ((categories.length > 0)&& (!category)){
        navigate('404notfound/')
      }
      
    },[categories,name,navigate])

  return (
    
    <div className="Categories">
        
        {category &&<>
        <h1>Categories</h1> 
        <h2 className="text-capitalize">{name}</h2>
        {productsByCategory.length === 0 ?
        <h4>There no products in this category yet</h4>
        :
        <>
        <div className="container">
        {productsByCategory.map(product => 
        <ProductCard key={product.id} product={product} />)}
        </div></>}
        </>
        }
        
    </div>
  )
}

export default Categories