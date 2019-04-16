<template>
  <div class="quotation">
    <Header></Header>
    <div class="toptab">
      <span :class="{active:active==0}" @click="active=0">BTC</span>
      <span :class="{active:active==1}" @click="active=1">USDT</span>
      <span :class="{active:active==2}" @click="active=2">ETH</span>
      <span :class="{active:active==3}" @click="active=3">自选</span>
    </div>
    <div class="qu_main">

      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :class="{refreshActive:isLoading}" class="quotation_refresh_box">
        <van-tabs v-model="active" swipeable animated>
          <van-tab title="BTC">
            <div class="box">
              <div class="tl">主区</div>
              <div class="tab_box">
                <ul>
                  <li v-for="item in 5" :class="{df:item%2,active:item%2}">
                    <div class="list">
                      <i class="love" @click="onLove(item)"></i>
                      EOS
                    </div>
                    <div class="list">
                      <span>0.{{item}}00000060510</span>
                      <span>0.7354 CNY</span>
                    </div>
                    <div class="list">
                      <span>+{{item}}.93%</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="tl">创新区</div>
              <div class="tab_box">
                <ul>
                  <li v-for="item in 15" :class="{df:item%2}">
                    <div class="list">
                      <i class="love" @click="onLove(item)"></i>
                      EOS
                    </div>
                    <div class="list">
                      <span>0.{{item}}00000060510</span>
                      <span>0.7354 CNY</span>
                    </div>
                    <div class="list">
                      <span>+{{item}}.93%</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </van-tab>
          <van-tab title="USDT">
            内容2
          </van-tab>
          <van-tab title="ETH">
            内容3
          </van-tab>
          <van-tab title="自选">
            内容4
          </van-tab>
        </van-tabs>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, PullRefresh } from "vant";

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      active: 0,
      isLoading: false
    };
  },
  methods: {
    // 收藏
    onLove() {},
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 11500);
    }
  }
};
</script>
<style lang="less" scoped>
.qu_main{
  padding-top: 50px;
}
.toptab{
  span{
    transition:all .3s;
    color: @color999;
    border-bottom: 2px solid @bgColor;
    &.active{
    border-bottom-color:@activeColor;
      color: @activeColor;
    }
  }
}
.toptab{
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  z-index: 999;
  width: 100%;
  height: 50px;
  line-height: 50px;

  display: flex;
  background: #2b2c2f;

  span{
    padding: 0 29px;
  }
}
.box{
  margin-top: 10px;
}
.tl{
  line-height: 40px;
  height: 40px;
  padding: 0 15px;
  background: #212226;
  font-size: 15px;
}
.tab_box {
    background: @bgColor;
    li {
      padding: 0 10.5px;
      display: flex;
      border-bottom: 1Px solid #404040;
      height: 55px;
      &:last-child {
        border-bottom: 0;
      }

      .list {
        flex: 1;

        .love{
          width: 24.5px;
          height: 55px;
          background: url("../../../assets/images/icons/xinga.png") no-repeat left center;
          background-size: 17px;
        }
        &:first-child {
          line-height: 55px;
          display: flex;
          align-items: center;
        }
        
        &:last-child {
          line-height: 55px;
          text-align: right;

          span {
            color: #0fc090;
            font-size: 15px;

          }
        }

        &:nth-child(2) {
          span {
            display: block;
          }
          span:first-child {
            padding: 7px 0;
          }
          span:last-child {
            color: @color999;
            font-size: 12px;
          }
        }
      }
      &.active{
        .list{
          .love {
            background: url("../../../assets/images/icons/xing.png") no-repeat left center;
            background-size: 17px;
          }
        }
      }
      &.df {
        .list {
          &:last-child {
            span {
              color: @activeColor;
            }
          }
        }
      }
    }
  }

  
 
</style>
<style lang="less">
.quotation{
  .van-tabs--line{
    padding-top:0;
  }

  .van-tabs__wrap{
    display: none;
  }
  .quotation_refresh_box{
    height: calc(100vh - 100px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .van-pull-refresh__track{
      height: calc(100vh - 100px);
    }
  }
}
</style>