<template>
    <div class="rel">
        <Header back></Header>
        <div class="top">
            <div class="tel">1391***5678</div>
            <div class="tips">{{tips}}</div>
        </div>
        <pwd v-model="show" @onPwd="onPwd"></pwd>
    </div>
</template>

<script>
import pwd from "@/components/common/Password";

export default {
  components: {
    pwd
  },
  data() {
    return {
      show: true,
      tips: "请设置手势密码"
    };
  },
  methods: {
    onPwd(pwd) {}
  }
};
</script>
<style lang="less" scoped>
.rel{
    padding-top: 50px;
    background: #1a1b20;
}

.top{
    text-align: center;
    margin-top: 25px;
    .tel{
        font-size: 15px;
    }
    .tips{
        font-size: 18px;
        margin-top: 35px;
    }
}
</style>

