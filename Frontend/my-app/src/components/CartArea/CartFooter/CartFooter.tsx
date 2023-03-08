import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useQuery } from '../../../app/hooks';
import { openWindow, selectTokenAccess } from '../../../Redux/authSlice';
import { checkOut, selectSumCart } from '../../../Redux/cartSlice';
import './CartFooter.css'

const CartFooter = () => {


    const cartSum = useAppSelector(selectSumCart);
    const token = useAppSelector(selectTokenAccess);
    const sum_price = Math.round((cartSum)* 100) / 100
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleCheckOut  = () => {
      if (token){
        dispatch(checkOut())
      }
      else{
        alert('You must login first !')
        if (!searchParams.has('auth')){
          searchParams.set('auth','login');
          setSearchParams(searchParams)

        }
      }
    }

  return (
    <div className='CartFooter'>
        <div className='price'>
            <span className='small'>₪</span>
            <span>{sum_price}</span>
        </div>
        <div className='checkout'>
        {cartSum > 0 ?
        <button className='btn checkout-icon' title='Checkout' onClick={handleCheckOut}/>
            
        :
        <button className='btn checkout-icon' disabled/>
            
        }
        
        </div>
    </div>
  )
}

export default CartFooter