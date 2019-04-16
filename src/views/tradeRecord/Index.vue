<template>
  <div class="tradeRecord">
    <Header back></Header>
    <div class="toptab">
      <span :class="{active:active==0}" @click="active=0">C2C/B2C</span>
      <span :class="{active:active==1}" @click="active=1">币币交易</span>
      <span :class="{active:active==2}" @click="active=2">广告发布</span>
      <span :class="{active:active==3}" @click="active=3">充币/提币</span>
    </div>
    <div class="qu_main">
      <van-tabs v-model="active" swipeable animated>
        <van-tab title="C2C/B2C">
          <ctwoc :prevActive="active==0" ref="ctwoc"></ctwoc>
        </van-tab>
        <van-tab title="币币交易">
          <BiBiTrande :prevActive="active==1" ref="BiBiTrande"></BiBiTrande>
        </van-tab>
        <van-tab title="广告发布">
          <Advertisement :prevActive="active==2" ref="Advertisement"></Advertisement>
        </van-tab>
        <van-tab title="充币/提币">
          <ChargeBiCarryBi :prevActive="active==3" ref="ChargeBiCarryBi"></ChargeBiCarryBi>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import ctwoc from "./components/C2C_B2C";
import BiBiTrande from "./components/BiBiTrande";
import Advertisement from "./components/Advertisement";
import ChargeBiCarryBi from "./components/ChargeBiCarryBi";
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    ctwoc,
    BiBiTrande,
    Advertisement,
    ChargeBiCarryBi
  },
  data() {
    return {
      active: 2
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.tradeRecord{
    .qu_main{
        padding-top: 140px;
    }
    .toptab{
        position: fixed;
        top: 50px;
        left: 0;
        width: 100%;
        z-index: 999;
        width: 100%;
        height: 45px;
        line-height: 45px;

        display: flex;
        background: @dbBgColor;
        display: flex;
        span{
            text-align: center;
            flex: 1;
            transition:all .3s;
            color: @color999;
            border-bottom: 2px solid @bgColor;
            &.active{
            border-bottom-color:@activeColor;
            color: @activeColor;
            }
        }
    }
}
</style>
<style lang="less">
.tradeRecord{
  .van-tabs--line{
    padding-top:0;
  }
  .van-tabs__wrap{
    display: none;
  }
}

.tradeRecord_refresh_box{
    height: calc(100vh - 140px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .van-pull-refresh__track{
      height: calc(100vh - 140px);
    }
  }
</style>