import './App.css';
import Layout from './components/LayoutArea/Layout/Layout';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import NoPage from './components/SharedArea/NoPage/NoPage';
import ProductsList from './components/ProductsArea/ProductsList/ProductsList';
import Categories from './components/ProductsArea/Categories/Categories';
import SearchQuery from './components/ProductsArea/SearchQuery/SearchQuery';

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
            <Route path='search/' element={<SearchQuery/>} />

          </Route>
          <Route path="blogs/" element={<div>Blogs</div>} />
          <Route path="contact/" element={<div>Contact</div>} />

          <Route  element={<NoPage />} />
          {/* <Route path="*" element={<Navigate to="/404notfound"/>} /> */}
          
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
