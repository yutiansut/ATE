<template>
  <div class="rel">
    <Header back></Header>
    <div class="logo img"><img src="@/assets/images/logo.png" alt=""></div>

    <div class="form">
      <div v-if="!isEmail" class="list tel" :class="{active:formData.loginNum!=''}">
        <input type="tel" v-model="formData.loginNum" placeholder="手机号码">
        <div class="qh" @click="$router.push('/telAreaCode')">+86<i class="iconfont icon-xia"></i></div>
      </div>
      <div v-else class="list email" :class="{active:formData.loginNum!=''}">
        <input type="email" v-model="formData.loginNum" placeholder="邮箱">
      </div>
      <div class="list yzm" :class="{active:formData.code!=''}">
        <input type="text" v-model="formData.code" placeholder="验证码">
        <div class="right_btn" @click="sendCode"><span>{{smsCodeConfig.text}}</span></div>
      </div>
      <div class="list pwd" :class="{active:formData.password!='',show:showPwd}">
        <input :type="showPwd?'text':'password'" v-model="formData.password" placeholder="登录密码">
        <div class="r_icon" @click="showPwd=!showPwd"></div>
      </div>
      <div class="list pwd" :class="{active:formData.inviterCode!=''}">
        <input type="text" v-model="formData.inviterCode" placeholder="邀请码（选填）">
      </div>

      <div class="submit" @click="submit" :class="{active:isRegisterBtn}">注册</div>

      <div class="bom">
        <span @click="isEmail=!isEmail">使用{{useRegisterBtn}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { setInterval, clearInterval } from "timers";
import { sendCodeApi, sendEmailCodeApi, userRegisterApi } from "@/api";
export default {
  computed: {
    useRegisterBtn() {
      if (this.isEmail) {
        return "手机号码注册";
      } else {
        return "邮箱注册";
      }
    },
    useRegister() {
      if (this.isEmail) {
        return "邮箱注册";
      } else {
        return "手机号码注册";
      }
    },
    isRegisterBtn() {
      if (
        this.formData.loginNum != "" &&
        this.formData.password != "" &&
        this.formData.code != ""
      ) {
        return true;
      } else {
        return false;
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
        storeName: "regCode",
        time: 60,
        get: true
      },
      formData: {
        loginNum: "",
        password: "",
        code: "",
        inviterCode: ""
      }
    };
  },
  methods: {
    // 注册
    submit() {
      if (!this.ruleAccount()) return;
      userRegisterApi(this.formData).then(data => {
        this.$router.goBack();
      });
    },
    // 验证手机号
    isPoneAvailable(phone) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(phone)) {
        return false;
      } else {
        return true;
      }
    },
    // 验证邮箱
    isEmailFn(str) {
      if (str == null) return;
      var reg = new RegExp(
        /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      );
      return reg.test(str); //检测字符串是否符合正则表达式
    },
    // 验证
    ruleAccount() {
      if (this.isEmail && !this.isEmailFn(this.formData.loginNum)) {
        Toast("请输入正确的邮箱号码");
        return false;
      } else if (
        !this.isEmail &&
        !this.isPoneAvailable(this.formData.loginNum)
      ) {
        // 判断手机号是否正确
        Toast("请输入正确的手机号");
        return false;
      } else {
        return true;
      }
    },
    //   发送验证码
    sendCode() {
      console.log(this.ruleAccount());
      if (!this.ruleAccount()) return;
      if (!this.smsCodeConfig.get) return;
      if (this.isEmail) {
        sendEmailCodeApi({ email: this.formData.loginNum }).then(data => {
          this.countDown();
        });
      } else {
        sendCodeApi({ phone: this.formData.loginNum }).then(data => {
          this.countDown();
        });
      }
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
  created() {
    // this.isSmsCodeTime();
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
.logo{
    margin: 0 auto;
    margin-top: 30px;
    width: 265px;
    img{
        width: 100%;
    }
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
