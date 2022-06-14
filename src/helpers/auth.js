import decode from 'jwt-decode';

/**
 * Получаем время жизни токена
 * @param {String} token Токен
 * @returns {Boolean|Date}
 */
export function getTokenExpirationDate(token) {
  if (typeof token !== 'string') {
    return false;
  }

  if (token.split('.').length < 2) {
    return false;
  }

  const decoded = decode(token);

  if (!decoded.exp) {
    return false;
  }

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

/**
 * Проверяем если у токена не кончилось время жизни
 * @param {String} token Токен
 * @returns {Boolean}
 */
export function isTokenExpired(token) {
  const date = getTokenExpirationDate(token);
  const offsetSeconds = 0;

  if (date === null) {
    return true;
  }

  return (!(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000));
}

/**
 * Авторизуемся на сайте
 * @param {Object} response Ответ от сервера
 * @param {Function} navigate useNavigation hook
 */
export function handleAuthResponse(response, navigate) {
  const jwt = response.jwt;

  if (isTokenExpired(jwt)) {
    navigate('/register/');
  }

  setToken(jwt);
}

/**
 * Устанавливаем токен в локал сторадж
 * @param {String} token Токен
 * @returns {Boolean}
 */
export function setToken(token) {
  if (!token || token === 'undefined') {
    return false;
  }

  localStorage.setItem('auth_token', token);
}

/**
 * Получаем токен из локал стораджа
 * @returns {String|Boolean}
 */
export function getToken() {
  let token = localStorage.getItem('auth_token');

  if (!token || token === 'undefined') {
    return false;
  }

  return localStorage.getItem('auth_token');
}

/**
 * Выходим из профиля
 */
export function logout() {
  localStorage.removeItem('auth_token');
}

/**
 * Проверяем залогинен ли пользователь
 * @returns {Boolean}
 */
export function isLoginIn() {
  const token = getToken();
  return (!!token && !isTokenExpired(token));
}
