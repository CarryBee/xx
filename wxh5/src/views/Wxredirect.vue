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
      console.log('s', utils.getQueryString('code'))
      this.code = utils.getQueryString('code') || '没有code'
      this.wxUrl = utils.makeAccessWXUrl()
      console.log('wxUrl', wxUrl)
    },
    data () {
      return {
        code: '123',
        wxUrl: ''
      }
    }
  }
</script>
