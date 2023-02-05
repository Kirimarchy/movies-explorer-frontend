import './Header.css';
import logo from '../../images/icons/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { ENDPOINTS } from '../../utils/constants';
import Navigation from '../Navigation/Navigaton';


function Header() {

  const location = useLocation();
  const isHeader = ENDPOINTS.header.includes(location.pathname);

  if (isHeader) { 
    
    return (
      <header className="header">
        <div className="header__container">
          <Link to='/' className='header__link'>
            <img src={logo} alt="Логотип" />
          </Link>
          <Navigation />
        </div>
      </header>
    )
  }  
};



export default Header;
