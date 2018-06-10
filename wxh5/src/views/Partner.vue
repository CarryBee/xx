<template>
  <div class="partner">
    <div class="header flex-box ai-c jc-ce">
      <!--合伙人广告Banner-->
    </div>
    <div class="header-nav flex-box">
      <div class="my-machine header-nav-btn flex-box flex-direction-column flex-1 ai-c jc-ce">
        <div class="header-nav-icon flex-box ai-c jc-ce"><i class="far fa-money-bill-alt fa-2x"></i></div>
        <div class="header-nav-title">
          我的收益
        </div>
      </div>
      <div class="my-machine header-nav-btn flex-box flex-direction-column flex-1 ai-c jc-ce">
        <div class="header-nav-icon flex-box ai-c jc-ce"><i class="fas fa-qrcode fa-2x"></i></div>
        <div class="header-nav-title">
          我的推广码
        </div>
      </div>
    </div>
    <div class="banner-ad-list">
      <div class="item">
        <div class="content">
          <div class="banner">
            <img src="http://phone.lofsoft.com/image/fanxian_bg.png" alt="">
          </div>
        </div>
        <div class="title">成为合伙人，享受高收益</div>
      </div>
      <div class="item">
        <div class="content">
          <div class="banner">
            <img src="http://phone.lofsoft.com/image/fanxian_bg.png" alt="">
          </div>
        </div>
        <div class="title">如何成为合伙人</div>
      </div>
      <div class="item">
        <div class="content">
          <div class="banner">
            <img src="http://phone.lofsoft.com/image/fanxian_bg.png" alt="">
          </div>
        </div>
        <div class="title">如何成为合伙人</div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style lang="scss" scope="">
  @import "../style/application.scss";
  .partner {
    padding-bottom: px2rem(30);
  }
  .banner-ad-list {
    .item {
      padding-bottom: .45333rem;
      margin-bottom: .26667rem;
      background: #fff;
    }
  }
  .header {
    position: relative;
    height: px2rem(320);
    background: #f8ea00;
    box-shadow: px2rem(-1) px2rem(-7) px2rem(20) px2rem(5) #888888;
    @include bg-image("http://phone.lofsoft.com/image/fanxian_bg.png");
  }
  .header-nav {
    padding: px2rem(10) px2rem(50);
    background: #f5f5f5;
    height: px2rem(120);
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
</style>
