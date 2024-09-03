// UserMenu.js
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserMenu = ({ user, handleSignOut }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative group">
      <FontAwesomeIcon
        icon={faUser}
        className="text-2xl text-white cursor-pointer"
        onClick={handleToggleMenu}
      />
      <div
        className="absolute right-0 z-20 hidden transform -translate-x-1/2 bg-white rounded-md shadow-lg left-1/2 w-36 group-hover:block"
      >
        <div className="border-b border-gray-200 ">
          {user ? (
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-center text-gray-700 transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <span onClick={handleSignOut}>Sign Out</span>
            </Link>
          ) : (
            <>
              <Link
                to="/signin"
                className="block px-4 py-2 text-sm text-center text-gray-700 transition duration-300 ease-in-out hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-sm text-center text-gray-700 transition duration-300 ease-in-out hover:bg-gray-100"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
