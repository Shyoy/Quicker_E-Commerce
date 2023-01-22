import React from 'react'
import ProductModel from '../../../Models/Products'
import config from '../../../Utils/Config'
import './CartItem.css'

interface CartItemProps {
  product: ProductModel,
  amount: number,
}

const CartItem = (props:CartItemProps) => {
  const sum_price = Math.round((props.amount * props.product.price)* 100) / 100
  

  return (
    <li className='CartItem'>
      <img className="card-img" src={config.productImagesUrl+props.product.image} alt="Card image cap"/>
      
      <div className="exit"><button >X</button></div>
      <h5 className="header">{props.product.name}</h5>
      <p className="main"><span className='small'>₪</span>{sum_price}</p>
      <p className="cardFooter small text-black-50"><span className='small'>₪</span> {props.product.price}</p>
      <div className='amount'><p >{props.amount}</p></div>
    </li>
  )
}

export default CartItem