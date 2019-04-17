<template>
    <div class="rel">
        <Header back></Header>
        <div class="top">
            <div class="left">客户支持</div>
            <div class="right">新增留言</div>
        </div>
        <div class="top_menu">
            <span :class="{active:active==0}" @click="active=0">未解决</span>
            <span :class="{active:active==1}" @click="active=1">已解决</span>
        </div>

        <div class="ly_main">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :class="{refreshActive:isLoading}">
                <van-tabs v-model="active" animated swipeable>
                    <van-tab title="未解决">
                        <van-list v-model="noLoading" :finished="noFinished" finished-text="没有更多了" @load="onNoLoad">
                            <div class="list_ly" v-for="(item,index) in 10" :key="index" @click="$router.push('/user/msgDetails')">
                                <div class="date">
                                    <div class="let">时间：10:56 03/30</div>
                                    <div class="right">已解决</div>
                                </div>
                                <p>留言反馈内容</p>
                                <p>请问如何退款，以及退款多久才会到账？</p>
                            </div>
                        </van-list>
                    </van-tab>
                    <van-tab title="已解决">
                        <van-list v-model="yesLoading" :finished="yesFinished" finished-text="没有更多了" @load="onYesLoad">
                        </van-list>
                    </van-tab>
                </van-tabs>
            </van-pull-refresh>
        </div>
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
      isLoading: false,
      noLoading: false,
      yesLoading: false,
      noFinished: false,
      yesFinished: false,
      active: 0
    };
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 11500);
    },
    onNoLoad() {},
    onYesLoad() {}
  }
};
</script>
<style lang="less" scoped>
.rel{
    padding-top: 159px;
    background: #e5e5e5 !important;
}

.top{
    position: fixed;
    top: 50px;
    background: #fff;
    width: 100%;
    height: 54px;
    line-height: 54px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding: 0 13px;
    box-sizing: border-box;

    .left{
        background: url("../../assets/images/ly.png") no-repeat 0 center;
        background-size: 30px;
        padding-left: 41px;
    }

    div{
        color: @color999;
        padding: 0 13px;
        font-size: 15px;
    }

    .right{
        border: solid 1px #ff3535;
        color: #f73535;
        font-size: 14px;
        width: 80px;
        height: 26px;
        line-height: 26px;
        border-radius: 13px;
        text-align: center;
    }
}

.top_menu{
    position: fixed;
    top: 110px;
    width: 100%;
    background: #f6f6f6;
    left: 0;
    height: 49px;
    line-height: 49px;
    display: flex;
    span{
        text-align: center;
        color: #333;
        text-align: center;
        flex: 1;
        
        &.active{
            background:#fff;
            box-shadow: inset 0px 1px 0px 0px #ff3535;
            color: @color999;
        }
    }

}
.ly_main{
    .list_ly{
        padding: 0 13px;
        box-sizing: border-box;
        background: #fff;
        margin-bottom: 7.5px;
        padding-bottom: 15px;
        div,p{
            color: #333;
            font-size: 15px;
        }

        .date{
            display: flex;
            justify-content:space-between;
            padding: 20px 0 15px;

            .left{
                color: @color999;
            }
            .right{
                color: #17c25b;
            }
        }
        p{
            font-size: 14px;
            color:@color999;
        }
        p:last-child{
            margin-top: 15px;
            color: #333;
            font-size: 15px;
        }
    }
}
</style>
<style lang="less">


.ly_main{
    .van-tabs__wrap.van-hairline--top-bottom{
        display: none;
    }
    .van-tabs{
        padding-top:0;
        
    }
    .van-pull-refresh{
        height: calc(100vh - 159px);
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    .van-pull-refresh__track{
        height: calc(100vh - 159px);
    }
}
</style>
