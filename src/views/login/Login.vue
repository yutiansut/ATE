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

            <div class="submit" :class="{active:formData.account!='' && formData.pwd!=''}">登录</div>

            <div class="bom">
                <router-link to="/forgetPassword">忘记密码</router-link>
                <router-link to="/register">注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showPwd: false,
      formData: {
        account: "",
        pwd: ""
      }
    };
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
</style>
