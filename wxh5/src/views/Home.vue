<template>
  <div class="home">
    <div class="header">
      <div class="banner">
        <img src="@/assets/banner.png" />
      </div>
      <div class="tips-banner flex-box">
        <i class="iconfont icon-horn horn"></i>
        <marquee class="flex-1">账户 1552****727 返现100元</marquee>
      </div>
      <div class="reward-wrapper flex-box">
        <!--<div class="award-rule">奖励说明</div>-->
        <div class="real-award flex-box flex-1 ai-c jc-ce">
          <div class="award-title">返现收益</div>
          <div class="award-num">100.00</div>
        </div>
        <div class="button-award flex-box ai-c jc-ce">
          <div class="card-record my-info-btn"><router-link to="cartRecord"><div class="record-font">我的刷卡记录</div></router-link></div>
        </div>
      </div>
    </div>

    <div class="operation-buttons">
      <div class="operation-title">业务服务</div>
      <div class="operation-row flex-box">
        <div class="operation-cell ope-right flex-1">
          <i class="iconfont icon-commend ope-icon" style="color:#673ab7"></i>
          <span class="ope-text">推荐列表</span>
        </div>
        <div class="operation-cell ope-right flex-1">
          <i class="iconfont icon-machine2 ope-icon" style="color:#2196f3"></i>
          <span class="ope-text">我的机器</span>
        </div>
        <div class="operation-cell flex-1">
          <i class="iconfont icon-qrcode2 ope-icon" style="color:#647177"></i>
          <span class="ope-text">推广码</span>
        </div>
      </div>
      <div class="operation-row flex-box">
        <div class="operation-cell ope-right flex-1">
          <i class="iconfont icon-money2 ope-icon" style="color:#ff9800"></i>
          <span class="ope-text">收益明细</span>
        </div>
        <div class="operation-cell ope-right flex-1">
          <i class="iconfont icon-prog ope-icon" style="color:#4caf50"></i>
          <span class="ope-text">进度查询</span>
        </div>
        <div class="operation-cell flex-1">
          <i class="iconfont icon-custserv ope-icon" style="color:#ef5b50"></i>
          <span class="ope-text">在线客服</span>
        </div>
      </div>
      <div class="operation-row flex-box">
        <div class="operation-cell ope-right flex-1">
          <i class="iconfont icon-cards ope-icon" style="color:#607d8b"></i>
          <span class="ope-text">办卡指引</span>
        </div>
        <div class="operation-cell flex-1"></div>
        <div class="operation-cell flex-1"></div>
      </div>
    </div>

    <div class="content">
      <div class="entry-btn-list flex-box"></div>
      <banner-ad-list :adList="bannerAdList"></banner-ad-list>
    </div>
  </div>
</template>

<script>
import bannerAdList from '@/components/bannerAdList'
export default {
  name: 'home',
  data () {
    return {
      bannerAdList: [{
        img: 'https://jjb-static.com/Public/image/Index/bg.png',
        title: '新手须知'
      }, {
        img: 'https://jjb-static.com/Public/image/Index/bg.png',
        title: '业务咨询'
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
  .header {
    position: relative;
    color: #fff;
    background-size: cover;
    background-position: center;
    box-shadow: px2rem(-1) px2rem(-7) px2rem(20) px2rem(5) #888888;
  }
  .banner {
    height: px2rem(300);
  }
  .tips-banner {
    height: auto;
    color: #000000;
    background: #fff8d7;
    padding: px2rem(6);
    font-size: px2rem(28);
    .horn {
      font-size: px2rem(40);
      color: #ff5722
    }
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
    background-image: url("https://jjb-static.com/Public/image/Index/bg.png");
    padding: px2rem(30);
    .award-title {
      font-size: px2rem(26);
      display: inline;
    }
    .button-award {
      width: px2rem(200)
    }
    .award-num {
      padding-left: px2rem(20);
      display: inline;
      font-size: px2rem(60);
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
  .operation-buttons {
    margin-top: px2rem(20);
    background: #fff;
    border-bottom: px2rem(2) solid #eaeaea;
    .operation-title {
      font-size: px2rem(34);
      color: #000;
      padding: px2rem(12) px2rem(24);
    }
    .operation-row {
      height: auto;
    }
    .operation-cell {
      height: px2rem(210);
      text-align: center;
      border-top: px2rem(2) solid #eaeaea;
    }
    .ope-icon {
      display: block;
      font-size: px2rem(70);
      margin-top: px2rem(38);
    }
    .ope-text {
      display: block;
      font-size: px2rem(26);
      margin-top: px2rem(16);
    }
    .ope-right {
      border-right: px2rem(2) solid #eaeaea;
    }
    .ope-bottom {
      border-bottom: px2rem(2) solid #eaeaea;
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
  .record-font {
    font-size: px2rem(26);
    display: inline;
    padding: px2rem(8) px2rem(12) px2rem(8) px2rem(12);
    border: px2rem(2) solid #ffd452;
    border-radius: 8px;
    background: #3c3c3c;
    color: #ffd452;
  }
</style>
