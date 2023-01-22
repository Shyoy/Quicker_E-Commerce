import React from 'react'
import './CarList.css'
import CartItem from '../CartItem/CartItem'
import { useAppSelector } from '../../../app/hooks';
import { selectInCart } from '../../../Redux/cartSlice';


const CartList = () => {
    const cart = useAppSelector(selectInCart);
    

    return (
    <div className='CartList'>
        {cart.length > 0 ? 
        <ul>
            {cart.map((item)=> 
            <CartItem product={item.product} amount={item.amount}/>
            )}     
        </ul>
        :
        <div className='py-5 bg-secondary'>
            there are no products in cart yet
        </div>}
        
        
    </div>
    )
    }

export default CartList