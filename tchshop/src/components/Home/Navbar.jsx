// Navbar.js
import React, { useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { signOutUserAsync } from '../../reducers/userReducer';
import { signout } from '../../services';
import Categories from './Categories';
import UserMenu from './UserMenu';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const numberOfItems = useSelector((state) => state.cart.cart_details.length);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const handleSignOut = async () => {
  //   try {
  //     await dispatch(signOutUserAsync()).unwrap();
  //     signout(() => navigate('/'));
  //   } catch (error) {
  //     console.error('Failed to sign out:', error);
  //   }
  // };
  const handleSignOut = async () => {
    try {
      // Directly dispatch the thunk without .unwrap()
      await dispatch(signOutUserAsync());
      // If successful, navigate away
      signout(() => navigate('/'));
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <nav className="px-4 py-3 text-white bg-blue-500 z-sticky">
      <div className="container flex items-center justify-between mx-auto">
        {/* Hamburger menu (Mobile) */}
        <FontAwesomeIcon
          icon={faBars}
          className="mr-4 text-2xl text-white cursor-pointer md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            className="mr-2 text-2xl text-white"
          />
          <span className="text-lg font-extrabold">
            <span className="overline">Hack</span>SHOP
          </span>
        </Link>

        {/* Navbar links */}
        <div className="justify-center flex-grow hidden md:flex">
          <Link
            to="/"
            className={`px-2 py-2 mx-4 rounded ${
              window.location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-blue-600'
            }`}
          >
            HOME
          </Link>
          <div className="relative px-2 py-2 mx-4 rounded group">
            <span
              className={`cursor-pointer ${
                window.location.pathname.includes('collections') ? 'bg-blue-600' : 'hover:bg-blue-600'
              }`}
            >CATEGORIES
            </span>
            <Categories />
          </div>
          <Link
            to="/faq"
            className={`px-2 py-2 mx-4 rounded ${
              window.location.pathname === '/faq' ? 'bg-blue-600' : 'hover:bg-blue-600'
            }`}
          >
            FAQ
          </Link>
          <a
            href="mailto:example@mail.com"
            className="px-2 py-2 mx-4 rounded hover:bg-blue-600"
          >
            CONTACT
          </a>
        </div>

        {/* Right side links (Login, Create Account, Cart) */}
        
        {/* user menu button */}
        <div className="flex items-center ">
        <UserMenu
            user={user}
            handleSignOut={handleSignOut}
            isOpen={isMobileMenuOpen}
            toggleUserMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          <Link to="/cart" className="relative mx-4">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-2xl text-white cursor-pointer"
            />
            <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
              {numberOfItems}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="mt-2 md:hidden">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 text-center hover:bg-blue-600"
              >
                HOME
              </Link>
            </li>
            <li>
        <div className="relative block px-4 py-2 text-center rounded hover:bg-blue-600 group">
          <span className="cursor-pointer">CATEGORIES</span>
          <Categories />
        </div>
      </li>
            <li>
              <Link
                to="/faq"
                className="block px-4 py-2 text-center hover:bg-blue-600"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="mailto:example@mail.com"
                className="block px-4 py-2 text-center hover:bg-blue-600"
              >
                CCONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      )}
    </nav>
  );
};

export default memo(Navbar);
