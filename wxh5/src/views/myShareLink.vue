<template>
  <div class="my-share-link-warpper flex-box ai-c jc-ce flex-direction-column">
    <div class="qr-wrapper">
      <canvas id="qrcode" class="qrcode"></canvas>
    </div>
    <div class="msg">右上角分享我的二维码</div>
  </div>
</template>
<script>
import QRCode from 'qrcode'
export default {
  name: 'myShareLink',
  data () {
    return {}
  },
  mounted () {
    this.createQRCode()
  },
  methods: {
    createQRCode () {
      let canvas = document.getElementById('qrcode')
      let qrInfo = this.$route.params.qrInfo
      QRCode.toCanvas(canvas, qrInfo, {width: window.rem2px(4), height: window.rem2px(4)}, function (error) {
        if (error) {
          console.error(error)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped="">
  @import "../style/application.scss";
  .qr-wrapper {
    width: px2rem(300);
    height: px2rem(300);
    .qrcode {
      width: 100%;
      height: 100%;
    }
  }
</style>
