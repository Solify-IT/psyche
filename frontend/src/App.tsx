import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import './App.css';
import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 10 }}>
          Home
        </Link>

        <Link to="/test" style={{ padding: 10 }}>
          Test
        </Link>
      </nav>
      <div className="App">
        <header>
          <h1>PSYCHE-ING</h1>
        </header>
        <div className="content">
          <AppRouter />
        </div>
      </div>

    </BrowserRouter>

  );
}

export default App;
