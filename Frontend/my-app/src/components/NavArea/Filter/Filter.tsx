import './Filter.css'
import {useState,useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCategories } from '../../../Redux/productsSlice';
import { Link } from 'react-router-dom';

const Filter = () => {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const [filterPop, setFilterPop] = useState<Boolean>(false)

  // useEffect(() => {
  // },[filterPop])
  return (
    <li className='Filter'>

        <span title='Filter' onClick={()=> setFilterPop(!filterPop)} className="icon-button material-symbols-outlined">
        {"filter_alt"}
        </span>
        {filterPop 
        && 
        <div className='popup'>
          <span className='Header'>Categories</span>
        <ul>
          {categories.map((category, i) =>
          <Link key={i} className='link' to={'products/categories/'+category.name} >
           <li>
            {category.name}
             </li>
             </Link>)}
          
        </ul>
        </div> }
        
        
    </li>
  )
}

export default Filter