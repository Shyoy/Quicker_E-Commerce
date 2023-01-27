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
    //    if (result.meta.requestStatus === 'fulfilled'){
    //         console.log(result.payload);
    //         const products:any = result.payload
    //         dispatch(updateProducts())
    //    }
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
                    {cartSum > 0 ?
                    <div className='justify'><button className='btn btn-info' onClick={handleCheckOut}>Check Out</button></div>
                    :
                    <div className='justify'><button className='btn btn-info' disabled>Check Out</button></div>
                    }
                
            </div>
        </div>
    )
    }

export default Cart