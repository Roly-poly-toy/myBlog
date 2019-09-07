import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roles: localStorage.getItem('roles') == null ? '' : localStorage.getItem('roles'),
    token: localStorage.getItem('token') == null ? '' : localStorage.getItem('token'),
    name: localStorage.getItem('name') == null ? '' : localStorage.getItem('name')
  },
  mutations: {
    login(state, data) {
      // 变更状态
      state.token = data.token;
      localStorage.setItem('token', data.token);
      //存储用户名
      state.name = data.name;
      localStorage.setItem('name', data.name)

      state.roles = data.roles;
      localStorage.setItem('roles', data.roles)
    },
    logout(state) {
      localStorage.removeItem('token');
      state.token = '';
      localStorage.removeItem('name');
      state.name = '';
      localStorage.removeItem('roles');
      state.roles = '';
    },
  },
  actions: {

  }
})
