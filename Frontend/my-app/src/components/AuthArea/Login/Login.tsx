import React from 'react'
import {useState,useEffect} from 'react'
// import { useForm } from "react-hook-form";
import { useFormAction } from 'react-router-dom';
import { AuthForm } from '../../../API/AuthAPI';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loginAsync, selectIsLogin, selectTokenAccess } from '../../../Redux/authSlice';
import './Login.css'

export interface LoginForm{
    email:string;
    password:string;
}

const Login = () => {
    
    const [email ,setEmail] = useState(localStorage.getItem('email')||'')
    const [password ,setPassword] = useState('')
    
    const isLogin = useAppSelector(selectIsLogin);
    const token = useAppSelector(selectTokenAccess);

    const dispatch = useAppDispatch();

    const handleKeyPress = (e:React.KeyboardEvent)=>{
        if (e.key==='Enter'){
          handleSubmit()
        }
      }
   
    const handleSubmit = () => {
        var re = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/
        if (re.test(email)){

            dispatch(loginAsync({email,password}))

        }
        else{
            console.log('bad email')
        }
    };

    // useEffect(()=>{
    //     console.log(token)
    // },[token])

    
    return (
        <div className='Login' onKeyUp={handleKeyPress}>
                        <h2 className='mb-4'>Sign In</h2>
                        
                        <input type="email" placeholder=' email@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <i className="material-symbols-rounded">
                        alternate_email
                        </i>
                        <input type="password" placeholder=' Password ' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <i className="material-symbols-rounded">
                        key
                        </i>

                        {/* <input type="text" /> */}
                        <div className='mt-5'>
                        <button className="submit-button" onClick={handleSubmit}>Submit </button>

                        </div>
                    </div>
    )
}

export default Login