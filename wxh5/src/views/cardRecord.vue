<template>
  <div class="userInfo">
    <div class="user-header flex-box jc-ce ai-c f-35">
      <div class="record-item">总收益：400.00</div>
      <span class="item-border">|</span>
      <div class="record-item">昨日收益：40.00</div>
    </div>
    <div class="record-list-wrapper">
      <div class="record-list">
        <div class="item flex-box jc-sb f-26" v-for="(item, index) in 14" :key="index">
          <div class="time">2018-05-05 <span>刷卡人</span></div>
          <div class="record">收益<span>+12.2</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style lang="scss" scoped="">
  @import "../style/application.scss";
  .item-border {
    margin: 0 px2rem(15);
  }
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
  .record-list-wrapper {
    .item {
      padding: px2rem(10) px2rem(20);
      border-bottom: 1px solid #f8f8f8;
    }
  }
</style>
