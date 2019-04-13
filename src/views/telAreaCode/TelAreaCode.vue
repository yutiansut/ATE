<template>
    <div class="rel">
        <Header back></Header>

        <div class="search">
            <input type="text" placeholder="请选择国家或地区">
        </div>

        <div class="box">
            <ul>
                <li @click="onSetTelAreaCode('+86')">
                    <span>中国</span>
                    +86
                </li>
                <li @click="onSetTelAreaCode('+355')">
                    <span>阿尔巴尼亚</span>
                    +355
                </li>
                <li @click="onSetTelAreaCode('+86')">
                    <span>中国</span>
                    +86
                </li>
                <li @click="onSetTelAreaCode('+355')">
                    <span>阿尔巴尼亚</span>
                    +355
                </li>
                <li @click="onSetTelAreaCode('+86')">
                    <span>中国</span>
                    +86
                </li>
                <li @click="onSetTelAreaCode('+355')">
                    <span>阿尔巴尼亚</span>
                    +355
                </li>
                <li @click="onSetTelAreaCode('+86')">
                    <span>中国</span>
                    +86
                </li>
                <li @click="onSetTelAreaCode('+355')">
                    <span>阿尔巴尼亚</span>
                    +355
                </li>
                <li @click="onSetTelAreaCode('+86')">
                    <span>中国</span>
                    +86
                </li>
                <li @click="onSetTelAreaCode('+355')">
                    <span>阿尔巴尼亚</span>
                    +355
                </li>
                <li @click="onSetTelAreaCode('+86')">
                    <span>中国</span>
                    +86
                </li>
                <li @click="onSetTelAreaCode('+355')">
                    <span>阿尔巴尼亚</span>
                    +355
                </li>
                <li @click="onSetTelAreaCode('+86')">
                    <span>中国</span>
                    +86
                </li>
                <li @click="onSetTelAreaCode('+355')">
                    <span>阿尔巴尼亚</span>
                    +355
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onSetTelAreaCode(code) {
      localStorage.telAreaCode = code;
      this.$router.goBack();
    }
  }
};
</script>

<style lang="less" scoped>
.rel{
    padding: 0 27px;
    padding-top: 50px;
    box-sizing: border-box;
}
.search{
    margin-top: 32px;
    margin-bottom: 16.5px;
    input{
        font-size: 15px;
        background:  #606062 url("../../assets/images/formIcons/search.png") no-repeat 5px center;
        background-size: 16.5px;
        padding-left: 26.5px;
        border-bottom: 0;
        border-radius: 16px;

        &::-webkit-input-placeholder {
            color: #aaaaaa;
        }
    }
}

.box{
    padding-bottom: 50px;
    border-top: 1Px solid #353639;
    li{
        height: 50px;
        line-height: 50px;
        display: flex;
        border-bottom: 1Px solid #353639;
        color: #bdbdbc;
        span{
            flex: 1;
            color: #bdbdbc;
        }
    }
}
</style>

