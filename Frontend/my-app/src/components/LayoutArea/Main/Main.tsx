import {useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { getCategoriesAsync, get_allAsync } from '../../../Redux/productsSlice';
import Footer from '../Footer/Footer';

import './Main.css'

const Main = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(get_allAsync())
    dispatch(getCategoriesAsync())
  },[dispatch]);
  return (
    <div className='Main'>
      {/* <h1>Main</h1> */}
      <div className='Outlet'><Outlet/></div>
      <footer><Footer/></footer>

    </div>
  )
}

export default Main