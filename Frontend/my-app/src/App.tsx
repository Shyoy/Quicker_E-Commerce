import './App.css';
import Layout from './components/LayoutArea/Layout/Layout';
import React,{useState,useEffect} from 'react';

import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import NoPage from './components/SharedArea/NoPage/NoPage';
import ProductsList from './components/ProductsArea/ProductsList/ProductsList';
import Categories from './components/ProductsArea/Categories/Categories';
import SearchQuery from './components/ProductsArea/SearchQuery/SearchQuery';
import NotSupported from './components/SharedArea/NotSupported/NotSupported';

function App() {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }
  useEffect(()=>{
    window.addEventListener("resize", handleResize)
  },[window.innerWidth])
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        {isMobile ? 
        <Route path="*" element={<NotSupported/>}/>
        :
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to='products/' />} />
          <Route path='products/'>
            <Route index element={<ProductsList />}/>
            <Route path='categories/:name/' element={<Categories/>} />
            <Route path='search/' element={<SearchQuery/>} />

          </Route>
          <Route path='404notfound' element={<NoPage />} />
          <Route path="*" element={<Navigate to="/404notfound"/>} />
        </Route>
        }
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
