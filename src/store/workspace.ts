import { Workspace } from '@/store/types';

export default {
  namespaced: true,
  mutations: {
    setWorkspace: function (state: Workspace, data: Workspace) {
      state.id = data.id;
      state.name = data.name;
    },
  },
  getters: {
    id: (state: Workspace) => {
      return state.id
    },

    name: (state: Workspace) => {
      return state.name
    },
  }
}