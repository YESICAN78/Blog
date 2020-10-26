<!-- 博客页面 -->
<template>
  <div class="Home">
    <!-- 背景图 -->
    <div class="bgc" :style="{height:bgHieght + 'px'}">
      <div class="bgc-content">
        <h1>SUNFULIN</h1>
        <h2>天生我材必有用</h2>
        <router-link to="/blog/0">Enter Blog</router-link>
      </div>
      <i @click="bottommove" class="icon el-icon-arrow-down"></i>
    </div>
    <!-- 右上角的小图标 -->
    <div class="menu">
      <div :class="['btn',{'btnclick':ifclick}]" @click="btnclick">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div v-if="ifshow" :class="{'cover':ifcover}">
        <div class="point">
          <router-link to="/">首页</router-link>
          <router-link to="/blog/0">博客</router-link>
          <router-link to="/message">留言</router-link>
        </div>
        <div class="cover-logo">Sun.Funlin</div>
      </div>
    </div>
    <!-- 热门文章 -->
    <div class="hot">
      <div class="hot-main">
        <div :class="['text',{'loading1':loading.loading1}]">
          <h2>热门文章</h2>
          <p>
            很想给你写封信,告诉你这里的天气.
            <br />昨夜的那场电影,还有我的心情.
          </p>
        </div>
        <ul :class="['hotarticle',{'loading2':loading.loading2}]">
          <li v-for="item in ArticleHostlist" :key="item.index">
            <div class="img">
              <div class="bgImag">
                <img :src="item.surface" alt />
              </div>
              <div class="link">
                <a href>
                  <i class="el-icon-link"></i>
                </a>
              </div>
            </div>
            <div class="info">
              <div class="title">
                <router-link :to="'/Article/'+item._id">{{item.title}}</router-link>
              </div>
              <div class="time">{{item.date|year}}年{{item.date|month}}月{{item.date|date}}日</div>
              <div class="content" v-html="item.content"></div>
              <router-link to="/blog/0" class="link">阅读更多</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="about">
      <div :class="['sb-wrap',{'loading3':loading.loading3}]">
        <ul>
          <li>
            <router-link to="/about">关于</router-link>
          </li>
          <li>
            <router-link to="/links">+友情连接</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="section">
      <div class="ct-main">
        <div class="content">
          <h1 :class="['h1',{'loading5':loading.loading5}]">上帝的使者</h1>
          <p :class="['p',{'loading6':loading.loading6}]">爱好游戏，闲着没事喜欢一些不健康东西😄，撸起代码就会废寝忘食。</p>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div :class="['fotter-main',{'loading7':loading.loading7}]">
        <div class="container">
          <div class="BlogIfo">
            <h1>Sun.Fulin</h1>
            <p>天生我材必有用</p>
            <div>
              <router-link to="/about">About-Me</router-link>
            </div>
          </div>
          <div class="link">
            <h2>相关连接</h2>
            <ul>
              <li>
                <router-link to="/blog/0">
                  <i class="el-icon-collection"></i>
                  博文
                </router-link>
              </li>
              <li>
                <router-link to="/message">
                  <i class="el-icon-chat-dot-round"></i>
                  留言
                </router-link>
              </li>
              <li>
                <router-link to="/diary">
                  <i class="el-icon-umbrella"></i>
                  日记
                </router-link>
              </li>
              <li>
                <router-link to="/about">
                  <i class="el-icon-collection"></i>
                  关于
                </router-link>
              </li>
              <li>
                <router-link to="/links">
                  <i class="el-icon-s-custom"></i>
                  友链
                </router-link>
              </li>
            </ul>
          </div>
          <div class="contact">
            <h2>联系我</h2>
            <ul>
              <li>
                <i class="el-icon-collection"></i>
                地址：贵州省六盘水市
              </li>
              <li>
                <i class="el-icon-collection"></i>
                QQ：2517097405
              </li>
              <li>
                <i class="el-icon-collection"></i>
                邮箱：2517097405@qq.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="fotter-botton">站住的地址</div>
    </footer>
  </div>
