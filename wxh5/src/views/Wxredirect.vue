<template>
  <div class="code">
    <div class="code">{{code}}</div>
    <div class="wxUrl">{{wxUrl}}</div>

  </div>
</template>
<script>
import * as utils from '@/common/utils'
export default {
  name: 'wxRedirect',
  created () {
    this.code = utils.getQueryString('code') || '没有code'
    if(!utils.getQueryString('code')) {
      this.wxUrl = utils.makeAccessWXUrl({
        reUrl: location.origin + '/#wxRedirect'
      })
      location.href = this.wxUrl
    }
  },
  data () {
    return {
      code: '123',
      wxUrl: ''
    }
  }
}
</script>
