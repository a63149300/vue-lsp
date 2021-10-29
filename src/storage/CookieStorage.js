/* eslint class-methods-use-this: off */
import Cookies from 'js-cookie'

class CookieStorageInterface {
  constructor() {
    Object.defineProperty(this, 'length', {
      /**
       * Define length property
       *
       * @return {number}
       */
      get() {
        return document.cookie ? document.cookie.split('; ').length : 0;
      },
    });
  }

  /**
   * Get item
   *
   * @param {string} name
   * @returns {*}
   */
  getItem(name) {
    return Cookies.get(name);
  }

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @returns {boolean}
   */
  setItem(name, value) {
    Cookies.set(name, value);

    return true;
  }

  /**
   * Remove item
   *
   * @param {string} name
   * @returns {boolean}
   */
  removeItem(name) {
    if (Cookies.get(name)) {
      Cookies.remove(name);
      return true
    }
    return false;
  }

  /**
   * Get item by key
   *
   * @param {number} index
   * @returns {*}
   */
  key(index) {
    let cookies = document.cookie ? document.cookie.split('; ') : [];
    let keys = [];
    for (let i = 0; i < cookies.length; i++) {
      keys.push(cookies[i].split('=')[0])
    }
    return keys[index]
  }
}

const CookieStorage = new CookieStorageInterface();

export { CookieStorage };
