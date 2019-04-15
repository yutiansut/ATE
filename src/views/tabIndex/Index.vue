<template>
  <div class="rel">
    <router-view class="Router tab_box" />

    <div class="tabNav">
      <router-link :class="{active:$route.name=='index'}" to="/">首页</router-link>
      <router-link :class="{active:$route.name=='quotation'}" to="/quotation">行情</router-link>
      <router-link :class="{active:$route.name=='c2c_b2c'}" to="/c2c_b2c">B2B/B2C</router-link>
      <router-link :class="{active:$route.name=='biBiTransaction'}" to="/biBiTransaction">币币交易</router-link>
    </div>
  </div>
</template>

<script>
import { Button, Cell } from "vant";
import { setTimeout } from "timers";

export default {
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      active: 0
    };
  },
  created() {}
};
</script>
<style lang="less" scoped>
.tab_box {
  padding-top: 50px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.tabNav {
  position: fixed;
  z-index: 999;
  bottom: 0;
  line-height: 50px;
  height: 50px;
  background: #1a1b20;
  width: 100%;

  display: flex;

  a {
    flex: 1;
    color: @color;
    text-align: center;
    padding-top: 7.5+5px;
    box-sizing: border-box;

    &.active {
      color: @activeColor;
    }

    &:nth-child(1) {
      background: url("../../assets/images/icons/shouyea.png") no-repeat center
        7.5px;
      background-size: 21px;

      &.active {
        background: url("../../assets/images/icons/shouye.png") no-repeat center
          7.5px;
        background-size: 21px;
      }
    }

    &:nth-child(2) {
      background: url("../../assets/images/icons/hangqinga.png") no-repeat
        center 7.5px;
      background-size: 18px;

      &.active {
        background: url("../../assets/images/icons/hangqing.png") no-repeat
          center 7.5px;
        background-size: 18px;
      }
    }

    &:nth-child(3) {
      background: url("../../assets/images/icons/b2ba.png") no-repeat center
        7.5px;
      background-size: 21px;

      &.active {
        background: url("../../assets/images/icons/b2b.png") no-repeat center
          7.5px;
        background-size: 21px;
      }
    }

    &:nth-child(4) {
      background: url("../../assets/images/icons/bba.png") no-repeat center
        7.5px;
      background-size: 21px;

      &.active {
        background: url("../../assets/images/icons/bb.png") no-repeat center
          7.5px;
        background-size: 21px;
      }
    }
  }
}
</style>
