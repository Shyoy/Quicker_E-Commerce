import React from 'react'
import { Outlet } from 'react-router-dom';

import './Main.css'

const Main = () => {
  return (
    <div className='Main'>
      <h1>Main</h1>
      <Outlet/>
    </div>
  )
}

export default Main