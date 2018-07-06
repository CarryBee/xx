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
  padding-bottom: px2rem(110);
  min-height: 100vh;
  background: #f5f5f5;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.primary.toast-style{
  font-size: 0.4rem !important;
  padding: 0.2rem !important;
  border-radius: 10px;
  opacity: 0.7 !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
}
.toasted-container.bottom-center{
  bottom: 10% !important;
}
</style>
