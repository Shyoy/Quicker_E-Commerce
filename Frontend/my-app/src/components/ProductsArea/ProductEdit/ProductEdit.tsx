import React, { useEffect, useState } from 'react'
import ProductModel from '../../../Models/Products'
import config from '../../../Utils/Config'
import './ProductEdit.css'

interface ProductAddProps{
  prod: ProductModel
}

const ProductEdit = (props:ProductAddProps) => {
  const [price, setPrice] = useState<string>(props.prod.price.toString()) 
  const [amount, setAmount] = useState<string>(props.prod.amount.toString()) 



  const handleChangePrice = (e:React.ChangeEvent<HTMLInputElement>) => {
    let inp:string;
    if (e.target.value.length === 1 && e.target.value[0] !== '₪'){
      inp = e.target.value;
    }
    else {
      inp= e.target.value.slice(1, e.target.value.length);
    }
    if (inp == ""){
      setPrice('0.00')
    }
    else if (/^([0-9]{0,4}.[0-9]{0,2})$/.test(inp)){
      
      setPrice(inp)
    }
    
  }
  const handleAmountPrice = (e:React.ChangeEvent<HTMLInputElement>) => {
    /^([0-9]{0,6})$/.test(e.target.value) && setAmount(e.target.value)
  }

  return (
    <div className='ProductEdit'>
        <div className='cart-control me-4'>
            
            <button onClick={()=> props.prod} id={"b3"} title="add to cart"  className='rounded-pill  px-3'>Submit</button>
        
        </div>
        <div className='body-text'>
            <div className="card-text">Price: <br/>
                <input className='inputs'value={'₪'+price} onChange={(e)=>handleChangePrice(e)}/>
                 
            </div>
            <div className="card-text">Amount: <br/>
                <input className='inputs'value={amount} onChange={(e)=>handleAmountPrice(e)}/>
                 
            </div>
            <div className="card-text">Barcode: <br/>
              <div className='inputs'>
                {props.prod.barcode}
              </div>
            </div>
        </div>
        <img className="card-img-top" src={config.productImagesUrl+props.prod.image} alt={props.prod.name +" image"}/>
    </div>
  )
}

export default ProductEdit