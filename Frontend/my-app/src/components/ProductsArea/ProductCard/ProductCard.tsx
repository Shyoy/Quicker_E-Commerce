import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import ProductModel from '../../../Models/Products'
import { addItem, decrement, increment, selectInCart} from '../../../Redux/cartSlice'
import { selectLastUpdate } from '../../../Redux/productsSlice'
import config from '../../../Utils/Config'
import './ProductCard.css'

interface ProductProps {
  product: ProductModel,
}



const ProductCard = (props:ProductProps):JSX.Element => {
  const inCart = useAppSelector(selectInCart);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentItemList = inCart.filter((item) => props.product.barcode === item.product.barcode)
  const currentItem = currentItemList[0] || null
  const visible:boolean = currentItem?.amount < currentItem?.product?.amount
  const isHidden = props.product.amount === 0

  const handleClick = () => {
    searchParams.set('product', props.product.barcode)
    setSearchParams(searchParams)
  };

  return (
      <div className="ProductsCard" > 
              <img className="card-img-top" onClick={handleClick} src={config.productImagesUrl+props.product.image} alt={props.product.name +" image"}/>
              <div className="card-body">
                <h5 className="card-title text-capitalize fs-4">{props.product.name}</h5>
                <p className="card-text ">Price - ₪{props.product.price}</p>
                <p className="card-text">Amount - {props.product.amount}</p>
                <div className='cart-control'>
                {currentItemList.length === 1 ? 
                <>
                <button hidden={true} />
                <button onClick={()=> dispatch(decrement({barcode:props.product.barcode}))} className='text-danger px-2 rounded-pill material-symbols-outlined'>remove</button>
                <div className='amount rounded-pill'>{currentItem.amount}</div>
                <button onClick={()=> dispatch(increment({barcode:props.product.barcode}))} style={{visibility: visible ? undefined:'hidden'}}  className='text-primary px-2 rounded-pill material-symbols-outlined'>add</button>
                </>
                :
                <button onClick={()=> dispatch(addItem(props.product))} title="add to cart" style={{visibility:isHidden ? "hidden": "visible"}} className='rounded-pill  px-4 material-symbols-outlined'>add_shopping_cart</button>
              }
              </div>
                
                {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
              </div>
      </div>
  )
}

export default ProductCard