<!-- 类容部分 -->
<template>
  <div class="Forumcontent">
    <div class="Topstory-mainColumnCard">
      <ul>
        <li v-for="(item,index) in infomationList" :key="item._id">
          <div class="box">
            <a class="title" :href="'/Forumarticle/'+ item._id">{{item.title}}</a>
            <p class="time">发布时间:{{item.date | Time}}</p>
            <div class="RichContent">
              <div class="RichContent-cover">
                <router-link :to="'/Forumarticle/'+ item._id">
                  <img :src="item.forumface" alt />
                </router-link>
              </div>
              <div class="RichContent-inner">
                <div class="RichText" v-html="item.content"></div>
              </div>
            </div>
          </div>
          <div class="ContentItem-actions">
            <span @click="addpv(item._id)">
              <svg
                class="Zi Zi--Like"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                style="margin-right: 5px;"
              >
                <path
                  d="M14.445 9h5.387s2.997.154 1.95 3.669c-.168.51-2.346 6.911-2.346 6.911s-.763 1.416-2.86 1.416H8.989c-1.498 0-2.005-.896-1.989-2v-7.998c0-.987.336-2.032 1.114-2.639 4.45-3.773 3.436-4.597 4.45-5.83.985-1.13 3.2-.5 3.037 2.362C15.201 7.397 14.445 9 14.445 9zM3 9h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z"
                  fill-rule="evenodd"
                />
              </svg>
              {{item.pv}}
            </span>
            <span @click="MassageClick(item._id,index)">
              <i class="el-icon-s-comment"></i>
              {{item.commentnum | Num}}条评论
            </span>
            <span @click="Collection(item._id)">
              <i class="el-icon-star-on"></i>
              收藏
            </span>
            <span class="reding">
              <router-link :to="'/Forumarticle/'+ item._id">阅读全文</router-link>
            </span>
          </div>
          <Massage
            @PcurrentChange="PcurrentChange"
            :aid="item._id"
            :Articledata="Articledata"
            ref="RechText"
          ></Massage>
        </li>
      </ul>
      <div v-if="ifloading" class="loading">
          <div>
            <span>加载中请稍等....</span>
            <svg viewBox="25 25 50 50" class="circular">
              <circle cx="50" cy="50" r="20" fill="none" class="path" />
            </svg>
          </div>
        </div>
        <p v-if="ifnomore" class="no-more">我也是有底线的哦😎</p>
    </div>
  </div>
</template>

<script>
import Massage from "./Massage";

//导入接口
import request from "../../api/index";
const PostgetArticle = request.PostgetArticle;
const getforumMsg = request.getforumMsg;
const postifLogin = request.postifLogin;
const PostCollection = request.PostCollection;
const Updatacollarticle = request.Updatacollarticle;
const Postpv = request.Postpv;

function setNum(num) {
  return num / 1000 > 10 ? num / 10000 + "万" : num;
}