</template>
<script>
import request from "../../api/index";
const getarticlehot = request.getarticlehot;
export default {
  name: "Home",
  data() {
    return {
      bgHieght: 0,
      ifclick: false,
      ifcover: false,
      ifshow: false,
      //文章列表
      ArticleHostlist: [],
      //相应式数据
      loading: {
        loading1: true,
        loading2: true,
        loading3: true,
        loading5: true,
        loading6: true,
        loading7: true
      },
      scrollTop: 0
    };
  },
  methods: {
    //获取window的高设置 背景图片
    getWindowHeight() {
      this.bgHieght = window.innerHeight;
    },
    btnclick() {
      this.ifclick = !this.ifclick;
      this.ifcover = !this.ifcover;
      //是否显示首页导航栏
      this.ifshow = !this.ifshow;
    },
    // 滚动相应式函数
    handelScroll() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let t = document.documentElement && document.documentElement.scrollTop;
      if (t) {
        if (this.scrollTop > 28) {
          this.loading.loading1 = false;
        }
        if (this.scrollTop > 263) {
          this.loading.loading2 = false;
        }
        if (this.scrollTop >= 1000) {
          this.loading.loading3 = false;
        }
        if (this.scrollTop >= 1260) {
          this.loading.loading5 = false;
          this.loading.loading6 = false;
        }
        if (this.scrollTop >= 1400) {
          this.loading.loading7 = false;
        }
      } else {
        if (this.scrollTop > 28) {
          this.loading.loading1 = false;
        }
        if (this.scrollTop > 263) {
          this.loading.loading2 = false;
        }
        if (this.scrollTop >= 1000) {
          this.loading.loading3 = false;
        }
        if (this.scrollTop >= 1260) {
          this.loading.loading5 = false;
          this.loading.loading6 = false;
        }
        if (this.scrollTop >= 1400) {
          this.loading.loading7 = false;
        }
      }
    },
    // 点击小图标乡下移动
    bottommove() {
      document.documentElement.scrollTop = this.bgHieght;
    },
    //获取用户的登录信息
   
  },
  //时间过滤器
  filters: {
    date(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
    },
    month(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];
    },
    year(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    document.documentElement.scrollTop = 0;
    //请求热门文章
    getarticlehot(3).then(res => {
      this.ArticleHostlist = res.data.data;
    });
    //size
    this.getWindowHeight();
    window.addEventListener("resize", this.getWindowHeight);
    //scroll
    this.handelScroll();
    if (document.addEventListener) {
      document.addEventListener("scroll", this.handelScroll);
    } else {
      document.attachEvent("onDOMMouseScroll", this.handelScroll);
    }
  },
  destroyed() {
    this.scrollTop = 0;
    window.removeEventListener("resize", this.getWindowHeight);
  }
};
</script>
<style scoped lang="less">
.Home {
  user-select: none;
  .bgc {
    overflow: hidden;
    position: relative;
    width: 100%;
    background: url("../../assets/imgs/bgc.jpg") center center/cover;
    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }

    .bgc-content {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 100%;
      height: 154px;
      color: white;
      text-align: center;
      font-size: 14px;
      z-index: 1;
      animation: bgc 3s;

      h1 {
        font-size: 4rem;
        font-weight: 400;
      }

      h2 {
        margin: 15px 0;
        letter-spacing: 10px;
      }

      a {
        display: inline-block;
        height: 38px;
        line-height: 38px;
        padding: 0 18px;
        color: #fff;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        background-color: #1e9fff;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    @keyframes bgc {
      from {
        transform: scale(0);
      }

      to {
        transform: scale(1);
      }
    }

    .icon {
      position: absolute;
      height: 50px;
      width: 50px;
      left: 50%;
      border-radius: 50%;
      overflow: hidden;
      color: white;
      margin-left: -25px;
      text-align: center;
      font-size: 40px;
      line-height: 50px;
      font-weight: 700;
      bottom: 20px;
      z-index: 2;

      &:hover {
        background-color: #1e9fff;
        transition: all 0.6s ease-in-out;
        cursor: pointer;
      }
    }
  }

  .menu {
    .btn {
      box-sizing: border-box;
      position: fixed;
      z-index: 999;
      right: 55px;
      top: 40px;
      padding-top: 12px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
      background-color: transparent;
      transition: background-color 0.3s;

      &:hover {
        background-color: #6bc30d;
      }

      span {
        position: relative;
        top: 0;
        display: block;
        width: 26px;
        height: 2px;
        margin: 0 auto 5px;
        background-color: #fff;
        transition: all 0.32s;
        transform: rotate(0deg);
      }
    }

    .btnclick {
      background-color: rgba(0, 0, 0, 0.1);

      span:nth-child(1) {
        top: 8px;
        transform: rotate(45deg);
      }
      span:nth-child(2) {
        top: 1px;
        transform: rotate(-45deg);
      }
      span:nth-child(3) {
        display: none;
      }
    }
    .cover {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.6);
      &::before {
        position: absolute;
        left: 68%;
        right: 0;
        top: 0;
        content: "";
        height: 100%;
        width: 4999px;
        background-color: #f9faf9;
        transform: skew(-12deg);
      }
      .point {
        position: absolute;
        right: 0;
        top: 200px;
        a {
          position: relative;
          font-size: 20px;
          display: block;
          color: #686967;
          padding: 15px 35px;
          margin-right: 20px;
          text-align: center;

          &::before {
            position: absolute;
            left: -8%;
            top: 53%;
            height: 1px;
            width: 0;
            opacity: 0;
            content: "";
            background-color: #6bc30d;
            transition: all 0.3s;
          }
          &:hover {
            color: #6bc30d;
          }
          &:hover::before {
            width: 100%;
            opacity: 1;
          }
        }
      }
      .cover-logo {
        position: absolute;
        right: 30px;
        bottom: 20px;
        font-size: 60px;
        font-family: BarbaraHand;
      }
    }
  }

  .hot {
    height: 800px;
    width: 100%;
    position: relative;
    overflow: hidden;
    z-index: 5;
    background-color: #fff;
    .hot-main {
      max-width: 1170px;
      width: 100%;
      margin: 70px auto;
      text-align: center;
      .text {
        position: relative;
        top: 0;
        opacity: 1;
        transition: opacity 1s, top 1s;
        &.loading1 {
          top: -205px;
          opacity: 0;
        }
        p {
          margin-top: 20px;
          line-height: 22px;
          color: #888;
        }

        h2 {
          position: relative;
          font-size: 32px;
          padding-bottom: 30px;
          font-weight: 500;

          &::before {
            position: absolute;
            width: 50px;
            height: 2px;
            content: "";
            left: 50%;
            margin-left: -25px;
            bottom: -1px;
            background: #00c2ff;
          }
        }
      }

      .hotarticle {
        margin-top: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between;

        li {
          position: relative;
          top: 0;
          overflow: hidden;
          float: left;
          width: 372px;
          height: 460px;
          margin: 0 10px;
          opacity: 1;

          .img {
            position: relative;
            width: 100%;
            height: 244px;
            overflow: hidden;

            img {
              width: 100%;
              height: 244px;
            }

            .link {
              position: absolute;
              top: -100%;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(255, 255, 255, 0.3);
              opacity: 0;
              transition: 0.3s;

              a {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                display: block;
                height: 40px;
                width: 40px;
                color: #fff;

                i {
                  height: 100%;
                  width: 100%;
                  font-size: 34px;
                }
              }
            }
          }

          .info {
            box-sizing: border-box;
            width: 100%;
            height: 240px;
            padding: 20px 15px;
            background-color: #faf9f9;

            .title {
              margin-bottom: 10px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;

              a {
                display: block;
                font-size: 16px;
                color: #333;
                text-align: left;

                &:hover {
                  color: #777;
                }
              }
            }

            .time {
              text-align: left;
              color: #777;
            }

            .content {
              color: #999;
              box-sizing: border-box;
              height: 52.8px;
              margin-top: 10px;
              line-height: 18px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              text-align: left;
            }

            .link {
              display: inline-block;
              margin-top: 20px;
              font-size: 19px;
              height: 30px;
              color: #29b6f6;
              width: 100%;
              text-align: left;

              &:hover {
                color: #000;
                transition: color 2s;
              }
            }
          }

          &:hover .img img {
            transform: scale(1.5);
            transition: all 2s;
          }

          &:hover .link {
            top: 0;
            opacity: 1;
          }
        }

        li:nth-child(1) {
          transition: opacity 2s, top 0s;
        }

        li:nth-child(2) {
          transition: opacity 2s, top 2s;
        }

        li:nth-child(3) {
          transition: opacity 2s, top 4s;
        }

        &.loading2 li {
          top: 120px;
          opacity: 0;
        }
      }
    }
  }

  .about {
    position: relative;
    width: 100%;
    height: 70px;
    padding: 100px 0;
    margin: 0 auto;
    background: url("../../assets/imgs/aboutbgc.jpg") center center/cover fixed;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }

    .sb-wrap {
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 60px;
      transform: scale(1);
      transition: all 1s;

      ul {
        position: relative;
        width: 55%;
        height: 100%;
        margin: auto;
        display: flex;
        justify-content: space-between;

        li {
          width: 30%;
          height: 100%;
          line-height: 60px;
          left: 100%;
          right: 150%;
          text-align: center;
          border: 1px solid white;
          transition: all 2s;

          a {
            position: relative;
            display: block;
            height: 100%;
            width: 100%;
            color: white;
            font-size: 16px;

            &::after {
              position: absolute;
              left: 0;
              top: 0;
              content: "";
              height: 100%;
              width: 0;
              z-index: -1;
              background-color: #6bc30d;
              transition: width 1s;
            }

            &:hover::after {
              width: 100%;
            }
          }
        }
      }
    }

    .loading3 {
      opacity: 0;
      transform: scale(0);
    }
  }

  .section {
    position: relative;
    height: 276px;
    width: 100%;
    background-color: #fff;

    .ct-main {
      position: relative;
      width: 100%;
      position: absolute;
      top: 50%;
      margin-top: -25.5px;

      .content {
        position: relative;

        h1 {
          display: block;
          margin: 20px;
          width: 100%;
          text-align: center;
          transition: opacity 1s, width 1.5s;
          opacity: 1;

          &.loading5 {
            opacity: 0;
            width: 0;
          }
        }

        p {
          display: block;
          width: 100%;
          text-align: center;
          transition: opacity 1s, width 3s;
          opacity: 1;

          &.loading6 {
            opacity: 0;
            width: 50%;
            background: #1d1d21;
          }
        }
      }
    }
  }

  .footer {
    position: relative;
    width: 100%;
    height: 100%;
    background: #232328;

    .fotter-main {
      padding: 60px 0 90px 0;
      width: 100%;
      transform: scale(1);
      transition: all 2s;

      .container {
        width: 90%;
        padding: 0 15px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .BlogIfo {
          height: 121px;
          width: 33.33333%;
          color: #fff;

          h1 {
            display: block;
            margin-bottom: 15px;
            font-size: 40px;
            text-align: left;
            font-family: BarbaraHand;
          }

          p {
            display: block;
            text-align: left;
            margin-bottom: 10px;
          }

          div {
            height: 50px;
            width: 101.4px;
            line-height: 50px;
            text-align: center;
            background: cornflowerblue;

            a {
              display: block;
              height: 100%;
              width: 100%;
              font-size: 16px;
              color: #fff;
            }
          }
        }

        .link {
          height: 151px;
          width: 33.33333%;
          h2 {
            display: block;
            width: 100%;
            text-align: left;
            margin-bottom: 15px;
            color: #fff;
          }

          ul {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            li {
              margin-bottom: 20px;
              width: 50%;

              a {
                color: #fff;
                height: 100%;
                width: 100%;
                font-size: 16px;
              }
            }
          }
        }

        .contact {
          height: 121px;
          width: 33.33333%;

          h2 {
            display: block;
            width: 100%;
            text-align: left;
            margin-bottom: 15px;
            color: #fff;
          }

          ul {
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            li {
              margin-bottom: 20px;
              width: 100%;
              color: #fff;
            }
          }
        }
      }
    }

    .loading7 {
      transform: scale(0);
    }

    .fotter-botton {
      width: 100%;
      padding: 12px 0;
      position: absolute;
      z-index: 1;
      line-height: 30px;
      text-align: center;
      background: #1d1d21;
    }
  }
}
</style>
