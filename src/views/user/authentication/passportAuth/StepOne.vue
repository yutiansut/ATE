<template>
    <div class="rel">
        <Header back></Header>
        <div class="step step1">
            <div class="box">
                <span></span>
                <span></span>
                <span></span>
                <div class="abs">
                    <em></em>
                    <em></em>
                    <em></em>
                </div>
            </div>
        </div>
        <div class="step_wz step_wz1">
            <span>护照信息</span>
            <span>护照信息页</span>
            <span>手持证件</span>
        </div>

        <div class="tips">
            请填写您的护照信息
        </div>

        <div class="form">
            <div class="list">
                <input type="text" placeholder="请输入">
                <div class="left">姓名</div>
            </div>
            <div class="list">
                <input type="text" placeholder="请输入">
                <div class="left">姓</div>
            </div>
            <div class="list">
                <input type="text" placeholder="请输入">
                <div class="left">护照号码</div>
            </div>

            <div class="submit" @click="$router.push('/user/authentication/passportAuthTwo')">下一步</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>
<style lang="less" scoped>
@import url('../less/common');

.step1 span:first-child:after{
    width: 100%;
}
</style>
