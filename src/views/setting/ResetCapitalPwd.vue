<template>
  <div class="rel">
    <Header back></Header>
    <div class="account">{{isEmail?'1393***1666':'fic**@163.com'}}</div>
    <div class="form">
      <div class="list">
        <input type="text" placeholder="验证码">
        <span class="sms" @click="sendCode">{{smsCodeConfig.text}}</span>
      </div>
      <div class="list">
        <input type="password" placeholder="重置资金密码">
      </div>
      <div class="list">
        <input type="password" placeholder="再次确认资金密码">
      </div>
      <div class="submit">提交</div>
      <div class="rule_type">
        <span @click="isEmail=!isEmail">{{isEmail?'邮箱验证':'手机号码验证'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEmail: false,
      smsCodeConfig: {
        text: "发送验证码",
        timer: null,
        storeName: "capitalCode",
        time: 60,
        get: true
      }
    };
  },
  methods: {
    //   发送验证码
    sendCode() {
      // 判断手机号是否正确

      if (!this.smsCodeConfig.get) return;
      // 记录获取验证码时间
      this.smsCodeConfig.get = false;
      localStorage[this.smsCodeConfig.storeName] = new Date().getTime();
      this.countDown();
    },
    // 倒计时
    countDown() {
      this.editText();
      this.smsCodeConfig.timer = setInterval(this.editText, 1000);
    },
    // 修改验证码text
    editText() {
      if (this.smsCodeConfig.time == 1) {
        clearInterval(this.smsCodeConfig.timer);
        this.smsCodeConfig.text = "获取验证码";
        this.smsCodeConfig.time = 60;
        this.smsCodeConfig.get = true;
        return;
      }
      this.smsCodeConfig.time--;
      this.smsCodeConfig.text = this.smsCodeConfig.time + "s";
    },
    // 判断是否可以重新获取短信验证码
    isSmsCodeTime() {
      let t = localStorage[this.smsCodeConfig.storeName];
      if (t) {
        let ot = new Date().getTime();
        let time = parseInt((ot - t) / 1000);
        if (time < 60) {
          this.smsCodeConfig.time = 60 - time;
          this.countDown();
        }
      }
    }
  },
  created() {
    this.isSmsCodeTime();
    // 如果是第一次设置资金密码
    this.$route.meta.title = "设置资金密码";
  }
};
</script>
<style lang="less" scoped>
.rel{
    padding-top: 50px;
}
.account{
  line-height: 40px;
  padding: 0 12.5px;
  color: @color999;
}
.form{
    .list{
        position: relative;
        height: 50px;
        line-height: 50px;
        background: #2b2c2f;
        padding: 0 11.5px;
        box-sizing: border-box;
        border-top: 1px solid #37383b;
        &:first-child{
          border-top: 0;
        }
        input{
            border-bottom: 0;
        }
        .sms{
            color: #f73535;
            position: absolute;
            right: 11.5px;
            top: 0;
            line-height: 50px;
        }
    
        input::-webkit-input-placeholder {
            color: #666;
        }
    }

    .submit{
        background: #afafaf;
        border-radius: 20px;
        height: 42.5px;
        line-height: 42.5px;
        width: 90%;
        margin: 0 auto;
        margin-top: 35px;

        &.active{
          background: @activeColor;
        }
    }

    .rule_type{
      width: 90%;
      margin: 0 auto;
      margin-top: 30px;

      span{
        color: @activeColor;
      }
    }
}
</style>
