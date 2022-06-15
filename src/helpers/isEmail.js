/**
 * Проверяем является ли строка email-ом
 * @param {String} str Строка
 * @returns {Boolean}
 */
export function isEmail(str) {
  if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)) {
    return true;
  }

  return false;
}
