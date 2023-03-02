import { useAppDispatch } from '../../../app/hooks'
import ProductModel from '../../../Models/Products'
import { delItem } from '../../../Redux/cartSlice'
import config from '../../../Utils/Config'
import './CartItem.css'

interface CartItemProps {
  product: ProductModel,
  amount: number,
}

const CartItem = (props:CartItemProps) => {
  const sum_price = Math.round((props.amount * props.product.price)* 100) / 100
  // const products = useAppSelector(selectProducts);
  // const lastUpdate = useAppSelector(selectLastUpdate);
  const dispatch = useAppDispatch();

  return (
    <li className='CartItem mb-1 mx-1'>
      <img className="card-img" src={config.productImagesUrl+props.product.image} alt={props.product.name +" image"}/>
      
      <div className="exit"><button onClick={()=> dispatch(delItem({id: props.product.id}))}/></div>
      <h5 className="header">{props.product.name}</h5>
      <p className="main"><span className='small'>₪</span>{sum_price}</p>
      <p className="cardFooter small text-black-50"><span className='small'>₪</span> {props.product.price}</p>
      <div className='amount'><p >{props.amount}</p></div>
    </li>
  )
}

export default CartItem