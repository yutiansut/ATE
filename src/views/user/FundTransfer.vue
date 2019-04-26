<template>
    <div class="rel">
        <Header back>
            <div class="right" slot="right" @click="$router.push('/user/c2c_b2c/transferRecord')">转移记录</div>
        </Header>

        <div class="box">
            <div class="list_input first_list">
                <span>币种</span>
                <span>BTC</span>
            </div>
            <div class="list_input mmxiim">
                <h2>转移至账户</h2>
                <input type="text" placeholder="请输入对方手机号码/邮箱">
            </div>
        </div>

        <div class="box padbom">
            <div class="list_input mmxiim">
                <h2>转移数量</h2>
                <input type="text" placeholder="请输入转移数量">
            </div>
            <div class="bom">
                <span>可用数量:0</span>
                <span>全部转移</span>
            </div>
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
        display: flex;
        justify-content:space-between;

        span{
            color: @color999;
            font-size: 14px;
            font-weight:normal;

            &:last-child{
                color: @activeColor;
            }
        }
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

.first_list{
    display: flex;
    justify-content:space-between;
}
</style>
