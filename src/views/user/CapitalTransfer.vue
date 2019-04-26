<template>
    <div class="rel">
        <Header back></Header>

        <div class="list list_one">
            <span v-if="$route.query.type!=2">C2C/B2C账户</span>
            <span>币币账户</span>
            <span v-if="$route.query.type==2">C2C/B2C账户</span>
        </div>
        <div class="list list_two">
            <span>币种</span>
            <span>BTC</span>
        </div>
        <div class="gssfx">
            <h2>划转数量</h2>
            <input type="text" placeholder="请输入划转数量">

            <div class="bom">
                <span>可转数量：0.0000000</span>
                <span>全部划转</span>
            </div>
        </div>

        <div class="submit">
            提交
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
    background: #e5e5e5;
    padding-top: 50px;
}
.list{
    height: 50px;
    line-height: 50px;
    background: #fff;
    padding: 0 13px;
    box-sizing: border-box;
    margin-top: 6px;
    span{
        color: #333;
        font-size: 15px;
    }
}

.list_one{
    span:last-child{
        padding-left: 24px;
        margin-left: 10px;
        background: url("../../assets/images/icons/zh.png") no-repeat left center;
        background-size: 14px;
    }
}

.list_two{
    display: flex;
    justify-content:space-between;
}

.gssfx{
    margin-top: 6px;
    background: #fff;
    

    h2{
        color: #333;
        padding: 0 13px;
        font-size: 15px;
        line-height: 50px;
    }

    input{
        color: #333;
        border-color: #e5e5e5;
        height: 50px;
        line-height: 50px;
    }

    ::-webkit-input-placeholder{
        color: @color999;
    }

    .bom{
        height: 52px;
        line-height: 52px;
        display: flex;
        padding: 0 13px;
        justify-content:space-between;

        span{
            font-size: 15px;
            color: @color999;

            &:last-child{
                color: @activeColor;
            }
        }
    }
}

.submit{
    width: 93%;
    background: #afafaf;
    margin: 40px auto;
}
</style>
