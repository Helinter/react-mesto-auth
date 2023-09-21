import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext'; 

import Register from './components/Register';
import Login from './components/Login';

import ProtectedRouteElement from './components/ProtectedRoute';


const Root = () => {
  return (
    <CurrentUserProvider>
      <Router>
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/" element={<ProtectedRouteElement  element={App}/>} />
        </Routes>
      </Router>
    </CurrentUserProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals();

