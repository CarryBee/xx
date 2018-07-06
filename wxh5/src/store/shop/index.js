import mutationTypes from './mutation-types'

export default {
  state: {
    orderProduct: {}
  },
  mutations: {
    [mutationTypes.SET_PRODUCT_ORDER_DATA] (state, productDetail) {
      state.orderProduct = productDetail
    }
  },
  actions: {
    setOrderProduct ({commit}, productDetail) {
      commit(mutationTypes.SET_PRODUCT_ORDER_DATA, productDetail)
    }
  },
  getters: {}
}

