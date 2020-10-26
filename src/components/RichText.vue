<!-- 留言框 -->
<template>
  <div>
    <textarea id="demo" style="display: none;"></textarea>
    <div class="btn">
      <button type="button" class="layui-btn" @click="handelclick">提交留言</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "RichText",
  data() {
    return {
      layedit: null,
      index: 0
    };
  },
  methods: {
    handelclick() {
      this.$emit("Submit", this.layedit.getContent(this.index));
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
      layui.use("layedit", () => {
      this.layedit = layui.layedit;
      this.layedit.set({
        uploadImage: {
          url: "", //接口url
          type: "" //默认post
        }
      });
      this.index = this.layedit.build("demo", {
        height:150,
        tool: ["face"]
      }); //建立编  辑器
    })
  }
};
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.btn {
  position: relative;
  width: 90%;
  height: 38px;
  margin:20px auto;
  /deep/.layui-btn {
    position: absolute;
    left: 0;
  }
}
</style>