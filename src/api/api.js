import { ajax, ajaxV2 } from '../helpers';
import * as auth from '../helpers/auth';

/**
 * Авторизуемся на сайте
 * @param {String} email Email
 * @param {String} password Password
 * @param {Function} navigate useNavigation hook
 * @returns {Promise<Boolean>}
 */
export async function authUser(email, password, navigate) {
  try {
    const response = await ajax.post('/auth/sign_in', {email, password});
    auth.handleAuthResponse(response.data, navigate);
    return true;
  } catch (err) {
    if (err.response.status === 404) {
      return false;
    }
  }
}

/**
 * Регистрируемся на сайте
 * @param {Object} user Данные нового пользователя
 * @param {Function} navigate useNavigation hook
 * @returns {Promise<Object>}
 */
export async function registerUser(user, navigate) {
  try {
    const response = await ajax.post('/auth/sign_up', user);
    auth.handleAuthResponse(response.data, navigate);
    return true;
  } catch(err) {
    if (err.response && err.response.data.errs && err.response.data.errors.email) {
      return false;
    }
  }
}

/**
 * Запрашиваем ссылку на восстановление пароля
 * @param email
 * @returns {Promise<Object>}
 */
export async function passwordReset(email) {
  try {
    await ajax.post('/auth/password', { email })
    return true;
  } catch (err) {
    if (err.response.status === 404) {
      return false;
    }
  }
}

/**
 * Получаем данные о текущем пользователе
 * @returns {Promise<Object>}
 */
export async function getCurrentUserProfile() {
  const response = await ajax.get('/users/me');
  return response.data;
}

/**
 * Получаем данные о тарифе
 * @param id
 * @returns {Promise<Object>}
 */
export async function getTariff(id) {
  const response = await ajax.get(`/tariffs/${id}`);
  return response.data;
}

/**
 * Получаем список тарифов
 * @returns {Promise<Array>}
 */
export async function getTariffs() {
  const response = await ajax.get('/tariffs');
  return response.data;
}

/**
 * Получаем данные для оплаты подписки
 * @param {Object} body Данные для оплаты
 * @param {Function} navigate useNavigation hook
 * @returns {Promise<Object>}
 */
export async function getTokenForPaymentSubscription(body, navigate) {
  const response = await ajax.post('/payments', body);

  if (response.data.errors) {
    throw new Error(response.data.errors);
  }

  if (response.data.hasOwnProperty('url')) {
    return navigate(response.data.url);
  } else {
    return { token: response.data.confirmation_token, paymentId: response.data.payment_id }
  }
}

/**
 * Получаем данные для оплаты товара
 * @param {Object} body Данные для оплаты
 * @param {Function} navigate useNavigation hook
 * @returns {Promise<Object>}
 */
export async function getTokenForPaymentProduct(body, navigate) {
  const response = await ajaxV2.post('/payments/product', body);

  if (response.data.hasOwnProperty('url')) {
    return navigate(response.data.url);
  } else {
    return { token: response.data.confirmation_token, paymentId: response.data.payment_id }
  }
}

/**
 * Получаем список товаров
 * @param {String} category Категория товаров
 * @returns {Promise<Array>}
 */
export async function getProducts(category = '') {
  const response = await ajaxV2.get(`/products/${category ? '?category=' + category : ''}`);
  return response.data.sort((a, b) => a.price - b.price);
}

/**
 * Получаем список платежей
 * @returns {Promise<any>}
 */
export async function getPayments() {
  const response = await ajax.get('/payments');
  return response.data
}
