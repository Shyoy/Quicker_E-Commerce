import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useAppSelector } from '../../../app/hooks';
import { selectStatus } from '../../../Redux/productsSlice';
import './Loading.css'

const Loading = () => {
  const status = useAppSelector(selectStatus);
  const [isHidden,setIsHidden] = useState(true)
  useEffect(()=>{
    if (status === 'loading'){
      setIsHidden(false)
    }
    else{
      setIsHidden(true)
    }
  },[status])
  return (
    <div className='Loading'>
        <Spinner className='Spinner' style={{visibility:isHidden ? "hidden": "visible"}} animation="border" variant="success" size="sm" />
    </div>
  )
}

export default Loading;