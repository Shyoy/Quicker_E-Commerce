import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logout, selectIsLogin } from '../../../Redux/authSlice';
import Login from '../Login/Login';
import Register from '../Register/Register';
import "./Auth.css"

export interface authWindow{
    status: 'register' | 'login' | 'off';
    
  }

const Auth = () => {
    // const MY_SERVER = config.todosUrl

    const [loading, setLoading] = useState()
    const dispatch = useAppDispatch();

    const [authWindow, setAuthWindow] = useState<Boolean>(false) 
    const [LoginForm, setLoginForm] = useState<Boolean>(true) 

    const isLogin = useAppSelector(selectIsLogin);

    const [errMsg, setErrMsg] = useState("") 
    let navigate = useNavigate();

    const handleKeyPress = (e:React.KeyboardEvent)=>{
        console.log(e.key)
        if (e.key==='Enter'){
        //   goToSearch()
        }
      }

    useEffect(()=>{
        
        if (isLogin){
            setAuthWindow(false)
        }
    },[isLogin])
    
    return (
        <div className='Auth'>
            {isLogin ? 
            <>
            <button className="material-symbols-outlined">person</button>
            <button className="material-symbols-outlined" title='Logout' onClick={()=>{dispatch(logout())}}>logout</button>
            </>
            :
            <>
            <button className="material-symbols-outlined" title='Login' onClick={()=>setAuthWindow(true)}>login</button>
            <button className="material-symbols-outlined">person</button>
            </>

            }

            {(authWindow && !isLogin) && 
            <>
            <div className='my-overlay'  onClick={()=>setAuthWindow(false)}/>
            
            <div className='pop-window'>
                <div className='window-body'>
                    <div className='header'>
                    <button className="swap-content" onClick={()=>setLoginForm(!LoginForm)}> {LoginForm ? 'Sign Up':'Sign In'} ?</button>
                    <button className="X" onClick={()=>setAuthWindow(false)} >X</button>
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