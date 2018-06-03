<template>
  <div id="app">
    <div id="nav" class="flex-box" v-if="isShowBottomNav">
      <router-link class="flex-1" to="/">首页</router-link> |
      <router-link class="flex-1" to="/about">商城</router-link> |
      <router-link class="flex-1" to="/userInfo">我的</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isShowBottomNav () {
      return this.$store.state.UIComponent.isBottomNavShow
    }
  }
}
</script>
<style lang="scss">
@import "./style/application.scss";
@import "./style/reset.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: px2rem(24);
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
#nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing:border-box;
  padding: px2rem(20);
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
