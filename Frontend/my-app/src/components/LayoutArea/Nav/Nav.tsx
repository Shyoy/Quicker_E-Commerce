import './Nav.css'
import NavItem from '../../NavArea/NavItem/NavItem'
import SearchBar from '../../NavArea/SearchBar/SearchBar'
import Filter from '../../NavArea/Filter/Filter'
import Loading from '../../SharedArea/Loading/Loading'


const Nav = () => {
  
  return (
    <div className='Nav  navbar-expand-lg'>
        
        <Loading/>
        <ul className='navbar-nav'>
          <SearchBar/>
          <NavItem title={'Bookmarks'} type={"bookmarks"}/>
          <NavItem title={'Featured Products'} type={"new_releases"}/>
          <Filter/>

        </ul>
        <span></span>
    </div>
  )
}

export default Nav