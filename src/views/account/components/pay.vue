<template>
    <div class="wxms">
        <Header back></Header>

        <div class="form">
            <div class="list_input">
                <label for="">收款人</label>
                <input type="text" placeholder="请输入收款人姓名">
            </div>
            <div class="list_input" v-if="type==1">
                <label for="">微信账号</label>
                <input type="text" placeholder="请输入微信账号">
            </div>
            <div class="list_input" v-else>
                <label for="">支付宝账号</label>
                <input type="text" placeholder="请输入支付宝账号">
            </div>
            <div class="beizhu">
                <h2>上传收款码<span>(只能上传一张)</span>
                    <div class="right" @click="show=true">查看示例</div>
                </h2>
                <div class="list_img">
                    <i class="iconfont icon-jia" v-if="imagesPaths.length==0"></i>
                    <img :src="imagesPaths[0]" v-else alt="">
                    <input type="file" ref="upload" @change="onReadImg">
                </div>
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

        <van-dialog v-model="show" title="示例" show-cancel-button>
            <div class="img"><img src="@/assets/images/erweima.png" alt=""></div>
        </van-dialog>

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
import upload from "@/mixins/upload";
export default {
  props: ["type"],
  mixins: [upload],
  components: {},
  data() {
    return {
      show: false,
      smsCodeConfig: {
        text: "发送验证码",
        timer: null,
        storeName: "alipayCode",
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
@import url("../less/common");
</style>
