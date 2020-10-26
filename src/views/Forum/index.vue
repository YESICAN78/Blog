<!-- 论坛 -->
<template>
  <div class="Forum">
    <Nav></Nav>
    <el-container>
      <el-main>
        <Forumcontent ></Forumcontent>
      </el-main>
      <el-aside>
        <div class="aside">
          <Aside></Aside>
        </div>
      </el-aside>
    </el-container>
   <div class="footer_main">
     <FooterBar></FooterBar>
   </div>
  </div>
</template>

<script>
import Nav from "../../components/Nav";
import Forumcontent from "../../components/Forum/Forumcontent";
import Aside from "../../components/Forum/Aside";
import FooterBar from "../../components/FooterBar"
export default {
  name: "Forum",
  components: { Nav, Forumcontent, Aside,FooterBar },
  data() {
    return {
    };
  },

  methods: {
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="less">
.Forum {
  position: relative;
  .el-container {
    width: 92%;
    margin: auto;
    min-height: 800px;
    box-sizing: border-box;
    padding-top: 80px;
    padding-bottom: 80px;
    min-width: 1070px;
    .el-main {
      margin-right: 10px;
      padding: 0;
      margin-bottom: 30px;
    }
    .el-aside {
      width: 304px;
    }
  }
  .footer_main{
   height: 60px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>