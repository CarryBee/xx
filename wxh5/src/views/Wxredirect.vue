<template>
  <div class="code">
    {{code}}
  </div>
</template>
<script>
  import * as utils from '@/common/utils'
  export default {
    name: 'wxRedirect',
    created () {
      console.log('s', utils.getQueryString('code'))
      this.code = utils.getQueryString('code') || '没有code'
      let wxUrl = utils.makeAccessWXUrl()
      console.log('wxUrl', wxUrl)
    },
    data () {
      return {
        code: '123'
      }
    }
  }
</script>
