<template>
  <div class="rel">
    <Header back background="#1a1b20"></Header>
    <div class="usertop">
      <div class="box">
        <div class="img header"><img src="@/assets/images/header.png" alt=""></div>
        <h1>1391***5678</h1>
      </div>
    </div>

    <div class="cen_box">
      <div class="xbox">
        <div class="pbox" @click="$router.push('/user/c2c_b2c')">
          <p>C2C/B2C账户(BTC)</p>
          <p>103472.23802916</p>
          <p>2814463236.5300HKDT</p>
        </div>
      </div>
      <div class="xbox">
        <div class="pbox" @click="$router.push('/user/bibi')">
          <p>币币账号(BTC)</p>
          <p>103472.23802916</p>
          <p>2814463236.5300HKDT</p>
        </div>
      </div>
    </div>

    <div class="list_box">
      <div class="list">
        <div class="left">手机号码认证</div>
        <div class="right">1391***5678</div>
      </div>
      <div class="list" @click="isMailbox">
        <div class="left">邮箱认证</div>
        <!-- <div class="right">167***@qq.com</div> -->
        <div class="right active">去认证 <i class="iconfont icon-right"></i></div>
      </div>
      <div class="list" @click="isId">
        <div class="left">身份认证</div>
        <!-- <div class="right">已认证</div> -->
        <div class="right active">去认证 <i class="iconfont icon-right"></i></div>
      </div>
    </div>

    <div class="list_box">
      <div class="list" @click="$router.push('/tradeRecord')">
        <div class="left">交易记录</div>
        <div class="right iconfont icon-right"></div>
      </div>
    </div>
    <div class="list_box">
      <div class="list" @click="$router.push('/user/msgList')">
        <div class="left">留言反馈</div>
        <div class="right iconfont icon-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    // 邮箱是否已认证
    isMailbox() {
      this.$router.push("/user/mailboxAuth");
    },
    // 身份是否已认证
    isId() {
      this.$router.push("/user/authentication");
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.rel{
  padding-top: 50px;
}
.usertop{
  background: @dbBgColor;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .header{
    text-align: center;
    img{
      width: 65px;
      height: 65px;
      border-radius: 50%;
    } 
  }
  h1{
      font-weight: normal;
      margin-top: 14.5px;
    }
}

.cen_box{
  display: flex;
  padding: 15px 13px;
  box-sizing: border-box;
  background: #212226;

  .xbox{
    box-sizing: border-box;
    width: 50%;
    display: flex;
    align-items: center;
    &:first-child{
      padding-right: 5px;
    }
    &:last-child{
      padding-left:5px;
    }
  }
  .pbox{
    width: 100%;
    background:@bgColor;
    height: 110px;
    padding: 0 15px;
    box-sizing: border-box;
    padding-top: 20px;

    p{
      width: 100%;
      font-size: 12px;


      &:nth-child(2){
        color: @activeColor;
        font-size: 14px;
        padding: 10px 0;
      }
      &:last-child{
        color: @color999;
      }
    }
  }
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
</style>
