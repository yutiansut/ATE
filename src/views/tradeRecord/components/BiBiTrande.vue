<template>
  <div class="c2c_component">
    <Header back v-if="isHistoricalRecord"></Header>
    <div class="top_search" v-if="prevActive">
      <div class="left">
        <span :class="{active:active==1}" @click="onMox(1)">当前委托</span>
        <span :class="{active:active==2}" @click="onMox(2)">成交记录</span>
      </div>
      <div class="right">
        <div class="select_group" @click.stop="onSelect('allBiType')">
          {{typeActive==""?"所有币种":typeActive}} <i :class="{'icon-shang':select.allBiType}" class="iconfont icon-xia"></i>
        </div>

        <transition name="slide-fade">
          <div class="select_box" v-show="select.allBiType">
            <div class="list" @click="onTypeActive('')" :class="{active:typeActive==''}">所有币种</div>
            <div class="list" @click="onTypeActive(item.tradeCode)" :class="{active:typeActive==item.tradeCode}" v-for="(item,index) in typeArr" :key="index">{{item.tradeCode}}</div>
          </div>
        </transition>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="tradeRecord_refresh_box" :style="{'padding-top':isHistoricalRecord?50+'px':0}">
      <div class="refresh_box trade_box">
        <div class="list" v-for="(item,index) in listArr" :key="index">
          <!-- <div class="top">
            <span>{{item.symbol}}/{{item.market}}</span>
            <span>{{item.buysell==1?'买入':'卖出'}}</span>
            <span class="btn" v-if="active==1"><em @click="cancelOrder(item)">撤单</em></span>
          </div> -->
          <div class="time">
            <div class="lx_mx">
              <span class="charu">{{item.symbol}}/{{item.market}}</span>
              <span>{{item.createDate}}</span>
              <span>时间</span>
            </div>
            <div class="lx_mx">
              <span class="charu">{{item.buysell==1?'买入':'卖出'}}</span>
              <span class="colorxm">{{item.price}}</span>
              <span>委托价(BTC)</span>
            </div>
            <div class="lx_mx text-right">
              <span class="charu cedanx btn" v-if="active==1"><em @click="cancelOrder(item)">撤单</em></span>
              <span>{{item.volume}}</span>
              <span>委托量(ETH)</span>
            </div>
          </div>
          <div class="bom" v-if="active==2">
            <div class="lx_mx">
              <span>{{item.amount}}</span>
              <span>交易总额(BTC)</span>
            </div>
            <div class="lx_mx">
              <span>{{item.volume}}</span>
              <span>交易量(ETH)</span>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, Dialog, Toast } from "vant";
import {
  myEntrustments,
  historyEntrustments,
  getcurrencybase,
  updateEntrustment
} from "@/api";
import { setTimeout } from "timers";
export default {
  props: {
    prevActive: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [PullRefresh.name]: PullRefresh
  },
  computed: {
    isHistoricalRecord() {
      return this.$route.path == "/historicalRecord";
    }
  },
  data() {
    return {
      isLoading: false,
      active: 1,
      select: {
        allBiType: false
      },
      loading: false,
      finished: false,
      typeArr: [],
      typeActive: "",
      listArr: []
    };
  },
  methods: {
    // 委托和成交记录的切换
    onMox(type) {
      if (type == this.active) return;
      this.active = type;
      this.onRefresh();
    },
    // 选择币种
    onTypeActive(code) {
      this.typeActive = code;
      this.select.allBiType = false;
      this.onRefresh();
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
    //   关闭所有select
    closeSelect() {
      for (let key in this.select) {
        this.select[key] = false;
      }
    },
    //   选择select
    onSelect(key) {
      this.select.allBiType = !this.select.allBiType;
    },
    //   刷新
    onRefresh() {
      this.listArr = [];
      if (this.active == 1) {
        this.myEntrustments();
      } else {
        this.historyEntrustments();
      }
    },
    // 成交记录
    historyEntrustments() {
      Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 10000
      });
      historyEntrustments({}).then(
        data => {
          console.log("成交记录：");
          console.log(data);
          this.listArr = data;
          this.isLoading = false;
          Toast.clear();
        },
        err => {
          Toast.clear();
        }
      );
    },
    // 委托记录
    myEntrustments() {
      Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 10000
      });
      myEntrustments({ symbol: this.typeActive }).then(
        data => {
          console.log("委托记录：");
          console.log(data);
          this.listArr = data;
          this.isLoading = false;
          Toast.clear();
        },
        err => {
          Toast.clear();
        }
      );
    },
    // 获取币种
    getcurrencybase() {
      getcurrencybase().then(data => {
        this.typeArr = data;
      });
    }
  },
  created() {
    this.active = this.$route.path == "/historicalRecord" ? 2 : 1;
    this.onRefresh();
    // 获取币种
    this.getcurrencybase();
  }
};
</script>
<style lang="less" scoped>
@import url("./less/common");
.charu{
  margin-bottom: 20px !important;
}
.colorxm{
  color: #0ec857;
}

.cedanx{
  display: inline-block !important;
}
.text-right{
  text-align: right;
}
.trade_box{
  .list{
    padding-bottom: 15px;
  }
}

.bom{
  .lx_mx:last-child{
    span{
      text-align: right;
    }
  }
}
</style>