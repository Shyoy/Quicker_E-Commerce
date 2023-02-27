import { useNavigate} from 'react-router-dom'
import './Header.css'

const Header = () => {
  const navigate  = useNavigate()

  return (
    <div className='Header'>
        <div className='title' onClick={()=> navigate('products/')}>
          <span className='fs-1 bold' >Quiker</span>
        </div>
        
        <div className='auth'>
          <span className="material-symbols-outlined">login</span>
          <span className="material-symbols-outlined">person</span>
          <span className="material-symbols-outlined">logout</span>
        </div>
    </div>
  )
}

export default Header