<template>
  <div class="rel">
    <Header></Header>
    <div class="top">
      <div class="select_group" @click="selectActive=!selectActive">
        NZ/USDT <i :class="{'icon-shang':selectActive}" class="iconfont icon-xia"></i>

        <transition name="slide-fade">
          <div class="select_box" v-show="selectActive">
            <div class="list active">1BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
          </div>
        </transition>
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
      <span @click="active=0" :class="{active:active==0}">买入</span>
      <span @click="active=1" :class="{active:active==1}">卖出</span>
      <span @click="onLove">自选 <i :class="{active:love}" class="iconx"></i></span>
      <span>K线图 <i class="iconfont icon-right"></i></span>
    </div>

    <div class="box">
      <div class="left" v-if="active==0">
        <div @click="buyConfig.show=true" class="select_rel">
          {{buyConfig.text}} <i class="iconfont icon-xia"></i>
        </div>
        <div class="pmxd">
          <div class="jbq" v-if="buyConfig.value==0">
            <div class="min" @click="onMin('value')">-</div>
            <div class="input"><input type="text" v-model="value" placeholder="价格"></div>
            <div class="puls" @click="onPuls('value')">+</div>
          </div>
          <div class="disabled" v-else>以当前市场价格交易</div>
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
      <div class="left sell" v-else>
        <div @click="sellConfig.show=true" class="select_rel">
          {{sellConfig.text}} <i class="iconfont icon-xia"></i>
        </div>
        <div class="pmxd">
          <div class="jbq" v-if="sellConfig.value==0">
            <div class="min" @click="onMin('value')">-</div>
            <div class="input"><input type="text" v-model="value" placeholder="价格"></div>
            <div class="puls" @click="onPuls('value')">+</div>
          </div>
          <div class="disabled" v-else>以当前市场价格交易</div>
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
        <div class="r_top">
          <div class="lb r_tl">
            <span>价格(USDT)</span>
            <span>数量(NZ)</span>
          </div>
          <div class="lb">
            <span>--</span>
            <span>--</span>
          </div>
          <div class="lb">
            <span>--</span>
            <span>--</span>
          </div>
          <div class="lb">
            <span>--</span>
            <span>--</span>
          </div>
          <div class="lb">
            <span>--</span>
            <span>--</span>
          </div>
        </div>
        <div class="bom">
          <div class="lb">
            <span>--</span>
            <span>--</span>
          </div>
          <div class="lb">
            <span>--</span>
            <span>--</span>
          </div>
          <div class="lb">
            <span>--</span>
            <span>--</span>
          </div>
          <div class="lb">
            <span>--</span>
            <span>--</span>
          </div>
        </div>
      </div>
    </div>

    <div class="dqbo">
      <div class="left">当前委托</div>
      <div class="right">历史记录 <i class="iconfont icon-right"></i></div>
    </div>

    <div class="bibi_box trade_box">
      <div class="list" v-for="(item,index) in 10" :key="index">
        <div class="top">
          <span>ETH/BTC</span>
          <span>买入</span>
          <span class="btn"><em @click="cancelOrder(item)">撤单</em></span>
        </div>
        <div class="time">
          <div class="lx_mx">
            <span>11:17 04/08</span>
            <span>时间</span>
          </div>
          <div class="lx_mx">
            <span>0.00310000000</span>
            <span>委托价(BTC)</span>
          </div>
          <div class="lx_mx">
            <span>2.00000000</span>
            <span>委托量(ETH)</span>
          </div>
        </div>
      </div>
    </div>

    <van-actionsheet cancel-text="取消" v-model="buyConfig.show" :actions="buyActions" @select="onBuySelect" />
    <van-actionsheet cancel-text="取消" v-model="sellConfig.show" :actions="sellActions" @select="onSellSelect" />
  </div>
</template>

