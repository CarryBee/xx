</<template>
    <div class="order-item">
        <div class="item"></div>
    </div>
</template>

<script>
export default { // 订单item，包含订单里面的多个snap物品
    data() {
        return {
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
        }
    }
}
</script>

<style>
    @import "../style/application.scss";
</style>
