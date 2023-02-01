import './Header.css'

const Header = () => {
  return (
    <div className='Header'>
        <div className='title'>
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