<template>
  <div class="userinfo page">
    <div class="header">
      <div class="user-header flex-box jc-ce ai-c">
        <div class="head">
          <img src="http://thirdwx.qlogo.cn/mmopen/QZH5X1HZYwYlLy5M2qkib5sLmIUqW6bG2oYnY3lkXiaUA6Clj4qpRyJxUphfsaWo5y6jrB9jKb44BGIxZ5cibyamrOR0SXzREgM/132" alt="">
        </div>
        <div class="user-info">
          <div class="name">chao (ง •̀_•́)ง ✧</div>
          <div class="id">ID:34787(186*****102)</div>
        </div>
      </div>
      <div class="header-nav flex-box">
        <div class="my-machine header-nav-btn flex-box flex-direction-column flex-1 ai-c jc-ce">
          <router-link to="/myProduct">
            <div class="header-nav-icon flex-box ai-c jc-ce"><i class="iconfont icon-machine f-55"></i></div>
            <div class="header-nav-title">
              我的机器
            </div>
          </router-link>
        </div>
        <div class="my-machine header-nav-btn flex-box flex-direction-column flex-1 ai-c jc-ce">
          <router-link to="/myShareLink/myShareOption">
            <div class="header-nav-icon flex-box ai-c jc-ce"><i class="iconfont icon-qrcode f-55"></i></div>
            <div class="header-nav-title">
              我的推广码
            </div>
          </router-link>
        </div>
        <div class="my-machine header-nav-btn flex-box flex-direction-column flex-1 ai-c jc-ce">
          <router-link to="/cashier">
            <div class="header-nav-icon flex-box ai-c jc-ce"><i class="iconfont icon-recharge f-55"></i></div>
            <div class="header-nav-title">
              充值/提现
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="user-btn-list">

      <div class="item flex-box jc-sb ai-c">
        <div class="title">我的余额</div>
        <div class="right flex-box">
          <div class="detail">0.00</div>
          <div class="info">元</div>
        </div>
      </div>

      <div class="item flex-box jc-sb ai-c">
        <div class="title">我的订单</div>
        <div class="right flex-box">
        </div>
      </div>

      <div class="item flex-box jc-sb ai-c">
        <div class="title">我的业绩</div>
        <div class="right flex-box">
        </div>
      </div>

      <div class="item flex-box jc-sb ai-c">
        <div class="title">帮助</div>
        <div class="right flex-box">
        </div>
      </div>

    </div>

  </div>

</template>
<script>
export default {
  name: 'userInfo',
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped="">
  @import "../style/application.scss";
  .userinfo.page {
    background: #f5f5f5;
    height: 100%;
  }
  .header {
    background: #fff;
  }
  .user-header {
    position: relative;
    background: #fff;
    width: 100%;
    height: px2rem(180);
    .head {
      height: px2rem(110);
      width: px2rem(110);
      border-radius: 50%;
      overflow: hidden;
      margin-right: px2rem(20);
    }
  }

  .header-nav {
    height: px2rem(120);
    padding: px2rem(10) px2rem(50);
    margin-bottom: px2rem(20);
    background: #fff;
    box-shadow: px2rem(-1) px2rem(-7) px2rem(20) px2rem(5) #888888;
  .header-nav-icon {
    height: px2rem(50);
  }
  .header-nav-title {
    height: px2rem(45);
    line-height: px2rem(45);
  }
  .header-nav-btn {
    padding-top: px2rem(20);
    /*border-left: 1px solid #dddddd;*/
    /*border-right: 1px solid #dddddd;*/
    line-height: px2rem(60);
  }
  }

  .user-btn-list {
  .item {
    height: px2rem(110);
    padding: 0 px2rem(20);
    margin-bottom: px2rem(12);
    background: #fff;
  }
  .info {
    margin-left: px2rem(10);
  }
  }
</style>
