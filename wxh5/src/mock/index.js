import user from './user'
import shop from './shop'
let mockInit = () => {
  let mockApiList = {
    ...user,
    ...shop
  }
  for (let index in mockApiList) {
    if (mockApiList[index].isMock) {
      mockApiList[index].mock()
    }
  }
}
export default mockInit
