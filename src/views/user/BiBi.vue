<template>
    <div class="rel">
        <Header back></Header>

        <div class="top">
            <div class="box">
                <p>C2C/B2C资产估值</p>
                <h1>103472.23802916BTC</h1>
                <p class="tips">2814463236.5300HKDT</p>
            </div>
        </div>

        <div class="hide_no">
            <div class="checkbox"></div>
            隐藏0资金的币种
        </div>

        <div class="list_box" v-for="(item,index) in 10" :key="index">
            <div class="top_t">
                <div class="left">BTC</div>
                <div class="right">资金划移</div>
            </div>
            <div class="prices">
                <div class="lix">
                    <span>9999996.000</span>
                    <span>可用</span>
                </div>
                <div class="lix">
                    <span>0.0000000</span>
                    <span>冻结</span>
                </div>
                <div class="lix">
                    <span>2123130.000</span>
                    <span>估值(HKDT)</span>
                </div>
            </div>
            <div class="btn_group">
                <div class="btn" @click="$router.push('/user/c2c_b2c/coinCharging')">充币</div>
                <div class="btn" @click="$router.push('/user/c2c_b2c/btcMention')">提币</div>
                <div class="btn" @click="$router.push('/biBiTransaction')">币币</div>
                <div class="btn" @click="$router.push('/user/c2c_b2c/capitalTransfer?type=2')">资金划转</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
@import url("./less/common");
</style>
