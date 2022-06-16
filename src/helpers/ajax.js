import axios from 'axios';
import config from '../config';
import * as auth from './auth';

const apiURL = {
  v1: `${config.apiHost}/api/v1`,
  v2: `${config.apiHost}/api/v2`
};

function ajaxConfig(version) {
  const ajax = axios.create({
    headers: { 'Content-Type': 'application/json' },
    timeout: 60000,
    transformRequest: [
      (data) => JSON.stringify(data)
    ],
    validateStatus: function(status) {
      if (status === 404) {
        return false;
      }

      if (status === 401) {
        auth.logout();
        return false;
      }

      return (status >= 200 && status < 300);
    }
  });

  ajax.interceptors.request.use(
    (config) => {
      let url = config.url;

      if (auth.getToken()) {
        config.headers.Authorization = `Bearer ${auth.getToken()}`;
      }

      url = apiURL[version] + url;
      config.url = url;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return ajax;
}

/**
 * Ajax config v1 api
 */
export const ajax = ajaxConfig('v1');

/**
 * Ajax config v2 api
 */
export const ajaxV2 = ajaxConfig('v2');
