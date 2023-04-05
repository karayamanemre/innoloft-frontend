import React from 'react';
import { Link } from 'react-router-dom';
import innoloftLogo from '../images/logo.svg';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-[#272E71] text-white shadow w-full">
      <div className="container mx-auto px-14 py-3 flex justify-between items-center">
        <img src={innoloftLogo} alt="Innoloft Logo" className="h-10" />
        <div className="flex items-center relative text-gray-400">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-400 rounded-xl py-2 px-6 pr-16 w-96"
          />
          <button className="absolute right-5">
            <FaSearch />
          </button>
        </div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
          >
            Home
          </Link>
          <Link
            to="/product"
            className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
          >
            Product
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
