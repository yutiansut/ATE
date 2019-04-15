<template>
  <div>
    <Header>
      <div class="right" slot="left" @click="$router.push('/setting')">发布广告</div>
    </Header>

    <div class="fix_top">

      <div class="tl">
        <div class="select" @click.stop="onSelectd('topType')">
          BTC/HKDT <i :class="{'icon-shang':select.topType}" class="iconfont icon-xia"></i>

          <transition name="slide-fade">
            <div class="select_box" v-show="select.topType">
              <div class="list active">BTC/HKDT</div>
              <div class="list">BTC/HKDT</div>
              <div class="list">BTC/HKDT</div>
              <div class="list">BTC/HKDT</div>
            </div>
          </transition>
        </div>
        <div class="right">27200.1774 HKDT</div>
      </div>

      <div class="center">
        <div class="left">
          <span :class="{active:active==0}" @click="active=0">买入</span>
          <span :class="{active:active==1}" @click="active=1">卖出</span>
        </div>
        <div class="right">交易记录 <i class="iconfont icon-right"></i></div>
      </div>

      <div class="select_group">
        <div class="select" @click="onSelectd('allBuyerType')">所有买家 <i :class="{'icon-shang':select.allBuyerType}" class="iconfont icon-xia"></i></div>
        <div class="select" @click="onSelectd('payType')">所有支付方式 <i :class="{'icon-shang':select.payType}" class="iconfont icon-xia"></i></div>
        <div class="select" @click="onSelectd('eduType')">所有交易额度 <i :class="{'icon-shang':select.eduType}" class="iconfont icon-xia"></i></div>

        <transition name="slide-fade">
          <div class="select_box" v-show="select.allBuyerType">
            <div class="list active">1BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
          </div>
        </transition>

        <transition name="slide-fade">
          <div class="select_box" v-show="select.payType">
            <div class="list active">2BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
          </div>
        </transition>

        <transition name="slide-fade">
          <div class="select_box" v-show="select.eduType">
            <div class="list active">3BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
            <div class="list">BTC/HKDT</div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 列表 -->

    <div class="main van-doc-demo-section demo-pull-refresh" :class="{refreshActive:isLoading}">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="box">
          <van-tabs v-model="active" animated swipeable>
            <van-tab title="买入">
              <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

                <div class="list" v-for="item in 11" :key="item">

                  <div class="top">
                    <div class="left">
                      <div class="tel">1350***6666</div>
                      <div class="pay_type img">
                        <img src="@/assets/images/icons/yhk.png" alt="">
                        <img src="@/assets/images/icons/zfb.png" alt="">
                        <img src="@/assets/images/icons/wx.png" alt="">
                      </div>
                    </div>
                    <div @click="onBuy(item)" class="btn_x">买入</div>
                  </div>

                  <div class="bom_group">
                    <div class="bom_list">
                      <span>9.00000</span>
                      <span>单价(HKDT)</span>
                    </div>
                    <div class="bom_list">
                      <span>91.0001111100</span>
                      <span>数量(BTC)</span>
                    </div>
                    <div class="bom_list">
                      <span>99~200</span>
                      <span>单笔限额(HKDT)</span>
                    </div>
                  </div>
                </div>
              </van-list>
            </van-tab>

            <van-tab title="卖出" class="sell">
              <van-list v-model="loadingSell" :finished="finishedSell" finished-text="没有更多了" @load="onLoadSell">

                <div class="list" v-for="item in 11" :key="item">

                  <div class="top">
                    <div class="left">
                      <div class="tel">1350***6666</div>
                      <div class="pay_type img">
                        <img src="@/assets/images/icons/yhk.png" alt="">
                        <img src="@/assets/images/icons/zfb.png" alt="">
                        <img src="@/assets/images/icons/wx.png" alt="">
                      </div>
                    </div>
                    <div @click="onSell(item)" class="btn_x">卖出</div>
                  </div>

                  <div class="bom_group">
                    <div class="bom_list">
                      <span>9.00000</span>
                      <span>单价(HKDT)</span>
                    </div>
                    <div class="bom_list">
                      <span>91.0001111100</span>
                      <span>数量(BTC)</span>
                    </div>
                    <div class="bom_list">
                      <span>99~200</span>
                      <span>单笔限额(HKDT)</span>
                    </div>
                  </div>
                </div>
              </van-list>
            </van-tab>
          </van-tabs>

        </div>
      </van-pull-refresh>
    </div>

    <!-- 买入弹窗 -->
    <div class="mask" v-show="buyAlertShow" @click="buyAlertShow=false"></div>
    <transition name="slide-fade">
      <div class="alert buy_alert" v-show="buyAlertShow" ref="buyAlert" :style="{marginTop:-(buyAlertTop/2)+'px'}">
        <div class="alert_tl">买入BTC <i @click="buyAlertShow=false" class="iconfont icon-guanbi"></i></div>
        <div class="box">
          <div class="list">
            <span>1350***6666</span>
            <span>(仅支持HKDT支付)</span>
          </div>
          <div class="list">
            <span>6.40</span>
            <span>99.97~320.00</span>
          </div>
          <div class="list">
            <span>单价(HKDT)</span>
            <span>单笔限额(HKDT)</span>
          </div>
          <div class="list">
            <span>支付宝</span>
          </div>

          <div class="input_group">
            <input type="text" placeholder="请输入">
            <div class="right">HKDT</div>
          </div>
          <div class="input_group">
            <input type="text" placeholder="请输入">
            <div class="right">BTC</div>
          </div>

          <div class="alert_tips">从点击“下单”开始，该订单时限为20分钟</div>

          <div class="alert_submit">下单</div>
        </div>
      </div>
    </transition>

    <!-- 卖出弹窗 -->
    <div class="mask" v-show="sellAlertShow" @click="sellAlertShow=false"></div>
    <transition name="slide-fade">
      <div class="alert sell_alert" v-show="sellAlertShow" ref="sellAlert" :style="{marginTop:-(sellAlertTop/2)+'px'}">
        <div class="alert_tl">卖出BTC <i @click="sellAlertShow=false" class="iconfont icon-guanbi"></i></div>
        <div class="box">
          <div class="list">
            <span>1350***6666</span>
            <span>(仅支持HKDT支付)</span>
          </div>
          <div class="list">
            <span>6.40</span>
            <span>99.97~320.00</span>
          </div>
          <div class="list">
            <span>单价(HKDT)</span>
            <span>单笔限额(HKDT)</span>
          </div>
          <div class="list">
            <span>支付宝</span>
          </div>

          <div class="input_group">
            <input type="text" placeholder="请输入">
            <div class="right">HKDT</div>
          </div>
          <div class="input_group">
            <input type="text" placeholder="请输入">
            <div class="right">BTC</div>
          </div>

          <div class="alert_tips">从点击“下单”开始，该订单时限为20分钟</div>

          <div class="alert_submit">下单</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { PullRefresh, Tab, Tabs, List } from "vant";
