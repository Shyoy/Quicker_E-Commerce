import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useAppSelector } from '../../../app/hooks';
import { selectCategoriesStatus,selectProductsStatus } from '../../../Redux/productsSlice'

import './Loading.css'

const Loading = () => {
  const categoriesStatus = useAppSelector(selectCategoriesStatus);
  const productsStatus = useAppSelector(selectProductsStatus);
  const [isHidden,setIsHidden] = useState(true)
  useEffect(()=>{
    if ((categoriesStatus === 'loading')||(productsStatus === 'loading')){
      setIsHidden(false)
    }
    else{
      setIsHidden(true)
    }
  },[productsStatus,categoriesStatus])
  return (
    <div className='Loading'>
        <Spinner className='Spinner' style={{visibility:isHidden ? "hidden": "visible"}} animation="border" variant="success" size="sm" />
    </div>
  )
}

export default Loading;