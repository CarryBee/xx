import mutationTypes from './mutation-types'
export default {
  state: {
    userInfo: {}
  },
  mutations: {
    [mutationTypes.SET_USERINFO] (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    setUserInfo ({commit}, userInfo) {
      commit(mutationTypes.SET_USERINFO, userInfo)
    }
  }
}