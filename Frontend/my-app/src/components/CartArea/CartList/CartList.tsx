import React from 'react'
import './CarList.css'
import CartItem from '../CartItem/CartItem'


const CartList = () => {
  return (
    <div className='CartList'>
        CartList
        <ul>
            <li><CartItem/></li>
            <li><CartItem/></li>
            <li><CartItem/></li>
        </ul>
        
    </div>
  )
}

export default CartList