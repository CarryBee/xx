<template>
  <div class="item flex-box jc-sb f-26" @click="goToProduct">
    <div class="product-img-wrapper">
      <img :src="item.productDetailImg" alt="">
    </div>
    <div class="product-info flex-box flex-1 flex-direction-column jc-sb">
      <div class="title">{{item.productName}}</div>
      <div class="price-info">价格<span class="t-red">￥{{item.price}}</span> -激活返现 <span class="t-red">￥{{item.returnPrice}}</span></div>
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
  height: px2rem(150);
  padding: px2rem(10) px2rem(20);
  border-bottom: 1px solid #f8f8f8;
  .product-info {
    margin-left: px2rem(20);
  }
  .product-img-wrapper {
    height: px2rem(150);
    width: px2rem(150);
    img {
      width: 100%;
      height: 100%;
      background: #f9f9f9;
    }
  }
}
</style>
