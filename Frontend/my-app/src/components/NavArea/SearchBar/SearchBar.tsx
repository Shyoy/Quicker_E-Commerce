import {useState}from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectProducts } from '../../../Redux/productsSlice'
import config from '../../../Utils/Config'
import './SearchBar.css'

const SearchBar = () => {
  const [isHidden, setIsHidden] = useState(true)
  const [query, setQuery] = useState('')
  const products = useAppSelector(selectProducts);
  const handleInput = () => {
    if (isHidden) {
      setIsHidden(false)
      console.log('HandleInput-Focus')
    }
    else{
      
      setIsHidden(true)
      console.log('HandleInput-Blur')
      
    }}
  
  return (
    <div className='SearchBar'  >
      <div className='Search-input mt-3'>
        <input  type="text" placeholder=' Search' onBlur={()=>setIsHidden(true)} onFocus={()=>setIsHidden(false)}  value={query} onChange={(e)=>{setQuery(e.target.value)}} />
        <button onClick={()=> setQuery('')}>X</button>
        <ul hidden={isHidden} >
          <>
          {products.filter((product)=>product.name.includes(query)).slice(0,4).map((prod, i)=>
          <li key={i}  onMouseDown={()=> {setQuery(prod.name);console.log(prod.name +" "+ prod.id);}}>
            <span>{prod.name}</span>
            <img className="card-img" src={config.productImagesUrl+prod.image} alt={prod.name +" image"}/>
          </li>)}</>
          
        </ul>
      </div>
      {/* <button className='btn' onClick={()=>console.log('button') }> Enter</button> */}
     
    </div>
  )
}

export default SearchBar