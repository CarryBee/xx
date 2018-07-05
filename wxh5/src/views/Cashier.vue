<template>
  <div class="cashier page flex-box flex-direction-column ai-c jc-ce">
    <div class="ctrl-list">

      <router-link to="recharge">
        <div class="item balance flex-box ai-c jc-sb">
          <div class="title f-30">
            <span class="f-24">我的余额：</span><span class="f-34 t-red">￥120</span>
          </div>
          <div class="ctrl">
            <div class="title flex-box ai-c">
              微信充值
              <i class="iconfont f-40 icon-more"></i>
            </div>
          </div>
        </div>
      </router-link>

      <div class="item balance flex-box ai-c jc-sb">
        <div class="title f-28">
          <span class="f-24">可提取分成：</span><span class="f-34 t-red">￥120 </span><span class="f-24">(20%手续费)</span>
        </div>
        <div class="ctrl">
          <div class="title flex-box ai-c">
            提现到微信
            <i class="iconfont f-40 icon-more"></i>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped="">
  @import "../style/application.scss";
  .cashier.page{
    height: 100%;
    padding-top: px2rem(250);
  }
  .ctrl-list {
    width: 100%;
    .item {
      height: px2rem(200);
      padding: px2rem(20);
      margin-bottom: px2rem(20);
      background: #fff;
    }
  }
</style>
