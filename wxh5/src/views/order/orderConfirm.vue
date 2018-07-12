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
    <product-list-item :item="orderProduct" @click="goToProduct(orderProduct)"></product-list-item>
    <div class="confirm-btn ta-c" @click="confirmOrder">确认购买</div>
  </div>
</template>
<script>
import productListItem from '@/components/productListItem'
export default {
  data () {
    return {
      buyerName: '',
      buyerMobile: '',
      buyerAddress: ''
    }
  },
  computed: {
    orderProduct () {
      return this.$store.state.shop.orderProduct || {}
    }
  },
  methods: {
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
  }
</style>
