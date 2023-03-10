import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProductModel from '../../../Models/Products';
import {  logout, selectErrMsg, selectFullName, selectIsLogin } from '../../../Redux/authSlice';
import { addItem, decrement, increment, selectInCart } from '../../../Redux/cartSlice';
import { selectProducts } from '../../../Redux/productsSlice';
import config from '../../../Utils/Config';
import ProductEdit from '../ProductEdit/ProductEdit';

import "./ProductDetails.css"

export interface ProductDetailsProps{
    prod: ProductModel;
    
  }

const ProductDetails = (props:ProductDetailsProps) => {

    // const [loading, setLoading] = useState()
    const inCart = useAppSelector(selectInCart);

    const dispatch = useAppDispatch();

    const [EditWindow, setEditWindow] = useState<Boolean>(false) 
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate  = useNavigate()
    // const products = useAppSelector(selectProducts);
    // let product:any ;

    const currentItemList = inCart.filter((item) => props.prod.barcode === item.product.barcode)
    const currentItem = currentItemList[0] || null
    const visible:boolean = currentItem?.amount < currentItem?.product?.amount

 

    // const [errMsg, setErrMsg] = useState("") 

    const handleClose = () => {
        searchParams.delete('product')
        setSearchParams(searchParams)
    }
    const handleSwap = () => {
        setEditWindow(!EditWindow)
    }

    
    return (
    <div className='ProductDetails'>
        <div className='my-overlay'  onClick={handleClose}/>
        
        <div className='pop-window'>
            <div className='window-body'>
                <div className='header'>
<<<<<<< Updated upstream
                <button className="swap-content" onClick={handleSwap}>swap</button>
                <div className='fs-1 mt-4 text-capitalize'>{props.prod.name}</div>
                <button className="X" onClick={handleClose} >X</button>
=======
                    <button className="swap-content" onClick={handleSwap}>{EditWindow ? 'Back': 'Edit'}</button>
                    <div className='fs-1 mt-4 text-capitalize'>
                        {props.prod.name}
                    </div>
                    <button className="X" onClick={handleClose} >X</button>
>>>>>>> Stashed changes
                </div>
                {EditWindow ? 

                <ProductEdit prod={props.prod}/>

                :
                <div className='my-body'>
                    <div className='cart-control me-5'>
                        {currentItemList.length === 1 ? 
                        <>
                        <button hidden={true} />
                        <button onClick={()=> dispatch(decrement({barcode:props.prod.barcode}))} id={"b1"} className='text-danger px-2 rounded-pill material-symbols-outlined'>remove</button>
                        <div className='amount rounded-pill'>{currentItem.amount}</div>
                        <button onClick={()=> dispatch(increment({barcode:props.prod.barcode}))} style={{visibility: visible ? undefined:'hidden'}} id={"b2"} className='text-primary px-2 rounded-pill material-symbols-outlined'>add</button>
                        </>
                        :
                        <button onClick={()=> dispatch(addItem(props.prod))} id={"b3"} title="add to cart"  className='rounded-pill  px-4 material-symbols-outlined'>add_shopping_cart</button>
                    }
                    </div>
                   
                    <div className='body-text'>
                    <div className="card-text">Price: <br/><p>₪{props.prod.price}</p></div>
                    <div className="card-text">Amount: <br/><p>{props.prod.amount}</p></div>
                    <div className="card-text">Barcode: <br/><p>{props.prod.barcode}</p></div>
                    </div>
                <img className="card-img-top" src={config.productImagesUrl+props.prod.image} alt={props.prod.name +" image"}/>
                </div>
<<<<<<< Updated upstream
=======
                }

>>>>>>> Stashed changes
                <div className='footer'>
                    
                </div>

            </div>

        </div>
    

    </div>
            
    )
}

export default ProductDetails