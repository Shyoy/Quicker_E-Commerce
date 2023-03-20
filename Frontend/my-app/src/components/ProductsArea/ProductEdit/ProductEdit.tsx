import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import ProductModel from '../../../Models/Products'
import { editProductAsync, selectProductWindow, selectLastUpdate } from '../../../Redux/productsSlice'
import config from '../../../Utils/Config'
import './ProductEdit.css'

interface ProductEditProps{
  prod: ProductModel
  handleClose:()=>void
  handleSwap:()=>void
}

const ProductEdit = (props:ProductEditProps) => {
  const [price, setPrice] = useState<string>(props.prod.price.toString()) 
  const [amount, setAmount] = useState<string>(props.prod.amount.toString()) 
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState<string>("");

  const [isChanged, setIsChanged] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const productWindow = useAppSelector(selectProductWindow);

  const lastUpd = useAppSelector(selectLastUpdate);

  useEffect(()=>{
    if (price !== props.prod.price.toString() || 
          amount !== props.prod.amount.toString() ||
          image !== undefined){

      setIsChanged(true)
    }else{
      setIsChanged(false)

    }
  },[image,amount,price])

  const handlePriceChange = (e:React.ChangeEvent<HTMLInputElement>) => {
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
  const handleAmountChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    /^([0-9]{0,6})$/.test(e.target.value) && setAmount(e.target.value)
  }



  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const maxMbSize = 2
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg']
    let inp = e.target.files?.[0] ;
    if (inp){
      console.log(inp);
      if (inp?.size/1024/1024 > maxMbSize){
        console.log(`Max File size is ${maxMbSize} MB`);   

      }else if (!validTypes.includes(inp.type)){
        console.log('Invalid file type');

      }else{
        setPreviewImage(URL.createObjectURL(inp));
        setImage(inp)
        
      }
    }
  }
  const handleSubmit = () =>{
    
    let formData = new FormData();
    if (parseFloat(price) < 0.5){
      console.log('Price must be more then 0.5');
    }
    else{
      
      if (image){
        formData.append('image', image)
      }
      formData.append('amount', amount)
      formData.append('price', parseFloat(price).toString())
      formData.append('id', props.prod.id.toString())
      if (isChanged){
          dispatch(editProductAsync(formData))
      }else{
        console.log('Nothing is changed in the product');
        alert('Nothing is changed in the product')
      }


    }
  }

  return (
    <div className='ProductEdit'>
      <div className='header'>

          <button className="X" onClick={props.handleClose} >X</button>
          <div className='fs-1 mt-4 text-capitalize'>
              {props.prod.name}
          </div>
          <button className="swap-content" onClick={props.handleSwap}>{'Back'}</button>

      </div>
      <div className='my-body'>
          <div className='button-control '>
              {isChanged ? 
              
              <button onClick={handleSubmit}  title="Submit changes"  className='submit-button rounded-pill  px-3'>Submit</button>
              :
              <button disabled  title="Submit changes"  className='rounded-pill  px-3'>Submit</button>
              }
          
          </div>
          <div className='body-text'>
              <div className="card-text">Price: <br/>
                  <input className='inputs'value={'₪'+price} onChange={(e)=>handlePriceChange(e)}/>
                  
              </div>
              <div className="card-text">Amount: <br/>
                  <input className='inputs'value={amount} onChange={(e)=>handleAmountChange(e)}/>
                  
              </div>
              <div className="card-text">Barcode: <br/>
                <div className='inputs'>
                  {props.prod.barcode}
                </div>
              </div>
          </div>
          {previewImage ? 
          <img className="previewImage" src={previewImage} alt={props.prod.name +" image"}/>
          :
          <img className="prod-image" src={config.productImagesUrl+props.prod.image} alt={props.prod.name +" image"}/>
          }
          
          <label className="file-upload">
              <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={(e)=>handleImageChange(e)}/>
              Upload Image
          </label>
              {image?.name && 
              <span className='image-name'>{image?.name}</span>
              }

      </div>
      <div className='footer'>
                          
      </div>
    </div>
  )
}

export default ProductEdit