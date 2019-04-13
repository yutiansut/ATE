<template>
  <div class="header">
    <div class="back" v-if="back">返回</div>
    <slot name="left"></slot>
    <h1>{{title || $route.meta.title}}</h1>
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
    }
  },
  data() {
    return {};
  },
  methods: {},
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
  background: #1a1b20;
  z-index: 999;

  h1 {
    text-align: center;
    color: @color;
    font-size: 18px;
    font-weight: normal;
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
