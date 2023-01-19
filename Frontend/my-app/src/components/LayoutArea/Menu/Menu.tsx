import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
  return (
    <div className='Menu'>
        Menu
        <ul className='py-5'>
             <li><Link to='products/' >Home</Link></li>
             <li><Link to='blogs/' >About</Link></li>
             <li><Link to='contact/'>Contact</Link></li>
        </ul>
      </div>
    // <div className='Menu'>
    //     <ul className='py-5'>
    //         <li><button>Home</button></li>
    //         <li><button>About</button></li>
    //         <li><button>Contact</button></li>
    //     </ul>
    // </div>
  )
}

export default Menu