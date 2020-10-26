<!--  -->
<template>
  <div>
    <div id="nav">
      <div class="nav-main">
        <div class="n-m-logo">Sun.Fulin</div>
        <div class="n-m-login">
          <div class="userInfo" v-if="iflogin">
            <span class="userphoto">
              <img :src="logindata.photo" alt="头像" />
            </span>
            <span class="username">{{logindata.user}}</span>
            <a @click="btn">
              <i class="el-icon-caret-bottom"></i>
            </a>
            <div class="Infmation" v-if="ifmation">
              <el-button @click="yyy" type="primary">打开设置</el-button>
              <el-button @click="ifShowAvatar = true" type="primary">上传头像</el-button>
            </div>
          </div>
          <div class="login" v-else>
            <el-button @click="ifShowLogin=true" type="primary">登录</el-button>
            <el-button @click="ifShowRegister=true " type="success">注册</el-button>
          </div>
        </div>
        <div class="n-m-nav">
          <ul :class="'list'+ whichActive">
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <li>
              <router-link to="/blog/0">博客</router-link>
            </li>
            <li>
              <router-link to="/message">留言</router-link>
            </li>
            <li>
              <router-link to="/diary">日记</router-link>
            </li>
            <li>
              <router-link to="/links">友链</router-link>
            </li>
            <li>
              <router-link to="/about">关于</router-link>
            </li>
            <li>
              <router-link to="/forum">论坛</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Login :dialogVisible="ifShowLogin" @handelLogin="closeLogin"></Login>
    <Register :dialogVisible="ifShowRegister" @handelRegister="closeRegster"></Register>
    <Avatar :dialogVisible="ifShowAvatar"  @handleClose="closeAvatar"></Avatar>
    <el-drawer closeDrawer="huhu" :visible.sync="drawer" :with-header="true">
      <div class="userinfo">
        <span class="userphoto">
          <img :src="logindata.photo" alt="头像" />
        </span>
        <span class="username">欢迎:{{logindata.user}}</span>
        <span @click="Signout" class="Signout">退出</span>
      </div>
      <SetuserInfo></SetuserInfo>
    </el-drawer>
  </div>