<script>
import { Stepper, Slider, Dialog, Actionsheet } from "vant";
export default {
  components: {
    [Stepper.name]: Stepper,
    [Slider.name]: Slider,
    [Actionsheet.name]: Actionsheet
  },
  data() {
    return {
      active: 0,
      selectActive: false,
      buyConfig: {
        show: false,
        value: 0,
        text: "限价买入"
      },
      sellConfig: {
        show: false,
        value: 0,
        text: "限价卖出"
      },
      buyActions: [
        {
          name: "限价买入",
          value: 0
        },
        {
          name: "市价买入",
          value: 1
        }
      ],
      sellActions: [
        {
          name: "限价卖出",
          value: 0
        },
        {
          name: "市价卖出",
          value: 1
        }
      ],
      value: "",
      value2: 0,
      love: false
    };
  },
  methods: {
    // 减
    onMin(key) {
      if (this[key] > 0) {
        this[key]--;
      }
    },
    // 加
    onPuls(key) {
      this[key]++;
    },
    // 收藏
    onLove() {
      this.love = !this.love;
    },
    //   撤单
    cancelOrder() {
      Dialog.confirm({
        title: "撤销订单",
        message: "是否确认撤销该订单"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    // 买入选择弹窗
    onBuySelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.buyConfig.text = item.name;
      this.buyConfig.value = item.value;
      this.buyConfig.show = false;
    },
    // 卖出选择弹窗
    onSellSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.sellConfig.text = item.name;
      this.sellConfig.value = item.value;
      this.sellConfig.show = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../tradeRecord/components/less/common");
.top{
  width: 100%;
  background: @bgColor;
  height: 35px;
  padding: 5px 0;
  display: flex;
  position: relative;

  .select_group{
    width: 143px;
    line-height: 35px;
    border-right: 2px solid #393a3d;
    padding-left: 13px;
    box-sizing: border-box;

    i{
      float: right;
      padding-right: 20px;
    }
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
    &:nth-child(2){
      &.active{
        color: @activeColor;
        border-color: @activeColor;
      }
    }
    &:active{
      background: @bgColor;
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

      &:active{
        background: #212226;
      }
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

      .val{
        color: @color999;
        margin-top: 13px;
        margin-bottom: 5px;
      }
    }

    .price{
      color: @color999;
    }

    .btn{
      border-radius: 18.8px;
      background: #0ec857;
      height: 37.5px;
      line-height: 37.5px;
      width: 90%;
      margin: 0 auto;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 16px;

      &:active{
        background: #19b858;
      }
    }
  }

  .sell{
    .btn{
      background: @activeColor;
    }
  }

  .right{
    width: 47%;
    padding-left: 3px;

    .r_top{
      padding: 0 13px;
      box-sizing: border-box;
      padding-bottom: 20px;
    }

    .lb{
      display: flex;
      justify-content:space-between;
      margin-top: 15px;
      span{
        font-size:12px;

        &:first-child{
          color: #f73535;
        }
      }
    }

    .r_tl{
      padding-top: 13px;
      margin-top: 0;
      span{
        color: @color999;
        &:first-child{
          color: @color999;
        }
      }
    }

    .bom{
      border-top: 1Px solid #393a3d;
      padding: 0 13px;
      box-sizing: border-box;

    .lb{
      display: flex;
      justify-content:space-between;
      span{
        font-size:12px;

        &:first-child{
          color: @lvColor;
        }
      }
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
.disabled{
  margin-top: 15px;
  background: #fff;
  color: #333;
  position: relative;
  height: 38px;
  line-height: 38px;
  text-align: center;

  &:after{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
  }
}

.dqbo{
  display: flex;
  height: 50px;
  align-items: center;
  justify-content:space-between;
  padding: 0 6px;
  background: #212226;
  margin-top: 10px;

  .left{
    font-size: 15px;
  }
  .right,.iconfont{
    color: @color999;
    height: 50px;
    line-height: 50px;
    &:active{
      background: @bgColor;
    }
  }
  .right{
    padding-left: 10px;
  }
}

.trade_box {
  .list{
    .top{
      margin-bottom: 0;
    }
  }
}

.select_box{
    .list.active {
        background: url("../../../assets/images/formIcons/selectd.png") no-repeat right center;
        background-size: 22px;
    }
  }
</style>

<style lang="less">
.van-slider__button{
  width:10px;
  height: 10px;
  background:@lvColor;

}

  .van-slider__bar{
    background:@lvColor;
  }

  .sell{
    .van-slider__button{
      background:@activeColor;
    }
  }
</style>
