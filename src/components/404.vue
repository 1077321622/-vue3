<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2022-04-20 18:47:27
 * @LastEditors: 404
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mian">
         <h2>你访问的页面不存在</h2>
         <el-button @click="goback">
           返回
         </el-button>
  </div>
</template>

<script  setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();

const goback=()=>{
 router.go(-1);
}


</script>

<style scoped>

</style>