import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProductModel from '../../../Models/Products';
import {  logout, selectErrMsg, selectFullName, selectIsLogin } from '../../../Redux/authSlice';
import { addItem, decrement, increment, selectInCart } from '../../../Redux/cartSlice';
import { selectProductWindow, selectProducts, setProductWindow } from '../../../Redux/productsSlice';
import config from '../../../Utils/Config';
import ProductAdd from '../ProductAdd/ProductAdd';
import ProductDetails from '../ProductDetails/ProductDetails';
import ProductEdit from '../ProductEdit/ProductEdit';

import "./ProductWindow.css"
import { Route} from "react-router-dom";


const ProductWindow = () => {

    const navigate  = useNavigate()
    // const [loading, setLoading] = useState()
    const products = useAppSelector(selectProducts);
    const [product, setProduct] = useState<ProductModel>()
    const [isHidden, setIsHidden] = useState<boolean>(true)
    
    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const productWindow = useAppSelector(selectProductWindow);

    useEffect(()=>{
        if (searchParams.has('product')){
            const productCode = searchParams.get("product");
            let prod = products.find((prod)=>prod.barcode === productCode);
            if (prod){
                setIsHidden(false)
                setProduct(prod)
                if (searchParams.has('action')){
                    if (searchParams.get('action')=='edit'){
                        dispatch(setProductWindow('edit'))
                    }
                }else{
                    dispatch(setProductWindow('detail'))
                }
            }
            else if (products.length > 0 && !prod){
              navigate('/404notfound')
            }
           
        }else{
            setIsHidden(true)
            setProduct(undefined)
          }
       
        if(searchParams.get('action')==='add'){
            setIsHidden(false)
            dispatch(setProductWindow('add'))
        }
      },[products,searchParams])

    // const [errMsg, setErrMsg] = useState("") 
    useEffect(()=>{
        console.log(productWindow);
        if (productWindow ==='detail'){
        //    navigate(-1)
            // searchParams.set('action','detail')
            // setSearchParams(searchParams)
        }
        else if (productWindow ==='edit'){

        }
        else if (productWindow ==='add'){

        }
    },[productWindow])

    const handleClose = () => {
        
        searchParams.delete('product')
        searchParams.delete('action')
        setSearchParams(searchParams)
    }
    const handleSwap = () => {
        console.log(product);
        if (productWindow ==='edit'){
            searchParams.set('action','detail')
            setSearchParams(searchParams)
            dispatch(setProductWindow('detail'))
        }
        else if (productWindow ==='add'){
            dispatch(setProductWindow('detail'))
            
            
            navigate(-1)
        }
        else{
            searchParams.set('action','edit')
            setSearchParams(searchParams)
            dispatch(setProductWindow('edit'))

        }
    }
    const handleClickAdd = () => {
        searchParams.delete('product')
        searchParams.set('action','add')
        setSearchParams(searchParams)
    }
    
    

    // let routes = (
    // <Switch>
    //     <Route exact path="/">
    //     <Home />
    //     </Route>
    //     <Route path="/about">
    //     <About />
    //     </Route>
    //     <Route path="/:user">
    //     <User />
    //     </Route>
    //     <Route>
    //     <NoMatch />
    //     </Route>
    // </Switch>
    // );









    return (
        
    <div className='ProductWindow' hidden={isHidden}>
        
        <div className='my-overlay'  onClick={handleClose}/>
        
        <div className='pop-window'>
            <Route path='detail/:product' element={<>detail</>} />
            <Route path='edit/:product' element={<>edit</>} />
            <Route path='add' element={<>add</>} />
    
            {/* <button onClick={handleClickAdd} className="addButton bi bi-plus-circle-fill " title='Add new product'></button>
            
            { product &&
            <>
                {productWindow === 'detail' && 
                <ProductDetails handleClickAdd={handleClickAdd} handleClose={handleClose} handleSwap={handleSwap} prod={product}/>
                }
                {productWindow === 'edit' && 
                <ProductEdit handleClose={handleClose} handleSwap={handleSwap} prod={product}/>
                }   
            </>
            }

            {productWindow === 'add' && 
            <ProductAdd handleClose={handleClose} handleSwap={handleSwap}/>
            } */}
                

        </div>
        
        </div>
    
    
            
    )
}

export default ProductWindow