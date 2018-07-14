<template>
  <div class="order-list">
    <order-list-item v-for="(item, index) in orderList" :item="item" :key="index"></order-list-item>
  </div>
</template>
<script>
import OrderListItem from '@/components/OrderListItem'
export default {
  data () {
    return {
      orderList: [{
        pay: false,
        snap: [
          {
            id: '5b27dc5218b4ff184d833d82', // 商品快照的id
            title: '通付v1 通刷返现', // 商品标题
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
          },
          {
            id: '5b27dc5218b4ff184d833d82', // 商品快照的id
            title: '通付v1 通刷返现', // 商品标题
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
      },
      {
        pay: false,
        snap: [
          {
            id: '5b27dc5218b4ff184d833d82', // 商品快照的id
            title: '通付v1 通刷返现', // 商品标题
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
          },
          {
            id: '5b27dc5218b4ff184d833d82', // 商品快照的id
            title: '通付v1 通刷返现', // 商品标题
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
      }]
    }
  },
  methods: {
  },
  components: {
    OrderListItem
  }
}
</script>
<style lang="scss" scoped="">
  @import "../style/application.scss";
  .order-list {
    padding-top: px2rem(20);
  }
</style>
