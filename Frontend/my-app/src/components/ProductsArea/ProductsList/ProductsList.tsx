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
    <div>
      <h1>ProductsList Updated on -{date}</h1>
      <div>
        {products.length === 0? 
        <h2>There are no products</h2> 
        : 
        <div>
          {products.map(product =>
          <ul key={product.id}>
          <li>
            {product.name}
          </li>
          <li>
            <img width={150} src={config.productImagesUrl+product.image}></img>
          </li>
          <li>
            Price - {product.price}
          </li>
          <li>
            Amount - {product.amount}
          </li>
          <hr />
          </ul>)}
          
        </div>}
        
      </div>
    </div>
  )
}

export default ProductsList