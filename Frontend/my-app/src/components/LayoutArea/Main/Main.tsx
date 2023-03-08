import {useEffect,useState} from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useQuery } from '../../../app/hooks';
import ProductModel from '../../../Models/Products';
import { getCategoriesAsync, get_allAsync, selectProducts } from '../../../Redux/productsSlice';
import ProductDetails from '../../ProductsArea/ProductDetails/ProductDetails';
import Footer from '../Footer/Footer';

import './Main.css'

const Main = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate  = useNavigate()
  const products = useAppSelector(selectProducts);
  const [product, setProduct] = useState<ProductModel>()


  
  useEffect(() => {
    dispatch(get_allAsync())
    dispatch(getCategoriesAsync())
  },[dispatch]);
  
  useEffect(()=>{
    if (searchParams.has('product')){
        const productCode = searchParams.get("product");
        let prod = products.find((prod)=>prod.barcode === productCode);
        if (prod){
          setProduct(prod)
        }
        else if (products.length > 0 && !prod){
          navigate('/404notfound')
        }
    }
    else{
      setProduct(undefined)
    }
  },[products,searchParams])
  
  return (
    <div className='Main'>
      {/* <h1>Main</h1> */}
      {product && <ProductDetails prod={product}/>}
      <div className='Outlet'><Outlet/></div>
      <footer><Footer/></footer>

    </div>
  )
}

export default Main