import { useSearchParams } from 'react-router-dom'
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
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const handleClick = () => {
    searchParams.set('product', props.product.barcode)
    setSearchParams(searchParams)
  };

  return (
    <li className='CartItem mx-1'>
      <img className="card-img" onClick={handleClick} src={config.productImagesUrl+props.product.image} alt={props.product.name +" image"}/>
      
      <div className="exit"><button onClick={()=> dispatch(delItem({barcode: props.product.barcode}))}/></div>
      <p className="header fs-4 ">{props.product.name}</p>
      <p className="main"><span className='small'>₪</span>{sum_price}</p>
      <p className="cardFooter small text-black-50"><span className='small'>₪</span> {props.product.price}</p>
      <div className='amount' onClick={handleClick}><p >{props.amount}</p></div>
    </li>
  )
}

export default CartItem