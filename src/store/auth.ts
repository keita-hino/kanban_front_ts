import { Auth } from '@/store/types';

export default {
  namespaced: true,
  mutations: {
    login: function (state: Auth, data: Auth) {
      state.email = data.email;
      state.last_name = data.last_name;
      state.first_name = data.first_name;
    },
    logout: function (state: Auth) {
      state.email = null;
      state.last_name = null;
      state.first_name = null;
    },
  },
}