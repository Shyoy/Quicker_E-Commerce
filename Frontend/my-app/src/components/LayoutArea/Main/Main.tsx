import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

import './Main.css'

const Main = () => {
  return (
    <div className='Main'>
      {/* <h1>Main</h1> */}
      <div className='Outlet'><Outlet/></div>
      <footer><Footer/></footer>

    </div>
  )
}

export default Main