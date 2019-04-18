<template>
  <div class="rel">
    <Header back></Header>

    <div class="form">
      <div class="tl">留言反馈</div>
      <textarea placeholder="请输入留言反馈内容描述，我们的工作人员将在1-3个工作日内回复"></textarea>

      <div class="upload_img">
        <div class="tl">上传图片</div>
        <div class="box">
          <div class="list img_btn">
            <i class="iconfont icon-jia"></i>
            <input type="file" multiple ref="upload" @change="onReadImg">
          </div>
          <div class="list" v-for="(url,index) in imagesPaths" :key="index">
            <img :src="url" alt="">
            <i class="iconfont icon-guanbi" @click="onDelete(index)"></i>
          </div>
        </div>
      </div>

      <div class="submit">提交</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import upload from "@/mixins/upload";
export default {
  mixins: [upload],
  data() {
    return {
      multiple: true
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.rel{
    padding-top: 50px;
    background: #e5e5e5;
}

.form{
    background: #fff;
    padding: 0 13px;
    padding-bottom: 45px;

    div{
        color: #333;
    }
    .tl{
        height:47.5px;
        line-height:47.5px;
    }

    textarea{
        height: 190px;
        width: 100%;
        color: #333;
        border: 1px solid #dedede;
        padding: 6px 12px;
    }

    .box{
        display: flex;
        flex-wrap: wrap;
    }
    
    .list{
        font-size: 0;
        background: #88898a;
        width: 74px;
        height: 74px;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;

        img{
            height: 100%;
            width: 100%;
        }

        i.icon-guanbi{
            position: absolute;
            right: 5px;
            top: 5px;
            font-size: 18px;
        }
    }
    .img_btn{
        width: 74px;
        height: 74px;
        line-height: 74px;
        text-align: center;
        background: #88898a;
        i{
            font-size: 30px;
        }

        input{
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }

    .submit{
        background: #dd3232;
        width: 90%;
        height: 42.5px;
        border-radius: 20px;
        margin: 0 auto;
        margin-top: 45px;
        text-align: center;
        color: #fff;
    }
}
</style>
