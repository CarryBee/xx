<template>
  <div class="product-detail">
    <div class="img-list-wrapper">
      <div class="img-item" v-for="(item, index) in productDetail.productDetailImg" :key="index">
        <img :src="item" alt="" class="product-img">
      </div>
    </div>
    <div class="product-ctrl">
      <div class="buy-btn" @click="goToBuy">立即购买</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      productDetail: {
        productDetailImg: ['https://upload-images.jianshu.io/upload_images/2022163-9a667247649a5cd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/417']
      }
    }
  },
  methods: {
    goToBuy () {
      this.$store.dispatch('setOrderProduct', this.productDetail)
      this.$router.push({name: 'orderConfirm'})
    }
  },
  async created () {
    let productId = this.$route.params.productId
    let res = await this.REQAPI.getProductDetail({productId})
    this.productDetail = res.data.data
    console.log('this.productDetail', this.productDetail)
  }
}
</script>
<style lang="scss" scoped="">
@import "../style/application.scss";
.product-detail {
  position: relative;
}
.img-list-wrapper {
  width: 100%;
  .img-list-wrapper {
    width: 100%;
  }
  img {
    display: block;
    width: 100%;
  }
}
.product-ctrl {
  position: fixed;
  bottom: px2rem(80);
  width: 100%;
  .buy-btn {
    width: 100%;
    height: px2rem(60);
    line-height: px2rem(60);
    text-align: center;
    background: #f8ea00;
  }
}
</style>
