import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { selectSumCart } from '../../../Redux/cartSlice'
import CartList from '../../CartArea/CartList/CartList'
import './Cart.css'



const Cart = () => {

    const cartSum = useAppSelector(selectSumCart);
    const sum_price = Math.round((cartSum)* 100) / 100
    return (
        <div className='Cart'>
            <div className='Cart-Header'>
                <h1>Cart</h1>
            </div>
            <div className='Cart-Content'>
                <CartList/>
            </div>
            <div className='Cart-Footer'>
                <footer className='py-4'><span className='small'>₪</span>{sum_price}</footer>
            </div>
        </div>
    )
    }

export default Cart