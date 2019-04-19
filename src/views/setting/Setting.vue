<template>
  <div class="rel">
    <Header back></Header>

    <div class="list_box">
      <div class="list" @click="$router.push('/setting/lang')">
        <div class="left">语言</div>
        <div class="right">简体中文 <i class="iconfont icon-right"></i></div>
      </div>
      <div class="list" @click="$router.push('/setting/legalCurrency')">
        <div class="left">法币</div>
        <div class="right">HKDT <i class="iconfont icon-right"></i></div>
      </div>
    </div>

    <div class="list_box">
      <div class="list" @click="$router.push('/setting/resetPwd')">
        <div class="left">登录密码</div>
        <div class="right">已设置 <i class="iconfont icon-right"></i></div>
      </div>
      <div class="list" @click="$router.push('/setting/resetCapitalPwd')">
        <div class="left">资金密码</div>
        <div class="right" :class="{active:true}">未设置 <i class="iconfont icon-right"></i></div>
      </div>
    </div>

    <div class="list_box">
      <div class="list">
        <div class="left">谷歌身份验证器</div>
        <div class="right">
          <van-switch v-model="google" @change="setGoogle" active-color="#f73535" inactive-color="#afafaf" />
        </div>
      </div>
    </div>

    <div class="list_box">
      <div class="list">
        <div class="left">手势密码</div>
        <div class="right">
          <van-switch v-model="gesture" @change="setGesturePwd" active-color="#f73535" inactive-color="#afafaf" />
        </div>
      </div>
      <!-- <div class="list">
                <div class="left">指纹登录</div>
                <div class="right">
                    <van-switch v-model="checked" active-color="#f73535" inactive-color="#afafaf" />
                </div>
            </div> -->
    </div>

    <div class="list_box outLogin">
      <div class="list" @click="outLogin">
        <div class="left">退出</div>
      </div>
    </div>

    <div class="mask" v-show="rulePwd" @click="rulePwd=false"></div>
    <transition name="slide-fade">
      <div class="alert" v-show="rulePwd">
        <div class="alert_tl">安全验证 <i @click="rulePwd=false" class="iconfont icon-guanbi"></i></div>
        <div class="box">
          <div class="list_input">
            <div class="left">登录密码</div>
            <input type="password" v-model="password" placeholder="请输入登录密码">
          </div>
          <div class="alert_submit" :class="{active:password.length>=6}" @click="onRulePwd">提交</div>
        </div>
      </div>
    </transition>

    <div class="mask" v-show="ruleGoolePwd" @click="ruleGoolePwd=false"></div>
    <transition name="slide-fade">
      <div class="alert alert_google" v-show="ruleGoolePwd">
        <div class="alert_tl">安全验证 <i @click="ruleGoolePwd=false" class="iconfont icon-guanbi"></i></div>
        <div class="box">
          <div class="list_input">
            <div class="left">登录密码</div>
            <input type="password" v-model="password" placeholder="请输入登录密码">
          </div>
          <div class="list_input">
            <div class="left">谷歌验证码</div>
            <input type="text" v-model="googleCode" placeholder="请输入谷歌验证码">
          </div>
          <div class="alert_submit" @click="onRuleGoolePwd">提交</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Switch, Dialog, Toast } from "vant";
import { validatePasswordApi } from "@/api";
export default {
  components: {
    [Switch.name]: Switch
  },
  data() {
    return {
      rulePwd: false,
      ruleGoolePwd: false,
      google: false,
      gesture: false,
      password: "",
      googleCode: ""
    };
  },
  methods: {
    //   退出登录
    outLogin() {
      Dialog.confirm({
        title: "退出登录",
        message: "确认退出当前账号?"
      })
        .then(() => {
          // on confirm
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    },
    // 设置手势密码
    setGesturePwd() {
      this.gesture = !this.gesture;
      this.rulePwd = true;
    },
    // 设置Google验证码
    setGoogle() {
      this.google = !this.google;
      this.ruleGoolePwd = true;
    },
    // 验证密码是否正确
    onRulePwd() {
      if (this.password.length == "") {
        Toast("请验证您的登录密码!");
        return;
      }
      validatePasswordApi({ password: this.password }).then(data => {
        //   手势密码
        if (this.gesture) {
          // 不跳转关闭
          this.rulePwd = false;
          this.gesture = false;
        } else {
          // 跳转到设置手势密码
          this.$router.push("/setting/gesturePassword");
          this.gesture = true;
          this.rulePwd = false;
        }
      });
    },
    // Goole验证
    onRuleGoolePwd() {
      if (this.google) {
        // 不跳转关闭
        this.rulePwd = false;
        this.google = false;
      } else {
        // 跳转到设置手势密码
        this.google = true;
        this.rulePwd = false;
        this.$router.push("/setting/google");
      }
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.van-switch{
    font-size: 20px !important;
}
.van-switch__node{
    font-size: 20px !important;
}
.rel{
  padding-top: 50px;
}

.list_box{
  background: @bgColor;
  margin-top: 10px;
  padding: 0 13px;
  box-sizing: border-box;

  .list{
    display: flex;
    justify-content:space-between;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #37383b;

    &:first-child{
      border-top: 0;
    }

    .right{
      color: @color999;
      display: flex;
      align-items: center;
        &.active{
        color: @activeColor;

        i{
          color: @activeColor;
        }
      }
    }
    div,.iconfont{
      font-size: 15px;
    }

    i{
      color: @color999;
    }
  }
}
.outLogin{
    margin-top: 20px;
}


.alert{
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 84%;
  top: 50%;
  left: 8%;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-top: -110px;

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
    height: 170px;
  }

  span{
    color: #333;
  }
  input{
    color: #333;
  }

  .list_input{
      display: flex;
      border-bottom: 1px solid #ebebeb;
      .left{
          color: #333;
          width: 140px;
          height: 50px;
          line-height: 50px;
      }
      input{
          height: 50px;
          border-bottom: 0;
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

.alert_google{
    height: 270px;
    margin-top: -200px;
}
</style>
