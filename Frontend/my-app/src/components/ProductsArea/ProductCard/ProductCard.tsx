import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import ProductModel from '../../../Models/Products'
import { addItem, selectInCart, selectLastUpdate } from '../../../Redux/cartSlice'
import config from '../../../Utils/Config'
import './ProductCard.css'

interface ProductProps {
  product: ProductModel,
}



const ProductCard = (props:ProductProps):JSX.Element => {
  const inCart = useAppSelector(selectInCart);
  const lastUpdate = useAppSelector(selectLastUpdate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(inCart.length);
  },[inCart]);
  
  // console.log(inCart)
  return (
      <div className="ProductsCard card"> 
              <img className="card-img-top" src={config.productImagesUrl+props.product.image} alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title">{props.product.name}</h5>
                <p className="card-text">Price - {props.product.price}</p>

                <button onClick={()=> dispatch(addItem(props.product))}>ADD</button>
                {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
              </div>
      </div>
  )
}

export default ProductCard