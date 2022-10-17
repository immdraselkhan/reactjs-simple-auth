import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="p-4 bg-gray-100 text-gray-800">
      <div className="container flex justify-between h-16 mx-auto">
        <div className="flex">
          <Link rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center text-2xl font-bold">
            Simple Auth
          </Link>
        </div>
        <div className="items-center flex-shrink-0 flex">
          <Link to="login"><button className="px-8 py-3 font-semibold rounded bg-violet-600 text-gray-50">Log in</button></Link>
        </div>
      </div>
    </header>
  )
};

export default Header;