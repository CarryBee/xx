import mutationType from './mutation-types'

export default {
  state: {
    isBottomNavShow: true
  },
  mutations: {
    [mutationType.SET_BOTTOM_NAV_STATE] (state, isShow = true) {
      state.isBottomNavShow = isShow
    }
  },
  actions: {
    setBottomNavState ({commit}, isShow) {
      commit(mutationType.SET_BOTTOM_NAV_STATE, isShow)
    }
  }
}