<template>
  <div class="my-machine page">
    <div class="item flex-box jc-sb f-26" @click="goToProduct" v-for="(item, index) in productList" :key="index">
      <div class="product-img-wrapper">
        <img :src="item.productDetailImg[0]" alt="">
      </div>
      <div class="product-info flex-box flex-1 flex-direction-column jc-sb">
        <div class="title">{{item.productName}}</div>
        <div class="price-info">价格：<span class="t-red">￥{{item.price}}</span></div>
        <div class="price-info">激活返现：<span class="t-red">￥{{item.returnPrice}}</span></div>
        <div class="info">机器码：{{item.productSid}}</div>
        <div class="info">发货状态：<span class="t-red">已发货</span></div>
        <div class="info">激活状态：<span class="t-red">未激活</span></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myProduct',
  data () {
    return {
      productList: []
    }
  },
  async created () {
    let res = await this.REQAPI.getMyProduct()
    this.productList = res.data.data
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
  .my-machine.page {
    background: #f5f5f5;
    height: 100%;
  }
  .item {
    background: #fff;
    padding: px2rem(10) px2rem(20);
    margin-bottom: px2rem(20);
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
