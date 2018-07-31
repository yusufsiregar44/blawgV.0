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
  },
  mutations: {
    assignReaderIsLoggedIn(state, payload) {
      return state.readerIsLoggedIn = payload;
    },
    assignWriterIsLoggedIn(state, payload) {
      return state.writerIsLoggedIn = payload;
    },
  },
  actions: {
    register(context, payload) {
      // eslint-disable-next-line
      console.log(payload);
     return axios.post(`http://localhost:3000/users/register`, {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: 'reader',
      });
    }
  }
})
