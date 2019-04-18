<template>
  <div class="rel">
    <Header back></Header>
    <div class="step step4">
      <div class="box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div class="abs">
          <em></em>
          <em></em>
          <em></em>
          <em></em>
        </div>
      </div>
    </div>
    <div class="step_wz step_wz4">
      <span>身份信息</span>
      <span>身份证正面</span>
      <span>身份证反面</span>
      <span>手持证件</span>
    </div>

    <div class="tips">
      请上传您的手持证件照片
    </div>

    <div class="upload_img">
      <img src="@/assets/images/sfrz.png" alt="" v-if="imagesPaths.length==0">
      <img v-else :src="imagesPaths[0]" alt="">
      <input type="file" ref="upload" @change="onReadImg">
    </div>

    <div class="submit_group">
      <div class="btn" @click="$router.goBack()">上一步</div>
      <div class="btn next" @click="submit" :class="{active:imagesPaths.length>0}">完成认证</div>
    </div>

    <div class="shili">
      <h2>拍摄示例</h2>
      <div class="img"><img src="@/assets/images/shili.png" alt=""></div>
    </div>

    <div class="shili">
      <h2>上传要求</h2>
      <p class="margtop10">1.提交的信息必须真实有效</p>
      <p>2.上传图片必须清晰</p>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import upload from "@/mixins/upload";
export default {
  mixins: [upload],
  data() {
    return {};
  },
  methods: {
    // 提交信息
    submit() {
      if (this.imagesPaths.length == 0) {
        Toast.fail("请上传您手持证件照片");
        return;
      }
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
@import url('../less/common');
</style>
