import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import ProductModel from '../../../Models/Products'
import { addItem, decrement, increment, selectInCart} from '../../../Redux/cartSlice'
import config from '../../../Utils/Config'
import './ProductCard.css'

interface ProductProps {
  product: ProductModel,
}



const ProductCard = (props:ProductProps):JSX.Element => {
  const inCart = useAppSelector(selectInCart);
  const dispatch = useAppDispatch();

  const currentItemList = inCart.filter((item) => props.product.id === item.product.id)
  const currentItem = currentItemList[0] || null
  const visible:boolean = currentItem?.amount < currentItem?.product?.amount
  
  return (
      <div className="ProductsCard"> 
              <img className="card-img-top" src={config.productImagesUrl+props.product.image} alt={props.product.name +" image"}/>
              <div className="card-body">
                <h5 className="card-title">{props.product.name}</h5>
                <p className="card-text">Price - {props.product.price}</p>
                <p className="card-text">Amount - {props.product.amount}</p>
                <div className='cart-control'>
                {currentItemList.length === 1 ? 
                <>
                <button hidden={true} />
                <button onClick={()=> dispatch(decrement({id:props.product.id}))} id={"b1"} className='text-danger px-2 rounded-pill material-symbols-outlined'>remove</button>
                <div className='amount rounded-pill'>{currentItem.amount}</div>
                <button onClick={()=> dispatch(increment({id:props.product.id}))} style={{visibility: visible ? undefined:'hidden'}} id={"b2"} className='text-primary px-2 rounded-pill material-symbols-outlined'>add</button>
                </>
                :
                <button onClick={()=> dispatch(addItem(props.product))} id={"b3"} className='rounded-pill  px-4 material-symbols-outlined'>add_shopping_cart</button>
              }
              </div>
                
                {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
              </div>
      </div>
  )
}

export default ProductCard