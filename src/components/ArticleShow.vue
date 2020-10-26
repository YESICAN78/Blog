<!--  -->
<template>
  <div class="articlelist">
    <section
      v-for="item in articlelist"
      :key="item.index"
      @mouseenter="moveshow"
      @mouseleave="moveshowlives"
    >
      <h5>
        <span>【{{ item.type }}】</span>
        <router-link :to="'/Article/' + item._id">{{ item.title }}</router-link>
      </h5>
      <div class="time">
        <p class="date">{{ item.date | date }}</p>
        <p class="month">
          {{ item.date | month }}
          <span>月</span>
        </p>
        <p class="year">{{ item.date | year }}</p>
      </div>
      <div class="content-wrap">
        <div class="content">
          <router-link :to="'/Article/' + item._id" class="cover">
            <img :src="item.surface" alt="文章封面" />
            <i></i>
          </router-link>
          <div class="contents">{{ item.content | contentText }}</div>
        </div>
        <div class="foot-main">
          <div class="read-more">
            <router-link :to="'/Article/' + item._id">继续阅读</router-link>
          </div>
          <aside class="footer">
            <div class="tags">
              <span class="tags-read">
                <i class="el-icon-s-promotion"></i>
              </span>
              <router-link to>{{ item.tag }}</router-link>
            </div>
            <div class="PV">
              <span>
                <i class="el-icon-view"></i>
                <i>{{ item.pv }}</i>
              </span>
              <span>
                <i class="el-icon-thumb"></i>
                <i>{{ item.Give }}</i>
              </span>
            </div>
          </aside>
        </div>
      </div>
      <div
        :class="['move', { moveshow: ifwmove }, { mouslive: showmovelives }]"
      ></div>
    </section>
    <div v-if="ifloading" class="loading">
      <div>
        <span>加载中请稍等....</span>
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path" />
        </svg>
      </div>
    </div>
    <p v-if="ifnomore" class="no-more">我也是有底线的哦</p>
  </div>
