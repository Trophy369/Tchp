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

  const handleSignOut = async () => {
    try {
      await dispatch(signOutUserAsync()).unwrap();
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
            Home
          </Link>
          <div className="relative px-2 py-2 mx-4 rounded group">
            <span
              className={`cursor-pointer ${
                window.location.pathname.includes('collections') ? 'bg-blue-600' : 'hover:bg-blue-600'
              }`}
            >
              Products
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
            Contact
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
                Home
              </Link>
            </li>
            <li>
        <div className="relative block px-4 py-2 text-center rounded hover:bg-blue-600 group">
          <span className="cursor-pointer">Products</span>
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
                Contact
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

// categories

// <div className="container p-4 mx-auto">
    //   <h1>{name}</h1>
    //   <p>this category data {JSON.stringify(products)}</p>
    //   {products.map(product => <CategoryCards product={product}/>)}
    // </div>
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">{name}</h1>
      <p className="mb-6 text-gray-700">
        This category data: {JSON.stringify(products)}
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(product => (
          <CategoryCards key={product.id} product={product} />
        ))}
      </div>
    </div>

    // category card

    <div className="flex items-center p-4">
            <ShowImage url={`static/products/default_img/${product.image}`} style="category" /> {/* Increased image size */}
            <div className="flex-grow mx-4 text-center">
              <h2 className="flex items-center text-xl font-bold text-gray-900 ">{product.name}</h2> {/* Bold and darker font */}
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">${product.price.toFixed(2)}</p> {/* Bold and darker font */}
            </div>
          </div>

//

<section className="flex items-center justify-center px-4 py-4 bg-gray-50 sm:px-6 lg:px-8">
<div className="w-full max-w-md space-y-2">
        <div>
          <h2 className="mt-2 text-3xl font-extrabold text-center text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-2 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 ${emailInputClasses} rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                placeholder="email"
              />
              {emailInputHasError && (
                <p className="mt-2 text-sm text-center text-red-700">
                  Email must contain '@'
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
          </div>

          {/* Display loading spinner or text */}
          {loading && (
            <button
              type="button"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-500 border border-transparent rounded-md shadow cursor-not-allowed hover:bg-indigo-400"
              disabled
              aria-busy="true"
              aria-label="Loading"
            >
              <svg
                className="w-5 h-5 mr-3 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-11 11h4l-3 3 3 3h-4a8 8 0 018-8z"
                ></path>
              </svg>
              Authenticating...
            </button>
          )}

          {/* Display error message */}
          {error && <p className="mt-4 text-sm text-center text-red-700">{error}</p>}

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading} // Disable button while loading
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="mt-4">
            <Link
              to={"/forgot-password"}
              className="text-blue-500 transition duration-200 ease-in-out hover:underline hover:text-indigo-700"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </section>