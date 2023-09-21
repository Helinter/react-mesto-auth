import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import { authApi } from "./AuthApi"; 
import { setToken } from "./TokenHelper"
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const { setCurrentUser } = useContext(CurrentUserContext); // Используем setCurrentUser из контекста

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await authApi.login(email, password);
      setToken(response); // Сохраняем токен в localStorage
  
      const userData = await authApi.getUserInfo(); // Получаем информацию о пользователе
  
      if (userData) {
        // Сохраняем email пользователя в localStorage
        localStorage.setItem('email', userData.email);
        navigate('/');
      } else {
        console.error('Email пользователя не найден');
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };
  

  return (
    <>
      <Header linkTo="/sign-up" linkName="Регистрация" email="" />
      <div className="sign-in">
        <h2 className="sign-in__header">Вход</h2>
        <form onSubmit={handleLogin}>
          <input
            className="sign-in__input"
            minLength="2"
            maxLength="30"
            type="text"
            name="formSignInEmail"
            placeholder="Email"
            required
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="sign-in__input"
            minLength="2"
            maxLength="30"
            type="password" 
            name="formSignInPassword"
            placeholder="Пароль"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit" className="sign-in__button" id="SignInSubmit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
