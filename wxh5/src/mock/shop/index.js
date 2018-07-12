import API from '@/common/api'
import Mock from 'mockjs'

let apiList = {
  [API.getMyProduct]: {
    isMock: true,
    mock () {
      Mock.mock(/getMyProduct/, {
        'success': true,
        'code': '200',
        'message': '操作成功',
        'data|1-5': [{
          productId: '1',
          productName: '通刷 V12,2018韩国chic春夏季新款简约高腰长裤k091',
          price: '120',
          returnPrice: '130',
          productSid: 'sewe122',
          productDetailImg: ['/img/product.500f8864.jpg'],
          thumbImg: '/img/product.500f8864.jpg',
        }]
      })
    }
  },
  [API.getProductDetail]: {
    isMock: true,
    mock () {
      console.log(location.origin + API.loginWithCode)
      Mock.mock(/getProductDetail/, {
        'success': true,
        'code': '200',
        message: '操作成功',
        data: {
          productId: '123we',
          productName: '通刷 V12,2018韩国chic春夏季新款简约高腰长裤k091',
          price: '1234',
          returnPrice: '1234',
          thumbImg: '/img/product.500f8864.jpg',
          productDetailImg: [
            '/img/product.500f8864.jpg',
            '/img/product.500f8864.jpg',
            '/img/product.500f8864.jpg'
          ]
        }
      })
    }
  },
  [API.confirmOrder]: {
    isMock: true,
    mock () {
      Mock.mock(/confirmOrder/, {
        'success': true,
        'code': '40040',
        message: '账号余额不足',
        data: {}
      })
    }
  }
}

export default apiList
