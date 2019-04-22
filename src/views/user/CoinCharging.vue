<template>
    <div class="rel">
        <Header back></Header>
        <div class="top">
            <div class="left">
                <p>请将BTC转入如下地址</p>
                <p>地址：<span>{{code}}</span></p>
            </div>
            <div class="right">
                <div class="btn" @click="copy(code)">复制</div>
            </div>
        </div>

        <div class="erweima">
            <h2>或者扫描二维码</h2>
            <div class="img"><img src="@/assets/images/erweima.png" alt=""></div>
        </div>
        <div class="xxxmbom">
            <h2>温馨提示</h2>
            <p>·请通过BTC客户端或在线钱包将您需要充值的BTC数目发送到该地址。发送完成后，系统会自动在此交易获得12个确认后将该笔虚拟币充值到您在本站的账户，12个确认需要大约0.5到1小时时间，请耐心等待。同一个地址可多充值，不影响到账。最小充值金额0.0001。</p>
            <p>·请勿向上述地址充值任何非BTC资产，否则资产将不可找回。</p>
            <p>·您充值至上述地址后，需要整个网格节点的确认，1次网络确人后到账，6次网络确认后提币。</p>
            <p>·您的充值地址不会经常改变，可重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</p>
        </div>

    </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      code: "87bd1231y79y7asdbhb89asd"
    };
  },
  methods: {
    copy(str) {
      var save = function(e) {
        e.clipboardData.setData("text/plain", str); //下面会说到clipboardData对象
        e.preventDefault(); //阻止默认行为
      };
      document.addEventListener("copy", save);
      document.execCommand("copy"); //使文档处于可编辑状态，否则无效

      Toast("复制成功");
    }
  }
};
</script>
<style lang="less" scoped>
.rel{
    padding-top: 50px;
    background: #fff;
}
.top{
    display: flex;
    padding: 21px 12.5px;
    border-bottom: 6px solid #e5e5e5;

    .left{
        flex: 1;

        p{
            margin: 10px 0;
            font-size: 15px;
            color: #333;
        }

        span{
            color: @color999;
        }
    }
    .right{
        .btn{
            margin-top: 30px;
            width: 67px;
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            border: solid 1px #f73434;
            color: #f73434;
            text-align: center;
            transition: all .3s;

            &:active{
                background: #f73434;
                color: #fff;
            }
        }
    }
}

.erweima{
    border-bottom: 6px solid #e5e5e5;
    padding: 0 12.5px;
    padding-top: 20px;
    padding-bottom: 40px;
    h2{
        color: #333;
    }

    .img{
        text-align: center;
        margin-top: 30px;
    }
    img{
        width: 50%;
    }
}

.xxxmbom{
    padding: 0 12.5px;
    margin-top: 20px;
    padding-bottom: 30px;
    h2{
        margin-bottom: 21px;
        font-size: 14px;
        color: #333;
    }
    p{
        color: #333;
        font-size: 14px;
    }
}
</style>
