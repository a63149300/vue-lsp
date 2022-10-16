
# vue-lsp

Vue 2.x and 3.x plugin for work with local storage, session storage and memory storage from Vue context，Inspired by [vue-ls](https://github.com/RobinCK/vue-ls)

## Vue version support

Vue 2.x and 3.x

## Install
#### NPM

``` bash
npm install vue-lsp --save
```

#### Yarn

``` bash
yarn add vue-lsp
```

## Usage

Vue2 storage API.

``` js
import Storage from 'vue-lsp';

options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

//or
//Vue.use(Storage);

new Vue({
    el: '#app',
    mounted: function() {
        Vue.ls.set('foo', 'boo');
        //Set expire for item
        Vue.ls.set('foo', 'boo', 60 * 60 * 1000); //expiry 1 hour
        Vue.ls.get('foo');
        Vue.ls.get('boo', 10); //if not set boo returned default 10
        
        let callback = (val, oldVal, uri) => {
          console.log('localStorage change', val);
        } 
        
        Vue.ls.on('foo', callback) //watch change foo key and triggered callback
        Vue.ls.off('foo', callback) //unwatch
        
        Vue.ls.remove('foo');
    }
});
```

Vue3 storage API.

``` js
// main.js
import Storage from 'vue-lsp';
import App from './App.vue'
const app = createApp(App)

app.use(Storage, {
    namespace: 'vuejs__', // key prefix
    name: 'ls', // name variable [ls] or [$ls],
    storage: 'local', // storage name session, local, memory
  }
)

// in page.vue
import { getCurrentInstance } from 'vue'
export default {
  components: {},
  setup() {
    const instance = getCurrentInstance()
    const { ls } = instance.appContext.config.globalProperties
    ls.set('foo', 'boo');
    // Set expire for item
    ls.set('foo', 'boo', 60 * 60 * 1000); //expiry 1 hour
    ls.get('foo');
    ls.get('boo', 10); //if not set boo returned default 10
    
    let callback = (val, oldVal, uri) => {
      console.log('localStorage change', val);
    } 
    
    ls.on('foo', callback) //watch change foo key and triggered callback
    ls.off('foo', callback) //unwatch
    
    ls.remove('foo');
    return {}
  },
}

// in js
import { ls } from 'vue-lsp'

ls.set('foo', 'boo');
// Set expire for item
ls.set('foo', 'boo', 60 * 60 * 1000); //expiry 1 hour
ls.get('foo');
ls.get('boo', 10); //if not set boo returned default 10

let callback = (val, oldVal, uri) => {
  console.log('localStorage change', val);
} 

ls.on('foo', callback) //watch change foo key and triggered callback
ls.off('foo', callback) //unwatch

ls.remove('foo');
```

## API

#### `ls.get(name, def)`

Returns value under `name` in storage. Internally parses the value from JSON before returning it.

- `def`: default null, returned if not set `name`.

#### `ls.set(name, value, expire)`

Persists `value` under `name` in storage. Internally converts the `value` to JSON.

- `expire`: default null, life time in milliseconds `name`

#### `ls.remove(name)`

Removes `name` from storage. Returns `true` if the property was successfully deleted, and `false` otherwise.

#### `ls.clear()`

Clears storage.

#### `ls.on(name, callback)`

Listen for changes persisted against `name` on other tabs. Triggers `callback` when a change occurs, passing the following arguments.

- `newValue`: the current value for `name` in storage, parsed from the persisted JSON
- `oldValue`: the old value for `name` in storage, parsed from the persisted JSON
- `url`: the url for the tab where the modification came from

#### `ls.off(name, callback)`

Removes a listener previously attached with `ls.on(name, callback)`.
