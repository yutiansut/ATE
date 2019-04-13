<template>
  <div class="header" :style="{background:background}">
    <div class="back" @click="onBack" v-if="back"><i class="iconfont icon-back"></i></div>
    <slot name="left"></slot>
    <h1 v-if="!isTitle">{{title || $route.meta.title}}</h1>
    <slot name="right"></slot>
    <!-- <div class="right"></div> -->
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    back: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: ""
    },
    isTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    // 返回上一页
    onBack() {
      // 返回到指定页面
      let pathName = this.$route.meta.backName;
      if (pathName) {
        this.$router.goBackPathName(pathName);
      } else {
        this.$router.goBack();
      }
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.header {
  height: 50px;
  line-height: 50px;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  background: #212226;
  z-index: 999;

  h1 {
    text-align: center;
    color: @color;
    font-size: 18px;
    font-weight: normal;
  }

  .icon-back{
    font-size: 18px;
    color: #a8a8a9;
  }

  .back,
  .left {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    padding-right: 15px;

    &:active {
      background: @bgColor;
    }
  }
  .right {
    position: fixed;
    top: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    padding-right: 15px;

    &:active {
      background: @bgColor;
    }
  }
}
</style>
