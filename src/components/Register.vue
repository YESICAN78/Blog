<!-- 注册页面 -->
<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="beforeClose">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item class="form-item" label="用户名:" prop="user">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="输入密码" prop="password">
        <el-input v-model="form.password" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="确认密码" prop="checkpassword">
        <el-input v-model="form.checkpassword" type="password"></el-input>
      </el-form-item>
      <el-form-item class="vcode" label="验证码" prop="vcode">
        <el-input v-model="form.vcode"></el-input>
        <div class="svg" v-html="register.svgText"></div>
        <el-link
          class="refresh"
          @click="getVocde"
          type="primary"
          :disabled="register.disabled"
        >{{register.refreshText}}</el-link>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handelColse" :disabled="register.SubmitDisabled">立即注册</el-button>
    </span>
  </el-dialog>
</template>

<script>
import request from "../api/index";
const getregistervcode = request.getregistervcode;
const getCheckVcode = request.getCheckVcode;
const postRegister = request.postRegister;
export default {
  name: "Register",
  data() {
    return {
      //form表单的数据
      form: {
        user: "",
        password: "",
        checkpassword: "",
        vcode: ""
      },
      //表单验证数据
      rules: {
        user: [
          //trigger失去焦点触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            //数据类型
            type: "string",
            //正则规则
            pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,6}$/,
            message: "2-6位，数字，字母，_ -中日韩文",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (
                  /^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)
                ) {
                  callback();
                } else {
                  callback(new Error("密码6-18位,不允许出现奇怪的字符"));
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
            message: "6-18位，不允许出现奇怪的字符",
            trigger: ["blur", "change"],
            required: true
          }
        ],
        checkpassword: [
          { required: true, message: "再次输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (value === this.form.password) {
                  callback();
                } else {
                  callback(new Error("两次输入的密码不一致"));
                }
              } else {
                callback(new Error("请再次输入密码"));
              }
            },
            trigger: ["blur", "change"]
          }
        ],
        //验证码验证
        vcode: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请输入验证码"));
              } else {
                let toUpperCase = value.toUpperCase();
                //失去焦点验证验证码(再次请求)
                getCheckVcode(toUpperCase)
                  .then(res => {
                    if (res.data.code === 0) {
                      callback();
                    } else {
                      callback(new Error("验证码错误"));
                    }
                  })
                  .catch(e => {
                    callback(new Error("未知的错误",e));
                  });
              }
            },
            required: true,
            trigger: ["blur", "change"]
          }
        ]
      },
      //注册相关的数据
      register: {
        svgText: "Loading...",
        refreshText: "刷新",
        disabled: true,
        timer: null,
        //按钮的显示影藏
        SubmitDisabled: false
      }
    };
  },
  props: ["dialogVisible"],
  methods: {
    //获取验证码
    getVocde() {
      getregistervcode().then(res => {
        //清除上一次保存的时间
        clearTimeout(this.register.timer);
        let _t = 0;
        let fn = () => {
          _t += 1000;
          if (_t > res.data.time) {
            clearTimeout(this.register.timer);
            this.register.refreshText = "刷新";
            this.register.disabled = false;
          } else {
            this.register.disabled = true;
            this.register.refreshText =
              (((res.data.time - _t) / 1000) | 0) + "s后重试";
          }
        };
        this.register.timer = setInterval(fn, 1000);
        fn();
        this.register.svgText = res.data.data;
      });
    },
    //注册点击
    handelColse() {
      this.register.SubmitDisabled = true;
      this.$refs["form"].validate(valid => {
        if (valid) {
          //验证通过
          postRegister(this.form)
            .then(res => {
              //无论是注册失败 还是成功都要刷新验证码
              this.getVocde();
              if (res.data.code) {
                let msg = res.data.msg;
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                  offset: 100,
                  duration: 1500
                });
                //清除表单数据
                this.$refs["form"].resetFields();
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                  offset: 100,
                  duration: 1500
                });
                this.register.SubmitDisabled = true;
                //注册成功关闭页面
                setTimeout(() => {
                  this.$emit("handelRegister")
                }, 1500);
                this.$refs["form"].resetFields();
              }
            })
            .catch(e => {
              this.getVocde();
              console.log(e);
            });
        } else {
          return false;
        }
      });
    },
    beforeClose() {
      this.$confirm("确定关闭🤣?")
        .then(() => {
          this.$emit("handelRegister");
        })
        .catch(() => {});
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getVocde();
  },
  destroyed() {
    clearTimeout(this.register.tomer);
  }
};
</script>
<style scoped lang='less'>
/* @import url(); 引入css类 */
.form-item {
  padding-right: 30px;
}
.vcode {
  user-select: none;
  .el-input {
    width: 35%;
    float: left;
  }
  div.svg {
    width: 35%;
    float: left;
    height: 40px;
    /deep/ svg {
      width: 100% !important;
      height: 100% !important;
    }
  }
  .refresh {
    width: 30%;
    height: 40px;
    float: left;
    line-height: 50px;
    color: blue;
    cursor: pointer;
  }
}
</style>