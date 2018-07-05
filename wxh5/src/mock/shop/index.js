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
          productDetailImg: ['//yddhhoss.rfyiding.com/566432321642_Main_8643861286_1042280853?x-oss-process=style/productPic_thumbnail']
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
          productDetailImg: [
            '//img13.360buyimg.com/imgzone/jfs/t22165/348/1390079210/299594/432e1052/5b274900N486ff3f7.jpg.dpg',
            '//yddhhoss.rfyiding.com/566432321642_Main_8643861286_1042280853',
            '//yddhhoss.rfyiding.com/566432321642_Main_8643861286_1042280853'
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
