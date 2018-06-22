<template>
  <div class="shopIndex">
    <div class="user-header flex-box jc-ce ai-c">
      <div class="head">
        <img src="http://thirdwx.qlogo.cn/mmopen/QZH5X1HZYwYlLy5M2qkib5sLmIUqW6bG2oYnY3lkXiaUA6Clj4qpRyJxUphfsaWo5y6jrB9jKb44BGIxZ5cibyamrOR0SXzREgM/132" alt="">
      </div>
      <div class="user-info">
        <div class="name">chao (ง •̀_•́)ง ✧</div>
        <div class="id">ID:34787(186*****102)</div>
      </div>
    </div>
    <div class="record-list-wrapper">
      <div class="record-list">
        <div class="item flex-box jc-sb f-26" v-for="index in 14">
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
