import axios from 'axios'
import qs from 'qs'
const errCodeCtrl = {
  '-1': function (res) {
    console.log('鉴权失败', res)
  }
}
export default class Http {
  post (url, data) {
    return axios({
      method: 'post',
      url: url,
      data: data
    }).then((response) => {
      return this.checkStatus(response)
    }).then((res) => {
      return this.checkCode(res)
    })
  }
  get (url, params) {
    console.log('get', url, params)
    return axios({
      method: 'get',
      url: url,
      params
    }).then((response) => {
      return this.checkStatus(response)
    }).then((res) => {
      return this.checkCode(res)
    })
  }
  postForm (url, data) {
    let ins = axios.create({
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    return ins.post(url, qs.stringify(data)).then((response) => {
      return this.checkStatus(response)
    }).then((res) => {
      return this.checkCode(res)
    })
  }

  checkStatus (response) {
    // console.log('checkStauts')
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      return response
    }
    return {
      status: -404,
      msg: '网络异常'
    }
  }

  checkCode (res) {
    // console.log('checkCode')
    if (res.status === -404) {
      console.error('网络异常', res)
      throw res
    }
    if (errCodeCtrl[res.data.code]) {
      errCodeCtrl[res.data.code](res)
      return res
    }
    if (res.data.code == 200 && res) {
      // console.log('code200操作成功/code99操作失败')
      return res
    }
    throw res
  }
}