function getTime(val) {
  return (val < 10 ? "0" : "") + val;
}
export default {
  name: "Container",
  components: { Massage },
  data() {
    return {
      ifshowRechText: false,
      infomationList: [],
      //文章评论相关数据
      Articledata: [],
      skip: 0,
      limit: 0,
      //请求文章的数据
      skip1: 0,
      limit1: 5,
      //点赞的数据
      ifpv: 1,
      //储存文章的id
      aid: "",
      //页码相关的数据
      PageSize: 8, //每次请求10章文章
      PindexSize: 1, //默认1页
      //底部没有数据了
      ifnomore: false,
      //是否加载
      ifloading: false,
    };
  },
  filters: {
    Num(val) {
      let pp = setNum(val);
      return pp;
    },
    Time(val) {
      let date = new Date(val);
      let YY = getTime(date.getFullYear()),
        MM = getTime(date.getMonth() + 1),
        DD = getTime(date.getDate()),
        H = getTime(date.getHours()),
        M = getTime(date.getMinutes()),
        S = getTime(date.getSeconds());
      return `${YY}/${MM}/${DD}/${H}:${M}:${S}`;
    }
  },
  computed: {},
   watch: {
    //监听路由的变化 又重新请求
    id() {
      this.getAllarticle();
      document.documentElement.scrollTop = 0;
    }
  },
  methods: {
    //请求文章的函数
    getAllarticle() {
      this.ifloading = this.ifnomore = false;
      PostgetArticle(this.skip1, this.limit1)
        .then(res => {
          this.infomationList = res.data.data;
        })
        .catch(() => {});
    },
    //监听滚条获取文章
    handelNewScroll() {
      if (this.ifnomore || this.ifloading) return;
      //浏览器的总高
      let a = document.documentElement.offsetHeight;
      //滚动高
      let b = document.documentElement.scrollTop;
      //可视区域的搞
      let c = document.documentElement.clientHeight;

      if (b + c >= a - 300) {
        this.ifloading = true;
        this.skip1 +=5;
        PostgetArticle(this.skip1, this.limit1)
          .then(res => {
            this.ifloading = false;
            let data = res.data.data;
            if (data.length) {
              this.infomationList.push(...data);
            } else {
              this.ifnomore = true;
            }
          })
          .catch(e => {});
      }
    },
    //控制子组件的函数
    MassageClick(aid, index) {
      this.$refs.RechText[index].Massagefn(index);
      // 获取该篇文章的评论信息
      this.aid = aid;
      getforumMsg({
        aid,
        skip: this.skip,
        limit: this.limit
      })
        .then(res => {
          let data = res.data.data;
          if (res.data.code === 0) {
            data.forEach(item => {
              item.reply = {
                user: "", //id(谁回复我)
                content: "", //回复的类容
                subsetuser: "",
                date: "",
                ifShow: false, //是否显示回复框
                lastIdexArr: [] //保存现在的点击的父级和子集的输入框
              };
            });
            this.Articledata = data;
          }
        })
        .catch(() => {});
    },
    //Massage组件的事件函数
    PcurrentChange(index, size) {
      let skip = size * (index - 1);
      getforumMsg({
        aid: this.aid,
        skip: skip,
        limit: size
      })
        .then(res => {
          let data = res.data.data;
          if (res.data.code === 0) {
            data.forEach(item => {
              item.reply = {
                user: "", //id(谁回复我)
                content: "", //回复的类容
                subsetuser: "",
                date: "",
                ifShow: false, //是否显示回复框
                lastIdexArr: [] //保存现在的点击的父级和子集的输入框
              };
            });
            this.Articledata = data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //点击收藏发送数据
    Collection(aid) {
      //判断是否登录
      postifLogin()
        .then(res => {
          if (res.data.userInfo) {
            //更新收藏
            Updatacollarticle(aid, res.data.userInfo._id).then(res => {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
          } else {
            this.$message({
              message: "请先登录",
              type: "warning"
            });
          }
        })
        .catch(() => {
          this.$message.error(res.data.msg);
        });
    },
    //点赞量的请求
    addpv(aid) {
      let userid = localStorage.getItem("userid");
      Postpv(aid, userid)
        .then(res => {
          if (res.data.code) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "warning",
              duration: 1000
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 1000
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch(() => {});
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getAllarticle();
    window.addEventListener("scroll", this.handelNewScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handelNewScroll);
  },
};
</script>
<style  scoped lang="less">
.Forumcontent {
  box-sizing: border-box;
  padding: 0 10px;
  .Topstory-mainColumnCard {
    width: 100%;
    ul > li {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 15px;
      margin-bottom: 10px;
      overflow: hidden;
      background-color: #fff;
      animation: Articlelist 3s;
      .title {
        font-size: 18px;
        width: 430px;
        overflow: hidden;
        font-weight: 600;
        display: block;
        float: left;
        margin-bottom: 20px;
        transition: color 0.4s;
        &:hover {
          color: #6bc30d;
        }
      }

      .box {
        position: relative;
        .time {
          position: absolute;
          right: 5px;
          color: gray;
        }
        .RichContent {
          position: relative;
          height: 220px;
          .RichContent-cover {
            position: absolute;
            top: 30px;
            left: 0;
            bottom: 0;
            width: 250px;
            height: 100%;
            img {
              width: 250px;
            }
          }
          .RichContent-inner {
            position: absolute;
            top: 30px;
            right: 20px;
            width: 74%;
             display: -webkit-box;
             overflow: hidden;
             line-height: 20px;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 4;
            a {
              color: #ccc;
              font-size: 16px;
              transition: color 0.3s;
              &:hover {
                color: #6bc30d;
              }
            }
            .RichText {
             margin-left: 20px;
            }
          }
        }
      }
      .ContentItem-actions {
        margin-top: 30px;
        width: 100%;
        height: 50px;
        font-size: 20px;
        user-select: none;
        span {
          margin-left: 15px;
          cursor: pointer;
          transition: color 0.3s;
          color: #ccc;
          &:hover {
            color: #6bc30d;
          }
        }
        .reding {
          position: absolute;
          right: 40px;
          a {
            transition: color 0.3s;
            font-size: 20px;
            color: #ccc;
            &:hover {
              color: #6bc30d;
            }
          }
        }
        .Ifshow,
        .IfCollshow {
          color: #6bc30d;
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
    > .no-more {
    width: 100%;
    height: 30px;
    background-color: #fff;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
  }
  }
}
</style>