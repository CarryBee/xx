<template>
  <div class="order-item">
    <div class="item-title flex-box jc-sb ai-c">
      <div class="item-no">订单：{{item.id}}</div>
      <div class="item-pay t-orange">已付款</div>
    </div>
    <div class="item-snaps flex-box flex-direction-column">
      <div class="snap flex-box" v-for="(snapItem, index) in item.snap" :key="index">
        <div class="left">
          <div class="product-img-wrapper">
            <img :src="snapItem.content[0]" alt="">
          </div>
        </div>
        <div class="right flex-box flex-direction-column">
          <div class="other flex-1">
            <div class="title f-28 t-black">{{snapItem.title}}</div>
            <div class="info f-26 t-9-grey">{{snapItem.text}}</div>
          </div>
          <div class="price f-24 flex-1"><span class="snap-price t-orange">￥{{snapItem.price}}</span>(￥0 优惠额度)</div>
        </div>
      </div>

    </div>
    <div class="item-info flex-box jc-sb ai-c">
      <div class="time">2018-7-13 00:12</div>
      <div class="order flex-box">
        <div class="allprice t-orange">￥1101.23</div>
        <div class="freemach">(优惠1台)</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 订单item，包含订单里面的多个snap物品
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped="">
@import "../style/application.scss";
.order-item {
  background: #fff;
  margin-bottom: px2rem(20);
  border-top: px2rem(2) solid #eaeaea;
  border-bottom: px2rem(2) solid #eaeaea;
  .item-title {
    height: px2rem(80);
    border-bottom: px2rem(3) solid #eaeaea;
    padding: 0px px2rem(30);
    .item-no {}
    .item-pay {}
  }
  .item-info {
    min-height: px2rem(80);
    padding: 0px px2rem(30);
    .time {}
    .order {
      .allprice {}
      .freemach {
        padding-left: px2rem(20);
      }
    }
  }
  .item-snaps {
    padding: 0 px2rem(30) px2rem(20) px2rem(30);
    .snap {
      margin-top: px2rem(20);
      background: #f7f7f7;
      .product-img-wrapper {
        height: px2rem(120);
        width: px2rem(120);
        img {
          width: 100%;
          height: 100%;
          background: #f7f7f7;
        }
      }
      .right {
        padding: px2rem(10);
        .other {
          padding-left: px2rem(10);
        }
      }
      .price {
        padding-left: px2rem(10);
        .snap-price {
          padding-right: px2rem(10);
        }
      }
    }
  }
}
</style>
