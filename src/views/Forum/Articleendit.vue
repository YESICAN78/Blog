<!--  -->
<template>
  <div class="forum">
    <Nav></Nav>
    <div class="forumAdd">
      <div class="Addarticle">
        <div class="content">
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="文章封面" prop="Articleface">
              <Upload @handleSuccess="handleSuccess"></Upload>
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
              <el-input
                class="title"
                maxlength="30"
                v-model="form.title"
                placeholder="请输入标题(最多30个字)"
              ></el-input>
            </el-form-item>
            <el-form-item label="类容" prop="content">
              <RichText @Submit="Submit"></RichText>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../../components/Nav";
import Upload from "../../components/Forum/Upload";
import RichText from "../../components/Forum/RichText";

import request from "../../api/index";
const PostArticle = request.PostArticle;
const postifLogin = request.postifLogin;
export default {
  name: "ArticleEndit",
  components: {
    Nav,
    Upload,
    RichText
  },
  data() {
    return {
      form: {
        Articleface: "",
        title: "",
        content: ""
      },
      rules: {
        title: [{ required: true, message: "请选输入标题" }],
        content: {
          validator: (rule, value, cb) => {
            if (this.form.content) {
              cb();
            } else {
              cb(new Error("请输入文章类容😂"));
            }
          },
          required: true
        }
      }
    };
  },
  methods: {
    /**
     * 封面子组件传递过来的数据函数
     */
    handleSuccess(url) {
      this.form.Articleface = url;
    },
    /**
     * 类容子组件传递数据函数
     * */
    Submit(data) {
      this.form.content = data;
      //判断是否登录函数
      console.log(this.form.Articleface);
      postifLogin()
        .then(res => {
          if (res.data.userInfo) {
            //发布文章
            PostArticle({
              title: this.form.title,
              content: this.form.content,
              forumface: this.form.Articleface,
              userid:res.data.userInfo._id,
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
                  this.$router.push("/forum");
                  window.location.reload();
                }, 2000);
              }
            });
          } else {
            //没有登录
            layer.msg("请先登录在发表文章😝", {
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
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="less">
.forum {
  width: 100%;
  height: 1500px;
  .forumAdd {
    box-sizing: border-box;
    width: 80%;
    max-width: 1260px;
    height: 100%;
    padding-top: 80px;
    margin: auto;
    padding: 0 auto;
    .Addarticle {
      background-color: #fff;
      width: 100%;
      .content {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 30px 40px;
        .title {
          height: 60px;
          border: 1px solid #ccc;
          /deep/.el-input__inner {
            display: block;
            height: 100%;
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>