import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import Header from './Header';
import { authApi } from './AuthApi';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await authApi.register(email, password);
      console.log('Успешная регистрация:', response);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <>
      <Header linkTo="/sign-in" linkName="Войти" email=" " />
      <div className="sign-in">
        <h2 className="sign-in__header">Регистрация</h2>
        <form onSubmit={handleRegister}>
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
            Зарегистрироваться
          </button>
             <Link className="sign-up__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
          
        </form>
      </div>
    </>
  );
}

export default Register;
