<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
 <el-menu-item index="1" class="el-col el-col-8">处理中心</el-menu-item>
 
  <el-menu-item index="2"  class="el-col el-col-8">消息中心</el-menu-item>
 <el-menu-item index="3"  class="el-col el-col-8">订单管理</el-menu-item>
</el-menu>
</template>
<script>
export default {
    data(){
        return{
            activeIndex:"1"
        }
    }
}
</script>