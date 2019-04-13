<template>
  <div class="rel">
    <Header back></Header>
    <div class="form">
      <div v-if="!isEmail" class="list tel" :class="{active:formData.account!=''}">
        <input type="tel" v-model="formData.account" placeholder="手机号码">
        <div class="qh" @click="$router.push('/telAreaCode')">+86<i class="iconfont icon-xia"></i></div>
      </div>
      <div v-else class="list email" :class="{active:formData.account!=''}">
        <input type="email" v-model="formData.account" placeholder="邮箱">
      </div>
      <div class="list yzm" :class="{active:formData.account!=''}">
        <input type="text" v-model="formData.account" placeholder="验证码">
        <div class="right_btn" @click="sendCode"><span>{{smsCodeConfig.text}}</span></div>
      </div>
      <div class="list pwd" :class="{active:formData.pwd!='',show:showPwd}">
        <input :type="showPwd?'text':'password'" v-model="formData.pwd" placeholder="重置密码">
        <div class="r_icon" @click="showPwd=!showPwd"></div>
      </div>
      <div class="list pwd" :class="{active:formData.account!=''}">
        <input type="text" v-model="formData.account" placeholder="邀请码（选填）">
      </div>

      <div class="submit" :class="{active:formData.account!='' && formData.pwd!=''}">提交</div>

      <div class="bom">
        <span @click="isEmail=!isEmail">使用{{useRegister}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { setInterval, clearInterval } from "timers";
export default {
  computed: {
    useRegister() {
      if (this.isEmail) {
        return "邮箱重置密码";
      } else {
        return "手机号码重置密码";
      }
    }
  },
  data() {
    return {
      isEmail: false,
      showPwd: false,
      smsCodeConfig: {
        text: "发送验证码",
        timer: null,
        storeName: "forgetPwdCode",
        time: 60,
        get: true
      },
      formData: {
        account: "",
        pwd: ""
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
  },
  watch: {
    isEmail() {
      Toast("使用" + this.useRegister);
    }
  }
};
</script>

<style lang="less" scoped>
.rel{
    padding-top: 50px;
    box-sizing: border-box;
    background: #1a1b20;
    background-size: 100%;
}
.form{
    padding: 0 31px;
    box-sizing: border-box;
    margin-top: 60px;
    padding-bottom: 50px;

    .list{
        position: relative;
        margin-top: 26px;

        .r_icon{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 100%;
        }

        .right_btn{
            position: absolute;
            right: 0;
            top: 0;
            span{
                color: @activeColor;
                border-left: 1Px solid @bdColor;
                padding-left: 16px;
            }
        }
        input{
            padding-left: 29.5px;
        }

        &.tel{
            .qh{
                line-height: 35px;
                position: absolute;
                left: 26px;
                top: 0;
                z-index: 999;
                color: @activeColor;

                i{
                    color: @activeColor;
                }
            }
            input{
                padding-left: 69.5px;
            }
        }

        &.email,&.tel{
            background: url("../../assets/images/formIcons/tela.png") no-repeat left center;
            background-size: 16px;

            &.active{
                background: url("../../assets/images/formIcons/tel.png") no-repeat left center;
                background-size: 16px;
            }
        }

        &.yzm{
            background: url("../../assets/images/formIcons/yzma.png") no-repeat left center;
            background-size: 16px;

            &.active{
                background: url("../../assets/images/formIcons/yzm.png") no-repeat left center;
                background-size: 16px;
            }
        }

        &.pwd{
            background: url("../../assets/images/formIcons/suoa.png") no-repeat left center;
            background-size: 16px;

            &.active{
                background: url("../../assets/images/formIcons/suo.png") no-repeat left center;
                background-size: 16px;


                .r_icon{
                    background: url("../../assets/images/formIcons/pwd.png") no-repeat center center;
                    background-size: 24px;
                }
                

                &.show{
                    .r_icon{
                        background: url("../../assets/images/formIcons/pwd_show.png") no-repeat center center;
                        background-size: 24px;
                    }
                }
            }
            


            
        }
    }

    .bom{
        display: flex;
        justify-content:flex-end;
        margin-top: 28px;
        span{
            color: @activeColor;
        }
    }

    .submit{
        background: @disColor;

        &.active{
            background: @activeColor;
        }
    }
}
</style>
