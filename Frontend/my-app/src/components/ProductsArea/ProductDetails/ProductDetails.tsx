import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeWindow, logout, openWindow, selectAuthWindow, selectErrMsg, selectFullName, selectIsLogin } from '../../../Redux/authSlice';

import "./Auth.css"

export interface authWindow{
    status: 'register' | 'login' | 'off';
    
  }

const Auth = () => {

    const [loading, setLoading] = useState()
    const dispatch = useAppDispatch();

    // const [authWindow, setAuthWindow] = useState<Boolean>(false) 
    const [LoginForm, setLoginForm] = useState<Boolean>(true) 

    const authWindow = useAppSelector(selectAuthWindow);
    const isLogin = useAppSelector(selectIsLogin);
    const fullName = useAppSelector(selectFullName);

    // const [errMsg, setErrMsg] = useState("") 


    useEffect(()=>{
        
        if (isLogin){
            dispatch(closeWindow())
        }
    },[isLogin])
    
    return (
        <div className='Auth'>
            {isLogin ? 
            <>
            
            {/* <button className="material-symbols-outlined">person</button> */}
            <span className='full-name'>{fullName}</span>
            <button className="material-symbols-outlined" title='Logout' onClick={()=>{dispatch(logout())}}>logout</button>
            </>
            :
            <>
            <button className="material-symbols-outlined" title='Login' onClick={()=>dispatch(openWindow())}>login</button>
            <span className="material-symbols-outlined person">person</span>
            </>

            }

            {(authWindow && !isLogin) && 
            <>
            <div className='my-overlay'  onClick={()=>dispatch(closeWindow())}/>
            
            <div className='pop-window'>
                <div className='window-body'>
                    <div className='header'>
                    <button className="swap-content" onClick={()=>setLoginForm(!LoginForm)}> {LoginForm ? 'Sign Up':'Sign In'} ?</button>
                    <button className="X" onClick={()=>dispatch(closeWindow())} >X</button>

                    </div>

                    {LoginForm ?
                   <></>
                    :
                    <></>
                    }

                    </div>

                </div>
        </>}

        </div>
            
    )
}

export default Auth