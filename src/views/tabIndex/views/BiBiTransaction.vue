<template>
  <div class="rel">
    <Header></Header>
    <div class="top">
      <div class="select_group">
        NZ/USDT <i :class="{'icon-shang':selectActive}" class="iconfont icon-xia"></i>
      </div>
      <div class="right">
        <div class="left">
          <span>0.01088121</span>
          <span>67.5650HKDT</span>
        </div>
        <div class="bil">+8.88%</div>
      </div>
    </div>
    <div class="menu">
      <span class="active">买入</span>
      <span>卖出</span>
      <span>自选 <i class="iconx"></i></span>
      <span>K线图 <i class="iconfont icon-right"></i></span>
    </div>

    <div class="box">
      <div class="left">
        <div class="select_rel">
          限价买入 <i class="iconfont icon-xia"></i>
        </div>
        <div class="pmxd">
          <div class="jbq">
            <div class="min" @click="onMin('value')">-</div>
            <div class="input"><input type="text" v-model="value" placeholder="价格"></div>
            <div class="puls" @click="onPuls('value')">+</div>
          </div>
          <div class="jbq_tips">≈﹣﹣HKDT</div>
          <div class="jbq">
            <div class="min" @click="onMin('value')">-</div>
            <div class="input"><input type="text" v-model="value" placeholder="数量"></div>
            <div class="puls" @click="onPuls('value')">+</div>
          </div>
          <div class="huakua">
            <div class="pmx">可用USDT:0.00000000</div>
            <van-slider v-model="value2" class="bmxxs" />
            <div class="val">0</div>
          </div>
          <div class="price">交易额：--</div>
          <div class="btn">买入</div>
        </div>
      </div>
      <div class="right">

      </div>
    </div>
  </div>
</template>

<script>
import { Stepper, Slider } from "vant";
export default {
  components: {
    [Stepper.name]: Stepper,
    [Slider.name]: Slider
  },
  data() {
    return {
      selectActive: false,
      value: "",
      value2: 0
    };
  },
  methods: {
    onMin(key) {
      if (this[key] > 0) {
        this[key]--;
      }
    },
    onPuls(key) {
      this[key]++;
    }
  }
};
</script>

<style lang="less" scoped>
.top{
  width: 100%;
  background: @bgColor;
  height: 35px;
  padding: 5px 0;
  display: flex;

  .select_group{
    width: 143px;
    line-height: 35px;
    border-right: 2px solid #393a3d;
    padding-left: 13px;
    box-sizing: border-box;
  }
  .right{
    flex: 1;
    display: flex;
    padding-right: 13px;
    box-sizing: border-box;

    .left{
      padding-left: 26px;
      span{
        display: block;

        &:last-child{
          font-size: 12px;
          color: @color999;
          margin-top: 2px;
        }
      }
    }
    .bil{
      flex: 1;
      text-align: right;
      line-height: 35px;
      color: #0ec857;
    }
  }
}

.menu{
  display: flex;
  background: #212226;
  span{
    flex: 1;
    line-height: 45px;
    color: @color999;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconfont{
      color: @color999;
    }

    &.active{
      color: #0ec857;
      border-bottom: 2px solid #0ec857;
    }

    .iconx{
      width: 15px;
      height: 15px;
      display: inline-block;
      background: url("../../../assets/images/icons/xinga.png") no-repeat;
      background-size: 15px;
      margin-left: 5px;

      &.active{
        background: url("../../../assets/images/icons/xing.png") no-repeat;
        background-size: 15px;
      }
    }
  }
}

.box{
  display: flex;
  background: @bgColor;
  position: relative;
  &:after{
    content: "";
    display: block;
    width: 3px;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 53%;
    top: 0;
    background: @dbBgColor;
  }
  .left{
    width: 53%;
      box-sizing: border-box;

    .pmxd{
      box-sizing: border-box;
      padding: 0 8px;
    }
    .select_rel{
      text-align: center;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1Px solid #393a3d;
    }

    
    .jbq_tips{
      color: @color999;
        margin-top: 5px;

      &+.jbq{
        margin-top: 5px;
      }
    }

    .huakua{
      .pmx{
        margin: 9px 0 10px;
        color: @color999;
      }
      .bmxxs{
        margin: 10px 0;
      }
    }
  }
}

.jbq{
  width: 100%;
  margin-top: 15px;
  line-height: 27px;
  background: #fff;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 4px;

  div{
    color: @color999;
    width: 33px;
  }
  .input{
    width: 100%;
    input{
      text-align: center;
      border-bottom: 0;
      padding: 0 40px;
      color: @color999;
    }
  }
  .min,.puls{
    background: #fff;
    position: absolute;
    top: 6px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .min{
    left: 0;
    border-right: 2px solid #ededed;
  }
  .puls{
    border-left: 2px solid #ededed;
    right: 0;
  }

}
</style>

<style lang="less">
.van-slider__button{
  width:10px;
  height: 10px;
  background:#0fc055;

}

  .van-slider__bar{
    background:#0fc055;
  }
</style>
