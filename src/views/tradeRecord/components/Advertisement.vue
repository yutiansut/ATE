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
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :class="{refreshActive:isLoading}" class="tradeRecord_refresh_box">
      <div class="refresh_box trade_box">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list" v-for="(item,index) in listArr" :key="index">
            <div class="top">
              <div class="left">记录编号 {{item.advertisingOrderId}}</div>
            </div>
            <div class="time">
              <div class="lx_mx">
                <span>{{item.advertisingTime |dateFilter}}</span>
                <span>发布时间</span>
              </div>
              <div class="lx_mx">
                <span>{{item.priceVal}}</span>
                <span>单价(HKDT)</span>
              </div>
              <div class="lx_mx">
                <span>{{item.hightVal}}</span>
                <span>单笔限额(HKDT)</span>
              </div>
            </div>
            <div class="bom">
              <div class="lx_mx">
                <span>{{item.salesVal}}(剩{{item.remainOrderNumber}})</span>
                <span>数量(NZ)</span>
              </div>
              <div class="lx_mx">
                <span :class="{active:item.orderStatus!=2}">{{item.orderStatus | orderStatusName}}</span>
                <span>当前状态</span>
              </div>
            </div>
            <div class="pay_bom">
              <div class="left img payType">
                <!-- <img src="@/assets/images/icons/yhk.png" alt="">
                <img src="@/assets/images/icons/zfb.png" alt="">
                <img src="@/assets/images/icons/wx.png" alt=""> -->
                <span :class="src" v-for="(src,jindex) in payValue(item.payVal)" :key="jindex"></span>
                <!-- <img :src="src" alt="" v-for="(src,jindex) in payValue(item.payVal)" :key="jindex"> -->
              </div>
              <div class="btn" v-if="item.orderStatus==1"><em @click="cancelOrder(item)">撤单</em></div>
              <div class="btn" v-else>不可操作</div>
            </div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List, Dialog, Toast } from "vant";
import { initCoinProperty, getAdvertisingList, advertisingCancel } from "@/api";
import { setTimeout } from "timers";
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
        return "发布中";
      } else if (type == 2) {
        return "已完成";
      } else if (type == 3) {
        return "已撤销";
      }
    },
    dateFilter(date) {
      let d = new Date(date);
      // 补0
      function b0(val) {
        if (val < 10) {
          return "0" + val;
        } else {
          return val;
        }
      }

      return (
        b0(d.getHours()) +
        ":" +
        b0(d.getMinutes()) +
        " " +
        b0(d.getDate()) +
        "/" +
        b0(d.getMonth())
      );
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
        size: 10,
        showCurrentUsers: 1
      }
    };
  },
  methods: {
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
    //   撤单
    cancelOrder(item) {
      console.log(item);
      Dialog.confirm({
        title: "撤销订单",
        message: "是否确认撤销该订单"
      })
        .then(() => {
          // on confirm
          advertisingCancel({
            advertisingOrderId: item.advertisingOrderId,
            userId: item.userId
          }).then(data => {
            this.onRefresh();
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
      // 异步更新数据
      this.getAdvertisingList();
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
      this.getAdvertisingList();
    },
    // 获取列表数据
    getAdvertisingList() {
      let d = Object.assign({}, this.searchData);
      for (let key in d) {
        if (!d[key]) {
          delete d[key];
        }
      }
      getAdvertisingList(d).then(
        data => {
          this.listArr = this.listArr.concat(data.list);
          this.searchData.page++;
          this.loading = false;
          this.isLoading = false;
          if (data.list.length < this.searchData.size) {
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
    },
    payValue(value) {
      // 计算支付方式
      if (!value) {
        return "";
      }
      let arr = [];
      switch (value) {
        case 1:
          arr = ["yhk"];
          break;
        case 2:
          arr = ["zfb"];
          break;
        case 3:
          arr = ["yhk", "zfb"];
          break;
        case 4:
          arr = ["wx"];
          break;
        case 5:
          arr = ["yhk", "wx"];
          break;
        case 6:
          arr = ["zfb", "wx"];
          break;
        case 7:
          arr = ["yhk", "zfb", "wx"];
          break;
        default:
      }
      return arr;
    }
  },
  created() {
    this.initCoinProperty();
  }
};
</script>
<style lang="less" scoped>
@import url("./less/common");

.payType {
    display: flex;

    span {
        width: 16px;
        height: 16px;

        &.yhk {
            background: url("../../../assets/images/icons/yhk.png") no-repeat;
            background-size: 16px;
        }

        &.zfb {
            background: url("../../../assets/images/icons/zfb.png") no-repeat;
            background-size: 16px;
        }

        &.wx {
            background: url("../../../assets/images/icons/wx.png") no-repeat;
            background-size: 16px;
        }
    }
}


.top_search{
     .left{
          span{
              &:last-child{
                  &.active{
                    background: @activeColor;
                }
              }
          }
     }
}

.left{
    font-size: 16px;
}

.trade_box{
     .list{
          .time{
               .lx_mx{
                   &:nth-child(2){
                       span:first-child{
                           color: @activeColor;
                       }
                   }
               }
          }

          .bom{
            .lx_mx{
              &:last-child{
                span:first-child{
                  color: @color999;

                  &.active{
                    color: @activeColor;
                  }
                }
              }
            }
          }

          .pay_bom{
            margin-top: 20px;
            display: flex;
            .img{
              img{
                width: 16px;
                margin-right: 8px;
              }
            }
            .btn{
              
            }
          }
     }
}
</style>