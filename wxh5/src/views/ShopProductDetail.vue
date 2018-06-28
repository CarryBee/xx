<template>
  <div class="product-detail">
    <div class="img-list-wrapper">
      <div class="img-item">
        <img src="//img13.360buyimg.com/imgzone/jfs/t22165/348/1390079210/299594/432e1052/5b274900N486ff3f7.jpg.dpg" alt="" class="product-img">
      </div>
      <div class="img-item">
        <img src="//img13.360buyimg.com/imgzone/jfs/t22165/348/1390079210/299594/432e1052/5b274900N486ff3f7.jpg.dpg" alt="" class="product-img">
      </div>
      <div class="img-item">
        <img src="//img13.360buyimg.com/imgzone/jfs/t22165/348/1390079210/299594/432e1052/5b274900N486ff3f7.jpg.dpg" alt="" class="product-img">
      </div>
    </div>
    <div class="product-ctrl">
      <div class="buy-btn" @click="goToBuy">立即购买</div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      goToBuy() {
        this.$router.push({name: 'orderConfirm'})
      }
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
