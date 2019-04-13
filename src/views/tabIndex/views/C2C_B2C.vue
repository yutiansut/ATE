<template>
  <div>
    <Header>
      <div class="right" slot="left" @click="$router.push('/setting')">发布广告</div>
    </Header>

    <div class="fix_top">

      <div class="tl">
        <div class="select" @click.stop="topType=!topType">
          BTC/HKDT <i class="iconfont icon-xia"></i>

          <transition name="slide-fade">
            <div class="select_box" v-show="topType">
              <div class="list active">BTC/HKDT</div>
              <div class="list">BTC/HKDT</div>
              <div class="list">BTC/HKDT</div>
              <div class="list">BTC/HKDT</div>
            </div>
          </transition>
        </div>
        <div class="right">27200.1774 HKDT</div>
      </div>

      <div class="center">
        <div class="left">
          <span class="active">买入</span>
          <span>卖出</span>
        </div>
        <div class="right">交易记录 <i class="iconfont icon-right"></i></div>
      </div>

      <div class="select_group">
        <div class="select">所有买家 <i class="iconfont icon-xia"></i></div>
        <div class="select">所有支付方式 <i class="iconfont icon-xia"></i></div>
        <div class="select">所有交易额度 <i class="iconfont icon-xia"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      topType: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.topType = true;
    }, 500);
  }
};
</script>

<style lang="less" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
.select_box{
  position: absolute;
  width: 100%;
  top: 45px;
  left: 0;
  z-index: 999;
  background: #1f2326;
  padding: 0 13px;
  box-sizing: border-box;
  .list{
    box-sizing: border-box;
    padding-left: 20px;
    border-bottom: 1Px solid @bdColor;

    &:last-child{
      border-bottom: 0;
    }
    &.active{
      background: url("../../../assets/images/formIcons/selectd.png") no-repeat right center;
      background-size: 22px;
    }
  }
}
.fix_top{
  position: fixed;
  top: 50px;
  width: 100%;

  
  .common{
      height: 45px;
      line-height: 45px;
      padding: 0 13px;
  }
  
  .tl{
    display: flex;
    justify-content:space-between;
    background: @bgColor;
    position: relative;
    .common;
  }

  .iconfont{
    color: @color999;
  }

  .center{
    display: flex;
    justify-content: space-between;
    background: #212226;
    .common;

    .left{
      display: flex;
      span{
        width: 93px;
        text-align: center;
        border-bottom: 2px solid #212226;

        &.active{
          color: #0ec857;
          border-color: #0ec857;
        }
      }
    }

    .right{
      .iconfont{
        font-size: 16px;
        position: relative;
        top: 1px;
      }
    }
  }

  .select_group{
    display: flex;
    background: @bgColor;
    position: relative;
    .common;
    .select{
      flex: 1;
      color: @color999;
    }
  }
}
</style>
