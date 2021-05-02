import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar';
import Footer from './components/footer';

import AppRouter from './router';

import 'react-toastify/dist/ReactToastify.css';
import AppMain from './components/appMain';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer className="foo" style={{ top: '6em', right: '1.5em ' }} position="top-right" />
      <AppMain>
        <AppRouter />
      </AppMain>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
