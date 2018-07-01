<template>
  <div class="shopIndex">
    <div class="user-header flex-box jc-ce ai-c">
      <div class="head">
        <img src="http://thirdwx.qlogo.cn/mmopen/QZH5X1HZYwYlLy5M2qkib5sLmIUqW6bG2oYnY3lkXiaUA6Clj4qpRyJxUphfsaWo5y6jrB9jKb44BGIxZ5cibyamrOR0SXzREgM/132" alt="">
      </div>
      <div class="user-info">
        <div class="name">chao (ง •̀_•́)ง ✧</div>
        <div class="id">我的返现：201</div>
        <div class="id">我的消费记录 ></div>
      </div>
    </div>
    <banner-ad-list :adList="bannerAdList"></banner-ad-list>

    <div class="shop-list-wrapper">
      <div class="shop-list">
        <product-list-item v-for="(item, index) in productList" :key="index" :item="item"></product-list-item>
      </div>
    </div>
  </div>
</template>
<script>
import bannerAdList from '@/components/bannerAdList'
import productListItem from '@/components/productListItem'
export default {
  name: 'shopIndex',
  data () {
    return {
      productList: [{
        productId: '1',
        productName: '通刷 V12,2018韩国chic春夏季新款简约高腰长裤k091',
        price: '120',
        returnPrice: '130',
        productDetailImg: '//yddhhoss.rfyiding.com/566432321642_Main_8643861286_1042280853?x-oss-process=style/productPic_thumbnail'
      }],
      bannerAdList: [{
        img: 'https://jjb-static.com/Public/image/Index/bg.png',
        title: '押金规则说明'
      }]
    }
  },
  methods: {
    goToProduct (item) {
      this.$router.push({name: 'shopProductDetail', params: {productId: item.productId}})
    }
  },
  created () {
  },
  components: {
    bannerAdList,
    productListItem
  }
}
</script>
<style lang="scss" scoped="">
  @import "../style/application.scss";
  .user-header {
    position: relative;
    background: #f8ea00;
    box-shadow: px2rem(-1) px2rem(-7) px2rem(20) px2rem(5) #888888;
    width: 100%;
    height: px2rem(220);
    margin-bottom: px2rem(20);
    .head {
      height: px2rem(110);
      width: px2rem(110);
      border-radius: 50%;
      overflow: hidden;
      margin-right: px2rem(20);
    }
  }
  .banner-ad-list {
  .item {
    position: relative;
    width: px2rem(600);
    height: px2rem(120);
    border-radius: px2rem(20);
    overflow: hidden;
    padding-bottom: .45333rem;
    margin-bottom: .26667rem;
    background: #fff;
  }
  }
  .shop-list-wrapper {
  }
</style>
