<template>
  <div class="home">
    <div class="header-banner">
      <img :src="headerBannerList[0].img" alt="">
      <div class="title position-center f-40 t-white">合伙人广告</div>
    </div>
    <!--<div class="header">-->
      <!--<div class="reward-wrapper flex-box">-->
        <!--&lt;!&ndash;<div class="award-rule">奖励说明</div>&ndash;&gt;-->
        <!--<div class="sum-award flex-box flex-direction-column flex-1 ai-c jc-ce">-->
          <!--<div class="award-num">0.00</div>-->
          <!--<div class="award-title">我的收益</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="header-nav flex-box">
      <div class="my-machine header-nav-btn flex-box flex-direction-column flex-1 ai-c jc-ce">
        <router-link to="/myShareLink/myShareOption">
          <div class="header-nav-icon flex-box ai-c jc-ce"><i class="iconfont icon-money f-55"></i></div>
          <div class="header-nav-title">
            我的收益
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
    </div>
    <div class="content">
      <div class="entry-btn-list flex-box"></div>
      <banner-ad-list :adList="bannerAdList"></banner-ad-list>
      <div class="two-column-entry-list flex-box flex-wrap jc-sb">
        <div class="entry-item flex-box ai-c jc-ce">业务入口</div>
        <div class="entry-item flex-box ai-c jc-ce">业务入口</div>
        <div class="entry-item flex-box ai-c jc-ce">业务入口</div>
        <div class="entry-item flex-box ai-c jc-ce">业务入口</div>
      </div>
    </div>
  </div>
</template>

<script>
import bannerAdList from '@/components/bannerAdList'
export default {
  name: 'home',
  data () {
    return {
      headerBannerList: [{
        img: 'https://jjb-static.com/Public/image/Index/bg.png',
        title: '合伙人广告'
      }],
      bannerAdList: [{
        img: 'https://jjb-static.com/Public/image/Index/bg.png',
        title: '什么是合伙人'
      }, {
        img: 'https://jjb-static.com/Public/image/Index/bg.png',
        title: '升级为合伙人'
      }, {
        img: 'https://jjb-static.com/Public/image/Index/bg.png',
        title: '合伙人收益规则'
      }]
    }
  },
  components: {
    bannerAdList
  }
}
</script>
<style scoped="" lang="scss">
  @import "../style/application.scss";
  .header-banner {
    position: relative;
  }
  .header {
    position: relative;
    height: px2rem(320);
    background: #f8ea00;
    /*box-shadow: px2rem(-1) px2rem(-7) px2rem(20) px2rem(5) #888888;*/
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
  .reward-wrapper {
    padding: px2rem(80) px2rem(40) px2rem(40) px2rem(40);
  .award-num {
    font-size: px2rem(80);
  }
  .award-rule {
    position: absolute;
    top: px2rem(20);
    right: px2rem(20);
  }
  }
  .content {
    padding: px2rem(20);
  .ad-full {
    height: px2rem(100);
    width: 100%;
    background: #f9f9f9;
  }
  }
  .two-column-entry-list {
    margin-top: px2rem(20);
  .entry-item {
    width: px2rem(350);
    height: px2rem(120);
    background: #f5f5f5;
  }
  }
</style>
