import { Auth } from '@/store/types';

export default {
  namespaced: true,
  mutations: {
    // TODO:stateの方も同じ型にしているが合っているかあとで確認
    login: (state: Auth, data: Auth) =>  {
      state.email = data.email;
      state.last_name = data.last_name;
      state.first_name = data.first_name;
    },
    logout: (state: Auth) => {
      state.email = null;
      state.last_name = null;
      state.first_name = null;
    },
  },
}