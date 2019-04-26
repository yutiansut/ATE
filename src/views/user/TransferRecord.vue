<template>
    <div class="rel">
        <Header back></Header>

        <div class="box">
            <div class="list">
                <span>余额</span>
                <span>0 BTC</span>
            </div>

            <div class="lm">
                <div class="lx">
                    <span>总转入数量(BTC)</span>
                    <span>0</span>
                </div>
                <div class="lx">
                    <span>总转出数量(BTC)</span>
                    <span>0</span>
                </div>
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
    background: #e5e5e5;

    .box{
        .list{
            display: flex;
            justify-content:space-between;
            background: #fff;
            margin-top: 6px;
            padding: 0 13px;
            height: 50px;
            line-height: 50px;
            span{
                color: #333;
                font-size: 15px;
                font-weight: bold;
                &:last-child{
                    color: @color999;
                }
            }
        }

        .lm{
            margin-top: 6px;
            display: flex;
            background: #fff;
            padding: 21px 0;

            .lx{
                flex: 1;
                text-align: center;
                border-right: 1px solid #e5e5e5;

                &:last-child{
                    border-right:0;
                }
            }

            span{
                display: block;
                font-weight: bold;
                color: #333;
                font-size: 15px;

                &:last-child{
                    color: @activeColor;
                    margin-top: 10px;
                }
            }
        }
    }
}
</style>
