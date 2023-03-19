import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProductModel from '../../../Models/Products';
import {  logout, selectErrMsg, selectFullName, selectIsLogin } from '../../../Redux/authSlice';
import { addItem, decrement, increment, selectInCart } from '../../../Redux/cartSlice';
import { selectProductWindow, selectProducts, setProductWindow } from '../../../Redux/productsSlice';
import config from '../../../Utils/Config';
import ProductEdit from '../ProductEdit/ProductEdit';

import "./ProductDetails.css"

export interface ProductDetailsProps{
    prod: ProductModel;
    handleClose:()=>void
    handleSwap:()=>void
    handleClickAdd:()=>void
  }

const ProductDetails = (props:ProductDetailsProps) => {
    
    const dispatch = useAppDispatch();

    // const [searchParams, setSearchParams] = useSearchParams();
    const navigate  = useNavigate()

    
    const inCart = useAppSelector(selectInCart);
    const currentItemList = inCart.filter((item) => props.prod.barcode === item.product.barcode)
    const currentItem = currentItemList[0] || null
    const visible:boolean = currentItem?.amount < currentItem?.product?.amount

 

    // const [errMsg, setErrMsg] = useState("") 

    
    return (
    <div className='ProductDetails'>
        <div className='header'>

            <button className="X" onClick={props.handleClose} >X</button>

            <div className='fs-1 mt-4 text-capitalize'>
                {props.prod.name}
            </div>
            <div className='options-buttons'>
                <button className="addButton bi bi-plus-circle-fill " onClick={props.handleClickAdd} title='Add new product'></button>
                <button className="edit-button"  onClick={props.handleSwap} title='Edit product'><i className="bi bi-pencil-square" /></button>
            </div>
        </div>
        <div className='my-body'>
            <div className='cart-control'>
                {currentItemList.length === 1 ? 
                <>
                <button hidden={true} />
                <button onClick={()=> dispatch(decrement({barcode:props.prod.barcode}))}  className='cart-buttons text-danger px-2 rounded-pill material-symbols-outlined'>remove</button>
                <div className='amount rounded-pill'>{currentItem.amount}</div>
                <button onClick={()=> dispatch(increment({barcode:props.prod.barcode}))} style={{visibility: visible ? undefined:'hidden'}}  className='cart-buttons text-primary px-2 rounded-pill material-symbols-outlined'>add</button>
                </>
                :
                <button onClick={()=> dispatch(addItem(props.prod))}  title="add to cart"  className='cart-buttons rounded-pill  px-2 material-symbols-outlined'>add_shopping_cart</button>
            }
            </div>
            
            <div className='body-text'>
                <div className="card-text">Price: <br/>
                    <div className='inputs'>
                        ₪{props.prod.price}
                    </div>
                </div>
                <div className="card-text">Amount: <br/>
                    <div className='inputs'>
                        {props.prod.amount}
                    </div>
                </div>
                <div className="card-text">Barcode: <br/>
                    <div className='inputs'>
                        {props.prod.barcode}
                    </div>
                </div>
            </div>
            <img className="card-img-top" src={config.productImagesUrl+props.prod.image} alt={props.prod.name +" image"}/>
        </div>
            <div className='footer'>
                
        </div>

    </div>
                

        
    

    
            
    )
}

export default ProductDetails