import { useAppDispatch } from '../../../app/hooks';
import { delAll } from '../../../Redux/cartSlice';


import './CartHeader.css'


export const CartHeader = () => {
  const dispatch = useAppDispatch();
  
  return (
    <div className='CartHeader'>
      <div className='top'>
        <span className="material-symbols-outlined delete-button" title={"delete cart items"} onClick={()=>{dispatch(delAll())}}>delete</span>
        <h3 className='cart-icon'>  My Cart</h3> 
        
        </div>
      <div className='bot'>
        <button className=''> <div>link</div> </button> 
        <button className=''> <div>link</div> </button> 
        <button className=''> <div>link</div> </button> 
        </div>


    </div>

  )
}
