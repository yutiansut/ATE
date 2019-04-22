<template>
    <div class="rel">
        <Header back></Header>
        <div class="tips">切记！请妥善备份并保管好秘钥！以防丢失</div>

        <div class="box">
            <div class="pwd">秘钥：{{code}} <div class="btn" @click="copy(code)">复制</div>
            </div>
            <div class="img"><img src="./1555579914.png" alt=""></div>
            <div class="tips_group">
                <p>您可以使用Authenticator APP</p>
                <p>扫描二维码或手动添加账户并输入秘钥进行验证</p>
            </div>

            <div class="submit" @click="$router.push('/setting/google/code')">下一步</div>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      code: "403KV4SAWN3XUK3W"
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
    background: @bgColor;
}
.tips{
    font-size: 12px;
    color: @activeColor;
    line-height: 40px;
    padding: 0 13px;
    background: @dbBgColor;
}

.pwd{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 52px;

    .btn{
        margin-left: 9.5px;
        border: 1px solid @activeColor;
        color: @activeColor;
        width:67px;
        height: 29px;
        line-height: 29px;
        border-radius: 14.5px;
    }
}

.img{
    margin-top: 30px;
    img{
        width: 188px;
    }
}

.box{
    text-align: center;
}

.tips_group{
    padding: 0 13px;
    margin-top: 54px;
    p{
        color: @color999;
        text-align: left;
        font-size: 15px;
        margin-top: 14.5px;
    }
}

.submit{
    background: @activeColor;
    width: 80%;
    margin: 0 auto;
    margin-top: 40px;
}
</style>

