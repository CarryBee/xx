<template>
  <div class="shopIndex">
    <div class="user-header flex-box jc-ce ai-c" style="align-items: center;">
      <div class="flex-box flex-1 t-orange">
        <div class="flex-box count jc-ce">钱包余额 201</div>
      </div>
      <div class="flex-box flex-1 t-orange">
        <div class="count ">免费额度 2</div>
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
import {mapGetters} from 'vuex'
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
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
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
    color: #fff;
    background:#fff;
    padding: px2rem(20);
    font-size: px2rem(34);
    height: auto;
    margin-bottom: px2rem(20);
    border-bottom: px2rem(2) solid #eaeaea;
    .count {
      display: inline;
      align-items: center;
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
