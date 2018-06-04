import user from './user'
let mockInit = () => {
  let mockApiList = {
    ...user
  }
  for (let index in mockApiList) {
    if (mockApiList[index].isMock) {
      mockApiList[index].mock()
    }
  }
}
export default mockInit