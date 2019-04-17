<template>
  <div class="c2c_component">
    <div class="top_search" v-if="prevActive">
      <div class="left">
        <span :class="{active:active==1}" @click="active=1">充币</span>
        <span :class="{active:active==2}" @click="active=2">提币</span>
      </div>
      <div class="right">
        <div class="select_group" @click.stop="onSelect('allActive')">
          所有状态 <i :class="{'icon-shang':select.allActive}" class="iconfont icon-xia"></i>
        </div>
        <div class="select_group" @click.stop="onSelect('allBiType')">
          所有币种 <i :class="{'icon-shang':select.allBiType}" class="iconfont icon-xia"></i>
        </div>

        <transition name="slide-fade">
          <div class="select_box" v-show="select.allActive">
            <div class="list active">2BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
          </div>
        </transition>
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
              <div class="left">单号 TB15313644185024904132827</div>
            </div>
            <div class="time">
              <div class="lx_mx">
                <span>ETH</span>
                <span>币种</span>
              </div>
              <div class="lx_mx">
                <span>0.12000000</span>
                <span>转账金额</span>
              </div>
              <div class="lx_mx">
                <span>11:00 07/12</span>
                <span>时间</span>
              </div>
            </div>
            <div class="bom">
              <p>状态：失败(资金已返还到币币账户)</p>
              <p>0x07cbe424638bc6d0ac72cb1936e89878dc3ea698</p>
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
        allActive: false,
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