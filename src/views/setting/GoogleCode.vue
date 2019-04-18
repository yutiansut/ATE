<template>
  <div class="rel">
    <Header back></Header>

    <div class="form">
      <div class="list">
        <input type="text" placeholder="请输入谷歌验证码">
      </div>
      <div class="submit">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>
<style lang="less" scoped>
.rel{
    padding-top: 50px;
}
.form{
    .list{
        position: relative;
        height: 50px;
        line-height: 50px;
        background: #2b2c2f;
        padding: 0 11.5px;
        box-sizing: border-box;
        border-top: 1px solid #37383b;
        &:first-child{
          border-top: 0;
        }
        input{
            border-bottom: 0;
        }
        .sms{
            color: #f73535;
            position: absolute;
            right: 11.5px;
            top: 0;
            line-height: 50px;
        }
    
        input::-webkit-input-placeholder {
            color: #666;
        }
    }

    .submit{
        background: #afafaf;
        border-radius: 20px;
        height: 42.5px;
        line-height: 42.5px;
        width: 90%;
        margin: 0 auto;
        margin-top: 35px;


        &.active{
          background: @activeColor;
        }
    }
}
</style>
