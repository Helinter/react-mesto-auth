// Функция для сохранения токена в localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Функция для получения токена из localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Функция для удаления токена из localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};
