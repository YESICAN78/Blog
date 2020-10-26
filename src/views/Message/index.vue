<!-- 博客页面 -->
<template>
  <div class="Message">
    <Nav></Nav>
    <div class="Msg-container">
      <div class="container-fixed">
        <div class="container-inner">
          <div class="msg-title">
            <h1>留言板</h1>
            <p>文明交流，拉近你我</p>
          </div>
          <RichText @Submit="handelSubmit"></RichText>
        </div>
        <section class="user-message">
          <ul>
            <li v-for="(item,index) in commentList" :key="item.id">
              <!-- 父级的发表留言 -->
              <div class="comment-parent">
                <div class="p-img" :style="{backgroundImage:'url('+item.user.photo +')'}"></div>
                <div class="p-info">
                  <div class="p-name">{{item.user.user}}</div>
                  <div class="p-comtent" v-html=" item.content"></div>
                  <p class="p-time">
                    <i class="el-icon-location-information"></i>
                    <span>{{Adminaddress}}</span>
                    <span>{{item.date | getTime}}</span>
                    <a
                      @click="replyClick(index)"
                    >{{item.reply.lastIdexArr[0]===index && item.reply.lastIdexArr[1]===undefined ? '收起' : '回复'}}</a>
                  </p>
                </div>
              </div>
              <hr />

              <div
                class="comment-child"
                v-for="(children,childrenindex) in item.children"
                :key="children.childrenindex"
              >
                <div class="c-img" :style="{backgroundImage:'url('+children.user.photo +')'}"></div>
                <div class="c-info">
                  <div class="c-name">
                    <span class="name">{{children.user.user}}</span>回复
                    <span class="name">{{children.subsetuser}}</span>
                    <span class="content">{{children.content}}</span>
                  </div>
                  <div class="c-time">
                    <i class="el-icon-location-information"></i>
                    <span>{{Adminaddress}}</span>
                    <span>{{children.date | getTime}}</span>
                    <a
                      @click="replyClick(index,childrenindex)"
                    >{{item.reply.lastIdexArr[0]===index && item.reply.lastIdexArr[1] === childrenindex ? '收起' : '回复'}}</a>
                  </div>
                </div>
              </div>
              <div class="replycontainer">
                <div :class="['textbox',{'showbox':item.reply.ifShow}]">
                  <textarea
                    v-model="item.reply.content"
                    class="input"
                    id="demo"
                    :placeholder="'回复【'+item.reply.subsetuser+'】:'"
                  ></textarea>
                  <button
                    @click="commitchildmassage(index)"
                    size="mini"
                    type="button"
                    class="layui-btn layui-btn-xs"
                  >提交留言</button>
                </div>
              </div>
            </li>
            <div v-if="ifloading" class="loading">
              <div>
                <span>加载中请稍等....</span>
                <svg viewBox="25 25 50 50" class="circular">
                  <circle cx="50" cy="50" r="20" fill="none" class="path" />
                </svg>
              </div>
            </div>
            <p v-if="ifnomore" class="no-more">我也是有底线的哦🤷‍♀️</p>
          </ul>
        </section>
      </div>
    </div>
    <div class="footer_main">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
//导入接口
import request from "../../api";
const postifLogin = request.postifLogin;
const CommitMassage = request.CommitMassage;
const getMassageShow = request.getMassageShow;
const Replymessage = request.Replymessage;
//模板的导入
import Nav from "../../components/Nav";
import RichText from "../../components/RichText";
import Footer from "../../components/FooterBar";
import {location} from "../../../utls/Location"

