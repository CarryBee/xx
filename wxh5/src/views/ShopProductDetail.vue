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
import trianglify from '@/assets/pic.jpg'
export default {
  data () {
    return {
      productDetail: {
        productDetailImg: [trianglify]
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
    this.productDetail.productDetailImg = [trianglify]
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
  bottom: px2rem(130);
  width: 100%;
  .buy-btn {
    font-size: px2rem(30);
    height: px2rem(70);
    line-height: px2rem(70);
    border-radius: px2rem(10);
    margin: px2rem(20);
    text-align: center;
    background: #f8ea00;
  }
}
</style>
