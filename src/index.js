import { MemoryStorage, WebStorage } from './storage';

// eslint-disable-next-line
const _global = (typeof window !== 'undefined' ? window : global || {});

let ls = null;

/**
 * @type {{install: (function(Object, Object): WebStorage)}}
 */
const VueStorage = {
  /**
   * Install plugin
   *
   * @param {Object} app
   * @param {Object} options
   * @returns {WebStorage}
   */
  install(app, options = {}) {
    const _options = {
      ...options,
      storage: options.storage || 'local',
      name: options.name || '$ls',
    };

    if (_options.storage && ['memory', 'local', 'session'].indexOf(_options.storage) === -1) {
      throw new Error(`vue-lsp: Storage "${_options.storage}" is not supported`);
    }

    let store = null;

    switch(_options.storage) { // eslint-disable-line
      case 'local':
        store = 'localStorage' in _global
          ? _global.localStorage
          : null
        ;
        break;

      case 'session':
        store = 'sessionStorage' in _global
          ? _global.sessionStorage
          : null
        ;
        break;
      case 'memory':
        store = MemoryStorage;
        break;
    }

    if (!store) {
      store = MemoryStorage;
      // eslint-disable-next-line
      console.error(`vue-lsp: Storage "${_options.storage}" is not supported your system, use memory storage`);
    }

    ls = new WebStorage(store);

    ls.setOptions(Object.assign(ls.options, {
      namespace: '',
    }, _options || {}));

    // 兼容vue3 及 vue2
    if (app.version && app.version > '3') {
      app.config.globalProperties[_options.name] = ls; // eslint-disable-line
      app.config.globalProperties[`$${_options.name}`] = ls; // eslint-disable-line
    } else {
      app[_options.name] = ls; // eslint-disable-line
      Object.defineProperty(app.prototype, `$${_options.name}`, {
        /**
         * Define $ls property
         *
         * @return {WebStorage}
         */
        get() {
          return ls;
        },
      });
    }
  },
};

// eslint-disable-next-line
_global.VueStorage = VueStorage;

export { ls }

export default VueStorage;
