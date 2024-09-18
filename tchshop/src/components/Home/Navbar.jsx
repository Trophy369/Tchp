import React, { useState, useEffect, useRef, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart, faScrewdriverWrench, faTimes } from '@fortawesome/free-solid-svg-icons';
import { signOutUserAsync } from '../../reducers/userReducer';
import { signout } from '../../services';
import Categories from './Categories';
import UserMenu from './UserMenu';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const numberOfItems = useSelector((state) => state.cart.cart_details.length);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef();

  const handleSignOut = async () => {
    try {
        await dispatch(signOutUserAsync());
        signout(() => navigate('/'));
    } catch (error) {
        console.error('Failed to sign out:', error);
    }
};

  // Close the menu when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false); // Close menu on link click
  };

  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Proper toggle logic
  };

  return (
    <nav className="relative z-50 px-4 py-3 font-mono text-white bg-blue-500">
      <div className="container flex items-center justify-between mx-auto">
        {/* Hamburger menu (Mobile) */}
        {!isMobileMenuOpen && (
          <FontAwesomeIcon
            icon={faBars}
            className="mr-4 text-2xl text-white cursor-pointer md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
        {isMobileMenuOpen && (
          <FontAwesomeIcon
            icon={faTimes}
            className="mr-4 text-2xl text-white cursor-pointer md:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <FontAwesomeIcon
            icon={faScrewdriverWrench}
            className="mr-2 text-2xl text-white"
          />
          <span className="text-lg font-extrabold">
            <span className="overline">TECH</span>SHOP
          </span>
        </Link>

        {/* Navbar links */}
        <div className="justify-center flex-grow hidden md:flex">
          <Link
            to="/"
            className={`px-2 py-2 mx-4 rounded ${window.location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            HOME
          </Link>
          <div className="relative px-2 py-2 mx-4 rounded group">
            <span
              className={` px-2 py-2 mx-4 rounded cursor-pointer ${window.location.pathname.includes('collections') ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
            >
              CATEGORIES
            </span>
            <Categories />
          </div>
          <Link
            to="/faq"
            className={`px-2 py-2 mx-4 rounded ${window.location.pathname === '/faq' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            FAQ
          </Link>
          <a
            href="mailto:Techshoptools@protonmail.com"
            className="px-2 py-2 mx-4 rounded hover:bg-blue-600"
          >
            CONTACT
          </a>
        </div>

        {/* Right side links (Login, Create Account, Cart) */}
        <div className="flex items-center">
          <UserMenu
            user={user}
            handleSignOut={handleSignOut}
            isOpen={isMobileMenuOpen}
            toggleUserMenu={toggleMobileMenu} // Reuse toggle here
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
        <div ref={menuRef} className="absolute top-0 left-0 w-full mt-12 bg-blue-500 md:hidden">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-center hover:bg-blue-600"
                  onClick={handleLinkClick}
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
                  onClick={handleLinkClick}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="mailto:example@mail.com"
                  className="block px-4 py-2 text-center hover:bg-blue-600"
                  onClick={handleLinkClick}
                >
                  CONTACT
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
