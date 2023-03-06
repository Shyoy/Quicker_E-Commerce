import { useNavigate} from 'react-router-dom'
import Auth from '../../AuthArea/Auth/Auth'
import './Header.css'

const Header = () => {
  const navigate  = useNavigate()

  return (
    <div className='Header'>
        <div className='title' >
          <span className='fs-1 bold' onClick={()=> navigate('products/')} >Quiker</span>
        </div>
        
        <Auth/>
    </div>
  )
}

export default Header