</template>
<script>
//导入请求
import request from "../api/index";
let getarticleShow = request.getarticleShow;
export default {
  name: "ArticleShow",
  data() {
    return {
      ifwmove: false,
      showmovelives: false,
      articlelist: [],
      //底部没有数据了
      ifnomore: false,
      //是否加载
      ifloading: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    handelNewScroll() {
      if (this.ifnomore || this.ifloading) return;
      //浏览器的总高
      let a = document.documentElement.offsetHeight;
      //滚动高
      let b = document.documentElement.scrollTop;
      //可视区域的搞
      let c = document.documentElement.clientHeight;
      if (b + c >= a - 200) {
        this.ifloading = true;
        getarticleShow(this.id, false)
          .then((res) => {
            this.ifloading = false;
            let data = res.data.data;
            if (data.length) {
              this.articlelist.push(...res.data.data);
            } else {
              this.ifnomore = true;
            }
          })
          .catch((e) => {});
      }
    },
    moveshow() {
      this.ifwmove = true;
    },
    moveshowlives() {
      this.showmovelives = true;
    },
    getarticleShow() {
      this.ifloading = this.ifnomore = false;
      getarticleShow(this.id, true)
        .then((res) => {
          this.articlelist = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  filters: {
    date(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
    },
    month(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];
    },
    year(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];
    },
    contentText(value) {
      var div = document.createElement("div");
      div.innerHTML = value;
      return div.innerText;
    },
  },
  watch: {
    //监听路由的变化 又重新请求
    id() {
      this.getarticleShow();
      document.documentElement.scrollTop = 0;
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    //发送第一次请求
    this.getarticleShow();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    window.addEventListener("scroll", this.handelNewScroll);
  },
};
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.articlelist {
  > section {
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    margin: auto;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 20px 30px 25px;
    animation: Articlelist 3s;
    &:hover .moveshow {
      width: 100%;
      background-color: #6bc30d;
      transition: width 4s;
    }
    > .mouslive {
      width: 0;
      background-color: #6bc30d;
      transition: width 3s;
    }
    > .move {
      position: absolute;
      bottom: 0;
      height: 3px;
      width: 0;
    }
    &:nth-child(1)::before {
      content: "顶置文章";
      position: absolute;
      height: 20px;
      line-height: 20px;
      text-align: center;
      width: 74px;
      background-color: #ff5722;
      color: #fff;
      transform: rotate(-45deg);
      left: -18px;
      top: 9px;
    }
    > h5 {
      line-height: 30px;
      padding: 5px 130px 5px 0;
      border-bottom: 2px solid #e8e9e7;
      font-size: 18px;
      font-weight: 450;
      margin: 0;
      > span {
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        vertical-align: bottom;
        color: #2ea7e0;
      }
      > a {
        font-size: 16px;
        &:hover {
          color: #6bc30d;
          text-decoration: underline;
        }
      }
    }

    > .time {
      font-family: SourceCodeProRegular, Menlo, Monaco, Consolas, "Courier New",
        monospace, "Helvetica Neue", Arial, sans-serif;
      position: absolute;
      right: 10px;
      top: 10px;
      width: 90px;
      height: 70px;
      background-color: #fff;
      padding: 0 20px 5px 20px;
      line-height: 32px;
      .date {
        display: block;
        text-align: center;
        font-weight: 700;
        font-size: 40px;
        color: #6bc30d;
        position: relative;
        top: 2px;
      }
      .month {
        display: inline-block;
        color: #989997;
        font-size: 18px;
        span {
          font-size: 14px;
        }
      }
      .year {
        position: absolute;
        top: 32px;
        right: 20px;
        color: #989997;
        text-align: center;
        font-size: 18px;
      }
    }
    .content-wrap {
      position: relative;
      width: 100%;
      height: 260px;
      > .content {
        width: 100%;
       
        .cover {
          width: 260px;
          height: 100%;
          float: left;
          border: 1px solid #e8e9e7;
          margin-right: 20px;
          overflow: hidden;
          i {
            position: absolute;
            top: 0;
            left: -30px;
            display: block;
            width: 0;
            height: 80%;
            transform: transl ew(-15deg);
            box-shadow: 0 0 30px 10px rgba(255, 255, 255, 0.5);
          }
          &:hover i {
            transition: 0.8s;
            transform: translateX(350px) skew(-15deg);
          }
          > img {
            height: 100%;
            width: 260px;
          }
        }
        .contents {
          line-height: 28px;
          font-size: 16px;
          position: relative;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      }
      .foot-main {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        > .read-more {
          height: 40px;
          line-height: 40px;
          position: relative;
          &::before {
            content: " ";
            display: inline-block;
            height: 1px;
            top: 20px;
            left: 100px;
            right: 0;
            position: absolute;
            background-color: #d0d0d0;
          }
          > a {
            color: #383937;
            font-size: 16px;
            font-weight: 550;
          }
          a:hover {
            transition: color 0.3s;
            font-weight: 550;
            color: #6bc30d;
            text-decoration: underline;
          }
        }
        > .footer {
          position: relative;
          line-height: 30px;
          > .tags {
            float: left;
            > .tags-read {
              font-size: 16px;
            }
            > a {
              display: inline-block;
              text-align: center;
              padding: 3px;
              margin-left: 10px;
              font-size: 16px;
              background-color: #f1f2f0;
            }
            > a:hover {
              background-color: #6bc30d;
            }
          }
          > .PV {
            color: #787977;
            position: absolute;
            right: 10px;
            text-align: center;
            line-height: 30px;
            > span i {
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
  > .no-more {
    width: 100%;
    height: 30px;
    background-color: #fff;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
  }
  > .loading {
    width: 100%;
    background-color: #fff;
    text-align: center;
    font-size: 16px;
    div {
      position: relative;
      margin: auto;
      height: 51.5px;
      width: 220px;
      line-height: 51.5px;
    }
    span {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      height: 100%;
    }
    svg {
      position: absolute;
      right: 0;
      top: 5px;
      height: 40px;
      width: 40px;
      animation: loading-rotate 1s linear infinite;
      circle {
        height: 40px;
        width: 40px;
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: #409eff;
        stroke-linecap: round;
      }
    }
  }
  @keyframes Articlelist {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>