<template>
  <div>
    <Header>
      <div class="left icons" slot="left" @click="$router.push('/user')"><img src="@/assets/images/icons/geren.png" alt=""></div>
      <div class="right icons" slot="left"><img src="@/assets/images/icons/shezhi.png" alt=""></div>
    </Header>
    <van-swipe :autoplay="3000" indicator-color="white" class="banner">
      <van-swipe-item class="img"><img src="@/assets/images/banner.jpg" alt=""></van-swipe-item>
      <van-swipe-item class="img"><img src="@/assets/images/banner.jpg" alt=""></van-swipe-item>
      <van-swipe-item class="img"><img src="@/assets/images/banner.jpg" alt=""></van-swipe-item>
    </van-swipe>

    <div class="tl martop">
      推荐涨幅
    </div>

    <div class="news martop">
      <div class="left">习近平总书记连任7届总书记</div>
      <div class="more"><span>更多</span></div>
    </div>

    <div class="tab_xm martop">
      <div class="menu">
        <div @click="type=1" :class="{active:type==1}"><span>涨幅榜</span></div>
        <div @click="type=2" :class="{active:type==2}"><span>新币榜</span></div>
      </div>
      <div class="tab_box">
        <ul>
          <li v-for="item in 10" :class="{df:item%2}">
            <div class="list">
              BTC/UTHD
            </div>
            <div class="list">
              <span>0.{{item}}0060510</span>
              <span>0.7354 CNY</span>
            </div>
            <div class="list">
              <span>+{{item}}.93%</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      type: 1
    };
  }
};
</script>
<style lang="less" scoped>
.icons {
  display: flex;
  align-items: center;
  img {
    width: 19px;
  }
}
.banner {
  img {
    width: 100%;
  }
}
.tl {
  height: 50px;
  line-height: 50px;
  background: #222324;
  padding: 0 15px;
  color: @color999;
}
.news {
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  background: @bgColor;

  .left {
    float: left;
    height: 50px;
    line-height: 50px;
  }
  .more {
    float: right;
    height: 50px;
    line-height: 50px;
    span {
      color: @color999;
      height: 50px;
      line-height: 50px;
      border-left: 1Px solid @bdColor;
      padding-left: 20px;
    }
  }
}

.tab_xm {
  background: @bgColor;
  .menu {
    display: flex;
    height: 50px;
    line-height: 50px;
    border-bottom: 1Px solid @dbBgColor;
    div {
      text-align: center;
      flex: 1;
      span {
        color: @color999;
        font-size: 15px;
        height: 50px;
        line-height: 50px;
        display: inline-block;
        position: relative;
      }

      &.active {
        span {
          color: @activeColor;
          &:after {
            content: "";
            position: absolute;
            width: 80%;
            left: 10%;
            height: 2px;
            background: @activeColor;
            bottom: 0;
          }
        }
      }
    }
  }

  .tab_box {
    padding: 0 10.5px;
    li {
      display: flex;
      border-bottom: 1Px solid #404040;
      height: 55px;
      &:last-child {
        border-bottom: 0;
      }

      .list {
        flex: 1;

        &:first-child {
          line-height: 55px;
        }
        &:last-child {
          line-height: 55px;
          text-align: right;

          span {
            color: #0fc090;
            font-size: 15px;

            background: url("../../../assets/images/icons/zf.png") no-repeat
              right center;
            background-size: 9px;
            padding-right: 14px;
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

      &.df {
        .list {
          &:last-child {
            span {
              color: @activeColor;

              background: url("../../../assets/images/icons/df.png") no-repeat
                right center;
              background-size: 9px;
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.van-swipe__indicators i {
  padding: 0 5px;
  height: 2px;
  border-radius: 0;
}
</style>
