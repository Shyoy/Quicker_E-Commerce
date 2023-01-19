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
      <div>
        {products.length === 0? 
        <h2>There are no products</h2> 
        : 
        <div className="card-group">
          {products.map(product =>
            <div className="card">
              <img className="card-img-top" src={config.productImagesUrl+product.image} alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price - {product.price}</p>
                {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
              </div>
            </div>)}
          
        </div>}
        
      </div>
    

      
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