<!-- 博客页面 -->
<template>
  <div class="Diary">
    <Nav></Nav>
    <div class="diary-main">
      <el-timeline>
        <div class="Blog">
          <i class="el-icon-time"></i>
          <span>Sun.Fulin</span>
          <audio
            autoplay="autoplay"
            controls="controls"
            preload="auto"
            src="../../assets/Mp3/Mp3.mp3"
          ></audio>
        </div>
        <div
          class="DiaryBox"
          style="width:100% height:100%"
          v-for="item in Diarylist"
          :key="item.index"
        >
          <div class="time">{{item.date | getTime}}</div>
          <el-timeline-item color="#6bc30d" size="large" placement="top">
            <el-card>
              <h4>{{item.title}}</h4>
              <p class="content">{{item.content}}</p>
              <img :src="item.img" style="width:100%" alt />
            </el-card>
          </el-timeline-item>
        </div>
      </el-timeline>
    </div>
    <div v-if="ifloading" class="loading">
      <div>
        <span>加载中请稍等....</span>
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path" />
        </svg>
      </div>
    </div>
    <p v-if="ifnomore" class="no-more">我也是有底线的哦</p>
  </div>
</template>

<script>
import FooterBar from "../../components/FooterBar"
import Nav from "../../components/Nav";
import request from "../../api/index";
const getDiray = request.getDiray;

function toTow(num) {
  return (num < 10 ? "0" : "") + num;
}
export default {
  name: "Music",
  data() {
    return {
      Diarylist: [],
      skip: 0,
      limit: 5,
      //底部没有数据了
      ifnomore: false,
      //是否加载
      ifloading: false
    };
  },
  components: {
    FooterBar,
    Nav
  },
  filters: {
    getTime(val) {
      let date = new Date(val);
      let YY = toTow(date.getFullYear()),
        MM = toTow(date.getMonth() + 1),
        DD = toTow(date.getDate());
      return `${YY}/${MM}/${DD}`;
    }
  },
  methods: {
    getDiray() {
      getDiray(this.skip, this.limit)
        .then(res => {
          this.Diarylist = res.data.data;
        })
        .catch(e => {
          console.log("失败", e);
        });
    },
    //滚动加载
    handleScroll() {
      if (this.ifnomore && this.ifloading) return;
      let a = document.documentElement.offsetHeight;
      let b = document.documentElement.scrollTop;
      let c = document.documentElement.clientHeight;
      if (b + c >= a - 500) {
        this.ifloading = true;
        this.skip += 5;
        getDiray(this.skip, this.limit)
          .then(res => {
            this.ifloading = false;
            if (res.data.data.length) {
              this.Diarylist.push(...res.data.data);
            } else {
              this.ifnomore = true;
            }
          })
          .catch(() => {});
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    document.documentElement.scrollTop = 0;
    this.getDiray();
    document.addEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped lang="less">
.Diary {
  position: relative;
  box-sizing: border-box;
  max-width: 1140px;
  width: 100%;
  padding: 80px 30px;
  margin: 0 auto;
  .diary-main {
    width: 100%;
    box-sizing: border-box;
    padding: 30px 10% 30px 20%;
    background-color: #fff;
    .el-card {
      position: relative;
      background-color: #484348;
      color: #fff;
      h4 {
        margin-bottom: 10px;
        font-size: 18px;
      }
      p {
        display: block;
        left: 0;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
      }
    }
    .el-timeline {
      position: relative;
      @keyframes diartime {
        0% {
          opacity: 0;
          transform: translate3d(-100%, 0, 0);
        }
        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
      .Blog {
        position: relative;
        width: 72%;
        height: 40px;
        margin-left: -10px;
        margin-bottom: 30px;
        line-height: 40px;
        font-size: 36px;
        font-family: BarbaraHand;
        span {
          font-size: 46px;
        }
        audio {
          position: absolute;
          right: 0;
          height: 100%;
          outline: none;
        }
      }
      .DiaryBox {
        position: relative;
        /deep/.el-card {
          width: 90%;
        }

        .time {
          position: absolute;
          top: -4px;
          left: -137px;
          font-size: 24px;
          color: #6bc30d;
          animation: diartime 2s;
        }
        .content {
          line-height: 25px;
          font-size: 20px;
          font-family: KaiTi;
        }
      }
    }
    /deep/.el-timeline-item__wrapper {
      position: absolute;
      top: -21px;
      position: relative;
      animation: diraydonhua 2s;
      &::after {
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        top: 13px;
        left: 16px;
        border-top: 15px solid transparent;
        border-right: 15px solid #484348;
        border-bottom: 15px solid transparent;
      }
    }
    @keyframes diraydonhua {
      0% {
        opacity: 0;
        transform: translate3d(100%, 0%, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  }
  > .loading {
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
   > .no-more {
    width: 100%;
    height: 30px;
    background-color: #fff;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
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