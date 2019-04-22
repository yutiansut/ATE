<template>
  <div class="rel">
    <Header back></Header>

    <div class="form">
      <div class="list_input">
        <label for="">收款人</label>
        <input type="text" placeholder="请输入收款人姓名">
      </div>
      <div class="list_input">
        <label for="">收款银行</label>
        <input type="text" placeholder="请输入收款银行">
      </div>
      <div class="list_input">
        <label for="">开户支行</label>
        <input type="text" placeholder="请输入收款银行开户支行">
      </div>
      <div class="list_input">
        <label for="">银行卡账号</label>
        <input type="text" placeholder="请输入银行卡账号">
      </div>
      <div class="beizhu">
        <h2>其他备注<span>(用于提醒买家)</span></h2>
        <textarea name="" placeholder="请输入其他备注信息"></textarea>
      </div>
      <div class="list_input">
        <label for="">资金密码</label>
        <input type="text" placeholder="请输入资金密码">
      </div>
      <div class="list_input sms_input">
        <label for="">手机验证码</label>
        <input type="text" placeholder="请输入手机验证码">
        <div class="right" @click="sendCode"><span>{{smsCodeConfig.text}}</span></div>
      </div>
    </div>

    <div class="fixbom">
      <div class="btn">取消</div>
      <div class="btn">提交</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { setInterval, clearInterval } from "timers";
import { sendCodeApi } from "@/api";
export default {
  data() {
    return {
      smsCodeConfig: {
        text: "发送验证码",
        timer: null,
        storeName: "bankCardCode",
        time: 60,
        get: true
      }
    };
  },
  methods: {
    //   发送验证码
    sendCode() {
      if (!this.smsCodeConfig.get) return;

      sendCodeApi({ phone: 15111327689 }).then(data => {
        this.countDown();
      });
    },
    // 倒计时
    countDown() {
      // 记录获取验证码时间
      this.smsCodeConfig.get = false;
      localStorage[this.smsCodeConfig.storeName] = new Date().getTime();
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
  created() {}
};
</script>

<style lang="less" scoped>
@import url("./less/common");
</style>
