<!-- 品论组件 -->
<template>
  <div class="Comments">
    <section v-if="IfMassage" class="user-message">
      <div class="Richtext">
        <RichText @Submit="Submit"></RichText>
      </div>
      <ul>
        <li v-for="(item,index) in Articledata" :key="item.id">
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
                >{{item.reply.lastIdexArr[0]===index && item.reply.lastIdexArr[1]===undefined ? '取消评论' : '回复'}}</a>
              </p>
            </div>
          </div>
          <hr />

          <div
            class="comment-child"
            v-for="(children,childrenindex) in item.children"
            :key="children.childrenindex"
          >
            <div class="c-userinfo">
              <div class="c-img" :style="{backgroundImage:'url('+children.user.photo +')'}"></div>
              <div class="c-name">
                <span class="name">{{children.user.user}}</span>
                <span>回复</span>
                <span class="name">{{children.subsetuser}}</span>
              </div>
            </div>
            <div class="text-content">
              <span class="content">{{children.content}}</span>
            </div>
            <div class="c-time">
              <i class="el-icon-location-information"></i>
              <span>{{Adminaddress}}</span>
              <span>{{children.date | getTime}}</span>
              <a
                @click="replyClick(index,childrenindex)"
              >{{item.reply.lastIdexArr[0]===index && item.reply.lastIdexArr[1] === childrenindex ? '取消评论' : '回复'}}</a>
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
              >提交评论</button>
            </div>
          </div>
        </li>
        <!-- <div class="Pag">
          <Pag @currentChange="currentChange" :pageSize="8" :total="total"></Pag>
        </div> -->
      </ul>
    </section>
  </div>
</template>
<script>
//导入接口函数
import request from "../../api/index";
const PostArticleMsg = request.PostArticleMsg;
const postifLogin = request.postifLogin;
const PostArticleMsgMin = request.PostArticleMsgMin;
const getforumMsg = request.getforumMsg;
const PostArticleNum = request.PostArticleNum

//模板部分
import RichText from "../../components/RichText";
// import Pag from "../Forum/Pag";
import {location} from '../../../utls/Location'
function toTow(num) {
  return (num < 10 ? "0" : "") + num;
}
export default {
  name: "Massage",
  components: {
    RichText,
    // Pag
  },
  data() {
    return {
       //地理位置
      Adminaddress: "",
      //是否显示评论作者的评论框
      IfMassage: false,
      //是否显示回复框
      showinput: false,
      total:0,//显示10个页码
    };
  },
  //获取该篇文章的id
  props: ["aid", "Articledata"],
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
    //是否显示评论框
    Massagefn(index) {
      this.IfMassage = !this.IfMassage;
    },
    /**
     * 判断点击的是哪一个输入框
     * */
    //点击父级评论的回复函数
    replyClick(Pindex, Cindex) {
      console.log(Pindex,Cindex)
      if (Pindex === undefined) return;
      //拿到父级评论
      let parentData = this.Articledata[Pindex];
      if (Cindex === undefined) {
        //父回复
        this.Articledata[Pindex].reply.subsetuser = this.Articledata[
          Pindex
        ].user.user;
      } else {
        //子回复
        this.Articledata[Pindex].reply.subsetuser = this.Articledata[
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
    //发送文章的留言函数
    Submit(val) {
      postifLogin()
        .then(res => {
          if (res.data.userInfo) {
            PostArticleMsg({
              user: res.data.userInfo._id,
              content: val,
              aid: this.aid
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
                }, 10);
              }
            });
          } else {
            layer.msg("请先登录在留言😘", {
              icon: 5,
              anim: 6
            });
          }
        })
        .catch((e) => {
          //服务出错
          layer.msg("服务器错误，稍后再试❤", {
            icon: 2,
            anim: 6
          });
        });
    },
    //发送子留言函数的函数
    commitchildmassage(Pindex) {
      postifLogin()
        .then(res => {
          if (res.data.userInfo) {
            PostArticleMsgMin({
              parentId: this.Articledata[Pindex]._id,
              user: res.data.userInfo._id,
              content: this.Articledata[Pindex].reply.content,
              subsetuser: this.Articledata[Pindex].reply.subsetuser
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
        .catch(() => {
          //服务出错
          layer.msg("服务器错误~请稍后再试", {
            icon: 2
          });
        });
    },
    //Massage组件向父组件发送事件
    currentChange(index,size){
     this.$emit("PcurrentChange",index,size)
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
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
   this.Getlocation()
    //请求总的留言数
    PostArticleNum(this.aid).then((res)=>{
      // let Arr = [];
      // Arr.push(res.data.data)
      // Arr.forEach(item=>{
      //   console.log(item)
      // })
    this.total = res.data.data.commentnum;
    }).catch(()=>{})
  }
};
</script>
<style scoped lang="less">
.Comments {
  width: 100%;

  > .user-message {
    width: 100%;
    margin-top: 20px;

    .count {
      position: relative;
      height: 60px;
      width: 100%;

      div {
        height: 100%;
        width: 95%;
        line-height: 60px;
        margin: auto;
        font-size: 20px;
        font-weight: 550;

        span:nth-child(2) {
          position: absolute;
          right: 20px;
          color: #ccc;
          cursor: pointer;
        }
      }
    }

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
            font-size: 16px;
          }

          .p-comtent {
            padding: 7px 0 6px 0;
            min-height: 30px;
            line-height: 23px;
            font-size: 16px;
            color: rgb(53, 53, 53);
          }

          .p-time {
            color: #515250;
            font-size: 16px;

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
              font-size: 16px;
            }
          }
        }
      }

      hr {
        margin-left: 40px;
        margin-bottom: 10px;
      }

      .comment-child {
        margin-top: 5px;
        font-size: 16px;
        margin-left: 30px;
        color: #353535;
        .c-userinfo {
          .c-img {
            height: 40px;
            width: 40px;
            float: left;
            overflow: hidden;
            border-radius: 50%;
            background-position: center center;
            background-size: cover;
            margin-right: 5px;
          }
          .c-name {
            height: 40px;
            margin-left: 50px;
            line-height: 40px;
            span {
              color: gray;
              margin: 0 1.5px;
            }
            .name {
              color: #01aaed;
            }
          }
        }
        .text-content {
          line-height: 25px;
          margin-left: 50px;
        }
        .c-time {
          color: gray;
          margin-left: 60px;
          margin-top: 10px;
          font-size: 16px;
          span {
            margin: 0 1.5px;
          }
          a {
            font-size: 16px;
            margin-left: 2px;
            color: #009688;
            cursor: pointer;
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
    .Pag{
      width: 50%;
      margin: auto;
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
</style>
