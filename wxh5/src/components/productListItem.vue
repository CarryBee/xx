<template>
  <div class="item flex-box jc-sb f-26" @click="goToProduct">
    <div class="product-img-wrapper">
      <img :src="item.productDetailImg" alt="">
    </div>
    <div class="product-info flex-box flex-1 flex-direction-column jc-sb">
      <div class="rows title">{{item.productName}}</div>
      <div class="rows desp">{{item.desp}}</div>
      <div class="rows">费率<span class="t-orange num">0.60%</span></div>
      <div class="rows">价格<span class="t-orange price">￥{{item.price}}</span></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    goToProduct () {
      this.$router.push({name: 'shopProductDetail', params: {productId: this.item.productId}})
    }
  }
}
</script>
<style lang="scss" scoped="">
@import "../style/application.scss";
.item {
  height: auto;
  padding: px2rem(20) px2rem(30) px2rem(10) px2rem(30);
  border-bottom: px2rem(2) solid #eaeaea;
  background: #fff;
  .product-info {
    margin-left: px2rem(30);
    .rows {
      padding-bottom: px2rem(10);
      font-size: px2rem(26);
    }
    .title {
      font-size: px2rem(28);
    }
    .desp {
      color: #9e9e9e;
      font-size: px2rem(24);
    }
    .num {
      font-weight: 800;
      font-size: px2rem(40);
      padding-left: px2rem(10);
    }
    .price {
      font-size: px2rem(28);
      padding-left: px2rem(10);
    }
  }
  .product-img-wrapper {
    height: px2rem(150);
    width: px2rem(150);
    img {
      width: 100%;
      height: 100%;
      border-radius: px2rem(10);
      background: #f9f9f9;
    }
  }
}
</style>
