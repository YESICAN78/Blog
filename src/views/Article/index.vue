<!-- 文章详情页面 -->
<template>
  <div class="Article">
    <Nav></Nav>
    <div class="article">
      <div v-if="ArticleInfo">
        <div class="article-main">
          <section class="a-top">
            <div class="a-info">
              <h4>{{ ArticleInfo.title }}</h4>
              <p>
                <small>
                  作者:
                  <span class="anthor">Sun.Fulin</span>
                </small>
                <small>
                  浏览量:
                  <span>{{ ArticleInfo.pv }}</span>
                </small>
                <small>
                  点赞量:
                  <span>{{ ArticleInfo.Give }}</span>
                </small>
                <small>
                  更新于:
                  <span>{{ ArticleInfo.updateData | getTime }}</span>
                </small>
              </p>
            </div>
            <div class="time">
              <p class="date">{{ ArticleInfo.date | date }}</p>
              <p class="month">
                {{ ArticleInfo.date | month }}
                <span>月</span>
              </p>
              <p class="year">{{ ArticleInfo.date | year }}</p>
            </div>
          </section>
          <section class="a-container" v-html="ArticleInfo.content"></section>
          <section class="a-Explain">
            <div class="a-e">
              <p>
                特殊说明:文章版权归
                <span>Sun.Fulin</span>
                所有，转载注明出处
              </p>
              <p>本文标题:{{ ArticleInfo.title }}</p>
              <p>
                本文连接:
                <a :href="Pathss">{{ Pathss }}</a>
              </p>
            </div>
          </section>
          <section class="music">
            <div
              class="mc-img"
              style="
                backgroundimage: url('http://p2.music.126.net/JfCT3qEzMnKHR6KrqZykhA==/109951164620670666.jpg');
                backgroundsize: 100% 100%;
              "
            >
              <span @click="ifplay" class="mc-log" v-if="stop">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 16 31"
                >
                  <path
                    d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"
                  />
                </svg>
              </span>
              <p @click="ifstop" v-if="play">
                <i class="el-icon-video-pause"></i>
              </p>
            </div>
            <div class="music-1">
              <span>神木有灵（梦幻西游巫蛮儿同人曲）</span>
              <span>- 银临</span>
              <div class="block">
                <el-slider
                  @change="change(changetime)"
                  v-model="value"
                  :show-tooltip="false"
                ></el-slider>
              </div>
              <audio
                ref="ifaudio"
                src="../../assets/Mp3/Mp3.mp3"
                loop="loop"
              ></audio>
            </div>
          </section>
          <section class="pv">
            <div>
              <span @click="Give(ArticleInfo._id)">
                <svg
                  data-v-6a6b35b6
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="50"
                  height="50"
                  class="Zi Zi--Like"
                >
                  <path
                    data-v-6a6b35b6
                    d="M14.445 9h5.387s2.997.154 1.95 3.669c-.168.51-2.346 6.911-2.346 6.911s-.763 1.416-2.86 1.416H8.989c-1.498 0-2.005-.896-1.989-2v-7.998c0-.987.336-2.032 1.114-2.639 4.45-3.773 3.436-4.597 4.45-5.83.985-1.13 3.2-.5 3.037 2.362C15.201 7.397 14.445 9 14.445 9zM3 9h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </section>
          <section class="massage">
            <RichText @Submit="Submit"></RichText>
          </section>
          <section class="massage-box">
            <section class="user-message">
              <ul>
                <li v-for="(item, index) in commentList" :key="item.id">
                  <!-- 父级的发表留言 -->
                  <div class="comment-parent">
                    <div
                      class="p-img"
                      :style="{
                        backgroundImage: 'url(' + item.user.photo + ')',
                      }"
                    ></div>
                    <div class="p-info">
                      <div class="p-name">{{ item.user.user }}</div>
                      <div class="p-comtent" v-html="item.content"></div>
                      <p class="p-time">
                        <i class="el-icon-location-information"></i>
                        <span>{{Adminaddress}}</span>
                        <span>{{ item.date | getTime }}</span>
                        <a @click="replyClick(index)">{{
                          item.reply.lastIdexArr[0] === index &&
                          item.reply.lastIdexArr[1] === undefined
                            ? "收起"
                            : "回复"
                        }}</a>
                      </p>
                    </div>
                  </div>
                  <hr />

                  <div
                    class="comment-child"
                    v-for="(children, childrenindex) in item.children"
                    :key="children.childrenindex"
                  >
                    <div
                      class="c-img"
                      :style="{
                        backgroundImage: 'url(' + children.user.photo + ')',
                      }"
                    ></div>
                    <div class="c-info">
                      <div class="c-name">
                        <span class="name">{{ children.user.user }}</span
                        >回复
                        <span class="name">{{ children.subsetuser }}</span>
                        <span class="content">{{ children.content }}</span>
                      </div>
                      <div class="c-time">
                        <i class="el-icon-location-information"></i>
                        <span>{{Adminaddress}}</span>
                        <span>{{ children.date | getTime }}</span>
                        <a @click="replyClick(index, childrenindex)">{{
                          item.reply.lastIdexArr[0] === index &&
                          item.reply.lastIdexArr[1] === childrenindex
                            ? "收起"
                            : "回复"
                        }}</a>
                      </div>
                    </div>
                  </div>
                  <div class="replycontainer">
                    <div :class="['textbox', { showbox: item.reply.ifShow }]">
                      <textarea
                        v-model="item.reply.content"
                        class="input"
                        id="demo"
                        :placeholder="'回复【' + item.reply.subsetuser + '】:'"
                      ></textarea>
                      <button
                        @click="commitchildmassage(index)"
                        size="mini"
                        type="button"
                        class="layui-btn layui-btn-xs"
                      >
                        提交留言
                      </button>
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
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RichText from "../../components/RichText";
import Nav from "../../components/Nav";
import { location } from "../../../utls/Location";
import request from "../../api/index";
const getArticle = request.getArticle;
const postifLogin = request.postifLogin;
const getArticleMassage = request.getArticleMassage;
const getArticleMassages = request.getArticleMassages;
const Postcomitsonmassage = request.Postcomitsonmassage;
const Pv = request.Pv;
function toTow(num) {
  return (num < 10 ? "0" : "") + num;
}
export default {
  name: "Article",
  data() {
    return {
      //地理位置
      Adminaddress: "",
      ArticleInfo: null,
      Path: "",
      commentList: [],
      ifloading: false,
      ifnomore: false,
      skip: 0,
      limit: 0,
      //播放控制
      stop: true,
      play: false,
      value: 0,
      changetime: 0,
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
    },
    date(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
    },
    month(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];
    },
    year(value) {
      return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];
    },
  },
  components: {
    Nav,
    RichText,
  },
  computed: {
    Pathss() {
      let paths = "http://www.sunfulin.cn:8989" + this.Path;
      return paths;
    },
  },
  methods: {
    iftime() {
      let _this = this;
      _this.$refs.ifaudio.addEventListener("timeupdate", function () {
        let audio = _this.$refs.ifaudio;
        var percent = (audio.currentTime / audio.duration) * 100;
        _this.percent = percent;
        _this.value = percent;
      });
    },
    //
    change(value) {
      this.iftime();
      this.value = this.percent;
    },
    ifplay() {
      if (this.$refs.ifaudio.paused) {
        this.$refs.ifaudio.play();
        this.play = true;
        this.stop = false;
        this.iftime();
      }
    },
    ifstop() {
      this.$refs.ifaudio.pause();
      this.play = false;
      this.stop = true;
    },
    //获取文章信息
    common() {
      getArticle(this.$route.params.id)
        .then((res) => {
          if (res.data.code) {
            this.$router.push("/404");
          } else {
            this.ArticleInfo = res.data.data;
          }
        })
        .catch(() => {
          this.$router.push("/404");
        });
    },
    //点赞更新数据
    Give(aid) {
      postifLogin()
        .then((res) => {
          Pv(aid, res.data.userInfo._id).then((res) => {
            if (res.data.code === 0) {
              layer.msg(res.data.msg, {
                icon: 6,
              });
              setTimeout(() => {
                window.location.reload();
              }, 0);
            }
          });
        })
        .catch(() => {});
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
    //发表留言
    Submit(value) {
      postifLogin()
        .then((res) => {
          let data = res.data.userInfo;
          if (data) {
            //发送请求
            let aid = this.$route.params.id;
            getArticleMassage({
              userid: data._id,
              content: value,
              aid: aid,
            }).then((res) => {
              if (res.data.code) {
                layer.msg(res.data.msg, {
                  icon: 5,
                  anim: 6,
                });
              } else {
                layer.msg(res.data.msg, {
                  icon: 6,
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
          } else {
            layer.msg("请先登录在留言😘", {
              icon: 5,
              anim: 6,
            });
          }
        })
        .catch(() => {
          layer.msg("服务器错误，稍后再试❤", {
            icon: 2,
            anim: 6,
          });
        });
    },
    //发表子留言
    commitchildmassage(pIndex) {
      //判断登录
      postifLogin()
        .then((res) => {
          if (res.data.userInfo) {
            //登陆了，就发送数据到数据库 -- 执行留言提交的ajax
            Postcomitsonmassage({
              parentId: this.commentList[pIndex]._id,
              user: res.data.userInfo._id,
              content: this.commentList[pIndex].reply.content,
              subsetuser: this.commentList[pIndex].reply.subsetuser,
            }).then((res) => {
              if (res.data.code) {
                layer.msg(res.data.msg, {
                  icon: 5,
                  anim: 6,
                });
              } else {
                layer.msg(res.data.msg, {
                  icon: 6,
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
              anim: 6,
            });
          }
        })
        .catch(() => {
          //服务出错
          layer.msg("服务器错误~请稍后再试", {
            icon: 2,
          });
        });
    },
    //滚动加载
    handelNewScroll() {
      //如果出现加载和我是有底线的 就不滚动了
      if (this.ifloading) return;
      //浏览器的总高
      let a = document.documentElement.offsetHeight;
      //可视区域的高度
      let b = document.documentElement.clientHeight;
      //滚动高
      let c = document.documentElement.scrollTop;
      if (b + c > a - 300) {
        this.ifLoding = true;
        this.getArticlesMassage(() => {
          let aid = this.$route.params.id;
          getArticleMassages(aid, this.skip, this.limit).then((res) => {
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
    getArticlesMassage(cb) {
      this.limit += 3;
      let aid = this.$route.params.id;
      getArticleMassages(aid, this.skip, this.limit)
        .then((res) => {
          let data = res.data.data;
          if (res.data.code === 0) {
            data.forEach((item) => {
              item.reply = {
                user: "", //id(谁回复我)
                content: "", //回复的类容
                subsetuser: "",
                date: "",
                ifShow: false, //是否显示回复框
                lastIdexArr: [], //保存现在的点击的父级和子集的输入框
              };
            });
            this.commentList = data;
          }
          cb && cb();
        })
        .catch((e) => {
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
    this.common();
    this.getArticlesMassage();
    this.Path = this.$route.path;
    window.addEventListener("scroll", this.handelNewScroll);
  },

  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.Getlocation();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handelNewScroll);
  },
};
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.Article {
  position: relative;
  padding-top: 70px;
  padding-bottom: 20px;
  transition: all 0.2s;
  min-height: 100vh;
  .article {
    width: 90%;
    margin: 30px auto;
    background-color: #fff;
    .article-main {
      box-sizing: border-box;
      padding: 30px 40px;
      .a-top {
        position: relative;
        width: 100%;
        border-bottom: 1px solid #ccc;
        .a-info {
          h4 {
            display: block;
            font-size: 25px;
            color: #515250;
            font-weight: normal;
          }
          p {
            display: block;
            padding: 12px 0;
            font-size: 17px;
            color: #515250;
            small {
              margin-left: 10px;
            }
            small:nth-child(1) {
              margin-left: 0px;
            }
            .anthor {
              font-family: BarbaraHand;
              color: #3e8bc7;
              font-size: 20px;
            }
          }
        }
        .time {
          font-family: SourceCodeProRegular, Menlo, Monaco, Consolas,
            "Courier New", monospace, "Helvetica Neue", Arial, sans-serif;
          right: 0;
          top: 0;
          position: absolute;
          width: 90px;
          height: 50px;
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
      }
      .a-container {
        padding: 15px;
        overflow: hidden;
        line-height: 28px;
        font-size: 19px;
        color: grey;
      }
      .a-Explain {
        height: 119px;
        width: 100%;
        margin-top: 30px;
        background-color: #f8f9f7;
        .a-e {
          box-sizing: border-box;
          padding: 20px;
          width: 100%;
          height: 100%;
          p {
            padding: 5px 0;
            color: grey;
            span {
              font-family: BarbaraHand;
              color: #3e8bc7;
              font-size: 25px;
            }
          }
          a {
            margin-left: 4px;
            color: #3e8bc7;
          }
        }
      }
      .music {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        .mc-img {
          position: relative;
          float: left;
          height: 100%;
          width: 70px;
          img {
            height: 100%;
            display: block;
            width: 70px;
            float: left;
          }
          .mc-log {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 30px;
            height: 30px;
            border: 2px solid #fff;
            border-radius: 50%;
            cursor: pointer;
            svg {
              position: absolute;
              top: 5px;
              left: 7px;
              height: 20px;
              width: 20px;
              path {
                fill: #fff;
              }
            }
          }
          p {
            display: block;
            position: absolute;
            right: 0;
            bottom: 0;
            height: 26px;
            width: 26px;
            cursor: pointer;
            i {
              display: block;
              height: 100%;
              color: #fff;
              font-size: 26px;
            }
          }
        }
        .music-1 {
          box-sizing: border-box;
          width: 80%;
          padding-left: 80px;
          padding-top: 25px;
          span:nth-child(2) {
            color: red;
            margin-left: 10px;
          }
          /deep/.el-slider {
            height: 10px;
          }
        }
      }
      .pv {
        position: relative;
        width: 100%;
        height: 100px;
        margin-top: 20px;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        div {
          position: absolute;
          width: 100%;
          top: 20%;
          height: 60%;
          margin: auto;
          span {
            height: 100%;
            text-align: center;
            line-height: 60px;
            width: 60px;
            display: block;
            margin: auto;
            border-radius: 50%;
            border: 2px solid #f46753;
            cursor: pointer;
            i {
              font-size: 50px;
              color: #ccc;
            }
          }
          color: #f46753;
        }
      }
      .massage {
        width: 100%;
        height: 238px;
        /deep/.btn {
          margin: 0;
        }
      }
      .massage-box {
        width: 100%;
        > .user-message {
          width: 100%;
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
    }
  }
}
</style>