import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faShoppingCart,
  faScrewdriverWrench,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import {
  signOutUserAsync
} from "../../reducers/userReducer";
import { signout } from "../../services";
import Categories from "./Categories";

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user);
  const numberOfItems = useSelector(state => state.cart.cart_details.length);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State for user dropdown menu
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

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
    <nav className="px-4 py-3 text-white bg-blue-500 z-sticky ">
      <div className="container flex items-center justify-between mx-auto">
        {/* Hamburger menu (Mobile) */}
        <FontAwesomeIcon
          icon={faBars}
          className="mr-4 text-2xl text-white cursor-pointer md:hidden"
          onClick={toggleNavbar}
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
          <Link to="/" className="px-2 py-2 mx-4 rounded hover:bg-blue-600">
            Home
          </Link>
          <div className="relative px-2 py-2 mx-4 rounded group">
            <span className="cursor-pointer hover:bg-blue-600">Products</span>
            <Categories />
          </div>
          <Link to="/faq" className="px-2 py-2 mx-4 rounded hover:bg-blue-600">
            FAQ
          </Link>
          <a
            href="mailto:example@mail.com"
            className="px-2 py-2 mx-4 rounded hover:bg-blue-600"
          >
            Contact
          </a>
        </div>

        {/* Right side links (Login, Create Account, Cart) */}
        <div className="items-center hidden md:flex">
          {user ? (
            <Link
              to="/"
              className="px-2 py-2 mx-4 text-white rounded hover:bg-blue-700"
            >
              <span
                onClick={handleSignOut}
              >
                Sign Out
              </span>
            </Link>
          ) : (
            // <Link
            //   to="/"
            //   className="px-2 py-2 mx-4 text-white rounded hover:bg-blue-700"
            // >
            //   <span
            //     onClick={() =>
            //       logOut(() => {
            //         history("/");
            //       })
            //     }
            //   >
            //     Sign Out
            //   </span>
            // </Link>
            // <div className="items-center hidden md:flex">
            <div>
              <Link
                to="/signin"
                className="px-2 py-2 mx-4 rounded hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-2 py-2 mx-4 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          )}
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

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          {/* User dropdown */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="text-2xl text-white cursor-pointer"
              onClick={toggleUserMenu}
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg">
                <Link
                  to="/signin"
                  className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100"
                >
                  Sign Up
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100"
                >
                  {user !== null && (
                    <span
                      onClick={handleSignOut
                      }
                    >
                      Sign Out
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>

          <Link to="/cart" className="relative mx-4">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-2xl text-white cursor-pointer"
            />
            <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">
              {numberOfItems}
            </span>
          </Link>

          {/* <div className="flex items-center justify-between px-4 mt-4">
            <div>
              <Link to="/login" className="block px-2 py-2 rounded hover:bg-blue-600">Login</Link>
              <Link to="/create-account" className="block px-2 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Create Account</Link>
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faShoppingCart} className="text-2xl text-white cursor-pointer" />
              <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-500 rounded-full">5</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="mt-2 md:hidden">
          <Link
            to="/"
            className="block px-4 py-2 text-center hover:bg-blue-600"
          >
            Home
          </Link>

          <div className="relative px-2 py-2 mx-4 rounded group">
            <span className="block px-4 py-2 text-center cursor-pointer hover:bg-blue-600">
              Products
            </span>
            <div className="absolute hidden w-48 mt-1 text-center bg-black rounded shadow-lg group-hover:block">
              {/* Dropdown content */}
              <Link
                to="collections/flipper-zero"
                className="block px-4 py-2 text-sm text-center hover:bg-gray-600"
              >
                Flipper-Zero
              </Link>
              <Link
                to="collections/pentesting"
                className="block px-4 py-2 text-sm text-center hover:bg-gray-600"
              >
                Pentesting
              </Link>
              <Link
                to="collections/sdr"
                className="block px-4 py-2 text-sm text-center hover:bg-gray-600"
              >
                SDR
              </Link>
              <Link
                to="collections/rf-tools"
                className="block px-4 py-2 text-sm text-center hover:bg-gray-600"
              >
                RF Tools
              </Link>
              <Link
                to="collections/hak5"
                className="block px-4 py-2 text-sm text-center hover:bg-gray-600"
              >
                Hak5
              </Link>
            </div>
          </div>
          <Link
            to="/faq"
            className="block px-4 py-2 text-center hover:bg-blue-600"
          >
            FAQ
          </Link>
          <a
            href="mailto:example@mail.com"
            className="block px-4 py-2 text-center hover:bg-blue-600"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
