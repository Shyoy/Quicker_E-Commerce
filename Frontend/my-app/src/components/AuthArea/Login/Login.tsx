import React from 'react'
import {useState,useEffect} from 'react'
// import { useForm } from "react-hook-form";
import { useFormAction } from 'react-router-dom';
import { AuthForm } from '../../../API/AuthAPI';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { delMsg, loginAsync, selectErrMsg, selectIsLogin, selectTokenAccess } from '../../../Redux/authSlice';
import './Login.css'

export interface LoginForm{
    email:string;
    password:string;
}

const Login = () => {
    
    const [email ,setEmail] = useState(localStorage.getItem('email')||'')
    const [password ,setPassword] = useState('')
    const errMsg = useAppSelector(selectErrMsg);
    const [typeErr,setTypeErr] = useState('')

    const dispatch = useAppDispatch();

    const handleKeyPress = (e:React.KeyboardEvent)=>{
        if (e.key==='Enter'){
          handleSubmit()
        }
      }
   
    const handleSubmit = () => {
        var emailRE = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/
        var passwordRE = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
        setTypeErr('')
        dispatch(delMsg())
        if (!emailRE.test(email)){
            setTypeErr('bad email')

            
        }
        else if ((password.length < 8)||(!passwordRE.test(password))){
            setTypeErr('bad password')
        }
        else{
            localStorage.setItem('email', email)
            dispatch(loginAsync({email,password}))
        }
    };
    
    return (
        <div className='Login' onKeyUp={handleKeyPress}>
            <h2 className='mb-4'>Sign In</h2>
            <div className='mb-2 small smaller text-danger' style={{visibility:errMsg!=''||typeErr!='' ? "visible": "hidden"}}>{errMsg||typeErr} !</div>

            
            <input type="email" placeholder=' email@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <i className="material-symbols-rounded">
            alternate_email
            </i>
            <input type="password" placeholder=' Password ' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <i className="material-symbols-rounded">
            key
            </i>

            <div className='mt-5'>
            <button className="submit-button" onClick={handleSubmit}>Submit </button>

            </div>
        </div>
    )
}

export default Login