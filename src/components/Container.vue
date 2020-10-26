<!--  -->
<template>
  <div id="Container">
    <el-container>
      <el-main>
        <ArticleShow></ArticleShow>
      </el-main>
      <el-aside>
        <div class="Blogger">
          <div class="Blogger-box">
            <div class="blogerinfo-figure">
              <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3215508148,2083681364&fm=26&gp=0.jpg" alt />
            </div>
            <p class="Bloger-user">黑马真相</p>
            <p class="blogerinfo-introduce">一名90后的程序员，请多多指教</p>
            <p class="blogerinfo-location">
              <i class="el-icon-location"></i>
              <span>{{Adminaddress}}</span>
            </p>
          </div>
        </div>
        <!-- 搜索类容 -->
        <div :class="['Search',{'fixed':ifSearchfixed}]">
          <div class="Search-main">
            <input
              v-model="searchInput"
              @input="handleInput"
              type="text"
              name
              id
              placeholder="请输入搜索的类容"
            />
            <i class="el-icon-search"></i>
            <ul class="search-resoult" v-if="!!searchList.length">
              <li v-for="item in searchList" :key="item.index">
                <router-link :to="'/Article/'+item._id">{{item.title}}</router-link>
              </li>
            </ul>
          </div>

          <div class="search-aticle">
            <ul @mouseleave="handleMouseleave">
              <li
                @mouseenter="handleMouseenter(index)"
                v-for="(item,index) in getarticleifo"
                :key="item.index"
              >
                <routerLink :to="'/blog/' + index">{{item}}</routerLink>
              </li>
            </ul>
            <div class="cover" :style="{top:coverTop*40 + 'px'}"></div>
          </div>
        </div>
        <!-- 热门搜索 -->
        <div class="hot">
          <div>
            <h5 class="hot-title">热门文章</h5>
            <div class="hot-inner">
              <ul>
                <li v-for="item in articleHot" :key="item.index">
                  <router-link :to="'/Article/' + item._id">{{item.title}}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 顶置推荐 -->
        <div class="recomend">
          <h5 class="hot-title">顶置推荐</h5>
          <div class="hot-inner">
            <ul>
              <li v-if="!!getarticlecomon.title">
                <router-link :to="'/Article/'+ getarticlecomon._id">{{getarticlecomon.title}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <!-- 最近访客 -->
        <div class="visitor">
          <h5 class="visitor-title">最近访客</h5>
          <div class="visitor-inner">
            <dl class="vistor">
              <dd v-for="item in visitor" :key="item.id">
                <img :src="item.user.photo" alt />
                <cite>{{item.user.user}}</cite>
              </dd>
            </dl>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import request from "../api/index";
let getarticleifo = request.getarticleifo;
let getarticlehot = request.getarticlehot;
const getArticleSearch = request.getArticleSearch;
const RecentVisitors = request.RecentVisitors;

import {location} from '../../utls/Location'
//导入组件
import ArticleShow from "./ArticleShow";
export default {
  name: "Container",

  data() {
    return {
      //管理员位置
      Adminaddress:'',
      //搜索框的类容
      searchInput: "",
      searchList: [],
      searchTimer: null,

      //控制Search元素
      ifSearchfixed: false,
      articleTags: [],
      articleHot: [],
      coverTop: 0,
      //最近访客数据
      visitor: []
    };
  },
  computed: {
    /**
     * 在这里是返回的是一个新的数组
     *  然后遍历数组 不改变原来的数组
     * */

    getarticleifo() {
      return ["全部文章", ...this.articleTags];
    },
    getarticlecomon() {
      return this.articleHot[0] || [];
    }
  },
  methods: {
    handleMouseenter(index) {
      this.coverTop = index;
    },
    handleMouseleave() {
      this.coverTop = this.$route.params.id * 1;
    },
    //监听滚动条滚动的函数
    handleWindowScroll() {
      let scrollTop = document.documentElement.scrollTop;
      this.ifSearchfixed = scrollTop >= 1000;
    },
    //输入框监听搜索
    handleInput() {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        let keywords = this.searchInput.trim(); //去除首位空格
        if (keywords) {
          getArticleSearch(this.searchInput)
            .then(res => {
              this.searchList = res.data.data;
            })
            .catch(() => {
              this.searchList = [];
            });
        } else {
          this.searchList = [];
        }
      }, 1000);
    },
    //获取地理位置
    Getlocation() {
      let _that = this;
      let geolocation = location.initMap("map-container"); //定位
      AMap.event.addListener(geolocation, "complete", (result) => {
        _that.Adminaddress =
          result.addressComponent.province +
          result.addressComponent.city +
          result.addressComponent.district;
      });
    },
  },
  components: {
    ArticleShow
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    getarticleifo()
      .then(res => {
        this.articleTags = res.data.data.tags;
      })
      .catch(err => {
        console.log("返回的错误信息:", err);
      });
    getarticlehot()
      .then(res => {
        this.articleHot = res.data.data;
      })
      .catch(e => {
        console.log("请求失败", e);
      });
  },

  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.Getlocation();

    //请求最近访客
    RecentVisitors()
      .then(res => {
        this.visitor = res.data.data;
      })
      .catch(e => {});
    this.handleWindowScroll();
    //监听Window的滚动事件
    window.addEventListener("scroll", this.handleWindowScroll);
  },
  //离开改页面不需要滚动
  destroyed() {
    window.removeEventListener("scroll", this.handleWindowScroll);
  }
};
</script>
<style scoped lang="less">
#Container {
  padding-top: 80px;
  width: 100%;
  user-select: none;
  > .el-container {
    box-sizing: border-box;
    width: 100%;
    max-width: 1260px;
    height: 100%;
    margin: auto;
    padding: 0 auto;
    > .el-main {
      padding-top: 0;
      padding-left: 20px;
    }
    > .el-aside {
      width: 300px;
      //博主信息
      > .Blogger {
        width: 100%;
        height: 300px;
        background-color: #fff;
        margin-bottom: 20px;
        > .Blogger-box {
          padding: 10px;
          > .blogerinfo-figure {
            width: 100%;
            height: 74px;
            > img {
              display: block;
              height: 70px;
              width: 70px;
              border-radius: 50%;
              margin: 5px auto;
            }
          }
          > .Bloger-user {
            text-align: center;
            font-size: 16px;
            font-weight: 600;
          }
          > .blogerinfo-introduce {
            padding-top: 10px;
            text-align: center;
            font-size: 16px;
            font-weight: 500;
          }
          > .blogerinfo-location {
            width: 100%;
            text-align: center;
            color: #808080;
            padding-top: 10px;
          }
        }
      }
      > .Search {
        width: 100%;
        background-color: #fff;
        &.fixed {
          position: fixed;
          width: 300px;
          z-index: 1;
          animation: SerachMove 0.5s 0.8;
          // 回到原来的状态
          animation-fill-mode: forwards;
        }
        @keyframes SerachMove {
          0% {
            top: -500px;
          }
          40% {
            top: 81px;
          }
          70% {
            top: 60px;
          }
          100% {
            top: 85px;
          }
        }
        > .Search-main {
          position: relative;
          box-sizing: border-box;
          height: 80px;
          width: 100%;
          padding: 20px;
          z-index: 3;
          background-color: grey;
          input {
            position: absolute;
            height: 40px;
            width: 86.5%;
            text-indent: 2em;
            overflow: hidden;
            border-radius: 20px;
            font-size: 14px;
            z-index: 2;
            border: none;
            outline: none;
          }
          i {
            position: absolute;
            top: 30px;
            z-index: 2;
            right: 30px;
            height: 22px;
            width: 22px;
            font-size: 18px;
            text-align: right;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s;
            &:hover {
              color: #6bc30d;
            }
          }
          .search-resoult {
            position: absolute;
            padding-top: 20px;
            top: 40px;
            width: 86.5%;
            background-color: #fff;
            li {
              overflow: hidden;
              height: 30px;
              width: 100%;
              line-height: 30px;
              a {
                display: block;
                padding-left: 5px;
                width: 100%;
                height: 100%;
                font-size: 16px;
                color: #6bc30d;
                text-indent: 2px;
                font-weight: 550px;
                &:hover {
                  background-color: #f1f2f0;
                }
              }
            }
          }
        }
        .search-aticle {
          position: relative;
          width: 100%;
          margin-top: 20px;
          ul {
            width: 100%;
            li {
              position: relative;
              width: 100%;
              height: 40px;
              z-index: 1;
              line-height: 40px;
              padding: 0 30px;
              box-sizing: border-box;
              a {
                display: block;
                color: #787977;
                height: 100%;
                width: 100%;
                border-bottom: 1px dotted #eee;
              }
            }
          }
          .cover {
            position: absolute;
            box-sizing: border-box;
            left: 0;
            top: 0;
            width: 100%;
            height: 40px;
            border-right: 5px solid #000;
            transition: top 0.4s;
            background-color: rgba(0, 0, 0, 0.05);
          }
        }
      }
      > .hot,
      .recomend {
        width: 100%;
        margin-top: 20px;
        background-color: #fff;
        .hot-title,
        .recomend .hot-inner {
          margin: 10px 20px;
          padding: 5px;
          line-height: 30px;
          font-weight: 400;
          border-bottom: 1px solid #e8e9e7;
          color: #383937;
          position: relative;
          font-size: 18px;
        }
        .hot-inner {
          margin: 0 20px;
          padding-bottom: 10px;
          ul li {
            display: block;
            line-height: 32px;
            position: relative;
            margin: 3px 0;
            counter-increment: nums;
            padding-left: 30px;
            overflow: hidden;
            word-wrap: normal !important;
            white-space: nowrap;
            text-overflow: ellipsis;
            a {
              color: #787977;
              font-size: 14px;
            }
            a:hover {
              transition: color 0.3s;
              font-weight: 540;
              color: #6bc30d;
              text-decoration: underline;
            }
          }
          ul li:before {
            content: counter(nums, decimal);
            height: 22px;
            width: 22px;
            position: absolute;
            left: 0;
            top: 5px;
            line-height: 22px;
            text-align: center;
            border-radius: 50%;
          }
          ul li:nth-child(1):before {
            background-color: #e24d46;
          }
          ul li:nth-child(2):before {
            background-color: #2ea7e0;
          }
          ul li:nth-child(3):before {
            background-color: #6bc30d;
          }
        }
      }
      .visitor {
        width: 100%;
        margin-top: 20px;
        background-color: #fff;
        .visitor-title {
          margin: 0 20px;
          padding: 5px;
          line-height: 30px;
          font-weight: 400;
          border-bottom: 1px solid #e8e9e7;
          color: #383937;
          position: relative;
          font-size: 18px;
        }
        .visitor-inner {
          width: 100%;
          margin-bottom: 50px;
          .vistor {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 10px 10px;
            text-align: center;
            dd {
              width: 60px;
              height: 65px;
              margin: 15px 5px;
              font-size: 12px;
              transition: all 0.3s;
              &:hover {
                transform: scale(1.1);
                color: red;
              }
              img {
                width: 60px;
                height: 60px;
                border-radius: 2px;
              }
              cite {
                width: 100%;
                height: 20px;
                line-height: 20px;
                text-align: center;
                background-color: rgba(0, 0, 0, 0.1);
                color: #fff;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>