function toTow(num) {
  return (num < 10 ? "0" : "") + num;
}
export default {
  name: "Link",
  components: {
    Nav,
    RichText,
    Footer
  },
  data() {
    return {
      //地理位置
      Adminaddress:'',
      ifloading: false,
      ifnomore: false,
      commentList: [],
      //限制加载的留言条数
      skip: 0,
      limit: 0,
      //地理位置
      province: ""
    };
  },
  computed: {},
  filters: {
    getTime(val) {
      let date = new Date(val);
      let YY = toTow(date.getFullYear()),
        MM = toTow(date.getMonth() + 1),
        DD = toTow(date.getDate()),
        H = toTow(date.getHours()),
        M = toTow(date.getMinutes()),
        S = toTow(date.getSeconds());
      return `${YY}年${MM}月${DD}日${H}:${M}:${S}`;
    }
  },
  methods: {
    //提交留言的函数
    handelSubmit(val) {
      //判断用户是否登录
      postifLogin()
        .then(res => {
          if (res.data.userInfo) {
            //登陆了，就发送数据到数据库 -- 执行留言提交的ajax
            CommitMassage({
              user: res.data.userInfo._id,
              content: val
            }).then(res => {
              if (res.data.code) {
                layer.msg(res.data.msg, {
                  icon: 5,
                  anim: 6
                });
              } else {
                layer.msg(res.data.msg, {
                  icon: 6
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
          } else {
            layer.msg("请先登录在留言😘", {
              icon: 5,
              anim: 6
            });
          }
        })
        .catch(() => {
          //服务出错
          layer.msg("服务器错误，稍后再试❤", {
            icon: 2,
            anim: 6
          });
        });
    },
    //点击父级评论的回复函数
    replyClick(Pindex, Cindex) {
      if (Pindex === undefined) return;
      //拿到父级评论
      let parentData = this.commentList[Pindex];
      if (Cindex === undefined) {
        //父回复
        this.commentList[Pindex].reply.subsetuser = this.commentList[
          Pindex
        ].user.user;
      } else {
        //子回复
        this.commentList[Pindex].reply.subsetuser = this.commentList[
          Pindex
        ].children[Cindex].user.user;
      }

      if (
        Pindex === parentData.reply.lastIdexArr[0] &&
        Cindex === parentData.reply.lastIdexArr[1]
      ) {
        parentData.reply.ifShow = false;
        parentData.reply.lastIdexArr = [];
      } else {
        parentData.reply.ifShow = true;
        parentData.reply.lastIdexArr = [Pindex, Cindex];
      }
    },
    //提交留言的留言函数
    commitchildmassage(Pindex) {
      //判断子留言用户是否登录
      postifLogin()
        .then(res => {
          if (res.data.userInfo) {
            //该用户已经登录了
            Replymessage({
              parentId: this.commentList[Pindex]._id,
              user: res.data.userInfo._id,
              content: this.commentList[Pindex].reply.content,
              subsetuser: this.commentList[Pindex].reply.subsetuser
            }).then(res => {
              if (res.data.code) {
                layer.msg(res.data.msg, {
                  icon: 5,
                  anim: 6
                });
              } else {
                layer.msg(res.data.msg, {
                  icon: 6
                });
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              }
            });
          } else {
            //没有登录
            layer.msg("请先登录在评论😘", {
              icon: 5,
              anim: 6
            });
          }
        })
        .catch(e => {
          //服务出错
          layer.msg("服务器错误~请稍后再试", {
            icon: 2
          });
        });
    },
    //监听滚动条加载新的留言
    handelNewScroll() {
      //如果出现加载和我是有底线的 就不滚动了
      if (this.ifloading && this.ifnomore) return;
      //浏览器的总高
      let a = document.documentElement.offsetHeight;
      //可视区域的高度
      let b = document.documentElement.clientHeight;
      //滚动高
      let c = document.documentElement.scrollTop;

      if (b + c > a - 300) {
        this.getMassageList(() => {
          getMassageShow(this.skip, this.limit).then(res => {
            if (res.data.data.length) {
              setTimeout(() => {
                this.ifnomore = true;
              }, 2000);
            } else {
              this.ifloading = true;
            }
          });
        });
      }
    },
    //获取留言函数
    getMassageList(cb) {
      this.limit += 3;
      getMassageShow(this.skip, this.limit)
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
            this.commentList = data;
          }
          cb && cb();
        })
        .catch(e => {
          cb && cb();
        });
    },
    //获取地理位置
    Getlocation() {
     let _that = this;
      let geolocation = location.initMap("map-container"); //定位
      AMap.event.addListener(geolocation, "complete", (result) => {
        _that.Adminaddress =
          result.addressComponent.province 
      });
    },
  },

  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getMassageList();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.Getlocation()
    document.documentElement.scrollTop = 0;
    window.addEventListener("scroll", this.handelNewScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handelNewScroll);
  }
};
</script>
<style scoped lang="less">
.Msg-container {
  position: relative;
  padding-top: 70px;
  transition: all 0.2s;
  min-height: 100vh;
  > .container-fixed {
    width: 90%;
    margin: auto;
    > .container-inner {
      overflow: hidden;
      height: 100%;
      width: 100%;
      background-color: #fff;
      > .msg-title {
        padding: 10px;
        h1 {
          text-align: center;
        }
        p {
          margin-top: 20px;
          text-align: center;
          font-size: 24px;
        }
      }
      > .textarea-wrap {
        margin-top: 20px;
        padding: 15px;
        margin: auto;
        width: 96%;
        height: 285px;

        > .form-content {
          position: relative;
          height: 284px;
          border: 1px solid #ccc;

          > .text-content {
            position: absolute;
            top: 60px;
            width: 100%;

            > .layui-input-block {
              margin: 0;
              padding: 10px;

              > .layui-textarea {
                height: 140px;
                font-size: 17px;
              }
            }
          }

          > .layui-form-item {
            display: inline-block;
            position: absolute;
            bottom: 0;

            > .layui-input-block {
              margin: 0;

              > .layui-btn {
                margin-left: 11px;
              }
            }
          }
        }
      }

      /deep/.layui-layedit {
        width: 90%;
        margin: auto;
        height: 238px;
        margin-bottom: 20px;
      }
    }

    > .user-message {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 100px;
      li {
        background: #fff;
        padding: 15px;
        border-bottom: 1px dotted gray;
        animation: pp 2s;

        //父级发言
        .comment-parent {
          display: flex;
          .p-img {
            overflow: hidden;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background-position: center center;
            background-size: cover;
            margin-right: 5px;
          }

          .p-info {
            width: 93%;
            margin: auto;
            .p-name {
              color: #01aaed;
            }
            .p-comtent {
              padding: 7px 0 6px 0;
              min-height: 30px;
              line-height: 20px;
              font-size: 14px;
              color: rgb(53, 53, 53);
            }

            .p-time {
              color: #515250;

              i {
                margin: 0 5px;
              }

              span {
                margin: 0 3px;
              }

              a {
                user-select: none;
                color: #009688;
                cursor: pointer;
              }
            }
          }
        }

        hr {
          margin-left: 40px;
          margin-bottom: 10px;
        }

        .comment-child {
          display: flex;
          margin-top: 5px;
          margin-left: 40px;

          .c-img {
            height: 40px;
            width: 40px;
            overflow: hidden;
            border-radius: 50%;
            background-position: center center;
            background-size: cover;
            margin-right: 5px;
          }

          .c-info {
            width: 90%;
            .c-name {
              .name {
                color: #01aaed;
                padding: 0 3px;
              }
              .content {
                margin-left: 2px;
                line-height: 20px;
              }
            }
            .c-time {
              margin-top: 12px;
              color: gray;
              i {
                margin: 0 5px;
              }
              span {
                margin: 0 3px;
              }
              a {
                user-select: none;
                color: #009688;
                cursor: pointer;
              }
            }
          }
        }
        .replycontainer {
          width: 100%;
          margin-top: 30px;
          transition: height 0.5s;
          overflow: hidden;
          .textbox {
            position: relative;
            width: 90%;
            height: 0;
            margin: 0 41px;
            transition: height 0.5s;
            &.showbox {
              height: 131px;
            }
            .input {
              min-height: 80px;
              width: 90%;
              color: gray;
              font-size: 16px;
              padding: 12px;
              font-family: SimSun;
            }
            .layui-btn {
              position: absolute;
              bottom: 0;
              left: 0;
            }
          }
        }
      }
      @keyframes pp {
        from {
          opacity: 0;
          transform: scale(0);
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
      .loading {
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

      .no-more {
        width: 100%;
        height: 30px;
        background-color: #fff;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
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
