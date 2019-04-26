<template>
    <div class="rel">
        <Header back></Header>
        <iframe :src="iframeSrc" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
    </div>
</template>

<script>
export default {
  computed: {
    iframeSrc() {
      return (
        "http://ffc967.cn/kline/?symbol_x=" +
        this.$route.query.symbol +
        "&market_x=" +
        this.$route.query.market
      );
    }
  },
  created() {
    this.$route.meta.title =
      this.$route.query.symbol + "/" + this.$route.query.market;
  }
};
</script>

<style lang="less" scoped>
.rel{
    padding-top: 50px;
    height: 100%;
    width: 100%;
}
</style>
