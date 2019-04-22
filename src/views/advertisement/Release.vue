<template>
    <div class="rel">
        <Header back>
            <div class="right" slot="left" @click="$router.push({path:'/tradeRecord',query:{active:2}})">发布记录</div>
        </Header>

        <div class="box">
            <div class="r_tl" @click="jyType.show=true">
                <div class="left">交易类型</div>
                <div class="right buy" :class="{sell:jyType.value}">{{jyType.name}} <i class="iconfont icon-xia"></i></div>
            </div>
            <div class="r_tl" @click="biType.show=true">
                <div class="left">选择币种</div>
                <div class="right">{{biType.name}} <i class="iconfont icon-xia"></i></div>
            </div>
        </div>

        <div class="box pay_box">
            <div class="r_tl">
                <div class="left">选择支付方式<span>(可多选)</span></div>
            </div>
            <div class="r_tl">
                <div class="left">
                    <div class="checkbox"></div>
                    银行卡
                </div>
                <div class="right" @click="$router.push('/bankCard')">前往添加银行卡账号 <i class="iconfont icon-right"></i></div>
            </div>
            <div class="r_tl">
                <div class="left">
                    <div class="checkbox"></div>
                    支付宝
                </div>
                <div class="right" @click="$router.push('/alipay')">前往添加支付宝账号 <i class="iconfont icon-right"></i></div>
            </div>
            <div class="r_tl">
                <div class="left">
                    <div class="checkbox"></div>
                    微信
                </div>
                <div class="right" @click="$router.push('/weChat')">前往添加微信账号 <i class="iconfont icon-right"></i></div>
            </div>
        </div>

        <div class="box scjfd">
            <div class="s_tl">
                <div class="radio"></div>
                按市场浮动
            </div>
            <div class="list_input">
                <div class="left">单价</div>
                <input type="text" placeholder="请输入单价HKDT">
            </div>
            <div class="list_input">
                <div class="left">数量</div>
                <input type="text" placeholder="请输入数量BTC">
            </div>
            <div class="list_input tips">
                该币种可用数量：99991
            </div>
        </div>

        <div class="box yjdh">
            <div class="r_tl">交易最小额度</div>
            <div class="x_mx">
                <div class="input_list">
                    <input type="text" placeholder="请输入数量">
                    <div class="right">HKDT</div>
                </div>
                <div class="iconx"><img src="@/assets/images/formIcons/jt.png" alt=""></div>
                <div class="input_list">
                    <input type="text" placeholder="请输入数量">
                    <div class="right">BTC</div>
                </div>
            </div>
        </div>

        <div class="box yjdh">
            <div class="r_tl">交易最大额度</div>
            <div class="x_mx">
                <div class="input_list">
                    <input type="text" placeholder="请输入数量">
                    <div class="right">HKDT</div>
                </div>
                <div class="iconx"><img src="@/assets/images/formIcons/jt.png" alt=""></div>
                <div class="input_list">
                    <input type="text" placeholder="请输入数量">
                    <div class="right">BTC</div>
                </div>
            </div>
        </div>

        <div class="fix_bom">
            <div class="btn" @click=$router.goBack()>取消</div>
            <div class="btn" :class="{active:true}">发布</div>
        </div>

        <van-actionsheet cancel-text="取消" v-model="jyType.show" :actions="jyType.actions" @select="onjyTypeSelect" />
        <van-actionsheet cancel-text="取消" v-model="biType.show" :actions="biType.actions" @select="onbiTypeSelect" />
    </div>
</template>

<script>
import { Actionsheet } from "vant";
export default {
  components: {
    [Actionsheet.name]: Actionsheet
  },
  data() {
    return {
      jyType: {
        show: false,
        name: "买入",
        value: 0,
        actions: [
          {
            name: "买入",
            value: 0
          },
          {
            name: "卖出",
            value: 1
          }
        ]
      },
      biType: {
        show: false,
        name: "BTC",
        value: 0,
        actions: [
          {
            name: "BTC",
            value: 0
          },
          {
            name: "ETH",
            value: 1
          },
          {
            name: "USDT",
            value: 2
          },
          {
            name: "HKDT",
            value: 3
          }
        ]
      }
    };
  },
  methods: {
    //   选择交易类型
    onjyTypeSelect(item) {
      this.jyType.name = item.name;
      this.jyType.value = item.value;
      this.jyType.show = false;
    },
    // 选择币种类型
    onbiTypeSelect(item) {
      this.biType.name = item.name;
      this.biType.value = item.value;
      this.biType.show = false;
    }
  }
};
</script>

<style lang="less" scoped>
.rel{
    background: #fff;
    padding-top: 50px;
    padding-bottom: 75px;
}

.r_tl{
    padding: 0 13px;
    height: 53px;
    line-height: 53px;
    border-bottom: 1px solid #e5e5e5;
    color: #333;
    display: flex;
    justify-content:space-between;
    font-size: 15px;

    div,i{
        font-size: 15px;
        color: #333;
    }
    .buy{
        color: @lvColor;
    }
    .sell{
        color: #f73535;
    }
    &:first-child{
        border-top: 0;
    }

    &:active{
        background: #eee;
    }

    span{
        color: @color999;
    }
}

.box{
    border-bottom: 6px solid #e5e5e5;

    div{
        color: #333;
        font-size: 15px;
    }
}

.pay_box{
    .r_tl{
        .left{
            display: flex;
            align-items: center;
        }

        &:active{
            background: #fff;
        }
    }
}

.scjfd{
    .s_tl{
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;
        padding: 0 13px;
        box-sizing: border-box;
        color: #333;
    }

    .list_input{
        height: 54px;
        line-height: 54px;
        padding: 0 13px;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;

        input{
            color: #333;
            text-align: right;
            border-bottom: 0;
            height: 54px;
        }

        .left{
            position: absolute;
            left: 13px;
        }
    }
    .tips{
        color: @color999;
    }
}

.yjdh{
    padding-bottom: 5px;
    .r_tl{
        border: 0;
        &:active{
            background: #fff;
        }
    }
    .x_mx{
        display: flex;
        align-items: center;
        padding: 0 13px;
    }
    .iconx{
        font-size: 0;
        margin:  0 15px;
        img{
            width:17.5px;
        }
    }
    .input_list{
        position: relative;
        flex: 1;
        height: 54px;
        line-height: 54px;
        .right{
            position: absolute;
            right: 0;
            top: 0;
            color: @color999;
        }
        input{
            color: #333;
            padding-right: 50px;
            text-align: right;
        }
        input::-webkit-input-placeholder {
            text-align: left;
        }
    }
}
input::-webkit-input-placeholder {
    color: @color999;
}
.fix_bom{
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    height: 75px;
    line-height: 75px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid @bdColor;

    .btn{
        border-radius: 15.5px;
        width:75px;
        height: 31px;
        line-height: 31px;
        border:1px solid #a7a7a7;
        color: #333;
        font-size: 14px;
        margin-right: 13px;
        text-align: center;

        &:last-child{
            background:#afafaf;
            color: #fff;
            border-color: #afafaf;

            &:active{
                background: #ccc;
                border-color: #ccc;
            }

            &.active{
                background: @activeColor;
                border-color: @activeColor;

                &:active{
                    background: #dc2424;
                }
            }
        }

        &:active{
            background: #eee;
        }
    }
}
</style>

