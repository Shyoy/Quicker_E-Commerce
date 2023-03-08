import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProductModel from '../../../Models/Products';
import {  logout, selectErrMsg, selectFullName, selectIsLogin } from '../../../Redux/authSlice';
import { selectProducts } from '../../../Redux/productsSlice';

import "./ProductDetails.css"

export interface ProductDetailsProps{
    prod: ProductModel;
    
  }

const ProductDetails = (props:ProductDetailsProps) => {

    const [loading, setLoading] = useState()
    const dispatch = useAppDispatch();

    const [productWindow, setProductWindow] = useState<Boolean>(false) 
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate  = useNavigate()
    const products = useAppSelector(selectProducts);
    let product:any ;


 

    // const [errMsg, setErrMsg] = useState("") 

    const handleClose = () => {
        searchParams.delete('product')
        setSearchParams(searchParams)
    }
    const handleSwap = () => {}


    
    return (
    <div className='ProductDetails'>
        <div className='my-overlay'  onClick={handleClose}/>
        
        <div className='pop-window'>
            <div className='window-body'>
                <div className='header'>
                <h1>{props.prod.name}</h1>
                <button className="swap-content" onClick={handleSwap}>swap</button>
                <button className="X" onClick={handleClose} >X</button>
                </div>

            </div>

        </div>
    

    </div>
            
    )
}

export default ProductDetails