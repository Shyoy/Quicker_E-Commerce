import React from 'react'
import { Link } from 'react-router-dom'
import CartList from '../../CartArea/CartList/CartList'
import './Cart.css'



const Cart = () => {



  return (
    <div className='Cart'>
        <div className='Cart-Header'>
            <h1>Cart</h1>
        </div>
        <div className='Cart-Content'>
            <CartList/>
        </div>
        <div className='Cart-Footer'>
            <footer>Cart</footer>
        </div>
    </div>
  )
}

export default Cart