import { useEffect } from "react"
import { useParams,useNavigate} from "react-router-dom";
import {  useAppSelector } from "../../../app/hooks";
import { selectCategories, selectProducts } from "../../../Redux/productsSlice";
import ProductCard from "../ProductCard/ProductCard";
import "./Categories.css"

const Categories = () => {
    const navigate  = useNavigate()
    let { name } = useParams();

    const categories = useAppSelector(selectCategories);
    const products = useAppSelector(selectProducts);
    const category = categories.filter(c => c.name === name)[0] || null
    useEffect(()=>{
      console.log(categories)
      if ((categories.length > 0)&& (!category)){
        console.log('categories')
        navigate('404notfound/')
      }
      
    },[categories,name,navigate])

  return (
    
    <div className="Categories">
        
        {category &&<>
        <h1>Categories</h1> 
        <h2>{name}</h2>
        <div className="container">

        {products.filter(product => category.products.includes(product.id)).map(product => 
        <ProductCard key={product.id} product={product} />)}
        
        </div></>}
        
    </div>
  )
}

export default Categories