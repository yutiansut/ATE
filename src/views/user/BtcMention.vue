<template>
    <div class="rel">
        <Header back></Header>

        <div class="box">
            <div class="list_input">
                <span>可用于余额：0.00000BTC</span>
            </div>
            <div class="list_input mmxiim">
                <h2>BTC提现地址</h2>
                <input type="text" placeholder="请输入BTC收款地址">
            </div>
        </div>

        <div class="box padbom">
            <div class="list_input mmxiim">
                <h2>提现数额(币数)</h2>
                <input type="text" placeholder="请输入提现数额">
            </div>
            <div class="bom">
                提现限额：8.0BTC~10.0btc,当日上限：10.0BTC
            </div>
        </div>

        <div class="sxf">
            <span>手续费</span>
            <span>0.0002.0BTC</span>
        </div>

        <div class="form">
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
        storeName: "btcMentionCode",
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
@import url("../account/less/common");

.list_input{
    padding: 0;
}
.form{
    padding: 0 13px;

    
    label{
        left: 0;
    }

    .list_input{
        padding: 0;
        span{
            color: #333;
            font-size: 15px;
        }
    }

    
}

.box{
    background: #fff;
    margin-bottom: 6px;
    padding: 0 13px;
    padding-bottom: 15px;

    span{
        color: #333;
        font-weight: bold;
        font-size: 15px;
    }
    h2{
        color: #333;
        font-size: 15px;
        height: 30px;
        line-height: 30px;
        padding-top: 10px;
        font-weight: bold;
    }

    .mmxiim{
        height: auto;
        h2{
            color: #333;
        }
        input{
            padding-left: 0;
        }
    }

    .bom{
        color: @color999;
        height: 50px;
        line-height: 50px;
    }
}

.padbom{
    padding-bottom: 0;
}

.sxf{
    line-height: 50px;
    height: 50px;
    background: #fff;
    
    padding: 0 13px;
    margin-bottom: 6px;
    span{
        color: #333;
        font-size: 15px;
        margin-right: 50px;
    }
}
.sms_input .right span{
    color: #dd3232;
}
</style>
