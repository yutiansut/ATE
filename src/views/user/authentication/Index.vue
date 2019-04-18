<template>
    <div class="rel">
        <Header back></Header>

        <div class="list" @click="$router.push('/user/authentication/idAuthOne')">
            <div class="left">实名身份证认证</div>
            <i class="iconfont icon-right"></i>
        </div>
        <div class="list" @click="$router.push('/user/authentication/passportAuthOne')">
            <div class="left">护照实名认证</div>
            <i class="iconfont icon-right"></i>
        </div>
    </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>

.rel{
    padding-top: 50px;
}

.list{
    height: 50px;
    line-height: 50px;
    background: @bgColor;
    padding: 0 13px;
    box-sizing: border-box;
    display: flex;
    justify-content:space-between;
    margin-top: 10px;

    &:active{
        background: #262626;
    }
}
</style>
