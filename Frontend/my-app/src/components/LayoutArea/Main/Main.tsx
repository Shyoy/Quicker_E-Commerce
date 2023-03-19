import {useEffect,useState} from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useQuery } from '../../../app/hooks';
import ProductModel from '../../../Models/Products';
import { getCategoriesAsync, get_allAsync, selectProducts } from '../../../Redux/productsSlice';
import ProductWindow from '../../ProductsArea/ProductWindow/ProductWindow';
import Footer from '../Footer/Footer';

import './Main.css'

const Main = () => {
  const dispatch = useAppDispatch();
  const navigate  = useNavigate()

  
  useEffect(() => {
    dispatch(get_allAsync())
    dispatch(getCategoriesAsync())
  },[dispatch]);

  
  return (
    <div className='Main'>
      {/* <h1>Main</h1> */}
      <ProductWindow/>
      <div className='Outlet'><Outlet/></div>
      <footer><Footer/></footer>

    </div>
  )
}

export default Main