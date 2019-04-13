<template>
  <div class="rel">
    <transition :name='transitionName'>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="Router" />
      </keep-alive>
    </transition>

    <transition :name='transitionName'>
      <router-view v-if="!$route.meta.keepAlive" class="Router" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },

  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack;

    this.transitionName = isBack ? "slide-right" : "slide-left";

    setTimeout(() => {
      this.$router.isBack = false;
      next();
    }, 60);
  }
};
</script>

<style lang="less" scoped>
</style>
