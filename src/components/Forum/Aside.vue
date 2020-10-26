<!-- 侧边栏 -->
<template>
  <div class="AsideBox">
    <div :class="['PublishArticle', { ifaside: ifSearchfixed }]">
      <ul>
        <router-link to="/forumAricleadd">
          <li class="enditArticle">
            <span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                class="NewGlobalWrite-navIcon"
                fill="currentColor"
              >
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" fill="#F4C807" opacity=".12" />
                  <path d="M6 6h28v28H6z" />
                  <path
                    fill="#F4C807"
                    d="M20.406 11.772l-2.172 2.176h-2.29c-1.438 0-1.875.085-2.322.324-.33.176-.575.422-.751.752-.24.448-.324.886-.324 2.326v7.12c0 1.44.085 1.878.324 2.326.176.33.421.576.75.752.421.225.834.314 2.08.323l7.35.001c1.438 0 1.876-.084 2.323-.324.33-.176.575-.422.751-.752.24-.448.324-.886.324-2.326v-4.905l2.172-2.175v7.08c0 1.94-.202 2.643-.58 3.352a3.95 3.95 0 0 1-1.643 1.645c-.708.379-1.41.58-3.346.58h-7.108c-1.936 0-2.639-.201-3.347-.58a3.95 3.95 0 0 1-1.642-1.645c-.378-.71-.58-1.413-.58-3.352v-7.12c0-1.94.202-2.643.58-3.352a3.95 3.95 0 0 1 1.642-1.645c.708-.379 1.41-.58 3.347-.58h4.462zm6.908-2.053c.384.116.747.338 1.168.759l.188.189c.42.421.642.785.758 1.17a1.98 1.98 0 0 1 0 1.163c-.116.385-.337.749-.758 1.17l-6.9 6.911c-.62.622-.827.81-1.078 1.004-.251.193-.496.34-.784.47-.288.131-.553.226-1.392.48l-1.088.332a1.303 1.303 0 0 1-1.625-1.629l.33-1.09c.255-.84.35-1.104.48-1.393.13-.29.277-.534.47-.785.193-.252.381-.46 1.001-1.081l6.9-6.911c.42-.421.784-.643 1.168-.76a1.97 1.97 0 0 1 1.162 0zm-3.204 4.096l-4.797 4.805c-.547.548-.709.723-.852.91-.112.146-.19.276-.265.443-.097.214-.175.44-.4 1.182l-.094.31.31-.095c.74-.225.965-.303 1.179-.4.167-.076.297-.154.442-.266.187-.143.361-.305.909-.853l4.797-4.805-1.23-1.23zm2.546-2.43c-.109.033-.23.11-.443.324l-.874.875 1.228 1.231.875-.876c.213-.213.29-.334.323-.444a.24.24 0 0 0 0-.153c-.033-.11-.11-.23-.323-.445l-.189-.188c-.213-.214-.334-.291-.443-.325a.238.238 0 0 0-.154 0z"
                    fill-rule="nonzero"
                  />
                </g>
              </svg>
            </span>
            写文章
          </li>
        </router-link>
        <router-link to>
          <li class="enditArticle">
            <span>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                class="NewGlobalWrite-navIcon"
                fill="currentColor"
              >
                <g fill="#26BFBF" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" opacity=".12" />
                  <path
                    d="M21.987 11.686v2.169h-6.125c-1.43 0-1.863.064-2.297.306-.332.128-.574.383-.74.702-.255.447-.332.893-.332 2.297v7.018c0 1.442.09 1.876.332 2.297.166.345.408.587.74.766.434.23.868.319 2.297.319h7.018c1.43 0 1.863-.077 2.297-.32.345-.165.587-.408.766-.74.216-.408.296-.816.305-2.054l.001-6.316.025.025h2.17v6.074c0 1.914-.217 2.616-.587 3.318a3.92 3.92 0 0 1-1.634 1.62c-.689.383-1.403.575-3.317.575h-7.018c-1.915 0-2.616-.204-3.318-.575a3.891 3.891 0 0 1-1.62-1.62c-.384-.702-.575-1.404-.575-3.318v-7.018c0-1.914.204-2.629.574-3.318a3.996 3.996 0 0 1 1.62-1.633c.703-.383 1.404-.574 3.318-.574h6.1zm1.889 6.954c1.059 1.06 1.059 2.807 0 3.88l-.039.038a2.719 2.719 0 0 1-3.879 0l-2.45-2.553a.801.801 0 0 0-1.123 0l-.05.052c-.32.357-.32.893 0 1.212a.75.75 0 0 0 .726.217c.51-.128 1.047.23 1.149.74a.946.946 0 0 1-.727 1.148 2.649 2.649 0 0 1-2.527-.74 2.796 2.796 0 0 1 0-3.905l.038-.025c1.098-1.085 2.808-1.085 3.892 0l2.463 2.488a.764.764 0 0 0 1.11 0l.038-.025a.855.855 0 0 0 0-1.187.876.876 0 0 0-.74-.217c-.51.128-1.02-.204-1.148-.727-.128-.51.204-1.021.727-1.149l.013-.013a2.703 2.703 0 0 1 2.527.766zm4.338-9.315v2.578h2.578v1.722h-2.578v2.59h-1.723v-2.602h-2.59v-1.71h2.59V9.325h1.723z"
                    fill-rule="nonzero"
                  />
                </g>
              </svg>
            </span>
            写想法
          </li>
        </router-link>
      </ul>
      <div class="userarticle">
        <span class="article">
          <p>
            <el-button type="text" @click="handleClick1">
              <span class="C-T">
                <i class="el-icon-star-on"></i>
                我的收藏
              </span>
              <span class="num">{{ Collectionnum }}</span>
            </el-button>
          </p>
          <el-dialog
            title="我的收藏"
            :visible.sync="dialogVisible1"
            width="50%"
          >
            <el-table :data="tableData1" style="width: 100%">
              <el-table-column label="封面" width="180">
                <template slot-scope="scope">
                  <span>
                    <img style="height: 40px" :src="scope.row.forumface" alt />
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="标题"
                width="280"
                prop="title"
              ></el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete1(scope.$index, scope.row)"
                    >取消收藏</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="Pag">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="PagSize1"
                :page-count="5"
                @current-change="currentChange1"
                :total="total1"
              ></el-pagination>
            </div>
          </el-dialog>
        </span>
        <span class="Collection">
          <p>
            <el-button modal="true" type="text" @click="handleClick2">
              <span class="C-T" @click="mm">
                <i class="el-icon-s-management"></i>
                我的文章
              </span>
              <span class="num">{{ articlenum }}</span>
            </el-button>
          </p>
          <el-dialog
            title="我的文章"
            :visible.sync="dialogVisible2"
            width="50%"
          >
            <el-table :data="tableData2" style="width: 100%">
              <el-table-column label="封面" width="180">
                <template slot-scope="scope">
                  <span>
                    <img style="height: 60px" :src="scope.row.forumface" alt />
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="标题"
                width="250"
                prop="title"
              ></el-table-column>
              <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="Pag">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="PagSize2"
                :page-count="5"
                @current-change="currentChange2"
                :total="total2"
              ></el-pagination>
            </div>
          </el-dialog>
        </span>
      </div>
      <!-- <div class="Search">
        <div class="input">
     
        </div>
        <div class="searchlist">
          <ul>
            <li>
              <router-link to=""></router-link>
            </li>
          </ul>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import request from "../../api/index";
