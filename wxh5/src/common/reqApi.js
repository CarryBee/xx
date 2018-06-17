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
  console.log('loginWithCode', res)
  return res
}
