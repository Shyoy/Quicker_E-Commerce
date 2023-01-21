import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  decrement,
  increment,
  addProduct,
  get_allAsync,
  selectProducts,
  selectLastUpdate,
} from '../../../Redux/productsSlice';
import config from '../../../Utils/Config';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsList.css'


const ProductsList = () => {
  const products = useAppSelector(selectProducts);
  const lastUpdate = useAppSelector(selectLastUpdate);
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<String>("")

  useEffect(() => {
    setDate(new Date(lastUpdate.valueOf()).toDateString())
  },[lastUpdate])
  useEffect(() => {
    dispatch(get_allAsync())
  },[]);
  return (
    <div className='ProductsList'>
      <h1>ProductsList Updated on -{products.length}</h1>
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