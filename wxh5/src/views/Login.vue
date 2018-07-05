<template>
  <div class="login z--1" :class="{login_chic: loginBackground == '1'}">
    <form class="login-form flex-box flex-direction-column jc-ce ai-c">
      <input type="tel" class="phone-number f-30" placeholder="输入手机号" v-model.number="phoneNumber" maxLength="11" onkeyup="this.value=this.value.replace(/\D/g,'')">
      <input type="number" class="sms-code f-30" :placeholder="'输入验证码'" v-model="smsCode" maxLength="6">
      <input type="tel" class="invite-phone-number f-30" placeholder="输入推荐人手机号" v-model.number="invitePhoneNumber" maxLength="11" onkeyup="this.value=this.value.replace(/\D/g,'')">
      <div v-show="!smsSendOff" class="sms-send" @click="getSmsCode">{{smsLabel}}</div>
      <div v-show="smsSendOff" class="sms-send-off" disabled>{{smsLabel}}</div>
      <!--<label class="tip">{{tip}}</label>-->
      <div v-if="isSubmitting" type="submit" class="login-btn-off" disabled>提交中</div>
      <div v-else-if="loginOff" type="submit" class="login-btn-off" disabled>登录</div>
      <div v-else type="submit" class="login-btn touch-purple" @click="login">登录</div>
      <!-- <div class="status-msg f-26" v-if="errMsg">{{errMsg}}</div> -->
      <div class="status-msg f-26" v-if="timing && errMsg === null">
        <div>短信已发送，可能会有延后请耐心等待</div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      invitePhoneNumber: '',
      phoneNumber: '', // 手机号码
      smsCode: '', // 短信验证码
      uniqueId: '', // 验证码ID
      loginOff: true, // 登录 是否可点击
      smsSendOff: true, // 发送短信 是否可点击
      timing: false, // 倒计时
      tip: '', // 错误提示
      smsLabel: '获取验证码', // 发送短信文案
      loginBackground: 0, // 登录背景图
      isSubmitting: false,
      errMsg: null,
      smsRequestTimes: 0
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    // 获取验证码
    getSmsCode () {
    },
    // 倒计时
    timeCount () {
    },
    // 登录
    async login () {
    },
    async bindPhone () {
    },
    redirectTo () {
    }
  },
  watch: {
    'phoneNumber': function (val, oldVal) {
    },
    'smsCode': function (val, oldVal) {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped="" type="text/css">
  @import "../style/application.scss";

  .login{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-repeat: no-repeat;
    background-size:contain;
    background-position: top right;
    font-size: px2rem(30);
  }
  .status-msg {
    margin-top: pxToRem(30);
    color: #999;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
  .phone-number{
    position: relative;
    padding-left: px2rem(24);
    width: px2rem(600);
    height: px2rem(80);
    margin-top: px2rem(400);
    background-color: transparent;
    color: #000;
    -webkit-appearance:none;
    outline:none;
    border-radius: 0;
  @include border-1px(#999);
  }
  .invite-phone-number {
    @extend .phone-number;
    margin-top: px2rem(60);
  }
  .sms-code{
    position: relative;
    padding-left: px2rem(24);
    width: px2rem(600);
    height: px2rem(80);
    margin-top: px2rem(60);
    background-color: transparent;
    color: #000;
    -webkit-appearance:none;
    outline:none;
    border-radius: 0;
  @include border-1px(#999);
  }
  .sms-send{
    position: absolute;
    background-color:transparent;
    width: px2rem(180);
    height: px2rem(52);
    line-height: px2rem(52);
    top: px2rem(543);
    left: px2rem(500);
    margin-top: px2rem(15);
    margin-bottom: px2rem(16);
    border-left: 1px solid #999;
    text-align: center;
  }
  .sms-send-off{
  @extend .sms-send;
    opacity: 0.4;
    color: #999;
  }
  .login-btn{
    position: relative;
    width: px2rem(600);
    line-height: px2rem(110);
    height: px2rem(110);
    margin-top: px2rem(60);
    border-radius: px2rem(60);
    background-image: linear-gradient(90deg, #B846B4 0%, #7D4694 100%);
    box-shadow: 0 px2rem(10) px2rem(30) px2rem(2) rgba(182, 182, 182, 0.5);
    color:white;
    font-size: px2rem(34);
    text-align: center;
  }
  .login-btn-off{
  @extend .login-btn;
    opacity: 0.4;
  }
  .go-register{
    font-size: px2rem(34);
    text-decoration: none;
    position: fixed;
    bottom: px2rem(78);
    width: px2rem(544);
    margin-left: px2rem(103);
    text-align: center;
  }
  .user-agreement{
    position: absolute;
    bottom: px2rem(30);
    width: 100%;
    line-height: px2rem(44);
    color: #bbbbbb;
    display: block;
    margin-top: px2rem(30);
    text-align: center;
  .agreement-a{
    text-decoration: underline;
  }
  }
  .voice-code{
    text-decoration: underline;
  }
</style>