const getUserInfo = request.getUserInfo;
const postifLogin = request.postifLogin;
const getForumArticle = request.getForumArticle;
const deletefoorumarticle = request.deletefoorumarticle;
const PostEditArticle = request.PostEditArticle;
const PostCollectionArticle = request.PostCollectionArticle;
const PostDeleteCooletion = request.PostDeleteCooletion;
//导入store里的数据
export default {
  data() {
    return {
      //是否悬浮侧边栏
      ifSearchfixed: false,
      //用户发表的文章数
      articlenum: "",
      Collectionnum: "",
      //收藏的弹窗
      dialogVisible1: false,
      //发表的弹窗
      dialogVisible2: false,
      //第一个弹窗
      tableData1: [],
      PagSize1: 5,
      total1: 0,
      skip: 0,
      limit: 5,
      //第二个弹窗
      tableData2: [],
      PagSize2: 5,
      total2: 0,
      userid: "",
    };
  },
  methods: {
    //监听滚动显示侧边栏
    handleWindowScroll() {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop >= 350) {
        this.ifSearchfixed = true;
      } else {
        this.ifSearchfixed = false;
      }
    },
    //获取用户的信息
    getuserInfo() {
      postifLogin()
        .then((res) => {
          if (res.data.userInfo) {
            this.userid = res.data.userInfo._id;
            //请求用户发表文章数
            getUserInfo(res.data.userInfo._id).then((res) => {
              this.articlenum = res.data.data ? res.data.data.forumarticle : 0;
            });
            PostCollectionArticle(this.userid, this.skip, this.limit).then(
              (res) => {
                this.total2 = res.data.data.forumarticle;
                this.Collectionnum = res.data.data
                  ? res.data.data[0].Collectionnum
                  : 0;
                this.total1 = res.data.data
                  ? res.data.data[0].Collectionnum
                  : 0;
                this.tableData1 = res.data.data[0].CollectionArry;
              }
            );
          }
          return;
        })
        .catch(() => {});
    },
    //显示收藏表文章弹窗
    handleClick1() {
      this.dialogVisible1 = true;
    },
    //显示发表文章弹窗
    handleClick2() {
      this.dialogVisible2 = true;
    },
    //取消收藏
    handleDelete1(index, row) {
      console.log(index, row);
      PostDeleteCooletion(row.aid, row.user)
        .then((res) => {
          this.tableData1.splice(index, 1);
          if (res.data.code === 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 2000,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            this.$message({
              message: "删除失败",
              type: "error",
              duration: 2000,
            });
          }
        })
        .catch(() => {});
    },
    currentChange1(index) {
      console.log(index);
    },
    currentChange2(index) {
      let skip2 = this.PagSize2 * (index - 1);
      getForumArticle(this.userid, skip2, this.limit)
        .then((res) => {
          this.tableData2 = res.data.data;
        })
        .catch(() => {});
    },
    mm() {
      this.getArticle();
    },
    //获取用户发表的文章
    getArticle() {
      getForumArticle(this.userid, this.skip, this.limit)
        .then((res) => {
          this.tableData2 = res.data.data;
        })
        .catch(() => {});
    },
    //编辑文章
    handleEdit(index, row) {},
    //删除文章
    handleDelete(index, row) {
      deletefoorumarticle(row._id, this.userid)
        .then((res) => {
          this.tableData2.splice(index, 1);
          if (res.data.code === 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
              duration: 2000,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            this.$message({
              message: "删除失败",
              type: "error",
              duration: 2000,
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "删除失败",
            type: "warning",
            duration: 2000,
          });
        });
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getuserInfo();
    this.handleWindowScroll();
    window.addEventListener("scroll", this.handleWindowScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleWindowScroll);
  },
};
</script>
<style scoped lang="less">
.AsideBox {
  position: relative;
  width: 100%;
  .PublishArticle {
    width: 100%;
    ul {
      box-sizing: border-box;
      padding: 15px 15px;
      display: flex;
      justify-content: space-around;
      height: 100%;
      width: 100%;
      background-color: #fff;
      a {
        text-align: center;
      }
      li {
        height: 65px;
        width: 50px;
        span {
          display: block;
          text-align: center;
          height: 50px;
          width: 50px;
          font-size: 35px;
          i {
            display: block;
            height: 50px;
            width: 50px;
          }
        }
      }
    }
    .Search {
      width: 100%;
      margin-top: 5px;
      .input {
        position: relative;
        width: 100%;
        height: 60px;
        background-color: gray;
        /deep/.el-autocomplete {
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -20px;
          margin-left: -120px;
          width: 80%;
          height: 40px;
        }
      }
      .searchlist {
        width: 100%;
        background-color: #fff;
        height: 200px;
      }
    }
    .userarticle {
      width: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .el-button {
        position: relative;
        display: block;
        width: 90%;
        height: 100%;
        margin: auto;
        color: #8590a6;
        font-size: 20px;
        .C-T {
          position: absolute;
          top: 0;
          left: 0;
          line-height: 40px;
          width: 50%;
          height: 100%;
        }
        .num {
          position: absolute;
          right: 0;
          top: 0;
          line-height: 40px;
        }
      }
      .article,
      .Collection {
        width: 100%;
        height: 40px;
        margin-bottom: 5px;
        p {
          width: 100%;
          height: 100%;
          &:hover {
            background-color: #f6f6f6;
          }
        }
        .Pag {
          width: 60%;
          margin: auto;
        }
      }
    }
  }
  .ifaside {
    position: fixed;
    width: 304px;
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
}
</style>