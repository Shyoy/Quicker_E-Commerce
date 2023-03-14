import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProductModel from '../../../Models/Products';
import {  logout, selectErrMsg, selectFullName, selectIsLogin } from '../../../Redux/authSlice';
import { addItem, decrement, increment, selectInCart } from '../../../Redux/cartSlice';
import { selectProductWindow, selectProducts, setProductWindow } from '../../../Redux/productsSlice';
import config from '../../../Utils/Config';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductEdit from '../ProductEdit/ProductEdit';

import "./ProductWindow.css"

export interface ProductWindowProps{
    prod: ProductModel;
    
  }

const ProductWindow = (props:ProductWindowProps) => {

    const navigate  = useNavigate()
    // const [loading, setLoading] = useState()
    const inCart = useAppSelector(selectInCart);
    
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const productWindow = useAppSelector(selectProductWindow);


 

    // const [errMsg, setErrMsg] = useState("") 

    const handleClose = () => {
        searchParams.delete('product')
        setSearchParams(searchParams)
    }
    const handleSwap = () => {
        console.log(productWindow)
        if (productWindow !=='detail'){
            dispatch(setProductWindow('detail'))

        }
        else{
            dispatch(setProductWindow('edit'))

        }
    }

    
    return (
    <div className='ProductWindow'>
        <div className='my-overlay'  onClick={handleClose}/>
        
        <div className='pop-window'>
            
                {productWindow === 'edit' ? 

                <ProductEdit handleClose={handleClose} handleSwap={handleSwap} prod={props.prod}/>
                
                :
                <>
                {productWindow === 'add' ? 
                <ProductDetails handleClose={handleClose} handleSwap={handleSwap} prod={props.prod}/>
                :
                <ProductDetails handleClose={handleClose} handleSwap={handleSwap} prod={props.prod}/>
                }
                </>
                }

        </div>
    

    </div>
            
    )
}

export default ProductWindow