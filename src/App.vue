<template>
  <div id="app">
    <myheader></myheader>
    <router-view/>
  </div>
</template>
<script>
import myheader from './components/header'
export default {
  components:{myheader}
  
}
</script>

<style lang="scss">
#app{
   font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    text-align: center;
   
    background-color: rgba(242, 245, 252, 0.3);
}
</style>
