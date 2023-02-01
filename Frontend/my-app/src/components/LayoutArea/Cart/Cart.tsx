// import { Link } from 'react-router-dom'
import CartFooter from '../../CartArea/CartFooter/CartFooter'
import { CartHeader } from '../../CartArea/CartHeader/CartHeader'
import CartList from '../../CartArea/CartList/CartList'
import './Cart.css'



const Cart = () => {

    return (
        <div className='Cart'>
            <div className='Cart-Header'>
                <CartHeader/>
            </div>
            <div className='Cart-Content'>
                <CartList/>
            </div>
            <div className='Cart-Footer'>
                <CartFooter/>
            </div>
        </div>
    )
    }

export default Cart