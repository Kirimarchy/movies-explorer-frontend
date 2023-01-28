import { Link, Outlet, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigaton';
import logo from '../../images/icons/logo.svg';
import endpoints from '../../utils/constants';

function Header() {

  const location = useLocation();
  const isHeader = endpoints.header.includes(location.pathname);

    return (
      <>
      {isHeader&&
      <header className="header">
        <div className="header__container">
          <Link to='/' className='header__link'>
            <img src={logo} alt="Логотип" />
          </Link>
          <Navigation />
        </div>
      </header>}
      
      <main className='app'>
        <Outlet />
      </main>
      </>
    )
  };



export default Header;
