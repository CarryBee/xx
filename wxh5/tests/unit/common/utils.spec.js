import { expect } from 'chai'
import * as UTILS from '@/common/utils'

describe('Unit', () => {
  it('makeAccessWXUrl should include appId，snsapiType', function () {
    let redirectUrl = UTILS.makeAccessWXUrl('testappid')
    expect(redirectUrl).to.include('testappid')
    expect(redirectUrl).to.include('snsapi_userinfo')
  })
})

describe('getQueryString', () => {
  it('getQueryString 正常顺序参数', () => {
    let res = UTILS.getQueryString('code', 'http://localhost:8880/#/myShareLink/erqew121rwr232r.er23?code=codetest123')
    expect(res).to.equal('codetest123')
  })
  it('getQueryString 非正常顺序参数', () => {
    let res = UTILS.getQueryString('code', 'http://localhost:8880/?code=codetest123#/myShareLink/erqew121rwr232r.er23')
    expect(res).to.equal('codetest123')
  })
})
