<template>
  <div class="rel">
    <Header back></Header>

    <div class="form">
      <div class="list">
        <input type="password" v-model="formData.password" placeholder="原登录密码">
      </div>
      <div class="list">
        <input type="password" v-model="formData.newPassword" placeholder="重置密码">
      </div>
      <div class="list">
        <input type="password" v-model="formData.newPassword2" placeholder="再次确认密码">
      </div>

      <div class="submit" @click="submit" :class="{active:isSubmitBtn}">提交</div>
    </div>
  </div>
</template>

<script>
import { modifyPasswordApi } from "@/api";
import { Toast } from "vant";
export default {
  computed: {
    isSubmitBtn() {
      if (
        this.formData.password &&
        this.formData.newPassword &&
        this.formData.newPassword2
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      formData: {
        password: "",
        newPassword: "",
        newPassword2: ""
      }
    };
  },
  methods: {
    submit() {
      if (this.formData.password.length < 6) {
        Toast("密码由6-22位数字大小写英文组成!");
        return;
      } else if (this.formData.newPassword != this.formData.newPassword2) {
        Toast("两次密码输入不一致!");
        return;
      }
      modifyPasswordApi(this.formData).then(data => {
        this.$router.goBack();
      });
    }
  },
  created() {}
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


        &.active{
          background: @activeColor;
        }
    }
}
</style>
