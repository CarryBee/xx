<template>
  <div class="home page">

    <div class="header-info flex-box jc-ce">

      <div class="user-header flex-box jc-ce ai-c">
        <div class="head">
          <img :src="userInfo.headimgurl" alt="">
        </div>
        <div class="user-info t-white">
          <div class="name f-30">{{userInfo.nickname || '未授权登录'}}</div>
          <div class="id">超级合伙人</div>
        </div>
        <div class="qrcode-ctrl flex-box flex-direction-column t-white">
          <router-link to="/myShareLink/myShareOption">
            <i class="iconfont icon-qrcode2 f-70 ta-c"></i>
            <div class="title">生成推广码</div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="recommend-info flex-box flex-direction-column jc-ce">
      <div class="recommend-sum flex-1 ta-c f-30">
        <div class="count f-40">已推荐注册人数 <span class="f-50 t-orange">0</span></div>
        <div class="title"></div>
      </div>
      <div class="recommend-detail flex-1 flex-box jc-ce">
        <div class="detail-info ta-c">
          <div class="count f-35 t-orange">0</div>
          <div class="title">代理商</div>
        </div>
        <div class="detail-info ta-c">
          <div class="count f-35 t-orange">0</div>
          <div class="title">普通用户</div>
        </div>
        <div class="detail-info ta-c">
          <div class="count f-35 t-orange">0</div>
          <div class="title">下属人数</div>
        </div>
      </div>
    </div>

    <div class="recommend-info flex-box flex-direction-column jc-ce">
      <div class="recommend-sum flex-1 ta-c f-30">
        <div class="count f-40">今日收益 <span class="f-50 t-orange">0</span></div>
        <div class="title"></div>
      </div>
      <div class="recommend-detail flex-1 flex-box jc-ce">
        <div class="detail-info ta-c">
          <div class="count f-35 t-orange">0</div>
          <div class="title">本月收益</div>
        </div>
        <div class="detail-info ta-c">
          <div class="count f-35 t-orange">0</div>
          <div class="title">总收益</div>
        </div>
      </div>
    </div>
    <!--<div class="header-nav flex-box">-->
      <!--<div class="my-machine header-nav-btn flex-box flex-direction-column flex-1 ai-c jc-ce">-->
        <!--<router-link to="/income">-->
          <!--<div class="header-nav-icon flex-box ai-c jc-ce"><i class="iconfont icon-money f-55"></i></div>-->
          <!--<div class="header-nav-title">-->
            <!--我的收益-->
          <!--</div>-->
        <!--</router-link>-->
      <!--</div>-->
      <!--<div class="my-machine header-nav-btn flex-box flex-direction-column flex-1 ai-c jc-ce">-->
        <!--<router-link to="/myShareLink/myShareOption">-->
          <!--<div class="header-nav-icon flex-box ai-c jc-ce"><i class="iconfont icon-qrcode f-55"></i></div>-->
          <!--<div class="header-nav-title">-->
            <!--我的推广码-->
          <!--</div>-->
        <!--</router-link>-->
      <!--</div>-->
    <!--</div>-->
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
import {mapGetters} from 'vuex'
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
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
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
  .iconhead {
    position: absolute;
    left: px2rem(510);
    font-size: px2rem(300);
    color: #ead837;
    z-index: 1;
  }
  .header-info {
    position: relative;
    height: px2rem(250);
    box-shadow: px2rem(-1) px2rem(-7) px2rem(20) px2rem(5) #888888;
    background-repeat: no-repeat;
    background-image: url("../assets/trianglify.png");
    background-size: cover;
    padding:0 px2rem(20);
    padding-top: px2rem(70);
    .income-wrapper {
      color: #fff;
    }
    .qrcode-ctrl {
      border-left: px2rem(2) solid #fff;
      margin: 0 px2rem(20);
      padding: 0 px2rem(20);
    }
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
    margin-top: px2rem(-80);
    padding: px2rem(20);
  }
  .two-column-entry-list {
    margin-top: px2rem(20);
  .entry-item {
    width: px2rem(350);
    height: px2rem(120);
    background: #f5f5f5;
  }
  }
  .user-header {
    position: relative;
    height: px2rem(180);
    .head {
      height: px2rem(110);
      width: px2rem(110);
      border-radius: 50%;
      overflow: hidden;
      margin-right: px2rem(20);
      border: px2rem(5) solid rgba(255, 255, 255, 0.3);
    }
  }
  .recommend-info {
    position: relative;
    top: px2rem(-80);
    padding: px2rem(20);
    margin: px2rem(20);
    background: #fff;
    border-radius: px2rem(10);
    .recommend-sum {
      margin-bottom: px2rem(20);
    }
    .detail-info {
      padding: 0 px2rem(30);
    }
  }
</style>
