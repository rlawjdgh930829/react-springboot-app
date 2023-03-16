import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userId = 5;

  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to={{ pathname: '/user/' + userId }}>User</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
