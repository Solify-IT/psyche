import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
  return (
    <nav style={{ margin: 10 }}>
      <Link to="/" style={{ padding: 10 }}>
        Home
      </Link>

      <Link to="/pacientes" style={{ padding: 10 }}>
        Pacientes
      </Link>
    </nav>
  );
}

export default Navbar;
