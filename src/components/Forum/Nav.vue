<!-- Nav -->
<template>
  <div>
    <div class="Nav">
      <header class="header">
        <a href="#">
          <svg viewBox="0 0 200 91" fill="#0084FF" width="64" height="30">
            <path
              d="M53.29 80.035l7.32.002 2.41 8.24 13.128-8.24h15.477v-67.98H53.29v67.978zm7.79-60.598h22.756v53.22h-8.73l-8.718 5.473-1.587-5.46-3.72-.012v-53.22zM46.818 43.162h-16.35c.545-8.467.687-16.12.687-22.955h15.987s.615-7.05-2.68-6.97H16.807c1.09-4.1 2.46-8.332 4.1-12.708 0 0-7.523 0-10.085 6.74-1.06 2.78-4.128 13.48-9.592 24.41 1.84-.2 7.927-.37 11.512-6.94.66-1.84.785-2.08 1.605-4.54h9.02c0 3.28-.374 20.9-.526 22.95H6.51c-3.67 0-4.863 7.38-4.863 7.38H22.14C20.765 66.11 13.385 79.24 0 89.62c6.403 1.828 12.784-.29 15.937-3.094 0 0 7.182-6.53 11.12-21.64L43.92 85.18s2.473-8.402-.388-12.496c-2.37-2.788-8.768-10.33-11.496-13.064l-4.57 3.627c1.363-4.368 2.183-8.61 2.46-12.71H49.19s-.027-7.38-2.372-7.38zm128.752-.502c6.51-8.013 14.054-18.302 14.054-18.302s-5.827-4.625-8.556-1.27c-1.874 2.548-11.51 15.063-11.51 15.063l6.012 4.51zm-46.903-18.462c-2.814-2.577-8.096.667-8.096.667s12.35 17.2 12.85 17.953l6.08-4.29s-8.02-11.752-10.83-14.33zM199.99 46.5c-6.18 0-40.908.292-40.953.292v-31.56c1.503 0 3.882-.124 7.14-.376 12.773-.753 21.914-1.25 27.427-1.504 0 0 3.817-8.496-.185-10.45-.96-.37-7.24 1.43-7.24 1.43s-51.63 5.153-72.61 5.64c.5 2.756 2.38 5.336 4.93 6.11 4.16 1.087 7.09.53 15.36.277 7.76-.5 13.65-.76 17.66-.76v31.19h-41.71s.88 6.97 7.97 7.14h33.73v22.16c0 4.364-3.498 6.87-7.65 6.6-4.4.034-8.15-.36-13.027-.566.623 1.24 1.977 4.496 6.035 6.824 3.087 1.502 5.054 2.053 8.13 2.053 9.237 0 14.27-5.4 14.027-14.16V53.93h38.235c3.026 0 2.72-7.432 2.72-7.432z"
              fill-rule="evenodd"
            />
          </svg>
        </a>
        <ul :class="['Tabs','list'+whichActive]">
          <li>
            <router-link to="/forum">首页</router-link>
          </li>
          <li>
            <router-link to="/explore">发现</router-link>
          </li>
        </ul>
        <div class="seach">
          <el-autocomplete
            :class="['inpt',{'ifinpt':ifshowinpt}]"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @focus="inptchange"
            @blur="hideinput"
          ></el-autocomplete>
          <el-button :class="['el-button',{'skew':ifskew}]" type="primary">提问</el-button>
        </div>
        <div class="userinfo">
          <ul>
            <div>
              <li>
                <i class="el-icon-message-solid"></i>
              </li>
              <li>
                <span>10</span>
                <i class="el-icon-s-comment"></i>
              </li>
              <li class="info">
                <img src alt />
              </li>
            </div>
          </ul>
        </div>
      </header>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      routerList: ["Forum", "Explore"],
      restaurants: [],
      state: "",
      timeout: null,
      //控制元素
      ifshowinpt: false,
      ifskew: false,
      input: [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        }
      ]
    };
  },
  computed: {
    whichActive() {
      let index = this.routerList.indexOf(this.$route.name);
      if (this.$route.name === "forum") index = 1;
      return index + 1;
    }
  },
  methods: {
    //触发input函数
    inptchange() {
      this.ifshowinpt = true;
      this.ifskew = true;
    },
    hideinput() {
      this.ifshowinpt = false;
      this.ifskew = false;
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000);
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="less">
.Nav {
  position: fixed;
  width: 100%;
  z-index: 999;
  height: 54px;
  background-color: #cccc;
  .header {
    position: relative;
    min-width: 1000px;
    width: 80%;
    height: 100%;
    margin: auto;
    a {
      position: absolute;
      display: block;
      top: 50%;
      margin-top: -15.5px;
      width: 8%;
    }
    .Tabs {
      padding: 0 20px;
      position: relative;
      position: absolute;
      display: flex;
      justify-content: space-between;
      left: 8%;
      width: 180px;
      height: 100%;
      li {
        height: 100%;
        width: 45%;
        line-height: 54px;
        text-align: center;
        a {
          position: absolute;
          padding: 0;
          margin: 0;
          top: 0;
          height: 100%;
          width: 45%;
          color: #fff;
          font-size: 16px;
          display: block;
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
      &.list2 li:nth-child(2) {
        &:hover {
          color: #6bc30d;
          &::after {
            width: 100%;
          }
        }
      }
    }
    .seach {
      position: relative;
      position: absolute;
      right: 300px;
      width: 400px;
      height: 100%;
      .el-autocomplete {
        position: absolute;
        top: 50%;
        width: 77%;
        margin-top: -20px;
        transition: width 0.4s;
      }
      .ifinpt {
        position: absolute;
        width: 100%;
        z-index: 2;
      }
      .el-button {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -20px;
      }
      .skew {
        position: absolute;
        transition: skew all 3s;
      }
      @keyframes skew {
        from {
          opacity: 0;
          transform: scale(0);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
    .userinfo {
      position: relative;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -17.5px;
      width: 329px;
      height: 35px;
      ul {
        position: absolute;
        right: 0;
        width: 300px;
        height: 100%;
        div {
          position: absolute;
          right: 0;
        }
        li {
          float: left;
          height: 100%;
          line-height: 35px;
          font-size: 25px;
          margin: 0 10px;
          cursor: pointer;
        }
        li:nth-child(2) {
          position: relative;
          span {
            position: absolute;
            top: 0;
            right: -5px;
            font-size: 9px;
            height: 15px;
            color: #fff;
            text-align: center;
            line-height: 15px;
            width: 15px;
            border-radius: 40%;
            background-color: red;
          }
        }
        .info {
          height: 100%;
          width: 35px;
          margin-right: 0;
          img {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>