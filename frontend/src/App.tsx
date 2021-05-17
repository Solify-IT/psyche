import React from 'react';
import { HashRouter } from 'react-router-dom';

import './App.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar';
import Footer from './components/footer';

import AppRouter from './router';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <ToastContainer className="foo" style={{ top: '6em', right: '1.5em ' }} position="top-right" />
      <AppRouter />
      <Footer />
    </HashRouter>

  );
}

export default App;