</template>
<script>
//引入组件
import Register from "./Register";
import Login from "./Login";
import SetuserInfo from "./SetuserInfo";
import Avatar from "./Avatar"
//引入接口
import request from "../api/index";
const postRegister = request.postRegister;
const postLogin = request.postLogin;
const postifLogin = request.postifLogin;
const postSingout = request.postSingout;
export default {
  name: "Nav",
  components: {
    Register,
    Login,
    SetuserInfo,
    Avatar,
  },
  data() {
    return {
      routerList: ["Home", "Blog", "Message", "Diary", "Links", "About","Forum"],
      //是否登录数据
      iflogin: false,
      //用户的信息
      logindata: {
        user: "",
        photo: ""
      },
      //是否显示设置信息的数据
      ifmation: false,
      drawer: false,
      //控制弹窗
      ifShowLogin: false,
      ifShowRegister: false,
      ifShowAvatar:false,
    };
  },
  computed: {
    whichActive() {
      let index = this.routerList.indexOf(this.$route.name);
      if (this.$route.name === "Article") index = 1;
      return index + 1;
    }
  },
  methods: {
    //点击子集的注册按钮关闭父级的ifShowRegister
    closeRegster() {
      this.ifShowRegister = false;
    },
    //点击子集的登录按钮关闭父级的ifShowLogin
    closeLogin() {
      this.ifShowLogin = false;
    },
    closeAvatar(){
    this.ifShowAvatar = false;
    },

    
    //注册部分
    // handelRegister() {
    //   const h = this.$createElement;
    //   this.$msgbox({
    //     title: "注册",
    //     // Register 调用的子组件
    //     message: h(Register, { key: this.alertKey++ }),
    //     showCancelButton: true,
    //     showConfirmButton: true,
    //     confirmButtonText: "立即注册",
    //     concelButtonText: "取消",
    //     /**
    //      * action:表示表单的三个按钮
    //      * instance：弹窗组件
    //      * done：关闭表单
    //      * */

    //     beforeClose: (action, instance, done) => {
    //       if (action === "cancel") {
    //         done();
    //       } else {
    //         let vm = this;
    //         (function() {
    //           this.$refs["form"].validate(valid => {
    //             if (valid) {
    //               //验证通过
    //               postRegister(this.form)
    //                 .then(res => {
    //                   //无论是注册失败 还是成功都要刷新验证码
    //                   this.getVocde();
    //                   if (res.data.code) {
    //                     let msg = res.data.msg;
    //                     this.$message({
    //                       message: res.data.msg,
    //                       type: "warning",
    //                       offset: 100,
    //                       duration: 1500
    //                     });
    //                     //清除表单数据
    //                     this.$refs["form"].resetFields();
    //                   } else {
    //                     this.$message({
    //                       message: res.data.msg,
    //                       type: "success",
    //                       offset: 100,
    //                       duration: 1500
    //                     });
    //                     done();
    //                     //注册成功跳转登录页面
    //                     setTimeout(() => {
    //                       vm.handelLogin();
    //                     }, 2000);
    //                   }
    //                 })
    //                 .catch(e => {
    //                   this.getVocde();
    //                   console.log(e);
    //                 });
    //             } else {
    //               return false;
    //             }
    //           });
    //         }.call(instance.$children[2]));
    //       }
    //     }
    //   })
    //     .then(action => {})
    //     .catch(() => {});
    // },
    // //登录部分
    // handelLogin() {
    //   const h = this.$createElement;
    //   this.$msgbox({
    //     title: "登录",
    //     // Login 调Login用的子组件  this.alertKey++ 用户没次进去重新渲染页面
    //     message: h(Login, { key: this.alertKey++ }),
    //     showCancelButton: true,
    //     showConfirmButton: true,
    //     confirmButtonText: "立即登录",
    //     concelButtonText: "取消",

    //     beforeClose(action, instance, done) {
    //       if (action === "confirm") {
    //         //这里必须要执行一个函数
    //         (function() {
    //           this.$refs["form"].validate(valid => {
    //             if (valid) {
    //               //验证通过 发起登录请求
    //               postLogin(this.form)
    //                 .then(res => {
    //                   if (res.data.code) {
    //                     //登录失败
    //                     this.$message({
    //                       message: res.data.msg,
    //                       type: "warning",
    //                       offset: 100,
    //                       duration: 1500
    //                     });
    //                   } else {
    //                     //登录成功
    //                     this.$message({
    //                       message: res.data.msg,
    //                       type: "success",
    //                       offset: 100,
    //                       duration: 1500
    //                     });
    //                     done();
    //                     //登录成功刷新页面
    //                     setTimeout(() => {
    //                       window.location.reload();
    //                     }, 2000);
    //                   }
    //                 })
    //                 .catch(e => {
    //                   this.$message({
    //                     message: "登录失败-稍后再试",
    //                     type: "error",
    //                     offset: 100,
    //                     duration: 1500
    //                   });
    //                   console.log("登录失败", e);
    //                 });
    //             } else {
    //             }
    //           });
    //         }.call(instance.$children[2]));
    //       } else {
    //         done();
    //       }
    //     }
    //   })
    //     .then(action => {})
    //     .catch(() => {});
    // },
    //显示设置函数
    btn() {
      this.ifmation = !this.ifmation;
    },
    yyy() {
      this.drawer = !this.drawer;
    },
    //退出函数
    Signout() {
      postSingout()
        .then(res => {
          if (res.data.code) {
            this.$message({
              message: res.data.msg,
              type: "success",
              offset: 100,
              duration: 1500
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "success",
              offset: 100,
              duration: 1500
            });
            setTimeout(() => {
              localStorage.removeItem("userid")
              window.location.reload();
            }, 2000);
          }
        })
        .catch(e => {
          console.log("退出失败", e);
        });
    },
   
  },

  //生命周期 - 创建完成（访问当前this实例）
  created() {
    postifLogin().then(res => {
      let userdata = res.data.userInfo;
      if (userdata) {
        this.iflogin = true;
        this.logindata.user = userdata.user;
        this.logindata.photo = userdata.photo;
        
      } else {
        this.iflogin = false;
      }
    });
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
  }
};
</script>
<style lang="less" scoped>
div {
  #nav {
    overflow: hidden;
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: #fff;
    border-bottom: 1px solid #e8e9e7;
    > .nav-main {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      max-width: 1260px;
      height: 60px;
      margin: 0 auto;
      .n-m-logo {
        float: left;
        width: 150px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 50px;
        color: #444647;
        font-family: BarbaraHand;
      }
      .n-m-login {
        position: relative;
        position: absolute;
        right: 0;
        float: left;
        width: 177px;
        height: 60px;
        line-height: 60px;
        .userInfo {
          position: relative;
          position: absolute;
          right: 0;
          height: 100%;
          width: 150px;
          i {
            position: absolute;
            right: 0;
            font-size: 30px;
            top: 50%;
            margin-top: -15px;
            transition: all 1s;
            cursor: pointer;
            &:hover {
              transform: rotate(180deg);
              color: #6bc30d;
            }
          }
          .userphoto {
            overflow: hidden;
            position: absolute;
            top: 50%;
            margin-top: -22.5px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            img {
              height: 100%;
              width: 100%;
              display: block;
            }
          }
          .username {
            overflow: hidden;
            text-overflow: ellipsis;
            position: absolute;
            left: 53px;
            top: 50%;
            margin-top: -10px;
            width: 70px;
            height: 20px;
            font-size: 18px;
            font-family: LiSu;
            text-align: left;
            line-height: 20px;
          }
          //修改用户信息
          .Infmation {
            position: fixed;
            right: 0;
            top: 0;
            z-index: 100;
            text-align: center;
            line-height: 30px;
            font-size: 16px;
            margin-top: 61px;
            user-select: none;
            cursor: pointer;
            width: 100px;
            background-color: #f2f2f2;
            .el-button {
              width: 100%;
              margin: 5px 0;
            }
            .el-button:nth-child(2){
              margin-bottom: 0;
            }
            &:hover {
              color: #6bc30d;
            }
          }
          /deep/.el-drawer__header {
            position: absolute;
            right: 10px;
            display: block;
            height: 20px;
            margin: 0;
            width: 20px;

            .el-drawer__close-btn {
              position: absolute;
              top: 0;
              right: 10px;
              text-align: center;
              height: 100%;
              width: 100%;
            }
          }
        }
        .login {
          position: absolute;
          right: 0;
          width: 150px;
          height: 100%;
        }
      }
      .n-m-nav {
        position: relative;
        float: right;
        width: 576px;
        height: 60px;
        margin-right: 14%;
        ul {
          display: flex;
          width: 100%;
          height: 100%;
          li {
            flex: 1;
            a {
              position: relative;
              display: block;
              width: 100%;
              height: 100%;
              text-align: center;
              line-height: 58px;
              color: #212220;
              font-weight: 400;
              font-size: 17px;
              transition: color 0.3s;
              &::after {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                margin: 0 auto;
                content: "";
                height: 2px;
                width: 0;
                background-color: #6bc30d;
                transition: width 0.4s;
              }
              &:hover {
                color: #6bc30d;
                &::after {
                  width: 100%;
                }
              }
            }
          }
          &.list1 li:nth-child(1),
          &.list2 li:nth-child(2),
          &.list3 li:nth-child(3),
          &.list4 li:nth-child(4),
          &.list5 li:nth-child(5),
          &.list6 li:nth-child(6),
          &.list7 li:nth-child(7) {
            a {
              color: #6bc30d;
              &::after {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
  /deep/.el-drawer__body {
    .userinfo {
      position: absolute;
      top: 10px;
      left: 30px;
      width: 77%;
      height: 60px;
      .username {
        position: absolute;
        top: 50%;
        margin-top: -8px;
        width: 100px;
        margin-left: 10px;
        text-overflow: ellipsis;
        font-size: 16px;
      }
      .Signout {
        position: absolute;
        right: 30px;
        width: 60px;
        line-height: 60px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        text-align: center;
        transition: all 0.5s;
        &:hover {
          color: #6bc30d;
        }
      }
      .userphoto {
        display: block;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>