import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Navbar from './components/navbar';
import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <header>
          <h1>PSYCHE-ING</h1>
        </header>
        <div className="main-content">
          <AppRouter />
        </div>
      </div>

    </BrowserRouter>

  );
}

export default App;
