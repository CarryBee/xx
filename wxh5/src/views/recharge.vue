<template>
  <div class="recharge page">
    <div class="ctrl-list-wrapper">

      <div class="item flex-box jc-sb ai-c">
        <div class="title">余额</div>
        <div class="right flex-box">
          <div class="detail">0.00</div>
          <div class="info">元</div>
        </div>
      </div>

      <div class="item flex-box jc-sb ai-c">
        <div class="title">充值金额</div>
        <div class="right flex-box">
          <div class="detail">
            <input class="f-28 ta-r" type="number" v-model.number="price" placeholder="请输入充值金额">
          </div>
          <div class="info">元</div>
        </div>
      </div>

      <div class="item flex-box jc-ce ai-c" @click="charge">
        <div class="title flex-box ai-c"><i class="iconfont icon-wx f-40" style="color: #4fb674;"></i>微信充值</div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      price: ''
    }
  },
  methods: {
    async charge () {
      console.log('this.price', this.price)
      try {
        let res = await this.REQAPI.payRecharge({
          price: this.price
        })
        this.$toasted.show('充值成功')
      } catch (e) {
        this.$toasted.show(e.data.message || '接口异常')
      }
    }
  }
}
</script>

<style lang="scss" scoped="">
  @import "../style/application.scss";
  .recharge.page {
    background: #f5f5f5;
    height: 100%;
  }
  .ctrl-list-wrapper {
    .item {
      height: px2rem(110);
      padding: 0 px2rem(20);
      margin-bottom: px2rem(12);
      background: #fff;
    }
    .info {
      margin-left: px2rem(10);
    }
  }

</style>
