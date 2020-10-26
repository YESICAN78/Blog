<!--  -->
<template>
  <div>
    <el-pagination 
    background
    layout="prev, pager, next" 
    :total="total"
    :page-count="5"
    :page-size="pageSize"
    @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name:"Pag",
  data() {
    return {};
  },
  props:["pageSize","total"],
  methods: {
    currentChange(Pindex){
       this.$emit("currentChange",Pindex,this.pageSize)
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped lang="less">
 .Pag {
      width: 100%;
      height: 40px;
      .el-pagination {
        width: 100%;
      }
    }
</style>