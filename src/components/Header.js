import React from 'react';
import innoloftLogo from '../images/logo.svg';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <img src={innoloftLogo} alt="Innoloft Logo" className="h-10" />
        <h1 className="text-2xl font-bold text-gray-800">Innoloft Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;
