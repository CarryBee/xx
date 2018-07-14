</<template>
    <div class="order-item">
        <div class="item-title flex-box jc-sb ai-c">
          <div class="item-no">5xxxxc5218b4ff184d833d82</div>
          <div class="item-pay">已付款</div>
        </div>
        <div class="item-snaps flex-box flex-direction-column">
            <div class="snap flex-box">
                <div class="image">image</div>
                <div class="other flex-1">
                  <div class="title">title</div>
                  <div class="info">brand 10</div>
                </div>
                <div class="price">￥101.1234(￥0 优惠额度)</div>
            </div>
            <div class="snap flex-box">
                <div class="image">image</div>
                <div class="other flex-1">
                  <div class="title">title</div>
                  <div class="info">brand 10</div>
                </div>
                <div class="price">￥101.1234</div>
            </div>
        </div>
        <div class="item-info flex-box jc-sb ai-c">
            <div class="time">2018-7-13 00:12</div>
            <div class="order flex-box">
                <div class="allprice">￥1101.23</div>
                <div class="freemach">(优惠1台)</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  // 订单item，包含订单里面的多个snap物品
  data () {
    return {
      pay: false,
      snap: [
        {
          id: '5b27dc5218b4ff184d833d82', // 商品快照的id
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
        }
      ],
      allprice: 100,
      freemach: 1,
      id: '5xxxxc5218b4ff184d833d82'
    }
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
  padding: 0px px2rem(30);
  .item-title {
    height: px2rem(80);
    border-bottom: px2rem(2) solid #eaeaea;
    .item-no {}
    .item-pay {}
  }
  .item-info {
    border-top: px2rem(2) solid #eaeaea;
    min-height: px2rem(80);
    .time {}
    .order {
      .allprice {}
      .freemach {
        padding-left: px2rem(20);
      }
    }
  }
  .item-snaps {
    .snap {
      .image {
        width: px2rem(100);
      }
      .other {
        padding-left: px2rem(20);
        .title {}
        .info {}
      }
      .price {}
    }
  }
}
</style>
