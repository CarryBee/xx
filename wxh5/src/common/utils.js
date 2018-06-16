/**
 * 获取 url 的参数
 * @param {String} name 参数的名字
 * @param {String} search url 中的 search，或指定的 类似 ?val=1&id=11 的字符串
 */
export const getQueryString = (name, href = window.location.href) => {
  let reg = new RegExp('[?&]' + name + '=([^?&(?!#)]+)#?', 'i')
  let r = href.match(reg)
  if (r !== null) {
    return unescape(r[1])
  } else {
    return null
  }
}

/**
 * @param appId
 * @param snsapiType {String} snsapi_base: 静默授权 | snsapi_userinfo: 主动授权
 * @returns {string}
 */
export function makeAccessWXUrl (appId = 'wx6f8322dd012ed875', snsapiType = 'snsapi_base') {
  let cutUrl = location.origin + '/' + window.location.hash
  let redirectUri = encodeURIComponent(cutUrl + '?wechat_redirect=1')
  let redirectUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${snsapiType}&state=redirectFromWechat&connect_redirect=1#wechat_redirect`
  return redirectUrl
}
