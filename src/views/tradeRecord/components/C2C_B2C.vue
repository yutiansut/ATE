<template>
  <div class="c2c_component">
    <div class="top_search" v-if="prevActive">
      <div class="left">
        <span :class="{active:searchData.buysell==1}" @click="onMox(1)">买入</span>
        <span :class="{active:searchData.buysell==2}" @click="onMox(2)">卖出</span>
      </div>
      <div class="right">
        <div class="select_group" @click.stop="onSelect('allActive')">
          {{searchData.orderStatus | orderStatusName}} <i :class="{'icon-shang':select.allActive}" class="iconfont icon-xia"></i>
        </div>
        <div class="select_group" @click.stop="onSelect('allBiType')">
          {{searchData.tradeCode==""?"所有币种":searchData.tradeCode}} <i :class="{'icon-shang':select.allBiType}" class="iconfont icon-xia"></i>
        </div>

        <transition name="slide-fade">
          <div class="select_box" v-show="select.allActive">
            <div class="list" @click="onorderStatus('')" :class="{active:searchData.orderStatus==''}">{{'' | orderStatusName}}</div>
            <div class="list" @click="onorderStatus(1)" :class="{active:searchData.orderStatus==1}">{{1 | orderStatusName}}</div>
            <div class="list" @click="onorderStatus(2)" :class="{active:searchData.orderStatus==2}">{{2 | orderStatusName}}</div>
            <div class="list" @click="onorderStatus(3)" :class="{active:searchData.orderStatus==3}">{{3 | orderStatusName}}</div>
            <div class="list" @click="onorderStatus(6)" :class="{active:searchData.orderStatus==6}">{{6 | orderStatusName}}</div>
          </div>
        </transition>
        <transition name="slide-fade">
          <div class="select_box" v-show="select.allBiType">
            <div class="list" :class="{active:searchData.tradeCode==''}" @click="onTradeCode('')">所有币种</div>
            <div class="list" :class="{active:searchData.tradeCode==item.tradeCode}" @click="onTradeCode(item.tradeCode)" v-for="(item,index) in typeArr" :key="index">{{item.tradeCode}}</div>
          </div>
        </transition>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="tradeRecord_refresh_box">
      <div class="refresh_box trade_box">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list" v-for="(item,index) in listArr" :key="index" @click="goDetails(item)">
            <div class="top">
              <div class="right" :class="{cancel:item.orderStatus==2}">{{item.orderStatus | orderStatusName}}</div>
            </div>
            <div class="time">
              <div class="lx_mx">
                <span>{{item.priceVal}}</span>
                <span>单价(HKDT)</span>
              </div>
              <div class="lx_mx">
                <span>{{item.tradeQuantity}}</span>
                <span>数量(BTC)</span>
              </div>
              <div class="lx_mx">
                <span>{{item.tradeAmount}}</span>
                <span>交易总价(HKDT)</span>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List, Toast } from "vant";
import { getFiatDealTradeOrderList, initCoinProperty } from "@/api";
import { setTimeout } from "timers";
import { Stream } from "stream";
export default {
  props: {
    prevActive: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List
  },
  filters: {
    orderStatusName(type) {
      if (type == "") {
        return "所有状态";
      } else if (type == 1) {
        return "未付款";
      } else if (type == 2) {
        return "未发货";
      } else if (type == 3) {
        return "已完成";
      } else if (type == 6) {
        return "已取消";
      }
    }
  },
  data() {
    return {
      isLoading: false,
      select: {
        allActive: false,
        allBiType: false
      },
      loading: false,
      finished: false,
      typeArr: [],
      listArr: [],
      searchData: {
        tradeCode: "",
        orderStatus: "",
        buysell: 1,
        page: 1,
        size: 10
      }
    };
  },
  methods: {
    // 去详情
    goDetails() {
      this.$router.push("/transaction");
    },
    // 买入卖出切换
    onMox(type) {
      if (type == this.searchData.buysell) return;
      this.searchData.buysell = type;
      this.onRefresh();
    },
    // 选择币种
    onTradeCode(code) {
      this.searchData.tradeCode = code;
      this.select.allBiType = false;
      this.onRefresh();
    },
    // 选择状态
    onorderStatus(type) {
      this.searchData.orderStatus = type;
      this.select.allActive = false;
      this.onRefresh();
    },
    //   关闭所有select
    closeSelect() {
      for (let key in this.select) {
        this.select[key] = false;
      }
    },
    //   选择select
    onSelect(key) {
      if ("allActive" == key) {
        this.select.allActive = !this.select.allActive;
        this.select.allBiType = false;
      } else {
        this.select.allBiType = !this.select.allBiType;
        this.select.allActive = false;
      }
    },
    // 加载更多
    onLoad() {
      this.getFiatDealTradeOrderList();
    },
    //   刷新
    onRefresh() {
      this.listArr = [];
      this.searchData.page = 1;
      Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 10000
      });
      this.getFiatDealTradeOrderList();
    },
    // 获取列表数据
    getFiatDealTradeOrderList() {
      let d = Object.assign({}, this.searchData);
      for (let key in d) {
        if (!d[key]) {
          delete d[key];
        }
      }
      getFiatDealTradeOrderList(d).then(
        data => {
          this.loading = false;
          this.listArr = this.listArr.concat(data.listreslt);
          this.searchData.page++;
          this.isLoading = false;
          if (data.listreslt.length < this.searchData.size) {
            this.finished = true;
          }
          Toast.clear();
        },
        err => {
          Toast.clear();
        }
      );
    },
    // 获取类型
    initCoinProperty() {
      initCoinProperty({ isVaild: 1 }).then(data => {
        this.typeArr = data;
      });
    }
  },
  created() {
    this.initCoinProperty();
  }
};
</script>
<style lang="less" scoped>
@import url("./less/common");

.trade_box{
    .list{
        .top{
            .right{
                text-align: right;
                color: @color999;

                &.cancel{
                    color: @activeColor;
                }
            }
        }

        .time{
             .lx_mx{
                 &:first-child{
                     span:first-child{
                         color: #0ec857;
                     }
                 }
                 &:nth-child(2){
                     span:first-child{
                         color: @color;
                     }
                 }
             }
        }
    }
}
</style>

