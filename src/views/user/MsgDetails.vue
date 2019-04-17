<template>
    <div class="rel">
        <Header back></Header>
        <div class="msg_content">
            <div class="top">
                <div class="left">留言内容</div>
                <div class="date">提交时间：16:06 03/26</div>
            </div>
            <div class="content">
                请问如何退款，以及退款多久才会到账久才会到账？
                以及退款多久才会到账久才会到
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.rel{
    padding-top: 50px;
    background: #e5e5e5 !important;
}
.msg_content{
    background:#fff;
    padding: 20px 13px 0 13px;
    box-sizing: border-box;

    div{
        color: @color999;
        font-size: 15px;
    }
    .top{
        display: flex;
        justify-content:space-between;
    }
    .content{
        padding-top: 20px;
        background: url("../../assets/images/yjj.png") no-repeat right center;
        background-size: 71.5px;
        padding-bottom: 40px;
        color: #333;
    }
}
</style>
