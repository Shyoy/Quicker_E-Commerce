import React from 'react';
import './App.css';
import Layout from './components/LayoutArea/Layout/Layout';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import NoPage from './components/SharedArea/NoPage/NoPage';
import ProductsList from './components/ProductsArea/ProductsList/ProductsList';
import Categories from './components/ProductsArea/Categories/Categories';
import Main from './components/LayoutArea/Main/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to='products/' />} />
          <Route path='products/'>
            <Route index element={<ProductsList />}/>
            <Route path='categories/:name' element={<Categories/>} />

          </Route>
          <Route path="blogs/" element={<div>Blogs</div>} />
          <Route path="contact/" element={<div>Contact</div>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
