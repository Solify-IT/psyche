import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';

import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <Footer />
    </BrowserRouter>

  );
}

export default App;
