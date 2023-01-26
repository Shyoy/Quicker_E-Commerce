import React from 'react'
// import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { checkOut, selectSumCart } from '../../../Redux/cartSlice'
import CartList from '../../CartArea/CartList/CartList'
import './Cart.css'



const Cart = () => {

    const cartSum = useAppSelector(selectSumCart);
    const sum_price = Math.round((cartSum)* 100) / 100
    const dispatch = useAppDispatch();

    const handleCheckOut  = async () => {
       await dispatch(checkOut())
    }

    return (
        <div className='Cart'>
            <div className='Cart-Header'>
                <h1>Cart</h1>
            </div>
            <div className='Cart-Content'>
                <CartList/>
            </div>
            <div className='Cart-Footer'>
                
                    <div className='ms-5'><span className='small'>₪</span>{sum_price}</div>
                    <div className='justify'><button className='btn btn-primary' onClick={handleCheckOut}>Check Out</button></div>
                
            </div>
        </div>
    )
    }

export default Cart