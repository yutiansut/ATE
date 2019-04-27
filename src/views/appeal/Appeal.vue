<template>
    <div class="rel">
        <Header back></Header>
        <div class="tips">提交申诉材料 <span>请认真对照实际转账记录填写</span></div>
        <div class="pay_type">
            <div class="list">支付方式</div>
            <div class="list active"><span></span>银行卡支付</div>
            <div class="list"><span></span>支付宝支付</div>
            <div class="list"><span></span>微信支付</div>
        </div>
        <div class="form">
            <div class="input_group">
                <input type="text" placeholder="请输入转账银行">
            </div>
            <div class="input_group">
                <input type="text" placeholder="请输入转账银行开户行">
            </div>
            <div class="input_group">
                <input type="text" placeholder="请输入转入银行账号">
            </div>
            <div class="input_group">
                <input type="text" placeholder="请输入银行交易单号">
            </div>
            <div class="upload_box">
                <h2>交易凭证<span>最多可上传8张</span></h2>
                <div class="list_up">
                    <div class="img" v-if="imagesPaths.length<8"><i class="iconfont icon-jia"></i>
                        <input type="file" ref="upload" @change="onReadImg" multiple>
                    </div>
                    <div class="img" @click="onDelete(index)" v-for="(item,index) in imagesPaths" :key="index">
                        <img :src="item" alt="">
                        <i class="iconfont icon-guanbi"></i>
                    </div>
                </div>
            </div>
            <div class="qita">
                <h2>其他证据说明</h2>
                <textarea placeholder="请编辑有利证据说明"></textarea>
            </div>
        </div>

        <div class="fixbom">
            <div class="btn">取消</div>
            <div class="btn active">提交</div>
        </div>
    </div>
</template>

<script>
import upload from "@/mixins/upload";
export default {
  mixins: [upload],
  data() {
    return {
      multiple: true
    };
  },
  created() {
    this.uploadConfig.maxLen = 8;
  }
};
</script>
<style lang="less" scoped>
.rel{
    padding-top: 50px;
    background: #e5e5e5;
    padding-bottom: 80px;
}
.fixbom{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .btn{
        border-radius: 16px;
        width: 75px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        border: solid 1px #999999;
        margin-right: 13px;
        color: #333;

        &.active{
            color: #fff;
            background: @activeColor;
        }
    }
}
.tips{
    padding: 0 13px;
    box-sizing: border-box;
    background: #e7e7e7;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #333;
    span{
        color: @activeColor;
        font-size: 15px;
        margin-left: 20px;
    }
}

.pay_type{
    background: #fff;
    padding: 0 13px;
    box-sizing: border-box;
    .list{
        height: 54px;
        line-height: 54px;
        display: flex;
        align-items: center;
        color: #333;
        border-bottom: 1px solid #e5e5e5;
        &:last-child{
            border-bottom: 0;
        }

        

        &.active{
            span{
                background: @activeColor;
            }
        }
        span{
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 10px;
            position: relative;

            &:after{
                width: 120%;
                height: 120%;
                top: -20%;
                left: -20%;
                border: 1px solid @activeColor;
                content: "";
                position: absolute;
                border-radius: 50%;
            }
        }
    }
}

.form{
    padding: 0 13px;
    margin-top: 6px;
    box-sizing: border-box;
    background: #fff;

    input{
        height: 53px;
        border-color: #e5e5e5;
    }

    ::-webkit-input-placeholder{
        color: @color999;
    }
}

.upload_box{
    h2{
        color: #333;
        font-size: 15px;
        margin: 15px 0 20px;
        span{
            font-size: 15px;
            color: @color999;
        }
    }

    .list_up{
        display: flex;
        flex-wrap: wrap;
        .img{
            margin-bottom: 10px;
            margin-right: 10px;
            height: 74px;
            width: 74px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #88898a;
            position: relative;
            overflow: hidden;
            i{
                color: #fff;
                font-size: 30px;
            }

            input{
                opacity: 0;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            

            .icon-guanbi{
                position: absolute;
                right: 5px;
                top: 5px;
                font-size: 16px;
            }
        }
    }
}

.qita{
    padding-bottom: 10px;
    h2{
        font-size: 15px;
        margin-top: 15px;
        color: #333;
        margin-bottom: 22px;
    }
    textarea{
        height: 160px;
        padding:  17px 11px;
        box-sizing: border-box;
        color: #333;
        border: solid 1px #dedede;
    }
}
</style>
