<!-- 博客页面 -->
<template>
  <div class="Blog">
    <Nav></Nav>
    <div class="contetn_main">
      <Container></Container>
    </div>
    <div class="footer_main">
      <footer></footer>
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav';
import footer from '../../components/FooterBar'
import Container from '../../components/Container'
export default {
  name: "Blog",
  data() {
    return {};
  },
  components:{
    Nav,Container,footer
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
     document.documentElement.scrollTop = 0;
  }
};
</script>
<style scoped lang="less">
 .Blog{
   position: relative;
   width: 100%;
   height: 100%;
   .contetn_main{
     padding-bottom: 60px;
   }
   .footer_main{
    position: absolute;
    background-color: #000;
    height: 80px;
    width: 100%;
    bottom: 0;
    left: 0;
   }
 }
</style>