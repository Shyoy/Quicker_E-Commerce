import React from 'react'
import './NavItem.css'

export interface NavItemProp {
  type: string;
  title: string;
}


const NavItem = (props:NavItemProp) => {

  const handleClick = () => {
    alert(props.title +" is coming soon ")
  }

  return (
    <li className='nav-item'>
       
        <span title={props.title} onClick={handleClick} className="icon-button material-symbols-outlined">
        {props.type}
        </span>

        
    </li>
  )
}

export default NavItem