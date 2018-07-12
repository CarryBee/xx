<template>
  <div class="userinfo page">
    <div class="header">
      <div class="header-info jc-ce ai-c">
        <div class="user-header flex-box">
          <div class="head"><img :src="headicon" alt=""></div>
          <div class="info">
            <div class="flex-box">
              <div class="name">{{userInfo.nickname || '未授权登录'}}</div>
              <span class="level-icon">超级合伙人</span>
              <span class="level-icon">代理商</span>
            </div>
            <div class="flex-box uidbox">
              <div class="uid">ID：{{userInfo.unid || '000000'}}</div>
            </div>
          </div>
        </div>
        <div class="button-ctrl flex-box jc-sb ai-c">
          <div class="flex-box">
            <i class="iconfont icon-withdraw ope-icon" style="color:#ff9800"></i>
            <span class="desp">点击提现</span>
          </div>
          <div class="numb flex-box">
            <div class="detail">¥ 0.00</div>
          </div>
        </div>
      </div>
    </div>

    <div class="recommend-info flex-box flex-direction-column jc-ce">
      <div class="recommend-sum flex-1 ta-c f-30">
        <div class="recommend-title">推荐下线分布</div>
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

    <div class="user-btn-list">

      <div class="item flex-box ai-c">
        <i class="iconfont icon-qrcode2 icon" style="color:#3f51b5"></i>
        <div class="title flex-box">我的二维码</div>
      </div>

      <div class="item flex-box ai-c">
        <i class="iconfont icon-part icon" style="color:#4caf50"></i>
        <div class="title flex-box">升级合伙人</div>
      </div>

      <div class="item flex-box ai-c">
        <i class="iconfont icon-order icon" style="color:#e08d12"></i>
        <div class="title flex-box">我的订单</div>
      </div>

      <div class="item flex-box ai-c">
        <i class="iconfont icon-money2 icon" style="color:#607d8b"></i>
        <div class="title flex-box">我的钱包</div>
      </div>

      <div class="item flex-box ai-c">
        <i class="iconfont icon-help icon" style="color:#a868b3"></i>
        <div class="title flex-box">帮助</div>
      </div>

    </div>

  </div>

</template>
<script>
import {mapGetters} from 'vuex'
import headicon from '@/assets/head.png'
export default {
  name: 'userInfo',
  data () {
    return {
      headicon: headicon
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
  },
  async created () {
    // let loginResStr = localStorage.getItem('loginRes')
    // let loginRes = JSON.parse(loginResStr)
    // if (!loginRes) {
    //   // 微信授权
    //   let wxUrl = this.UTILS.makeAccessWXUrl({
    //     reUrl: location.href
    //   })
    //   location.href = wxUrl
    //   return false
    // }
    // let code = UTILS.getQueryString('code')
    // if (code) {
    //   try {
    //     await loginWithCode(code)
    //     console.log(this.$router.path)
    //     location.href = '/#' + this.$router.path
    //   } catch (err) {
    //     console.log('err loginWithCode', code, err)
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped="">
  @import "../style/application.scss";
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
  .userinfo.page {
    background: #f5f5f5;
    height: 100%;
  }
  .header {
    background: #fff;
  }
  .header-info {
    position: relative;
    box-shadow: px2rem(-1) px2rem(-7) px2rem(20) px2rem(5) #888888;
    overflow: hidden;
    height: auto;
    .user-header {
      position: relative;
      margin-left: px2rem(40);
      padding: px2rem(40) px2rem(20);
      padding-top: px2rem(60);
      .head {
        height: px2rem(110);
        width: px2rem(110);
        overflow: hidden;
        margin-right: px2rem(40);
        border: px2rem(1) solid #ff9800;
      }
      .info {
        padding-top: px2rem(2);
        .name {
          font-size: px2rem(30);
          font-weight: 600;
        }
        .uidbox {
          margin-top: px2rem(6);
          .uid {
            font-size: px2rem(28);
          }
        }
      }
    }
    .split {
      width: px2rem(2);
      background: #fff;
      height: px2rem(120);
    }
    .button-ctrl {
      border-top: px2rem(2) solid #eaeaea;
      padding-left: px2rem(60);
      padding-right: px2rem(60);
      .ope-icon {
        line-height: px2rem(90);
        font-size: px2rem(45);
      }
      .desp {
        padding-left: px2rem(20);
        line-height: px2rem(90);
        font-size: px2rem(30);
      }
      .numb {
        font-size: px2rem(30);
      }
    }
  }

  .level-icon {
    font-size: px2rem(21);
    display: inline;
    margin-left: px2rem(8);
    padding: 0.06667rem 0.16rem 0.06667rem 0.16rem;
    border: 0.02667rem solid #ffd452;
    border-radius: px2rem(14);
    background: #5d5d5d;
    color: #ffd146;
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
    margin-top: px2rem(20);
    border-bottom: px2rem(2) solid #eaeaea;
    .item {
      height: px2rem(110);
      padding: 0 px2rem(40);
      background: #fff;
      border-top: px2rem(2) solid #eaeaea;
      .icon {
        font-size:0.6rem;
      }
      .title {
        padding-left: px2rem(10);
      }
    }
    .info {
      margin-left: px2rem(10);
    }
  }
</style>
