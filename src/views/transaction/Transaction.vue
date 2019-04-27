<template>
    <div class="rel">
        <Header back></Header>
        <div class="top">交易状态：已付款</div>
        <div class="top_rel">
            <div class="top_rel_box">
                <p>待收款10000.00BTC(待确定收款后)</p>
            </div>
        </div>
        <div class="list_box">
            <div class="list">交易号：1553666851382464896</div>
            <div class="list">交易内容： 1391***5678向购买10000.0BTC</div>
            <div class="list">交易总价： 65500.0CNY</div>
            <div class="list">交易单价： 6.55CNY/BTC</div>
        </div>
        <div class="list_box sellname">
            <div class="list">卖家名称： 唐敏敏</div>
            <div class="list fkm" @click="tips=!tips">付款标识码 <span class="right">812103 <i :class="{'icon-shang':tips}" class="iconfont icon-xia"></i></span></div>
        </div>

        <transition name="slide-fade">
            <div class="tips" v-show="tips">
                <p class="active">1、为了保障您在平台的交易权益，请在支付备注/附言中好付款标识码。</p>
                <p>2、您的汇款将直接进入卖方账户，交易过程中卖方出售的数字资产由平台托管保护。</p>
                <p>3、请在规定时间内完成付款，并务必点击“我已付款”，卖方确认收款后，系统会将数字资产划转您的账户。</p>
                <p>4、如果买方当日取消交易达3次，将会限制当日的买入功能</p>

                <div class="down" @click="tips=false">收起 <i class="iconfont icon-shang"></i></div>
            </div>
        </transition>

        <div class="payinfo">
            <div class="yhk">
                <div class="type">
                    <img src="@/assets/images/icons/yhk.png" alt="">
                    银行卡
                </div>
                <p>李晓明</p>
                <p>建设银行</p>
                <p>902350850293492</p>
                <p>广东省深圳市南山区支行</p>
            </div>
        </div>

        <div class="fixbom">
            <div class="left">请耐心等待卖家放币...</div>
            <div class="btns">
                <div class="btn" @click="cancelShow=true">取消交易</div>
                <div class="btn" @click="goAppeal">发起申诉</div>
            </div>
        </div>

        <div class="mask" v-show="cancelShow"></div>
        <transition name="slide-fade">
            <div class="alert" v-show="cancelShow">
                <div class="alert_tl">取消交易 <i @click="cancelShow=false" class="iconfont icon-guanbi"></i></div>
                <div class="box">
                    <p class="active">如果您已付款给买家，请务必不能取消交易</p>
                    <p>取消交易说明：</p>
                    <p>所有用户当天(24小时内)累计取消3笔交易，当天的买入功能将会被关闭</p>
                </div>
                <div class="btns">
                    <div @click="onCancelShow" class="btn">确认取消</div>
                    <div class="btn active" @click="cancelShow=false">我再想想</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      tips: false,
      cancelShow: false
    };
  },
  methods: {
    //   去申诉
    goAppeal() {
      this.$router.push("/appeal");
    },
    //   取消
    onCancelShow() {}
  },
  created() {
    //   该页面需要判断进来时的状态与买与卖
    Dialog.alert({
      title: "交易提醒",
      message:
        "如买家在24小时内未完成付款操作视为放弃该订单，系统会自动取消订单且会自动将您被冻结的0.213123123BTC解冻并发放回您的账户，请知悉。"
    }).then(() => {
      // on close
    });
  }
};
</script>
<style lang="less" scoped>
.rel{
    padding-top: 50px;
    background: #e5e5e5;
    height: 100%;
}

.alert{
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 84%;
  top: 50%;
  left: 8%;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin-top: -110px;

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
    box-sizing: border-box;
    height: 170px;
  }

  span{
    color: #333;
  }
  input{
    color: #333;
  }

  .box{
      p{
          color: #333;
          font-size: 15px;

          &.active{
              color: @activeColor;
              font-weight: bold;
              margin-bottom: 10px;
          }
      }
  }

    .btns{
        display: flex;
        border-top: 1px solid #e5e5e5;
        .btn{
            height: 50px;
            text-align: center;
            line-height: 50px;
            text-align: center;
            color: #333;
            flex: 1;
            font-size: 15px;

            &.active{
                border-left: 1px solid #e5e5e5;
                color: @activeColor;
            }
        }
    }
}

.payinfo{
    background: #fff;
    padding: 30px 13px;
    .type{
        color: #333;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        img{
            width: 20px;
            padding-right: 6px;
        }
    }
    p{
        line-height: 30px;
        color: #333;
    }
}
.fixbom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    padding: 0 13px;
    display: flex;
    justify-content:space-between;
    box-sizing: border-box;
    align-items: center;

    .left{
        color: #333;
    }
    .btns{
        display: flex;
        .btn{
            border: 1px solid #999999;
            color: #333;
            font-size: 12px;
            width: 75px;
            height: 31px;
            line-height: 31px;
            text-align: center;
            border-radius: 15.5px;
            margin-left: 10px;

            &:last-child{
                background: #999999;
                color: #fff;
            }
        }
    }
}
.tips{
    margin-top: 6px;
    background: #fff;
    padding: 25px 13px;
    padding-bottom: 10px;
    box-sizing: border-box;

    p{
        color: #333;
        font-size: 15px;
        margin-bottom: 14px;
        &.active{
            color: @activeColor;
        }
    }

    .down{
        color: @color999;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
        line-height: 30px;
        i{
            color: @color999;
        }
    }
}

.top{
    background: url("../../assets/images/jybg.png") no-repeat;
    background-size: cover;
    height: 94.5px;
    padding: 0 18px;
    padding-top: 28px;
    box-sizing: border-box;
    font-size: 15px;
}


.top_rel{
    padding: 0 18px;
    position: absolute;
    box-sizing: border-box;
    top: 115px;
    left: 0;
    width: 100%;
    .top_rel_box{
        box-shadow: 0 0 5px 0px 
    rgba(0, 0, 0, 0.3);
        background: #fff;
        padding: 17px 0;
        p{
            color: #666;
            font-size: 15px;
            padding: 0 14.5px;
        }
    }
}

.list_box{
    padding-top: 25px;
    background: #fff;
    .list{
        line-height: 54px;
        border-bottom: 1px solid #e5e5e5;
        background: #fff;
        color: #333;
        font-size: 15px;
        font-weight: bold;
        padding: 0 13px;
        &:last-child{
            border-bottom: 0;
        }
    }
}
.sellname{
    padding-top: 0;
    margin-top: 6px;

    .fkm{
        position: relative;
        span{
            color: @activeColor;
            position: absolute;
            right: 13px;

            i{
                color: @color999;
            }
        }
    }
}
</style>
