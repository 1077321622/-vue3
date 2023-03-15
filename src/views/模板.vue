<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2023-03-01 11:43:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mian">
   
    <a href="/P/99087.html" target="Play">K49740-快四、你在他乡还好吗[庄妮-DJ版]...</a>

    <audio id="mplayer" src="https://p.mz57.com/PYUjVsOFA/快四舞曲/K49740-快四、你在他乡还好吗[庄妮-DJ版].mp3"></audio>

    <a href="/P/99086.html" target="Play">K49739-快四、你是我的执念[雨中百合-DJ版]...</a>
    <audio id="mplayer" src="https://p.mz57.com/PYUjVsOFA/快四舞曲/K49739-快四、你是我的执念[雨中百合-DJ版].mp3"></audio>


  </div>
</template>

<script  setup>
import { ref ,onMounted} from "vue";
import { useStore } from "vuex";
import { wyy_subcount } from "../api/index.js";
import Cookies from "js-cookie";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const store = useStore();

onMounted(() => {
  getuserinfo();
});

const getuserinfo = () => {
   wyy_subcount().then((res) => {
      console.log(res)
    }).catch((error) => {

    });
};


</script>

<style scoped>


</style>