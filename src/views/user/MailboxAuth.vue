<template>
  <div class="rel">
    <Header back></Header>

    <div class="form">
      <div class="list">
        <input type="text" placeholder="邮箱">
      </div>
      <div class="list">
        <input type="text" placeholder="验证码">
        <span class="sms" @click="sendCode">{{smsCodeConfig.text}}</span>
      </div>

      <div class="submit">绑定</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smsCodeConfig: {
        text: "发送验证码",
        timer: null,
        storeName: "mailboxCode",
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
  }
};
</script>
<style lang="less" scoped>
.rel{
    padding-top: 50px;
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
    }
}
</style>
