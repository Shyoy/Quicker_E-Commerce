import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useQuery } from '../../../app/hooks';
import { closeWindow, logout, openWindow, selectAuthWindow, selectErrMsg, selectFullName, selectIsLogin } from '../../../Redux/authSlice';
import Login from '../Login/Login';
import Register from '../Register/Register';
import "./Auth.css"

export interface authWindow{
    status: 'register' | 'login' | 'off';
    
  }

const Auth = () => {

    const [loading, setLoading] = useState()
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [LoginForm, setLoginForm] = useState<Boolean>(true) 
    const [authWindow, setAuthWindow] = useState<Boolean>(false) 

    // const authWindow = useAppSelector(selectAuthWindow);
    const isLogin = useAppSelector(selectIsLogin);
    const fullName = useAppSelector(selectFullName);
    const navigate  = useNavigate()

    let query = useQuery();
    useEffect(() => {
        if (query.has('auth')){
            const auth = query.get("auth")|| '';
            console.log(auth); 
            if (auth == 'login'){
                setLoginForm(true);
                setAuthWindow(true);

                // dispatch(openWindow());
            }
            else if (auth == 'register'){
                setLoginForm(false);
                // dispatch(openWindow());
                setAuthWindow(true);

            }
            else{
                navigate('')
            }
        }
    },[query])
        

    useEffect(()=>{
        
        if (isLogin){
            handleClose()
        }
    },[isLogin])

  
    const handleSwap= () => {
        if (LoginForm){
            setLoginForm(false)
            searchParams.set('auth','register');
            setSearchParams(searchParams);
        }
        else{
            setLoginForm(true)
            searchParams.set('auth','login');
            setSearchParams(searchParams);
        }
    }

    const handleClose = () => {
        // dispatch(closeWindow());
        setAuthWindow(false);
        console.log(searchParams)
        if (searchParams.has('auth')) {
            searchParams.delete('auth');
            setSearchParams(searchParams);
          }
    };
    const handleOpen = () => {
        dispatch(openWindow());
        if (!searchParams.has('auth')) {
            searchParams.set('auth','login');
            setSearchParams(searchParams);
          }
    };
    
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
            <button className="material-symbols-outlined" title='Login' onClick={handleOpen}>login</button>
            <span className="material-symbols-outlined person">person</span>
            </>

            }

            {(authWindow && !isLogin) && 
            <>
            <div className='my-overlay'  onClick={handleClose}/>
            
            <div className='pop-window'>
                <div className='window-body'>
                    <div className='header'>
                    <button className="swap-content" onClick={handleSwap}> {LoginForm ? 'Sign Up':'Sign In'} ?</button>
                    <button className="X" onClick={handleClose} >X</button>

                    </div>

                    {LoginForm ?
                    <Login/>
                    :
                    <Register/>
                    }

                    </div>

                </div>
        </>}

        </div>
            
    )
}

export default Auth