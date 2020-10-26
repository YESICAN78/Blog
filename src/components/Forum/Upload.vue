<!--  -->
<template>
  <div  class="Upload">
    <!-- 上传文章封面 -->
    <el-upload
      :action="baseUrl+'/forum/Articleface'"
      list-type="picture-card"
      :before-upload="befaultUpload"
      :on-success="Onsuccess"
      :on-preview="handlePictureShow"
    >
      <i class="el-icon-picture"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="60%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import baseUrl from '../../../utls/baseUrl'
export default {
  name: "ArticleUpload",
  data() {
    return {
      baseUrl:baseUrl,
      dialogImageUrl: "",
      dialogVisible: false,
      baseUrl:baseUrl
    };
  },
  filters:{
    ifurl(){
      return (this.dialogImageUrl ? false : true);
    }
  },
  methods: {
    //上传封面之前的函数
    befaultUpload(file) {
      let isType = /^(image\/jpeg|image\/png|\/png|\/gif)$/.test(file.type);
      if (!isType) {
        this.$message.error("上传图片只能是 JPG/PNG/GIF/JPEG 格式!");
      }
      return isType;
    },
    //上传成功的函数
    Onsuccess(res, file) {
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.$emit("handleSuccess", res.forumface);
    },
    //预览封面函数
    handlePictureShow(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="less">
.Upload {
  /deep/.el-upload-list__item {
    height: 400px;
    width: 80%;
    margin: auto;
  }
}
</style>