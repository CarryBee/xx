module.exports = function (res) {
  let resData = {
    code: 200,
    message: '操作成功',
    data: {},
    ...res
  }
  return resData
}
