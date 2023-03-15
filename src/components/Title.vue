<!--
 * @Author: your name
 * @Date: 2022-03-08 14:04:45
 * @LastEditTime: 2022-12-23 14:54:24
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\components\Title.vue
-->
<template>
  <div  class="row-bg dis">
    <div class="icon1"></div>
    <div class="name"><h4>{{tit}}</h4></div>
  </div>
</template>

<script  setup>

const props = defineProps({
  title: String,
});

const tit = toRef(props, 'title');

</script>

<style scoped>
.row-bg{
    margin: 5px 0px;
    width: 100%;
    height: 25px;
}
.icon1{
    width: .625rem;
    height: 100%;
    background:  #337ecc ;
}
h4{
    color: #303133;
    line-height: 7px;
    margin: 8px 11px;
}
</style>