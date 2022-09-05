import { createStore } from 'vuex'

export const store = createStore({
  state: {
    space: null,
  },
  mutations: {
    setSpace(state, spaceObj) {
      state.space = spaceObj
    },

    removeSpace(state) {
      state.space = null
    },
  },
  actions: {},
  modules: {},
  getters: {
    getSpaceData: state => {
      return state.space
    },
  },
})
