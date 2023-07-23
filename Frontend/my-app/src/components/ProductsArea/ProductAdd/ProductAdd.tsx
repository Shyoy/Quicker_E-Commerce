import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import ProductModel from '../../../Models/Products'
import { addProductAsync, selectProductWindow, selectLastUpdate, selectProducts } from '../../../Redux/productsSlice'
import config from '../../../Utils/Config'
import './ProductAdd.css'

interface ProductAddProps{
  handleClose:()=>void
  handleSwap:()=>void
}

const ProductAdd = (props:ProductAddProps) => {
  const [name, setName] = useState<string>('') 
  const [price, setPrice] = useState<string>('00.00') 
  const [amount, setAmount] = useState<string>('0') 
  const [barcode, setBarcode] = useState<string>('') 
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [isChanged, setIsChanged] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const productWindow = useAppSelector(selectProductWindow);
  const products = useAppSelector(selectProducts);

  useEffect(()=>{
    if (name !== '' && 
          price !== '00.00' &&
          amount !== '0' &&
          barcode !== '' &&
          image !== undefined){

      setIsChanged(true)
    }else{
      setIsChanged(false)

    }
  },[name,image,amount,price,barcode])
  // useEffect(()=>{
  //   if (productWindow === 'detail'){
  //     searchParams.set('product',products[0].barcode.toString());
  //     searchParams.set('action','detail');
  //     setSearchParams(searchParams)
  //   }
  // },[productWindow])

  const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    /^([a-z .0-9]{0,24})$/.test(e.target.value) && 
    setName(e.target.value)
  }

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
    /^([0-9]{0,6})$/.test(e.target.value) && 
    setAmount(e.target.value)
  }
 

  const handleBarcodeChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    /^([0-9]{0,12})$/.test(e.target.value) && 
    setBarcode(e.target.value)
  }



  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const maxMbSize = 2
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg']
    let inp = e.target.files?.[0] ;
    if (inp){
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

    } else if (+amount < 1 ){
      console.log('amount must be at least 1');
   
    }else if (barcode.length < 6 ){
      console.log('Barcode cannot be less than 6');

    }else if (!image){
      console.log('You must select an image fo the product');
    
    }else{
      
      formData.append('image', image)
      formData.append('name', name.trim())
      formData.append('amount', amount)
      formData.append('barcode', barcode)
      formData.append('price', parseFloat(price).toString())
      // console.log(formData);
      dispatch(addProductAsync(formData))

    }
    
  }

  return (
    <div className='ProductAdd'>
      <div className='header'>

          <button className="X" onClick={props.handleClose} >X</button>

          <input className='prod-name' value={name} onChange={(e)=>handleNameChange(e)} placeholder='New Product Name'/>
         
          <button className="swap-content" onClick={props.handleSwap}>{'Back'}</button>


      </div>
      <div className='my-body'>
          <div className='button-control '>
              {isChanged ? 
              // <button className="swap-content" style={{'visibility':'hidden'}}>{''}</button>
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
                  <input type={'number'} className='inputs'value={amount} onChange={(e)=>handleAmountChange(e)}/>
                  
              </div>
              <div className="card-text">Barcode: <br/>
                <input placeholder='8 Digits code'value={barcode} onChange={(e)=>handleBarcodeChange(e)} className='inputs'/>
                  
                
              </div>
          </div>
          {previewImage ? 
          <img className="previewImage" src={previewImage} alt={"Preview image"}/>
          :
          <img className="prod-image" src={config.dummyImgUrl} alt={"Product image"}/>
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

export default ProductAdd