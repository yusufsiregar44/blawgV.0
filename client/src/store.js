import Vue from 'vue'
import Vuex from 'vuex'
// eslint-disable-next-line
import router from './router.js';
import axios from 'axios';
import Buefy from 'buefy'

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    readerIsLoggedIn: false,
    writerIsLoggedIn: false,
    username: null,
  },
  mutations: {
    assignUsername(state, payload) {
      return state.username = payload;
    },
    assignReaderIsLoggedIn(state, payload) {
      return state.readerIsLoggedIn = payload;
    },
    assignWriterIsLoggedIn(state, payload) {
      return state.writerIsLoggedIn = payload;
    },
  },
  actions: {
    register(context, payload) {
     return axios.post(`http://localhost:3000/users/register`, {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: 'reader',
      });
    },
    decodeToken({ commit }) {
      if (localStorage.token) {
        axios.get('http://localhost:3000/authentication', {
            'headers': {
              'token': localStorage.token,
            },
          })
          .then((decoded) => {
            commit('assignUsername', decoded.data.name)
            if (decoded.data.role === 'writer') {
                          // eslint-disable-next-line
              console.log('masuk');
              commit('assignWriterIsLoggedIn', true)
              router.push({
                name: 'writer',
                query: {
                  redirect: '/writer'
                }
              });
            } else {
              commit('assignReaderIsLoggedIn', true)
            }
          })
          .catch((err) => {
            // eslint-disable-next-line
            console.log(err);
          });
      } else {
        // eslint-disable-next-line
        console.log('gamasuk');
      }
    },
  }
})
