import React from 'react'
import './CarList.css'
import CartItem from '../CartItem/CartItem'
import { useAppSelector } from '../../../app/hooks';
import { selectInCart } from '../../../Redux/cartSlice';
import { selectTokenAccess } from '../../../Redux/authSlice';


const CartList = () => {
    const cart = useAppSelector(selectInCart);
    const token = useAppSelector(selectTokenAccess);
    

    return (
    <div className='CartList'>
        {cart.length > 0 ? 
        <ul>
            {cart.map((item)=> 
            <CartItem key={item.product.id} product={item.product} amount={item.amount}/>
            )}     
        </ul>
        :
        <div className='py-5'>
            <p>There are no products <br/> in cart yet</p>
        </div>}
        
        
    </div>
    )
    }

export default CartList