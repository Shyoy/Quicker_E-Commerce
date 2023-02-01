import React from 'react'
import './NavItem.css'

export interface NavItemProp {
  type: string;
  title: string;
}


const NavItem = (props:NavItemProp) => {
  return (
    <li className='nav-item'>
       
        <span title={props.title} className="icon-button material-symbols-outlined">
        {props.type}
        </span>

        
    </li>
  )
}

export default NavItem