import Http from './Http'
import api from './api'
let http = new Http()

export function getUserInfo (data) {
  let res = http.get(api.getUserInfo)
  return res
}