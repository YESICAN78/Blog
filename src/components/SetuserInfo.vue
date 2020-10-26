<!-- 用户更改信息 -->
<template>
  <div class="form">
    <div class="serphotot">
      
    </div>
    <el-form class="el-form" ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item class="form-item" label="新密码" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="手机号:" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item class="phonevcode" label="验证码" prop="phonevcode">
        <el-input class="input" v-model="form.phonevcode"></el-input>
        <el-link
          @click="getphonevcode"
          class="sendphonevcode"
          type="primary"
          :disabled="phonedata.disabled"
        >{{phonedata.refreshText}}</el-link>
      </el-form-item>
      <el-button
        @click="Submitclick"
        class="btn"
        size="medium "
        type="primary"
        :loading="phonedata.ifloading"
      >提交</el-button>
    </el-form>
  </div>
</template>

<script>
//引入接口
import request from "../api/index";
const postgetphonvcode = request.postgetphonvcode;
const postSubmituserInfo = request.postSubmituserInfo;
const postSingout = request.postSingout;
const postUploadphoto = request.postUploadphoto;
export default {
  name: "SetuserInfo",
  components: {},
  data() {
    return {
      //表单相关的数据
      form: {
        // user: "",
        password: "",
        phone: "",
        phonevcode: ""
      },
      //表单验证数据
      rules: {
        password: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (
                  /^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)
                ) {
                  callback();
                } else {
                  callback(new Error("密码6-18位,不允许出现奇怪的字符😎"));
                }
              } else {
                callback(new Error("请输入密码"));
              }
              //在这里还需要验证确认密码的认证
              /**
               * 如果在vue里面想要操作DOM的话
               * 就给父级标签 设置 ref="name"
               * 然后通过this.$refs.name的方式获取
               * */

              this.form.checkpassword &&
                this.$refs.form.validateField("checkpassword");
            },
            type: "string",
            message: "6-18位，不允许出现奇怪的字符😎",
            trigger: ["blur", "change"],
            required: true
          }
        ],
        //手机号验证
        phone: [
          {
            validator(rule, value, callback) {
              if (value) {
                let Reg = /^1[3456789]\d{9}$/.test(value);
                if (Reg) {
                  //手机号符合规范
                  callback();
                } else {
                  callback(new Error("手机号码格式错误😜"));
                }
              } else {
                callback(new Error("请输入手机验证码🙏"));
              }
            },
            message: "请输入你的手机号码😊",
            trigger: ["blur", "change"],
            required: true
          }
        ],
        //手机验证码验证
        phonevcode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["blur"]
          }
        ]
      },
      //手机验证码相关数据
      phonedata: {
        refreshText: "获取验证码",
        disabled: false,
        Time: null,
        ifloading: false
      }
    };
  },
  methods: {
    //用户获取手机验证码请求
    getphonevcode() {
      postgetphonvcode(this.form.phone)
        .then(res => {
          if (res.data.code) {
            this.$message({
              message: res.data.msg,
              type: "warning",
              offset: 100,
              duration: 1500
            });
          } else {
            //清除上一次请求的时间
            clearTimeout(this.phonedata.Time);
            let t = 0;
            let tmfn = () => {
              t += 1000;
              if (t > res.data.Time) {
                clearTimeout(this.phonedata.Time);
                //还没有请求
                this.phonedata.disabled = false;
                this.phonedata.refreshText = "获取手机验证码";
              } else {
                //已经请求过
                this.phonedata.disabled = true;
                this.phonedata.refreshText =
                  (((res.data.Time - t) / 1000) | 0) + "s后重试👀";
              }
            };
            this.phonedata.Time = setInterval(tmfn, 1000);
            tmfn();

            this.$message({
              message: res.data.msg,
              type: "success",
              offset: 100,
              duration: 3000
            });
          }
        })
        .catch(e => {
          console.log("获取失败", e);
        });
    },
    //修改信息的提交函数
    Submitclick() {
      this.phonedata.ifloading = true;
      postSubmituserInfo(this.form)
        .then(res => {
          if (res.data.code) {
            let msg = res.data.msg;
            this.$message({
              message: res.data.msg,
              type: "warning",
              offset: 100,
              duration: 1500
            });
            this.phonedata.ifloading = false;
          } else {
            this.$message({
              message: res.data.msg,
              type: "success",
              offset: 100,
              duration: 2000
            });
            this.phonedata.ifloading = false;
            setTimeout(() => {
              postSingout();
              window.location.reload();
            }, 1000);
          }
        })
        .catch(() => {
          console.log("服务器错误");
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //更改头像函数
    upload(){

    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
  
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.form {
  width: 80%;
  height: 100%;
  .phonevcode {
    position: relative;
    .input {
      float: left;
      width: 50%;
    }
    .sendphonevcode {
      position: absolute;
      right: 0;
      user-select: none;
    }
  }
  .el-form {
    position: relative;
    .btn {
      position: absolute;
      width: 120px;
      left: 50%;
    }
  }
  // 上传头像
  .serphotot {
    position: relative;
    padding: 20px 0;
    width: 100%;
  }
}
</style>