<template>
  <div class="rel">
    <Header back></Header>
    <div class="logo img"><img src="@/assets/images/logo.png" alt=""></div>

    <div class="form">
      <div class="list" :class="{active:formData.account!=''}">
        <input type="text" v-model="formData.account" placeholder="邮箱或手机号码">
      </div>
      <div class="list" :class="{active:formData.pwd!='',show:showPwd}">
        <input :type="showPwd?'text':'password'" v-model="formData.pwd" placeholder="密码">
        <div class="r_icon" @click="showPwd=!showPwd"></div>
      </div>

      <div class="submit" @click="submit" :class="{active:formData.account!='' && formData.pwd!=''}">登录</div>

      <div class="bom">
        <router-link to="/forgetPassword">忘记密码</router-link>
        <router-link to="/register">注册</router-link>
      </div>
    </div>

    <div class="mask" v-show="alertYzm" @click="alertYzm=false"></div>
    <transition name="slide-fade">
      <div class="alert" v-show="alertYzm">
        <div class="alert_tl">进行二次安全验证 <i @click="alertYzm=false" class="iconfont icon-guanbi"></i></div>
        <div class="box">
          <div class="tel">1211***6666</div>
          <div class="input_yzx">
            <input type="text" placeholder="请输入验证码" v-model="formData.yzm">
            <span @click="sendCode">{{smsCodeConfig.text}}</span>
          </div>
          <div class="alert_submit" @click="login" :class="{active:formData.yzm.length>3}">提交</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPwd: false,
      alertYzm: false,
      smsCodeConfig: {
        text: "发送验证码",
        timer: null,
        storeName: "loginCode",
        time: 60,
        get: true
      },
      formData: {
        account: "",
        pwd: "",
        yzm: ""
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
    },
    // 提交账号密码
    submit() {
      this.alertYzm = true;
    },
    // 登录
    login() {
      if (this.$route.query.isBack) {
        this.$router.goBack();
      } else {
        this.$router.push("/");
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
    box-sizing: border-box;
    background: #1a1b20 url("../../assets/images/loginbg.png") no-repeat left bottom;
    background-size: 100%;
}
.logo{
    margin: 0 auto;
    margin-top: 30px;
    width: 104.5px;
    img{
        width: 100%;
    }
}
.form{
    padding: 0 31px;
    box-sizing: border-box;
    margin-top: 60px;

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
        input{
            padding-left: 29.5px;
        }

        &:nth-child(1){
            background: url("../../assets/images/formIcons/usera.png") no-repeat left center;
            background-size: 19.5px;

            &.active{
                background: url("../../assets/images/formIcons/user.png") no-repeat left center;
                background-size: 19.5px;
            }
        }

        &:nth-child(2){
            background: url("../../assets/images/formIcons/suoa.png") no-repeat left center;
            background-size: 19.5px;

            &.active{
                background: url("../../assets/images/formIcons/suo.png") no-repeat left center;
                background-size: 19.5px;


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

    .submit{
        background: @disColor;

        &.active{
            background: @activeColor;
        }
    }

    .bom{
        display: flex;
        justify-content:space-between;
        margin-top: 28px;
        a{
            color: @activeColor;
        }
    }
}


.alert{
  position: fixed;
  top: 0;
  z-index: 11000;
  width: 84%;
  top: 50%;
  left: 8%;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-top: -180px;

  .alert_tl{
    color: #333;
    background: #f3efef;
    font-size: 16px;
    position: relative;
    height: 47px;
    line-height: 47px;
    text-align: center;


    .iconfont{
      position: absolute;
      padding-right: 20px;
      font-size: 16px;
      right: 0;
      color: #adadad;
    }
  }

  .box{
    padding: 0 15px;
    box-sizing: border-box;
    padding-top: 23px;
    box-sizing: border-box;
    height: 200px;
  }

  span{
    color: #333;
  }
  input{
    color: #333;
  }

  .tel{
      color: #333;
      margin-bottom: 15px;
  }

  
  .input_yzx{
      position: relative;
        input{
            padding-right: 130px;
            border-color: #ebebeb;
        }
      span{
          position: absolute;
          right: 0;
          top:8px;
          color: #f73535;
          padding: 0 12.5px;
          border-left: 1px solid #ebebeb;
      }
  }
  

  .alert_submit{
    width: 187.5px;
    margin: 0 auto;
    border-radius: 18.8px;
    overflow: hidden;
    background: #afafaf;
    height: 37.5px;
    line-height: 37.5px;
    text-align: center;
    color: #fff;
    margin-top: 31.5px;
    margin-bottom: 37.5px;
    &.active{
      background: @activeColor;
    }
  }
}

</style>
