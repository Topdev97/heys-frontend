import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      gatheringTokenBalance: null,
    }
  },
  mutations: {
    setGatheringTokenBalance(state, amount) {
      state.gatheringTokenBalance = amount
    },
  },
  actions: {},
  modules: {},
  getters: {
    getGatheringTokenBalance: state => {
      return state.gatheringTokenBalance
    },
  },
})
