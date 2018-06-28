<template>
  <div class="shopIndex">
    <div class="user-header flex-box jc-ce ai-c">
      <div class="head">
        <img src="http://thirdwx.qlogo.cn/mmopen/QZH5X1HZYwYlLy5M2qkib5sLmIUqW6bG2oYnY3lkXiaUA6Clj4qpRyJxUphfsaWo5y6jrB9jKb44BGIxZ5cibyamrOR0SXzREgM/132" alt="">
      </div>
      <div class="user-info">
        <div class="name">chao (ง •̀_•́)ง ✧</div>
        <div class="id">我的返现：201</div>
        <div class="id">我的消费记录 ></div>
      </div>
    </div>
    <div class="banner-ad-list">
      <div class="item">
        <div class="content">
          <div class="banner">
            <img src="http://phone.lofsoft.com/image/fanxian_bg.png" alt="">
          </div>
        </div>
        <div class="title">押金规则说明</div>
      </div>
    </div>
    <div class="shop-list-wrapper">
      <div class="shop-list">
        <div class="item flex-box jc-sb f-26" v-for="index in 14" :key="index" @click="goToProduct(index)">
          <div class="time">通刷 V12</div>
          <div class="record">价格<span>120.2</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shopIndex',
  data () {
    return {}
  },
  methods: {
    goToProduct (item) {
      this.$router.push({name: 'shopProductDetail'})
    }
  }
}
</script>
<style lang="scss" scoped="">
  @import "../style/application.scss";
  .user-header {
    background: #f5f5f5;
    width: 100%;
    height: px2rem(320);
  .head {
    height: px2rem(110);
    width: px2rem(110);
    border-radius: 50%;
    overflow: hidden;
    margin-right: px2rem(20);
  }
  }
  .banner-ad-list {
  .item {
    padding-bottom: .45333rem;
    margin-bottom: .26667rem;
    background: #fff;
  }
  }
  .shop-list-wrapper {
    .item {
      padding: px2rem(10) px2rem(20);
      border-bottom: 1px solid #f8f8f8;
    }
  }
</style>
