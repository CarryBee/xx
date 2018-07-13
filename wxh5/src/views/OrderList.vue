<template>
  <div class="order-list">
    <template v-for="(item, index) in orderList">
      <div :key="index">
        <div class="item flex-box jc-sb f-26" v-for="(snapItem, index2) in item.snap" :key="index2">
          <div class="product-img-wrapper">
            <img :src="snapItem.productDetailImg" alt="">
          </div>
          <div class="product-info flex-box flex-1 flex-direction-column jc-sb">
            <div class="rows title">{{snapItem.title}}</div>
            <div class="rows desp">{{snapItem.text}}</div>
            <div class="rows">费率<span class="t-orange num">0.60%</span></div>
            <div class="rows flex-box jc-sb">
              <div class="left">
                <span>价格</span><span class="t-orange price">￥{{snapItem.price}}</span>
              </div>
              <div class="right">
                <span class="order-status t-orange f-24">已付款</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      orderList: [{
        pay: false,
        snap: [{
          _id: '5b27dc5218b4ff184d833d82', // 商品快照的id
          title: 'title', // 商品标题
          text: 'text', // 商品文字描述
          price: 101.1234, // 商品标价，如果有真实价格，则可以划线划掉。没优惠券时都显示这个价格
          actualprice: 0, // 商品真实价格，两个价格不一样证明用了优惠券，可以标注
          usefreemach: true, // 是否使用了优惠额度
          rate: 10,
          brand: 'brand', // 产家
          productDetailImg: '/img/product.500f8864.jpg',
          content: ['/img/product.500f8864.jpg'], // 显示图片
          createtime: '2018-06-18T16:22:42.915Z', // 显示创建时间
          __v: 0
        }]
      },
      {
        pay: false,
        snap: [{
          _id: '5b27dc5218b4ff184d833d83', // 商品快照的id
          title: 'title', // 商品标题
          text: 'text', // 商品文字描述
          price: 101.1234, // 商品标价，如果有真实价格，则可以划线划掉。没优惠券时都显示这个价格
          actualprice: 0, // 商品真实价格，两个价格不一样证明用了优惠券，可以标注
          usefreemach: true, // 是否使用了优惠额度
          rate: 10,
          brand: 'brand', // 产家
          productDetailImg: '/img/product.500f8864.jpg',
          content: ['/img/product.500f8864.jpg'], // 显示图片
          createtime: '2018-06-18T16:22:42.915Z', // 显示创建时间
          __v: 0
        }]
      }]
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped="">
  @import "../style/application.scss";
  .order-list {
    padding-top: px2rem(20);
  }
  .item {
    height: auto;
    padding: px2rem(20) px2rem(30) px2rem(10) px2rem(30);
    border-bottom: px2rem(2) solid #eaeaea;
    background: #fff;
    .product-info {
      margin-left: px2rem(30);
    .rows {
      padding-bottom: px2rem(10);
      font-size: px2rem(26);
    }
    .title {
      font-size: px2rem(28);
    }
    .desp {
      color: #9e9e9e;
      font-size: px2rem(24);
    }
    .num {
      font-weight: 800;
      font-size: px2rem(40);
      padding-left: px2rem(10);
    }
    .price {
      font-size: px2rem(28);
      padding-left: px2rem(10);
    }
    }
    .product-img-wrapper {
      height: px2rem(150);
      width: px2rem(150);
      img {
        width: 100%;
        height: 100%;
        border-radius: px2rem(10);
        background: #f9f9f9;
      }
    }
  }
</style>
