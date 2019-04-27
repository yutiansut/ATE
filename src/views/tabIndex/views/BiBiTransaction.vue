<template>
  <div class="rel">
    <Header></Header>
    <div class="mask" style="z-index:99;" @click="selectActive=false" v-show="selectActive"></div>
    <div class="top">
      <div class="select_group" @click="selectActive=!selectActive" v-if="topSelectArr.length>0">
        {{privatesName}}/{{mainName}} <i :class="{'icon-shang':selectActive}" class="iconfont icon-xia"></i>

        <transition name="slide-fade">
          <div class="select_box nobox" v-show="selectActive">
            <div class="stb">
              <span @click.stop="onTabSelectTop(index)" :class="{active:topTabIndex==index}" v-for="(item,index) in topSelectArr" :key="index">{{item.main[0]}}</span>
            </div>
            <div class="sbx" v-if="topSelectArr.length>0">
              <div @click.stop="onSelectTop(index)" class="list" :class="{active:topTabIndexCm==index}" v-for="(item,index) in topSelectArr[topTabIndex].privates" :key="index">{{item}}</div>
            </div>
          </div>
        </transition>
      </div>
      <div class="right">
        <div class="left">
          <span>{{surfaceData.newPrice}}</span>
          <!-- <span>67.5650HKDT</span> -->
        </div>
        <div class="bil">{{surfaceData.gains>0?'+':''}}{{surfaceData.gains}}%</div>
      </div>
    </div>
    <div class="menu">
      <span @click="active=0" :class="{active:active==0}">买入</span>
      <span @click="active=1" :class="{active:active==1}">卖出</span>
      <span @click="onLove">自选 <i :class="{active:isSelfSelected}" class="iconx"></i></span>
      <span @click="$router.push({path:'/klinechat',query:{symbol:privatesName,market:mainName}})">K线图 <i class="iconfont icon-right"></i></span>
    </div>

    <div class="box">
      <div class="left" v-if="active==0">
        <div @click="buyConfig.show=true" class="select_rel">
          {{buyConfig.text}} <i class="iconfont icon-xia"></i>
        </div>
        <div class="pmxd">
          <div class="jbq" v-if="buyConfig.value==0">
            <div class="min" @click="onMin('buyAjax','price')">-</div>
            <div class="input"><input type="text" @input="onBuyPrice" v-model="buyAjax.price" placeholder="价格"></div>
            <div class="puls" @click="onPuls('buyAjax','price')">+</div>
          </div>
          <div class="disabled" v-else>以当前市场价格交易</div>
          <!-- <div class="jbq_tips">≈﹣﹣HKDT</div> -->
          <div class="jbq">
            <div class="min" @click="onMin('buyAjax','volume')">-</div>
            <div class="input"><input type="text" @input="onNumBfb('buyAjax')" v-model="buyAjax.volume" placeholder="数量"></div>
            <div class="puls" @click="onPuls('buyAjax','volume')">+</div>
          </div>
          <div class="huakua">
            <div class="pmx" v-if="topSelectArr.length>0">可用{{mainName}}:{{mainData.availableBalance}}</div>
            <van-slider v-model="buyAjax.bfb" @input="onAjaxBfb('buyAjax')" class="bmxxs" />
            <div class="val">
              <span>0</span>
              <span v-if="privatesData.availableBalance">{{mainData.availableBalance/(buyAjax.price || 1)}}{{buyConfig.value==0?privatesName:mainName}}</span>
            </div>
          </div>
          <div class="price" v-if="buyConfig.value==0">交易额：{{buyAjax.volume*buyAjax.price}}{{mainName}}</div>
          <div class="btn" @click="addBuyEntrustment">买入</div>
        </div>
      </div>
      <div class="left sell" v-else>
        <div @click="sellConfig.show=true" class="select_rel">
          {{sellConfig.text}} <i class="iconfont icon-xia"></i>
        </div>
        <div class="pmxd">
          <div class="jbq" v-if="sellConfig.value==0">
            <div class="min" @click="onMin('sellAjax','price')">-</div>
            <div class="input"><input type="text" @input="onSellPrice" v-model="sellAjax.price" placeholder="价格"></div>
            <div class="puls" @click="onPuls('sellAjax','price')">+</div>
          </div>
          <div class="disabled" v-else>以当前市场价格交易</div>
          <!-- <div class="jbq_tips">≈﹣﹣HKDT</div> -->
          <div class="jbq">
            <div class="min" @click="onMin('sellAjax','volume')">-</div>
            <div class="input"><input type="text" @input="onNumBfb('sellAjax')" v-model="sellAjax.volume" placeholder="数量"></div>
            <div class="puls" @click="onPuls('sellAjax','volume')">+</div>
          </div>
          <div class="huakua">
            <div class="pmx" v-if="topSelectArr.length>0">可用{{mainName}}:{{mainData.availableBalance}}</div>
            <van-slider v-model="sellAjax.bfb" @input="onAjaxBfb('sellAjax')" class="bmxxs" />
            <div class="val">
              <span>0</span>
              <span v-if="privatesData.availableBalance">{{mainData.availableBalance/(sellAjax.price || 1)}}{{sellConfig.value==0?privatesName:mainName}}</span>
            </div>
          </div>
          <div class="price" v-if="sellConfig.value==0">交易额：{{sellAjax.volume*sellAjax.price}}{{mainName}}</div>
          <div class="btn" @click="addSellEntrustment">卖出</div>
        </div>
      </div>
      <div class="right">
        <div class="r_top">
          <div class="lb r_tl">
            <span>价格(USDT)</span>
            <span>数量(NZ)</span>
          </div>
          <div class="lb" @click="onCoyPrice(item)" v-for="(item,index) in unsettledGearData.sell" :key="index">
            <span>{{item.price}}</span>
            <span>{{item.val}}</span>
          </div>
        </div>
        <div class="bom">
          <div class="lb" @click="onCoyPrice(item)" v-for="(item,index) in unsettledGearData.buy" :key="index">
            <span>{{item.price}}</span>
            <span>{{item.val}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="dqbo">
      <div class="left">当前委托</div>
      <div class="right" @click="$router.push({path:'/historicalRecord'})">历史记录 <i class="iconfont icon-right"></i></div>
    </div>

    <div class="bibi_box trade_box">
      <div class="list" v-for="(item,index) in myEntrustmentsData" :key="index">
        <div class="time">
          <div class="lx_mx">
            <span>委托中</span>
            <span>{{item.createDate}}</span>
            <span>时间</span>
          </div>
          <div class="lx_mx">
            <span :class="{buysell:item.buysell==1,sellbuy:item.buysell!=1}">{{item.buysell==1?"买入":"卖出"}}</span>
            <span>{{item.price}}</span>
            <span>委托价(BTC)</span>
          </div>
          <div class="lx_mx">
            <span class="btn"><em @click="cancelOrder(item)">撤单</em></span>
            <span>{{item.volume}}</span>
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
import {
  getCurrencysubchail,
  addEntrustment,
  getCoinFundsInfo,
  surface,
  myEntrustments,
  updateEntrustment,
  getMinVolume,
  addSelfSelected,
  delSelfSelected,
  selfSelected,
  unsettledGear
} from "@/api";
export default {
  components: {
    [Stepper.name]: Stepper,
    [Slider.name]: Slider,
    [Actionsheet.name]: Actionsheet
  },
  computed: {
    // 主链名称
    mainName() {
      return this.topSelectArr.length > 0
        ? this.topSelectArr[this.topTabIndexSm].main[0]
        : "";
    },
    // 次链名称
    privatesName() {
      return this.topSelectArr.length > 0
        ? this.topSelectArr[this.topTabIndexSm].privates[this.topTabIndexCm]
        : "";
    },
    // 是否自选
    isSelfSelected() {
      let isBol = false;
      for (let i = 0; i < this.selfSelectedData.length; i++) {
        let item = this.selfSelectedData[i];
        if (item.market == this.mainName && item.symbol == this.privatesName) {
          isBol = true;
          break;
        }
      }
      return isBol;
    }
  },
  data() {
    return {
      active: 0,
      selectActive: false,
      buyConfig: {
        show: false,
        value: "",
        text: "限价买入"
      },
      sellConfig: {
        show: false,
        value: "",
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
      love: false,
      topSelectArr: [],
      topTabIndex: 0,
      topTabIndexSm: 0,
      topTabIndexCm: 0,
      // 买入参数
      buyAjax: {
        type: 2,
        buysell: 1,
        market: "",
        symbol: "",
        price: 0,
        volume: 0,
        amount: 0,
        bfb: 0
      },
      // 卖出参数
      sellAjax: {
        type: 2,
        buysell: 2,
        market: "",
        symbol: "",
        price: 0,
        volume: 0,
        amount: 0,
        bfb: 0
      },
      mainData: {},
      privatesData: {},
      surfaceData: {},
      myEntrustmentsData: [],
      selfSelectedData: [],
      unsettledGearData: { buy: [], sell: [] }
    };
  },
  methods: {
    // 改变买入和卖出价格
    onCoyPrice(item) {
      this.buyAjax.price = item.price;
      this.sellAjax.price = item.price;
    },
    // 买入价格改变计算购买数量
    onBuyPrice() {
      this.onAjaxBfb("buyAjax");
    },
    // 卖出价格改变计算购买数量
    onSellPrice() {
      this.onAjaxBfb("sellAjax");
    },
    // 百分百触发
    onAjaxBfb(key) {
      let price = this[key].price == 0 ? 1 : this[key].price;
      this[key].volume =
        (this.mainData.availableBalance / price) * (this[key].bfb / 100);
    },
    // 通过数量计算百分比
    onNumBfb(key) {
      let price = this[key].price == 0 ? 1 : this[key].price;
      this[key].bfb =
        (this[key].volume / (this.mainData.availableBalance / price)) * 100;
      // this.onAjaxBfb(key);
    },
    // 减
    onMin(key, key2) {
      if (this[key][key2] > 0) {
        this[key][key2] -= 0.01;
      }
      this.onAjaxBfb(key);
    },
    // 加
    onPuls(key, key2) {
      this[key][key2] = parseFloat(this[key][key2]) + 0.01;
      if (key2 == "price") {
        this.onAjaxBfb(key);
      }
    },
    //   撤单
    cancelOrder(item) {
      Dialog.confirm({
        title: "撤销订单",
        message: "是否确认撤销该订单"
      })
        .then(() => {
          // on confirm
          updateEntrustment({ id: item.id, status: 5 }).then(data => {
            this.myEntrustments();
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 买入选择弹窗
    onBuySelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.buyAjax.price = 0;
      this.buyConfig.text = item.name;
      this.buyConfig.value = item.value;
      this.buyConfig.show = false;
    },
    // 卖出选择弹窗
    onSellSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.sellAjax.price = 0;
      this.sellConfig.text = item.name;
      this.sellConfig.value = item.value;
      this.sellConfig.show = false;
    },
    // 获取类型选项
    getCurrencysubchail() {
      getCurrencysubchail().then(data => {
        this.topSelectArr = data;
        this.getCoinFundsInfo();
        this.myEntrustments();
        this.unsettledGear();
      });
    },
    // 类型tab选择
    onTabSelectTop(index) {
      this.topTabIndex = index;
    },
    // 类型选项
    onSelectTop(index) {
      this.topTabIndexSm = this.topTabIndex;
      this.topTabIndexCm = index;

      this.getCoinFundsInfo();

      this.selectActive = false;
    },
    // 获取类型余额
    getCoinFundsInfo() {
      // 主余额
      getCoinFundsInfo({
        tradeCode: this.topSelectArr[this.topTabIndexSm].main[0]
      }).then(data => {
        console.log(data);
        this.mainData = data;

        // 子余额
        getCoinFundsInfo({
          tradeCode: this.topSelectArr[this.topTabIndexSm].privates[
            this.topTabIndexCm
          ]
        }).then(data => {
          console.log(data);
          this.privatesData = data;
          this.surface();
        });
      });
    },
    // 买入
    addBuyEntrustment() {
      this.buyAjax.market = this.topSelectArr[this.topTabIndexSm].main[0];
      this.buyAjax.symbol = this.topSelectArr[this.topTabIndexSm].privates[
        this.topTabIndexCm
      ];
      this.buyAjax.type = this.buyConfig.value == 1 ? 1 : 2;
      if (this.buyConfig.value == 1) {
        this.buyAjax.type = 1;
        this.buyAjax.price = this.surfaceData.newPrice;
      }
      this.buyAjax.amount = this.buyAjax.volume * this.buyAjax.price;
      addEntrustment(this.buyAjax).then(data => {
        this.getCoinFundsInfo();
        this.myEntrustments();
      });
    },
    // 卖出
    addSellEntrustment() {
      this.sellAjax.market = this.topSelectArr[this.topTabIndexSm].main[0];
      this.sellAjax.symbol = this.topSelectArr[this.topTabIndexSm].privates[
        this.topTabIndexCm
      ];
      this.sellAjax.type = this.sellConfig.value == 1 ? 1 : 2;
      if (this.sellConfig.value == 1) {
        this.sellAjax.type = 1;
        this.sellAjax.price = this.surfaceData.newPrice;
      }
      this.sellAjax.amount = this.sellAjax.volume * this.sellAjax.price;
      addEntrustment(this.sellAjax).then(data => {
        this.getCoinFundsInfo();
        this.myEntrustments();
      });
    },
    // 获取盘面
    surface() {
      surface({
        transPares: [this.mainName + ":" + this.privatesName]
      }).then(data => {
        this.surfaceData = data[0];
      });
    },
    // 获取最小购买量
    getMinVolume() {
      getMinVolume().then(data => {
        console.log(1111);
        console.log(data);
      });
    },
    // 委托记录
    myEntrustments() {
      myEntrustments({
        market: this.topSelectArr[this.topTabIndexSm].main[0],
        symbol: this.topSelectArr[this.topTabIndexSm].privates[
          this.topTabIndexCm
        ]
      }).then(data => {
        console.log("委托记录：");
        console.log(data);
        this.myEntrustmentsData = data;
      });
    },
    // 加入自选
    addSelfSelected() {
      addSelfSelected({
        transPare: this.privatesName + ":" + this.mainName
      }).then(data => {
        this.selfSelected();
      });
    },
    // 取消自选
    delSelfSelected() {
      delSelfSelected({
        transPare: this.privatesName + ":" + this.mainName
      }).then(data => {
        this.selfSelected();
      });
    },
    // 查询自选列表
    selfSelected() {
      selfSelected().then(data => {
        console.log("自选列表：");
        console.log(data);
        this.selfSelectedData = data;
      });
    },
    // 加入或取消自选
    onLove() {
      // 加入
      if (this.isSelfSelected) {
        this.delSelfSelected();
      } else {
        // 取消
        this.addSelfSelected();
      }
    },
    // 五档数据
    unsettledGear() {
      unsettledGear({
        tradeCode: this.mainName + ":" + this.privatesName,
        gearNum: 5
      }).then(data => {
        console.log("五档数据：");
        console.log(data);
        this.unsettledGearData = data;
        this.unsettledGearData.sell.sort((a, b) => {
          return b.price - a.price;
        });
      });
    }
  },
  created() {
    this.getCurrencysubchail();
    this.getMinVolume();
    this.selfSelected();
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
      display: flex;
      align-items: center;
      span{
        display: block;

        // &:last-child{
        //   font-size: 12px;
        //   color: @color999;
        //   margin-top: 2px;
        // }
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
  padding-bottom: 20px;
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
        font-size: 12px;
      }
      .bmxxs{
        margin: 10px 0;
      }

      .val{
        margin-top: 13px;
        margin-bottom: 5px;
        display: flex;
        justify-content:space-between;
        span{
          color: @color999;
          font-size: 12px;
        }
      }
    }

    .price{
      color: @color999;
      font-size: 12px;
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
      margin-top: 10px;
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
      font-size: 12px;
      padding-top: 6px;
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
    padding-bottom: 10px;
    .top{
      margin-bottom: 0;
    }

    
      .time{
        .lx_mx{

          span.buysell{
            color: #0ec857 !important;
          }
          span.sellbuy{
            color: @activeColor !important;
          }
          span:first-child{
            margin-bottom: 20px;
          }
          &:nth-child(2){
            span{
              &:first-child{
                color:#fff;
              }
              &:nth-child(2){
                color:#0ec857;
              }
            }
          }

          &:last-child{
            text-align: right;
            .btn{
              display: inline-block;
            }
          }
        }
      }
  }
}

.select_box{
  z-index: 9999;
    .list.active {
        background: url("../../../assets/images/formIcons/selectd.png") no-repeat right center;
        background-size: 22px;
    }

    .stb{
      display: flex;
      span{
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #1f2326;
        &.active{
          border-color: @activeColor;
        }
      }
    }
    .sbx{
      max-height: 400px;
      overflow: auto;
      .list{
        height: 45px;
        line-height: 45px;
      }
    }

    &.nobox{
      max-height: none;
      overflow: hidden;
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
