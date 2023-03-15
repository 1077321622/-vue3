<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2022-12-23 14:55:15
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mian ">
    <div class="mianitem2 disflex">
      <Title title="我的歌单"></Title>
    <el-skeleton :rows="20" :loading="loading" animated />
     <el-row class="mysongbox" v-for="(item, index) in songs" :key="index" @click="openSong(item.id)">
      <div class="mysongbox_m">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.coverImgUrl" class="image" />
          <div style="padding: 14px">
            <span class="line1">{{ item.name }}</span>
          </div>
        </el-card>
      </div>
    </el-row>
  </div>
  </div>
</template>

<script  setup>

import { useStore } from "vuex";
import { wyy_playlist,wyy_creategd } from "../api/index.js";
import Cookies from "js-cookie";
import Title from '../components/Title.vue'
//l路由引入

const router = useRouter();
const store = useStore();
let cookie = Cookies.get("cookies")


const sondName = ref("");
const loading = ref(true);
const songs = ref([]);
const gdData = ref([]);


onMounted(() => {
  getsongs();
});

//创建
const createsong = () => {
  let parms = {
    name:sondName.value,
    uid: store.state.login.userinfo.profile.userId,
    cookie:cookie
  };
  wyy_creategd(parms).then((res) => {
      console.log(res)
    }).catch((error) => {
      loading.value = false;
    });
};
//获取我的歌单
const getsongs = () => {
  let parms = {
    limit: 10,
    offset: 1,
    uid: store.state.login.userinfo.profile.userId,
     cookie:cookie
  };
  wyy_playlist(parms)
    .then((res) => {
      songs.value = res.playlist;
      loading.value = false;
    })
    .catch((error) => {});
};

const openSong=(id)=>{
    router.push({
        path:"./msdel",
            query: {
               songsId: id,
         },
    })
}


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
.mianitem1{
  width: 700px;
}
.gdlist{
  margin: 21px;
}
</style>