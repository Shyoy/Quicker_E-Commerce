import React from 'react'
import {useState,useEffect} from 'react'

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { registerAsync, selectIsLogin, selectTokenAccess } from '../../../Redux/authSlice';

import './Register.css'

export interface RegisterForm{
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  
}

const Register = () => {
  const [name ,setName] = useState('')
  const [email ,setEmail] = useState(localStorage.getItem('email')||'')
  const [password1 ,setPassword1] = useState('')
  const [password2 ,setPassword2] = useState('')
  
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
    console.log(email)
    console.log(password1)
    console.log(password2)
    if (!re.test(email)){
      console.log('bad email')
    }
    else if((password1!==password2)){
      console.log('bad email')
    }
    else{
      let first_name = name.split(" ")[0];
      let last_name = name.split(" ").slice(1).join(" ");
      dispatch(registerAsync({first_name,last_name,username:email ,password:password1}))
      // console.log(first_name +''+last_name)
    }
};

  return (
    <div className='Register' onKeyUp={handleKeyPress}>
                    <h2 className='mb-4'>Sign Up</h2>

                    <input type="text" placeholder=' Full name' value={name} onChange={(e)=>setName(e.target.value)} />
                    <i className="material-symbols-rounded">
                    account_circle
                    </i>
                    <input type="email" placeholder=' email@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <i className="material-symbols-rounded">
                    alternate_email
                    </i>
                    <input type="password" placeholder=' Password ' value={password1} onChange={(e)=>setPassword1(e.target.value)}/>
                    <i className="material-symbols-rounded">
                    vpn_key
                    </i>
                    <input type="password" placeholder=' Confirm Password' value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
                    <i className="material-symbols-rounded">
                    Vpn_Key_Alert
                    </i>
                    <div className='mt-5'>
                    <button className="submit-button" onClick={handleSubmit}>Submit </button>

                    </div>
    </div>
  )
}

export default Register