<!-- 博客页面 -->
<template>
  <div class="About">
    <Nav></Nav>
    <div class="canvas">
      <div class="text">
        <slot name="about">
          <h2>关于</h2>
          <p>对影潭兮预揽月，只为再抚卿柔面</p>
        </slot>
      </div>
      <Canvas></Canvas>
    </div>
    <div class="about">
      <div class="about-content">
        <section class="about-me">
          <h1>关于我</h1>
          <p>在大学非常迷茫，没有方向于是就走上了前端之路</p>
        </section>
        <section class="about-Blog">
          <h1>关于本站</h1>
          <p>本站建于2020年5月，主要是个人爱好闹着玩的🙃。</p>
          <p>本站结构:</p>
          <p class="about-1">
            前端:
            <span>Layui</span>
            <span>+</span>
            <span>Element-ui</span>
            <span>+</span>
            <span>vue</span>
          </p>
          <p class="about-1">
            后端:
            <span>Nodejs</span>
            <span>+</span>
            <span>MONGODB</span>
          </p>
          <p>本站用的是阿里云提供的服务器ESC</p>
        </section>
        <section class="Specialnotes">
          <h1>特别说明</h1>
          <p>本站文章仅代表个人观点，和任何组织或个人无关-谢谢🙃</p>
          <p>本站前端开发代码没有考虑对IE浏览器的兼容。</p>
        </section>
        <section class="about-face">
          <p>
            <img src="../../assets/imgs/bgc.jpg" alt="">
          </p>
        </section>
      </div>
    </div>
    <div class="footer_main">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/Nav";
import Canvas from "../../components/Canvas";
import Footer from "../../components/FooterBar"
export default {
  name: "About",
  data() {
    return {};
  },
  components: {
    Nav,
    Canvas,Footer
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
.About {
  position: relative;
  width: 100%;
  padding-top: 61px;
  .canvas {
    position: relative;
    width: 100%;
    height: 300px;
    .text {
      user-select: none;
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      color: white;
      transform: translate(-50%, -50%);
      z-index: 1;
      h2 {
        font-size: 60px;
        padding-bottom: 20px;
        font-family: LiSu;
      }
      p {
        font-size: 20px;
      }
    }
  }
  .about {
    padding-top: 50px;
    width: 90%;
    margin: auto;
    padding-bottom: 120px;
    .about-content {
      padding: 10px;
      width: 100%;
      background-color: #fff;
      .about-me {
        h1 {
          margin-bottom: 1rem;
          padding-left: 1rem;
          border-left: 0.25rem solid #6bc30d;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.5rem;
        }
        p {
          display: block;
          margin: 20px;
          font-size: 16px;
        }
      }
      .about-Blog {
        h1 {
          margin-bottom: 1rem;
          padding-left: 1rem;
          border-left: 0.25rem solid #6bc30d;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.5rem;
        }
        p {
          display: block;
          margin: 20px;
          font-size: 16px;
        }
        .about-1 {
            span {
              margin-left: 10px;
              color: red;
            }
          }
      }
      .Specialnotes{
        h1 {
          margin-bottom: 1rem;
          padding-left: 1rem;
          border-left: 0.25rem solid #6bc30d;
          font-weight: 700;
          font-size: 1.5rem;
          line-height: 1.5rem;
        }
        p {
          display: block;
          margin: 20px;
          font-size: 16px;
        }
      }
      .about-face{
        width: 100%;
        img{
          height: 60%;
          width: 100%;
        }
      }
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