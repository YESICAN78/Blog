<!--  -->
<template>
  <el-dialog
    title="头像上传"
    :visible.sync="dialogVisible"
    width="25%"
    :before-close="beforeClose"
    :close-on-click-modal="false"
  >
    <el-upload
      class="avatar-uploader"
      :action="baseUrl+'/upload/avatar'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :with-credentials="true"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-dialog>
</template>

<script>
import baseUrl from '../../utls/baseUrl'
export default {
  name: "Avatar",
  data() {
    return {
      baseUrl:baseUrl,
      imageUrl: ""
    };
  },
  props: ["dialogVisible"],
  methods: {
    //上传成功以后执行的函数
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message({
        message: "头像上传成功",
        type: "success",
        duration: 2000
      });
      setTimeout(() => {
        window.location.reload();
      }, 1700);
    },
    //上传前执行的函数
    beforeAvatarUpload(file) {
      const isType = /^(image\/jpeg|image\/png|image\/gif)$/.test(file.type);
      const isLt1M = file.size < 1024*1024;
      if (!isType) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1M !");
      }
      return isType && isLt1M;
    },
    beforeClose() {
      console.log("花花")
      this.$emit("handleClose");
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped larg='less'>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader{
    position: relative;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>