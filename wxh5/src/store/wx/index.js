import mutationTypes from './mutation-types'

export default {
  state: {
    redirectUrl: ''
  },
  mutations: {
    [mutationTypes.SET_REDIRECT_URL] (state, url) {
      state.redirectUrl = url
    }
  },
  actions: {
    setRedirectUrl ({commit}, url) {
      commit(mutationTypes.SET_REDIRECT_URL, url)
    }
  },
  getters: {}
}
