import API from '@/common/api'
import Mock from 'mockjs'

let apiList = {
  [API.getUserInfo]: {
    isMock: true,
    mock () {
      Mock.mock(API.getUserInfo, {
        'success': true,
        'code': '200',
        'message': '操作成功',
        'detailMessage': '操作成功',
        'data': {
          'userName': 'Username',
          'phone': /^1[385][1-9]\d{8}/
        }
      })
    },
    [API.loginWithCode]: {
      isMock: true,
      mock () {
        console.log(location.origin + API.loginWithCode)
        Mock.mock(/loginWithCode/, {
          'success': true,
          'code': '200',
          message: '操作成功',
          data: {
            'userid': '5b276c89a4c56a3344fb8ed5',
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1YjI3NmM4OWE0YzU2YTMzNDRmYjhlZDUiLCJpYXQiOjE1MjkzMTAzNDUsImV4cCI6MTUyOTQ5MDM0NX0.lSTNmRmHPl6gIYSSIBT9jP7UYZnlSxjaEsJdDxxilqo',
            'unid': '20000',
            'openid': 'obmzqv4Dj0Eo-sp_DRu60ljDW2Xg'
          }
        })
      }
    }
  }
}

export default apiList
