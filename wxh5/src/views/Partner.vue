<template>
  <div class="home page">

    <div class="header-info flex-box jc-ce">
      <div class="user-header flex-box jc-ce ai-c">
        <div class="reward-wrapper flex-box">
          <div class="sum-award flex-box flex-direction-column flex-1 ai-c jc-ce">
            <div class="award-title">合伙人收益</div>
            <div class="award-num">1208.03</div>
          </div>
        </div>
        <div class="qrcode-ctrl flex-box flex-direction-column t-white">
          <a>
            <i class="iconfont icon-detail f-50 ta-c"></i>
            <div class="title"></div>
          </a>
        </div>
      </div>
    </div>

  <div class="recommend-list">
    <div class="recommend-info flex-box flex-direction-column jc-ce">
        <div class="recommend-sum flex-1 ta-c f-30">
          <div class="recommend-title">总收益情况</div>
        </div>
        <div class="recommend-detail flex-1 flex-box jc-ce">
          <div class="detail-info ta-c flex-1">
            <div class="count f-35 t-orange">0</div>
            <div class="title">今日收益</div>
          </div>
          <div class="detail-info ta-c flex-1">
            <div class="count f-35 t-orange">0</div>
            <div class="title">近7日收益</div>
          </div>
          <div class="detail-info ta-c flex-1">
            <div class="count f-35 t-orange">0</div>
            <div class="title">本月收益</div>
          </div>
        </div>
      </div>

      <div class="recommend-info flex-box flex-direction-column jc-ce">
        <div class="recommend-tip">最近30天</div>
        <div class="recommend-sum flex-1 ta-c f-30">
          <div class="recommend-title">消费分布情况</div>
        </div>
        <div class="recommend-detail flex-1 flex-box jc-ce">
          <div class="detail-info ta-c flex-1">
            <div class="count f-35 t-orange">4</div>
            <div class="title">普通用户数</div>
          </div>
          <div class="detail-info ta-c flex-1">
            <div class="count f-35 t-orange">2+3</div>
            <div class="title">合伙人数</div>
          </div>
          <div class="detail-info ta-c flex-1">
            <div class="count f-35 t-orange">9</div>
            <div class="title">总用户数</div>
          </div>
        </div>
      </div>

      <div class="recommend-info flex-box flex-direction-column jc-ce">
        <div class="recommend-tip">最近30天</div>
        <div class="recommend-sum flex-1 ta-c f-30">
          <div class="recommend-title">消费分成收益</div>
        </div>
        <div class="recommend-detail flex-1 flex-box jc-ce">
          <div class="detail-info ta-c flex-1">
            <div class="count f-35 t-orange">110</div>
            <div class="title">普通用户</div>
          </div>
          <div class="detail-info ta-c flex-1">
            <div class="count f-35 t-orange">103</div>
            <div class="title">合伙人</div>
          </div>
          <div class="detail-info ta-c flex-1">
            <div class="count f-35 t-orange">213</div>
            <div class="title">总用户收益</div>
          </div>
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
      <!--<banner-ad-list :adList="bannerAdList"></banner-ad-list>-->
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
    .user-header {
      position: relative;
      height: px2rem(180);
      padding-left: px2rem(70);
      .head {
        height: px2rem(110);
        width: px2rem(110);
        border-radius: 50%;
        overflow: hidden;
        margin-right: px2rem(20);
        border: px2rem(5) solid rgba(255, 255, 255, 0.3);
      }
    }
    .income-wrapper {
      color: #fff;
    }
    .qrcode-ctrl {
      width: px2rem(50);
      margin-left: px2rem(20);
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
    color: #fff;
    .award-title {
      line-height: px2rem(38);
      font-size: px2rem(28);
    }
    .award-num {
      line-height: px2rem(80);
      font-size: px2rem(70);
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
  .recommend-list {
    position: relative;
    top: px2rem(-80);
    .recommend-info {
      position: relative;
      padding: px2rem(34) px2rem(60);
      margin: px2rem(20) px2rem(20) px2rem(0) px2rem(20);
      background: #fff;
      border-radius: px2rem(10);
      .recommend-tip {
        position: absolute;
        color: #bdbdbd;
        font-style: italic;
        right: px2rem(10);
        top: px2rem(10);
      }
      .recommend-title {
        font-size: px2rem(34);
        padding-bottom: px2rem(14);
      }
      .recommend-sum {
        margin-bottom: px2rem(20);
      }
      .detail-info {
        padding: 0 px2rem(0);
      }
    }
  }
</style>
