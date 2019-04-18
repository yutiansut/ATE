<template>
    <div class="rel">
        <Header back></Header>
        <div class="step step1">
            <div class="box">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div class="abs">
                    <em></em>
                    <em></em>
                    <em></em>
                    <em></em>
                </div>
            </div>
        </div>
        <div class="step_wz step_wz1">
            <span>身份信息</span>
            <span>身份证正面</span>
            <span>身份证反面</span>
            <span>手持证件</span>
        </div>

        <div class="tips">
            请填写您的身份证信息
        </div>

        <div class="form">
            <div class="list">
                <input type="text" placeholder="请输入">
                <div class="left">姓名</div>
            </div>
            <div class="list">
                <input type="text" placeholder="请输入">
                <div class="left">身份证号码</div>
            </div>

            <div class="submit" @click="$router.push('/user/authentication/idAuthTwo')">下一步</div>
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
</style>
