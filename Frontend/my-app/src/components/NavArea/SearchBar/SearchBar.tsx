import {useState}from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectProducts } from '../../../Redux/productsSlice'
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
  console.log(isHidden);
  
  return (
    <div className='SearchBar'  >
      <div className='Search-input mt-3'>
        <input  type="text" placeholder=' Search' onBlur={handleInput} onFocus={handleInput}  value={query} onChange={(e)=>{setQuery(e.target.value)}} />
        <button onClick={()=> setQuery('')}>X</button>
        <ul hidden={isHidden} >
          <>
          {products.filter((product)=>product.name.includes(query)).slice(0,4).map((prod, i)=>
          <li key={i}  onMouseDown={()=> {setQuery(prod.name);console.log(prod.name +" "+ prod.id);}}>
            {prod.name}
          </li>)}</>
          
        </ul>
      </div>
      {/* <button className='btn' onClick={()=>console.log('button') }> Enter</button> */}
     
    </div>
  )
}

export default SearchBar