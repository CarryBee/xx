<template>
  <div class="order-confirm flex-box flex-direction-column f-28">
    <div class="buyer-info">
      <div class="input-wrapper flex-box">
        <input type="text" class="f-28" placeholder="收货人"/>
      </div>
      <div class="input-wrapper">
        <input type="text" class="f-28" placeholder="联系电话"/>
      </div>
      <div class="input-wrapper">
        <input type="text" class="f-28" placeholder="详细地址"/>
      </div>
    </div>
    <div class="product-info flex-box ai-c">
      <div class="product-img">
        <img src="//img14.360buyimg.com/mobilecms/s270x270_jfs/t7240/290/2826787234/247803/2c5675eb/59b5eafaNfed39f07.jpg.dpg" alt="">
      </div>
      <div class="product-detail">
        <div class="product-name">通刷刷卡机 v123</div>
        <div class="product-detail">通刷刷卡机 押金100 激活返100</div>
      </div>
    </div>
    <div class="confirm-btn ta-c">确认购买</div>
  </div>
</template>
<script></script>
<style lang="scss" scoped="">
  @import "../../style/application.scss";
  .order-confirm {
    padding: px2rem(20);
    .input-wrapper {
      margin-bottom: px2rem(20);
    }
    input {
      width: 100%;
    }
  }
  .product-info {
    img {
      width: 100%;
      height: 100%;
    }
    .product-img {
      width: px2rem(170);
      height: px2rem(170);
      margin-right: px2rem(20);
    }
  }
  .confirm-btn {
    position: fixed;
    bottom: px2rem(80);
    left: 0;
    width: 100%;
    height: px2rem(80);
    line-height: px2rem(80);
    background: #f8ea00;
  }
</style>
