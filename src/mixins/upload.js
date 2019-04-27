import { Toast } from 'vant';
export default {
    data() {
        return {
            multiple: false,
            imagesFiles: [],
            imagesPaths: [],
            uploadNum: 0,
            uploadImgsIds: [],
            timer: null,
            uploadConfig: {
                maxSize: 1024 * 1024 * 5, //5M
                maxLen: 5, //最多上传几张
                fileType: "image/jpeg,image/jpg,image/gif,image/png",
                imgsList: [],
                succNum: 0
            }
        };
    },
    methods: {
        //   删除图片
        onDelete(index) {
            this.imagesFiles.splice(index, 1);
            this.imagesPaths.splice(index, 1);
        },
        //   读取图片
        onReadImg() {
            // 单图上传清除数组
            if (!this.multiple) {
                this.imagesFiles = [];
                this.imagesPaths = [];
            }
            this.uploadNum = 0;
            let files = this.$refs.upload.files;
            for (let i = 0; i < files.length; i++) {
                if (this.imagesFiles.length >= this.uploadConfig.maxLen) {
                    Toast.fail("最多上传" + this.uploadConfig.maxLen + "张图片");
                    break;
                }
                if (files[i].size > this.uploadConfig.maxSize) {
                    Toast.fail(files[i].name + "图片大于5M，自动忽略");
                    break;
                } else if (
                    !files[i].type ||
                    this.uploadConfig.fileType.indexOf(files[i].type) == -1
                ) {
                    Toast.fail(files[i].name + "不是JPEG、jpg、gif、png格式，自动忽略");
                    break;
                } else {
                    this.imagesFiles.push(files[i]);
                }
            }
            this.imgReset();
            this.$refs.upload.value = "";
        },
        // 图片渲染
        imgReset() {
            let arr = [];
            for (let i = 0; i < this.imagesFiles.length; i++) {
                arr.push(URL.createObjectURL(this.imagesFiles[i]));
            }
            this.imagesPaths = arr;
        }
    }
}