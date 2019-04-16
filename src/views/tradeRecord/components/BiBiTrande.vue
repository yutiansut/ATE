<template>
  <div class="c2c_component">
    <div class="top_search" v-if="prevActive">
      <div class="left">
        <span :class="{active:active==1}" @click="active=1">当前委托</span>
        <span :class="{active:active==2}" @click="active=2">成交记录</span>
      </div>
      <div class="right">
        <div class="select_group" @click.stop="onSelect('allBiType')">
          所有币种 <i :class="{'icon-shang':select.allBiType}" class="iconfont icon-xia"></i>
        </div>

        <transition name="slide-fade">
          <div class="select_box" v-show="select.allBiType">
            <div class="list active">1BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
          </div>
        </transition>
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :class="{refreshActive:isLoading}" class="tradeRecord_refresh_box">
      <div class="refresh_box trade_box">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list" v-for="(item,index) in 10" :key="index">
            <div class="top">
              <span>ETH/BTC</span>
              <span>买入</span>
              <span class="btn" v-if="active==1"><em @click="cancelOrder(item)">撤单</em></span>
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
            <div class="bom" v-if="active==2">
              <div class="lx_mx">
                <span>1.00000000</span>
                <span>交易总额(BTC)</span>
              </div>
              <div class="lx_mx">
                <span>0.89999639</span>
                <span>交易量(ETH)</span>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { PullRefresh, List, Dialog } from "vant";
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
  data() {
    return {
      isLoading: false,
      active: 1,
      select: {
        allBiType: false
      },
      loading: false,
      finished: false
    };
  },
  methods: {
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
      this.select.allBiType = !this.select.allBiType;
    },
    // 加载更多
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        setTimeout(() => {
          this.finished = true;
        }, 3000);
      }, 500);
    },
    //   刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 11500);
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
@import url("./less/common");
</style>