import {useState,useEffect} from 'react'


import { useAppSelector} from '../../../app/hooks';
import {
  selectProducts,
  selectLastUpdate,
} from '../../../Redux/productsSlice';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsList.css'


const ProductsList = () => {
  const products = useAppSelector(selectProducts);
  const lastUpdate = useAppSelector(selectLastUpdate);
  const [date, setDate] = useState<String>("")
  
 
  useEffect(() => {
    setDate(new Date(lastUpdate.valueOf()).toLocaleTimeString(navigator.language,
       {hour: '2-digit', minute:'2-digit',hour12:false}))
  },[lastUpdate])
  return (
    <div className='ProductsList'>
      <h1>ProductsList Updated on - {date}</h1>
        {products.length === 0? 
        <h2>There are no products</h2> 
        : 
        <div className="card-group">
          {products.map(product =>
            <ProductCard key={product.id} product={product} />)}
        </div>}
        
    

      
</div>
  )
}

export default ProductsList



// <li>
//             {product.name}
//           </li>
//           <li>
//             <img width={150} src={config.productImagesUrl+product.image}></img>
//           </li>
//           <li>
//             Price - {product.price}
//           </li>
//           <li>
//             Amount - {product.amount}
//           </li>
//           <hr />