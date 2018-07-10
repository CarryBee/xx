<template>
  <div class="banner-ad-list flex-box flex-direction-column ai-c jc-ce">
    <div class="item" v-for="(item, index) in adList" :key="index">
      <div class="content">
        <div class="banner">
          <!--<img src="https://jjb-static.com/Public/image/Index/bg.png" alt="">-->
          <img :src="item.img" alt="">
        </div>
      </div>
      <div class="title position-center t-white f-40">{{item.title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bannderAdList',
  props: {
    adList: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped="">
@import "../style/application.scss";
.banner-ad-list {
  .item {
    position: relative;
    width: px2rem(700);
    height: px2rem(120);
    border-radius: px2rem(20);
    overflow: hidden;
    padding-bottom: .45333rem;
    margin-bottom: .26667rem;
    background: #fff;
  }
}
</style>
