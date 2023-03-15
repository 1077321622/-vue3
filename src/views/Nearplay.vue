<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2023-01-03 17:45:59
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div
    class="mian"
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >

    <div class="dis">
      <div class="musicbox">
        <div class="mr20">
          <el-scrollbar height="820px">
          <ul>
            <li
              v-for="(item, i) in nearSongsAll"
              :key="i"
              v-bind:class="{ active: item.song.id == nowplay_id }"
              @click="playmp3(i, item)"
            >
              <p class="imgp">
                <el-image
                  class="img  cw3-round"
                  :src="item.song.al.picUrl"
                  lazy
                ></el-image>
              </p>
             <p class="pname"   :style="{
                  color:  item.song.id == nowplay_id ? `${$store.state.lrccol.color}` : '',
                  fontSize:item.song.id == nowplay_id ? 15+'px' : 13+'px',
                  fontWeight: 'bold',
               }">{{ item.song.name }}</p>
              <p  id="animcss1" v-if="item.song.id == nowplay_id">
                <img src="../assets/likeon.png" alt="">
              </p>
            </li>
          </ul>
          </el-scrollbar>
        </div>
      </div>
      <div class="playbox">
           <van-sticky :offset-top="70">
                <Playmp3 @markParentLiBg="markParentLiBgFn"></Playmp3>
           </van-sticky>
      </div>
    </div>
  </div>
</template>

<script  setup>

import { useStore } from "vuex";
import Playmp3 from "../components/play.vue";
import { wyy_nearplay,wyy_nearplay1, wyy_geturl } from "../api/index.js";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
       `;

const route = useRoute();
const router = useRouter();
const store = useStore();

const loading = ref(true);
const nearSongsAll = ref([]);
const page = ref(30);

//当前播放id
let nowplay_id = ref(-1);
let url = ref("");

onMounted(() => {
  getNEarSong();
});

const markParentLiBgFn = (params) => {
  nowplay_id.value = params;
};

const getNEarSong = () => {
  const parms = reactive({
    type: 0,
    uid: store.state.login.userinfo.profile.userId,

  });

  wyy_nearplay(parms)
    .then((res) => {
      nearSongsAll.value = res.allData;
      loading.value = false;
      //儲存播放的id集合
      let idsData = res.allData;
      let ids = idsData.map((item) => {
        return item.song.id;
      });
      //提交到數據中心
      store.commit("play/playIds", ids);
      nowplay_id.value = res.allData[0].song.id;
      let id = res.allData[0].song.id;
      let obj = {
        id: res.allData[0].song.id,
        name: res.allData[0].song.name,
        pic: res.allData[0].song.al.picUrl,
      };
      getfristUrl(id, obj);
    })
    .catch((error) => {});
};

//默认播放第一曲
const getfristUrl = (id, obj1) => {
  let parms = {
    id: id,
  };
  wyy_geturl(parms)
    .then((res) => {
      if (isNull(res.data[0].url)) {
        let obj = {
          url: res.data[0].url,
          id: obj1.id,
          name: obj1.name,
          pic: obj1.pic,
        };
        store.commit("play/save_obj", obj);
      } else {
          notNest()
      }
    })
    .catch((error) => {});
};

//播放
const playmp3 = (i, item) => {
  nowplay_id.value = item.song.id;
  let parms = {
    id: item.song.id,
  };
  wyy_geturl(parms)
    .then((res) => {
      if (isNull(res.data[0].url)) {
        url.value = res.data[0].url;
        let obj = {
          id: item.song.id,
          name: item.song.name,
          url: res.data[0].url,
          pic: item.song.al.picUrl,
        };
        store.commit("play/save_obj", obj);
      } else {
          notNest()
      }
    })
    .catch((error) => {});
};

const isNull = (params) => {
  if (params == null || params == "null" || params.length == 0) {
    return false;
  } else {
    return true;
  }
};


const notNest = () => {
    ElMessage.error("未获取到播放地址，请手动切换下一曲");
    store.commit("play/save_obj", {});
    store.commit("play/setLyric", []);
};

onUnmounted(() => {
    store.commit("play/save_obj", {});
    store.commit("play/setLyric", []);
});
</script>
<style scoped>
@import '../style/song.css';
</style>