import { setTimeout } from "timers";

export default {
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      active: 0,
      isLoading: false,

      // 买入加载
      loading: false,
      finished: false,
      // 卖出加载
      loadingSell: false,
      finishedSell: false,
      // 买入弹窗
      buyAlertTop: 0,
      buyAlertShow: false,
      // 卖出弹窗
      sellAlertTop: 0,
      sellAlertShow: false,
      // 选择select
      select: {
        topType: false,
        allBuyerType: false,
        payType: false,
        eduType: false
      }
    };
  },
  methods: {
    // 加载买入数据
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          // this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
        setTimeout(() => {
          this.finished = true;
        }, 2000);
      }, 500);
    },
    // 加载卖出数据
    onLoadSell() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          // this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
        setTimeout(() => {
          this.finished = true;
        }, 2000);
      }, 500);
    },
    // 买入
    onBuy() {
      this.buyAlertShow = true;
      this.$nextTick(() => {
        if (!this.buyAlertTop) {
          this.buyAlertTop = this.$refs.buyAlert.offsetHeight;
        }
      });
    },
    // 卖出
    onSell() {
      this.sellAlertShow = true;
      this.$nextTick(() => {
        if (!this.sellAlertTop) {
          this.sellAlertTop = this.$refs.sellAlert.offsetHeight;
        }
      });
    },
    // 显示select
    onSelectd(key) {
      for (let inKey in this.select) {
        if (inKey != key && this.select[inKey]) {
          this.select[inKey] = false;
        }
      }
      this.select[key] = !this.select[key];
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 11500);
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.alert{
  position: fixed;
  top: 0;
  z-index: 11000;
  width: 84%;
  top: 50%;
  left: 8%;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;

  .alert_tl{
    color: #333;
    background: #f3efef;
    font-size: 16px;
    position: relative;
    height: 47px;
    line-height: 47px;
    text-align: center;


    .iconfont{
      position: absolute;
      padding-right: 20px;
      font-size: 16px;
      right: 0;
      color: #adadad;
    }
  }

  .box{
    padding: 0 15px;
    box-sizing: border-box;
    padding-top: 23px;
  }

  span{
    color: #333;
  }
  input{
    color: #333;
  }
  .list{
    display: flex;
    justify-content:space-between;
    margin-bottom: 10px;
    &:nth-child(1){
      margin-bottom: 19px;
    }

    &:nth-child(2){
      span:first-child{
        color: #0fc055;
      }
    }

    &:nth-child(3),
    &:nth-child(4){
      span{
        color: @color999;
      }
    }
    
  }

  .input_group{
    position: relative;
    margin-bottom: 10px;

    input{
      padding-right: 50px;
      border-color: #0fc055;
      border-width: 2Px;
    }
    .right{
      line-height: 0.9333rem;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  
  div{
    color: #333;
  }
  
  .alert_tips{
    margin-top: 15px;
    color: @color999;
  }

  .alert_submit{
    width: 187.5px;
    margin: 0 auto;
    border-radius: 18.8px;
    overflow: hidden;
    background: #0ec857;
    height: 37.5px;
    line-height: 37.5px;
    text-align: center;
    color: #fff;
    margin-top: 31.5px;
    margin-bottom: 37.5px;
    &:active{
      background: #19b858;
    }
  }
}


  .sell_alert{
    .list{
      &:nth-child(2){
        span:first-child{
          color: @activeColor;
        }
      }
    }

    .alert_submit{
      background: @activeColor;

      &:active{
        background:#dc2424;
      }
    }
  }


.main{
  position: relative;
  min-height: 100%;
  padding-top: 135px;
  box-sizing: border-box;
  .list{
    margin-top: 5px;
    padding: 15px 12.5px;
    background: @bgColor;
    box-sizing: border-box;

    .top{
      justify-content:space-between;
      display: flex;
    }
    .tel{
      background: url("../../../assets/images/icons/vip.png") no-repeat right center;
      background-size: 15.5px;
      padding-right: 16px;
    }

    .pay_type{
      margin-top: 19.5px;
      img{
        width:16px;
        margin-right: 7.5px;
      }
    }

    .btn_x{
      width: 90px;
      height: 37.5px;
      line-height: 37.5px;
      background: #0fc055;
      border-radius: 18.8px;
      text-align: center;

      &:active{
        background: #19b858;
      }
    }

    .bom_group{
      margin-top: 22px;
      display: flex;

      .bom_list{
        flex: 1;
        &:first-child{
          span:first-child{
            color: #0ec857;
          }
        }

        span{
          display: block;
        }
        span:last-child{
          color: @color999;
          margin-top: 10px;
          font-size: 12px;
        }

        &:last-child{
          span{
            text-align: right;
          }
        }
      }
    }
  }


  .sell{
    .btn_x{
      background: @activeColor;

      &:active{
        background: #dc2424;
      }
    }
    .bom_group{
      margin-top: 22px;
      display: flex;

      .bom_list{
        flex: 1;
        &:first-child{
          span:first-child{
            color: @activeColor;
          }
        }
      }
     }
  }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
.select_box{
  position: absolute;
  z-index: 999;
  width: 100%;
  top: 45px;
  left: 0;
  z-index: 999;
  background: #1f2326;
  padding: 0 13px;
  box-sizing: border-box;
  .list{
    box-sizing: border-box;
    padding-left: 20px;
    border-bottom: 1Px solid @bdColor;

    &:last-child{
      border-bottom: 0;
    }
    &.active{
      background: url("../../../assets/images/formIcons/selectd.png") no-repeat right center;
      background-size: 22px;
    }
  }
}

.fix_top{
  position: fixed;
  z-index: 9999;
  top: 50px;
  width: 100%;

  
  .common{
      height: 45px;
      line-height: 45px;
      padding: 0 13px;
  }
  
  .tl{
    display: flex;
    justify-content:space-between;
    background: @bgColor;
    position: relative;
    .common;
  }

  .iconfont{
    color: @color999;
  }

  .center{
    display: flex;
    justify-content: space-between;
    background: #212226;
    .common;

    .left{
      display: flex;
      span{
        width: 93px;
        text-align: center;
        border-bottom: 2px solid #212226;
        transition: all .3s;

        &.active{
          color: #0ec857;
          border-color: #0ec857;
        }
      }
    }

    .right{
      padding-left: 10px;

      &:active{
        background: @bgColor;
      }
      .iconfont{
        font-size: 16px;
        position: relative;
        top: 1px;
      }
    }
  }

  .select_group{
    display: flex;
    background: @bgColor;
    position: relative;
    .common;
    .select{
      flex: 1;
      color: @color999;
    }
  }
}

</style>
<style lang="less">

.main .van-tabs--line{
  padding-top:0;
}
.main .van-tabs__wrap{
  display: none;
}


.main{
  .van-pull-refresh{
    height: calc(100vh - 235px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .van-pull-refresh__track{
    height: calc(100vh - 235px);
  }
}
</style>