<template>
  <div class="c2c_component">
    <div class="top_search" v-if="prevActive">
      <div class="left">
        <span :class="{active:searchData.buysell==1}" @click="onMox(1)">充币</span>
        <span :class="{active:searchData.buysell==2}" @click="onMox(2)">提币</span>
      </div>
      <div class="right">
        <div class="select_group" @click.stop="onSelect('allActive')">
          {{searchData.status | statusName}} <i :class="{'icon-shang':select.allActive}" class="iconfont icon-xia"></i>
        </div>
        <div class="select_group" @click.stop="onSelect('allBiType')">
          {{searchData.tradeCode==""?"所有币种":searchData.tradeCode}} <i :class="{'icon-shang':select.allBiType}" class="iconfont icon-xia"></i>
        </div>

        <transition name="slide-fade">
          <div class="select_box" v-show="select.allActive">
            <div class="list" @click="onStatus('')" :class="{active:searchData.status==''}">{{'' | statusName}}</div>
            <div class="list" @click="onStatus(1)" :class="{active:searchData.status==1}">{{1 | statusName}}</div>
            <div class="list" @click="onStatus(2)" :class="{active:searchData.status==2}">{{2 | statusName}}</div>
            <div class="list" @click="onStatus(3)" :class="{active:searchData.status==3}">{{3 | statusName}}</div>
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
          <div class="list" v-for="(item,index) in listArr" :key="index">
            <div class="top">
              <div class="left">单号 {{item.orderNo}}</div>
            </div>
            <div class="time">
              <div class="lx_mx">
                <span>{{item.feeUnit}}</span>
                <span>币种</span>
              </div>
              <div class="lx_mx">
                <span>{{item.amount}}</span>
                <span>转账金额</span>
              </div>
              <div class="lx_mx">
                <span>{{item.createdDate | dateFilter}}</span>
                <span>时间</span>
              </div>
            </div>
            <div class="bom">
              <p>状态：{{item.status | statusName}}({{item.status==1?'提交申请将在24小时内审核':item.status==3?'资金已返还到币币账户':''}})</p>
              <p>{{item.address}}</p>
            </div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List, Dialog, Toast } from "vant";
import { querytransactionlist, drawCoinList, getcurrencybase } from "@/api";
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
    statusName(type) {
      if (type == "") {
        return "所有状态";
      } else if (type == 1) {
        return "审核中";
      } else if (type == 2) {
        return "成功";
      } else if (type == 3) {
        return "失败";
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
      active: 1,
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
        status: "",
        buysell: 1,
        page: 1,
        size: 10
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
    onStatus(type) {
      this.searchData.status = type;
      this.select.allActive = false;
      this.onRefresh();
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
      this.getList();
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
      this.getList();
    },
    // 获取列表数据
    getList() {
      let d = Object.assign({}, this.searchData);
      for (let key in d) {
        if (!d[key]) {
          delete d[key];
        }
      }
      // 充币
      if (this.searchData.buysell == 1) {
        querytransactionlist(d).then(
          data => {
            console.log(data);
            this.afterGetList(data);
          },
          err => {
            Toast.clear();
          }
        );
      } else {
        drawCoinList(d).then(
          data => {
            this.afterGetList(data);
          },
          err => {
            Toast.clear();
          }
        );
      }
    },
    // 获取列表数据完成后
    afterGetList(data) {
      this.listArr = this.listArr.concat(data.drawList);
      this.searchData.page++;
      this.loading = false;
      this.isLoading = false;
      if (data.drawList.length < this.searchData.size) {
        this.finished = true;
      }
      Toast.clear();
    },
    // 获取类型
    getcurrencybase() {
      getcurrencybase({ isVaild: 1 }).then(data => {
        this.typeArr = data;
      });
    }
  },
  created() {
    this.getcurrencybase();
  }
};
</script>
<style lang="less" scoped>
@import url("./less/common");
.left{
    font-size: 16px;
}

.trade_box{
     .list{
         .bom{
             flex-wrap: wrap;
             p{
                 width: 100%;

                 &:last-child{
                     color: @color999;
                     margin-top: 10px;
                 }
             }

         }
     }
}
</style>