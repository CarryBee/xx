import Http from './Http'
import API from './api'
let http = new Http()

export async function getUserInfo (data) {
  let res = await http.get(API.getUserInfo)
  return res
}

export async function loginWithCode (code) {
  let res = await http.get(API.loginWithCode, {
    code
  })
  return res
}

export async function getProductDetail (productId) {
  let res = await http.post(API.getProductDetail, {
    productId
  })
  return res
}

export async function confirmOrder (orderDetail) {
  let res = await http.post(API.confirmOrder, {
    orderDetail
  })
  return res
}

export async function getMyProduct () {
  let res = await http.post(API.getMyProduct, {})
  return res
}

export async function unifiedOrder () {
  let res = await http.post(API.unifiedOrder, {})
  return res
}
