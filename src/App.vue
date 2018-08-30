<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <app-nav></app-nav>
  </div>
</template>

<script>
  import Nav from './components/Nav.vue'

  export default {
    name: 'App',
    components: {
      'app-nav': Nav
    }
  }
</script>

<style lang="scss">
  @import "./assets/css/variable.scss";
  /* el-ui 默认样式 */
  @import "./assets/css/element-ui-modify.scss";
  #app {
    font-family: "Microsoft YaHei","微软雅黑",'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased; /* 字体抗锯齿更加清晰 */
    -moz-osx-font-smoothing: grayscale; /* 字体抗锯齿更加清晰 */
    font-size: $GobalFontSize;  /* 14px */
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
