<template>
  <div class="home page">
    <div class="header">
      <i class="iconhead iconfont icon-money3"></i>
      <div class="reward-wrapper flex-box">
        <div class="sum-award flex-box flex-direction-column flex-1 ai-c jc-ce">
          <div class="award-title">合伙人收益</div>
          <div class="award-num">1208.03</div>
          <div class="record-font">LV2 超级合伙人</div>
        </div>
      </div>
    </div>
    <div class="header-nav flex-box">
      <div class="my-machine header-nav-btn flex-box flex-direction-column flex-1 ai-c jc-ce">
        <router-link to="/income">
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
      <div class="banner">
        <div class="operation-title">推广收益规则</div>
        <img src="@/assets/banner1.png" />
        <div class="operation-title">交易收益规则</div>
        <img src="@/assets/banner2.png" />
      </div>
    </div>
  </div>
</template>

<script>
import bannerAdList from '@/components/bannerAdList'
export default {
  name: 'partner',
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
  .home.page {
    background: #fff;
  }
  .header-banner {
    position: relative;
  }
  .iconhead {
    position: absolute;
    left: px2rem(510);
    font-size: px2rem(300);
    color: #ead837;
    z-index: 1;
  }
  .header {
    position: relative;
    overflow: hidden;
    height: px2rem(300);
    background: #ffeb3b;
    box-shadow: px2rem(-1) px2rem(-7) px2rem(20) px2rem(5) #888888;
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
  .operation-title {
    font-size: px2rem(26);
    color: #000000;
    padding: px2rem(12) px2rem(24);
    border-bottom: px2rem(2) solid #eaeaea;
  }
  .reward-wrapper {
    position: relative;
    z-index: 2;
    padding: px2rem(80) px2rem(40) px2rem(40) px2rem(40);
    .award-title {
      line-height: px2rem(26);
      font-size: px2rem(26);
    }
    .award-num {
      line-height: px2rem(80);
      font-size: px2rem(70);
    }
    .award-rule {
      position: absolute;
      top: px2rem(20);
      right: px2rem(20);
    }
  }
  .record-font {
    font-size: px2rem(26);
    margin-top: px2rem(10);
    padding: px2rem(8) px2rem(22) px2rem(8) px2rem(22);
    border: px2rem(2) solid #ffd452;
    border-radius: 25px;
    background: #3e3e3e;
    color: #ffd452;
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
