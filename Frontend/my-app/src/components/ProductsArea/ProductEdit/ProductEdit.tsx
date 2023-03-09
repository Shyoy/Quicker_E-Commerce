import React from 'react'
import ProductModel from '../../../Models/Products'
import config from '../../../Utils/Config'


interface ProductAddProps{
  prod: ProductModel
}

const ProductEdit = (props:ProductAddProps) => {
  return (
    <div className='ProductEdit'>
        <div className='cart-control me-4'>
            
            <button onClick={()=> props.prod} id={"b3"} title="add to cart"  className='rounded-pill  px-4 material-symbols-outlined'>add_shopping_cart</button>
        
        </div>
        <div className='body-text'>
            <div className="card-text">Price: <br/>
                <div className='inputs'>
                    ₪{props.prod.price}
                </div>
            </div>
            <div className="card-text">Amount: <br/>
                <div className='inputs'>
                    {props.prod.amount}
                </div>
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