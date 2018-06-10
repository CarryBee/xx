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
    }
  }
}
export default apiList