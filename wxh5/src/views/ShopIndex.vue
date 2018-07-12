<template>
  <div class="shopIndex">
    <div class="user-header flex-box ai-c" >
      <div class="flex-1 flex-box">
        <div class="count flex-1">钱包余额<span class="num t-orange">201</span></div>
        <div class="split"></div>
        <div class="count flex-1">免费额度<span class="num t-orange">2</span></div>
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
import pic from '@/assets/product.jpg'
import trianglify from '@/assets/banner3.jpg'
import {mapGetters} from 'vuex'
export default {
  name: 'shopIndex',
  data () {
    return {
      productList: [{
        productId: '1',
        productName: '通刷 V12 (激活两台人工返现)',
        desp: '在基础的机器返现之上，app进行返现，加入合伙人更能享受更低费率',
        price: '120',
        returnPrice: '130',
        thumbImg: pic
      },
      {
        productId: '1',
        productName: '通通刷 V12 (激活两台人工返现)',
        desp: '在基础的机器返现之上，app进行返现，加入合伙人更能享受更低费率',
        price: '120',
        returnPrice: '130',
        thumbImg: pic
      }],
      bannerAdList: [{
        img: trianglify,
        title: '激活奖励规则'
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
    background:#fff;
    padding: px2rem(20);
    font-size: px2rem(26);
    height: auto;
    margin-bottom: px2rem(20);
    border-bottom: px2rem(2) solid #eaeaea;
    .split {
      width: px2rem(2);
      background: #eaeaea;
      height: px2rem(40);
    }
    .num {
      padding-left: px2rem(8);
    }
    .count {
      text-align: center;
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
