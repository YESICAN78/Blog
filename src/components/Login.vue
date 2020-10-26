<!-- 登录页面 -->
<template>
  <div>
    <el-dialog title="登录" :visible.sync="dialogVisible" width="30%" :before-close="beforeClose">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item class="form-item" label="用户名:" prop="user">
          <el-input v-model="form.user"></el-input>
        </el-form-item>
        <el-form-item class="form-item" label="密码:" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handelColse">立即登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "../api/index";
const postLogin = request.postLogin;
const postifLogin = request.postifLogin;

export default {
  name: "Login",
  data() {
    return {
      //form表单的数据
      form: {
        user: "",
        password: "",
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
            trigger: ["blur", "change"],
          },
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
              this.form.checkpassword &&
                this.$refs.form.validateField("checkpassword");
            },
            type: "string",
            trigger: ["blur", "change"],
            required: true,
          },
        ],
      },
    };
  },
  props: ["dialogVisible"],
  computed: {},
  methods: {
    //点击登录
    handelColse() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //验证通过 发起登录请求
          postLogin(this.form)
            .then((res) => {
              if (res.data.code) {
                //登录失败
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                  offset: 100,
                  duration: 1500,
                });
              } else {
                //登录成功
                this.$message({
                  message: res.data.msg,
                  type: "success",
                  offset: 100,
                  duration: 1500,
                });
                // 登录成功刷新页面
                setTimeout(() => { 
                  postifLogin()
                    .then((res) => {
                      localStorage.setItem("userid", res.data.userInfo._id);
                    })
                  window.location.reload();
                }, 2000);
              }
            })
            .catch((e) => {
              this.$message({
                message: "登录失败-稍后再试",
                type: "error",
                offset: 100,
                duration: 1500,
              });
            });
        } else {

        }
      });
    },
    beforeClose() {
      this.$confirm("确定关闭🤣?")
        .then(() => {
          this.$emit("handelLogin");
        })
        .catch(() => {});
    },
  },

  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  destroyed() {},
};
</script>
<style scoped lang='less'>
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