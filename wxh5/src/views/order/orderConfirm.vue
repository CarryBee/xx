<template>
  <div class="order-confirm flex-box flex-direction-column f-28">
    <div class="buyer-info">
      <div class="input-wrapper flex-box">
        <input type="text" class="f-28" placeholder="请填写 收货人"/>
      </div>
      <div class="input-wrapper">
        <input type="text" class="f-28" placeholder="请填写 联系电话"/>
      </div>
      <div class="input-wrapper">
        <input type="text" class="f-28" placeholder="请填写 详细地址"/>
      </div>
    </div>
    <div class="product-list">
      <div class="item flex-box jc-sb f-26" @click="goToProduct">
        <div class="product-img-wrapper">
          <img :src="orderProduct.thumbImg" alt="">
        </div>
        <div class="product-info flex-box flex-1 flex-direction-column jc-sb">
          <div class="rows title">{{orderProduct.productName}}</div>
          <div class="rows desp">{{orderProduct.desp}}</div>
          <div class="rows">费率<span class="t-orange num">0.60%</span></div>
          <div class="rows">价格<span class="t-orange price">￥{{orderProduct.price}}</span></div>
        </div>
      </div>
    </div>

    <div class="count-ctrl-wrapper flex-box jc-sb ai-c">
      <div class="count-ctrl flex-box jc-sb ai-c">
        <div class="left flex-box ai-c">
          <span>数量：</span>
          <div class="number-selector flex-box ta-c t-grey">
            <div class="substract ctrl-btn" @click="substract">-</div>
            <input type="number" class="number-input ta-c disabled f-30" v-model="count" @update/>
            <div class="add ctrl-btn" @click="add">+</div>
          </div>
        </div>
        <div class="right">
          <span>共 <span class="t-orange f-40">￥{{sumPrice}}</span></span>
        </div>
      </div>
    </div>
    <div class="confirm-btn ta-c">
      <div class="confirm"  @click="confirmOrder">
        确认购买
      </div>
    </div>
  </div>
</template>
<script>
import productListItem from '@/components/productListItem'
export default {
  data () {
    return {
      buyerName: '',
      buyerMobile: '',
      buyerAddress: '',
      count: 1
    }
  },
  computed: {
    orderProduct () {
      return this.$store.state.shop.orderProduct || {}
    },
    sumPrice () {
      return this.orderProduct.price * this.count || 0
    }
  },
  methods: {
    add () {
      this.count ++
    },
    substract () {
      if (this.count > 0) {
        this.count --
      }
    },
    goToProduct (item) {
      this.$router.push({name: 'shopProductDetail', params: {productId: item.productId}})
    },
    async confirmOrder (orderDetail) {
      try {
        let res = await this.REQAPI.confirmOrder({
          buyerName: this.buyerName,
          buyerMobile: this.buyerMobile,
          buyerAddress: this.buyerAddress,
          ...this.orderProduct
        })
        // 支付成功
        console.log('res', res)
      } catch (err) {
        console.log(err)
        if (err.data.code === '200') {
          // TODO: 拉起支付 或跳去收银台
          return true
        }
        if (err.data.code === '40040') {
          this.$router.push({
            name: 'recharge'
          })
          // 余额不足 跳去充值页
        }
      }
    }
  },
  components: {
    productListItem
  }
}
</script>
<style lang="scss" scoped="">
  @import "../../style/application.scss";
  .order-confirm {
    padding: px2rem(20);
    background: #fff;
    .input-wrapper {
      margin-bottom: px2rem(20);
    }
    input {
      width: 100%;
    }
  }
  .product-info {
    img {
      width: 100%;
      height: 100%;
    }
    .product-img {
      width: px2rem(170);
      height: px2rem(170);
      margin-right: px2rem(20);
    }
  }
  .input-wrapper {
    padding: px2rem(20) 0;
    border-bottom: 1px solid #ddd;
  }
  .confirm-btn {
    position: fixed;
    bottom: px2rem(110);
    left: 0;
    width: 100%;
    height: px2rem(80);
    line-height: px2rem(80);
    background: #f8ea00;
    .count-ctrl {
      background: #fff;
    }
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
  .count-ctrl-wrapper {
    position: fixed;
    bottom: px2rem(190);
    left: 0;
    width: 100%;
    height: px2rem(80);
    background: #fff;
    .count-ctrl {
      padding:0 px2rem(20);
      width: 100%;
    }
  }
  .number-selector {
    width: px2rem(180);
    border: 1px #ccc solid;
    border-radius: px2rem(10);
    .ctrl-btn {
      height: px2rem(50);
      width: px2rem(50);
      &.add {
       border-left: 1px solid #ccc
      }
      &.substract {
       border-right: 1px solid #ccc;
      }
    }
    .number-input {
      width: px2rem(80);
    }
  }

</style>
