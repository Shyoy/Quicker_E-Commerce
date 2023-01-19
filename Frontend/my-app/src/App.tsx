import React from 'react';
import './App.css';
import Layout from './components/LayoutArea/Layout/Layout';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import NoPage from './components/SharedArea/NoPage/NoPage';
import ProductsList from './components/ProductsArea/ProductsList/ProductsList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to='products/' />} />
          <Route path='products/' element={<ProductsList />} />
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
