<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2023-02-16 15:49:28
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mian">



    <el-skeleton :rows="30" :loading="loading" animated />
    <div class="w3-row-padding">
      <div
        class="w3-third w3-margin-bottom"
        v-for="(item, index) in songs"
        :key="index"
      >
        <ul class="w3-ul w3-border w3-center w3-hover-shadow">
          <li class="w3-black w3-xlarge w3-padding-32 showline1">
            {{ item.name }}
          </li>
          <li class="w3-padding-16"><b></b> {{ item.creator.nickname }}</li>
          <li class="w3-padding-16 showline1">
            <b></b> {{ item.creator.signature }}
          </li>
          <li class="w3-light-grey w3-padding-24">
            <button
              class="w3-button w3-green w3-padding-large"
              @click="openSong(item.id)"
            >
              歌单专辑
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script  setup>
import { useStore } from "vuex";
import { wyy_resource } from "../api/index.js";
import Cookies from "js-cookie";

let cookie = Cookies.get("cookies");
const router = useRouter();
const store = useStore();

const loading = ref(true);
const songs = ref([]);
onMounted(() => {
  getgedan();
});

const getgedan = () => {
  const parms = {
    cookie: cookie,
  };
  wyy_resource(parms)
    .then((res) => {
      songs.value = res.recommend;
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    })
    .catch((error) => {});
};

const openSong = (id) => {
  router.push({
    path: "./msdel",
    query: {
      songsId: id,
    },
  });
};
</script>

<style scoped>
.mysongbox {
  width: 237px;
  height: 320px;
  display: inline-block;
  margin: 10px;
  cursor: pointer;
}
.image {
  width: 235px;
  height: 236px;
}
.tagbox {
  padding: 5px 0px;
}
.list {
  width: 800px;
  margin: 0 auto;
}
</style>