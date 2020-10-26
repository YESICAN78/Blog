<!-- 博客页面 -->
<template>
  <div class="Links">
    <Nav></Nav>
    <div class="canvas">
      <div class="text">
        <slot name="about">
          <h2>Sun.Fulin</h2>
          <p>对影潭兮预揽月，只为再抚卿柔面</p>
        </slot>
      </div>
      <Canvas></Canvas>
    </div>
    <div class="link-main">
      <div class="rule">
        <h2>申请说明</h2>
        <p>
          <i class="fa fa-close"></i>经常宕机&nbsp;
          <i class="fa fa-close"></i>不合法规&nbsp;
          <i class="fa fa-close"></i>插边球站&nbsp;
          <i class="fa fa-close"></i>红标报毒&nbsp;
          <i class="fa fa-check"></i>原创优先&nbsp;
          <i class="fa fa-check"></i>技术优先
        </p>
        <div class="siteinfo">
          <p>本站连接在下:</p>
          <p>网址：</p>
          <p>
            描述：
            <span>Sun.Fulin</span>·一个人的江湖
          </p>
          <p>欢迎每位用户你好，我是站主，在留言区请文明留言，谢谢！</p>
        </div>
      </div>
      <div class="link-main">
        <ul>
          <li target="_blank" v-for="(item) in links" :key="item.index">
            <a :href="item.href">
              <img :src="item.icon" />
              <h3>{{item.name}}</h3>
              <p>{{item.des}}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
 <div class="footer_main">
   <FooterBar></FooterBar>
 </div>
  </div>
</template>

<script>
import Nav from "../../components/Nav";
import Canvas from "../../components/Canvas";
import FooterBar from "../../components/FooterBar"
import request from "../../api/index";
const getLinks = request.getLinks;
export default {
  name: "Link",
  data() {
    return {
      links: []
    };
  },
  components: {
    Nav,
    Canvas,
    FooterBar
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
     document.documentElement.scrollTop = 0;
     getLinks().then(res=>{
       this.links = res.data.data;
     }).catch(()=>{})
  }
};
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.Links {
  position: relative;
  width: 100%;
  padding-top: 61px;
  .canvas {
    position: relative;
    width: 100%;
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
        font-size: 80px;
        padding-bottom: 20px;
        font-family: BarbaraHand;
      }
      p {
        font-size: 20px;
      }
    }
  }
  .link-main {
    box-sizing: border-box;
    width: 85%;
    margin: 30px auto;
    padding-bottom: 60px;
    .rule {
      box-sizing: border-box;
      padding: 20px;
      background-color: #fff;
      h2 {
        display: block;
        text-indent: 5px;
        border-left: 4px solid #6bc30d;
        font-weight: 700;
        color: #515250;
      }
      p {
        display: block;
        margin: 20px 0;
        font-weight: bold;
        color: #515250;
      }
      .siteinfo {
        color: #515250;
        p:nth-child(3) {
          span {
            font-family: BarbaraHand;
            font-size: 20px;
          }
        }
      }
    }
    .link-main {
      width: 100%;
      margin-top: 20px;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          position: relative;
          box-sizing: border-box;
          width: 23.5%;
          margin-top: 25px;
          height: 154px;
          background-color: #fff;
          transition: all 0.3s ease-in-out;
          &:hover {
            box-shadow: 0 0 10px #fff;
            top: -5px;
          }
          a {
            box-sizing: border-box;
            display: block;
            height: 100%;
            width: 100%;
            padding: 15px;
            color: #333;

            &:hover {
              color: #777;
            }
            img {
              float: left;
              width: 40px;
              height: 40px;
              margin-right: 10px;
              border-radius: 50%;
            }
            h3 {
              display: block;
              height: 14px;
              overflow: hidden;
              font-size: 1.17em;
              margin-block-start: 1em;
              margin-block-end: 1em;
              margin-inline-start: 0px;
              margin-inline-end: 0px;
            }
            p {
              box-sizing: border-box;
              display: block;
              height: 60px;
              overflow: hidden;
              padding-top: 10px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              text-overflow: ellipsis;
              font-size: 13px;
              height: 50px;
            }
          }
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