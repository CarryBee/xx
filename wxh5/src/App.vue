<template>
  <div id="app">
    <bottom-nav v-if="isShowBottomNav"></bottom-nav>
    <router-view/>
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav'
export default {
  computed: {
    isShowBottomNav () {
      return this.$store.state.UIComponent.isBottomNavShow
    }
  },
  components: {
    BottomNav
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
  color: #2c3e50;
  font-size: px2rem(24);
  box-sizing: border-box;
  padding-bottom: px2rem(80);
  min-height: 100vh;
  background: #f5f5f5;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }

}
.adapt-toast .mint-toast-text{
  font-sise: px2rem(20);
}
</style>
