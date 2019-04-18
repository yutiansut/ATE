<template>
    <div class="rel">
        <Header back></Header>
        <div class="box">
            <div class="list active">
                简体中文
            </div>
            <div class="list">
                繁体中文
            </div>
            <div class="list">
                English
            </div>
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

.box{
    margin-top: 10px;
    background: #212226;
    .list{
        color: @color999;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #37383b;
        font-size: 15px;
        padding: 0 12px;
        box-sizing: border-box;

        &:last-child{
            border-bottom: 0;
        }

        &.active,&:active{
            color: @activeColor;
        }
    }
}
</style>
