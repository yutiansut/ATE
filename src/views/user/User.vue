<template>
  <div>
    <Header back></Header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  components: {},
  data() {
    return {};
  },
  created() {}
};
</script>

<style>
</style>
