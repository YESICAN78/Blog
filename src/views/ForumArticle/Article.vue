<!--  -->
<template>
  <div class="details">
    <Nav></Nav>
    <div class="ForumArticle">
      <div class="article-main">
        <div class="header-top">
          <h4>{{articles.title}}</h4>
          <p>
            <span class="author">
              作者:
              <span class="a-name">{{articles.user}}</span>
            </span>
            <span class="author">
              文章热度:
              <span class="a-host">{{articles.Give}}</span>
            </span>
            <span class="author">
              点赞量:
              <span class="a-host">{{articles.pv}}</span>
            </span>
            <span class="author">
              发布时间:
              <span class="a-time">{{articles.date | getTime}}</span>
            </span>
            <span class="author">
              更新时间:
              <span class="a-update">{{articles.date | getTime}}</span>
            </span>
          </p>
        </div>
        <div class="content" v-html="articles.content"></div>
      </div>
    </div>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import FooterBar from "../../components/FooterBar"

//引入接口
import request from "../../api/index";
const Postdetails = request.Postdetails;

import Nav from "../../components/Nav";
function toTow(num) {
  return (num < 10 ? "0" : "") + num;
}
export default {
  name: "Article",
  components: {
    Nav,
    FooterBar
  },
  data() {
    return {
      articles: {
        title: "",
        content: "",
        user: "",
        date: "",
        pv: 0,
        Give:0
      }
    };
  },
  filters: {
    getTime(val) {
      let date = new Date(val);
      let YY = toTow(date.getFullYear()),
        MM = toTow(date.getMonth() + 1),
        DD = toTow(date.getDate()),
        H = toTow(date.getHours()),
        M = toTow(date.getMinutes()),
        S = toTow(date.getSeconds());
      return `${YY}/${MM}/${DD}/${H}:${M}:${S}`;
    }
  },
  methods: {
    getArticle() {
      Postdetails(this.$route.params.id)
        .then(res => {
          console.log(res.data)
          let data = res.data.data;
          this.articles.title = data.title;
          this.articles.content = data.content;
          this.articles.user = data.user.user;
          this.articles.date = data.date;
          this.articles.pv = data.pv;
        })
        .catch(() => {});
    }
  },

  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getArticle();
  }
};
</script>
<style scoped lang="less">
.details {
  position: relative;
  box-sizing: border-box;
  padding-top: 70px;
  transition: all 0.2s;
  min-height: 100vh;
  .ForumArticle {
    width: 80%;
    margin: auto;
    margin-bottom: 300px;
    background-color: #fff;
    .article-main {
      box-sizing: border-box;
      padding: 20px 30px;
      .header-top {
        width: 100%;
        h4 {
          display: block;
          margin-bottom: 20px;
          font-size: 30px;
          color: gray;
        }
        .author {
          margin-left: 10px;
          font-size: 16px;
          .a-name {
            color: #3e8bc7;
          }
          .a-host,
          .a-time,
          .a-update {
            color: gray;
          }
        }
        .author:nth-child(1) {
          margin-left: 0;
        }
      }
      .content {
        margin-top: 20px;
        width: 100%;
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
}
</style>