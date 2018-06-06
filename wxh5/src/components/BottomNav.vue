<template>
  <div id="nav" class="flex-box">
    <router-link class="flex-1" to="/">首页</router-link> |
    <router-link class="flex-1" to="/partner">合伙人</router-link> |
    <router-link class="flex-1" to="/partner">商城</router-link> |
    <router-link class="flex-1" to="/userInfo">我的</router-link>
  </div>
</template>
<script>
export default {
  name: 'BottomNav'
}
</script>
<style lang="scss" scoped="">
  @import "../style/application.scss";
  #nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing:border-box;
    padding: px2rem(20);
    background: #fff;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
       color: #42b983;
      }
    }
  }
</style>
