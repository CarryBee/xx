<template>
  <div id="nav" class="flex-box">
    <router-link class="flex-1" to="/">
      <div>
        <i class="iconfont icon-tab1 bot-icon"></i>
        <div class="bot-title">我的刷卡</div>
      </div>
    </router-link>
    <router-link class="flex-1" to="/partner">
      <div>
        <i class="iconfont icon-tab2 bot-icon"></i>
        <div class="bot-title">合伙人</div>
      </div>
    </router-link>
    <router-link class="flex-1" to="/shopIndex">
      <div>
        <i class="iconfont icon-tab3 bot-icon"></i>
        <div class="bot-title">Pos商城</div>
      </div>
    </router-link>
    <router-link class="flex-1" to="/userInfo">
      <div>
        <i class="iconfont icon-tab4 bot-icon"></i>
        <div class="bot-title">我的</div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'BottomNav'
}
</script>
<style lang="scss" scoped="">
  @import "../style/application.scss";
  .bot-icon {
    font-size: px2rem(40);
  }
  .bot-title {
    font-size: px2rem(20);
    padding-top: px2rem(-2);
  }
  #nav {
    box-shadow: px2rem(0) px2rem(16) px2rem(20) px2rem(5) #969696;
    border-top: px2rem(2) solid #eaeaea;
    position: fixed;
    z-index: 10;
    bottom: 0;
    width: 100%;
    height: px2rem(110);
    text-align: center;
    box-sizing:border-box;
    padding: px2rem(16);
    background: #fff;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
       color: #fd6831;
      }
    }
  }
</style>
