<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2022-12-28 16:15:50
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
    <!-- <el-form :inline="true" class="demo-form-inline">
           <el-radio-group v-model="radio" @change="changeVal">
            <el-radio :label="1" border>单曲1</el-radio>
            <el-radio :label="10" border>专辑10</el-radio>
            <el-radio :label="1002" border>歌单1002</el-radio>
             <el-radio :label="1004" border>MV1004</el-radio>
            <el-radio :label="1014" border>视频1014</el-radio>
         </el-radio-group>
        </el-form> -->
    <div class="serchbox dis">
      <div class="item1">
        <el-input style="width:100%;height:100%" v-model="keywords" placeholder="请输入\歌曲名称\歌手名字" />
      </div>
      <div style="flex:1">
        <el-button type="primary"  :icon="Search" @click="get_search"
          >搜索</el-button
        >
      </div>
    </div>

    <!---->
    <div>
      <div class="dis">
        <div class="musicbox">
          <div class="mr20">
            <ul>
              <li
                v-for="(item, index) in serchData"
                :key="index"
                v-bind:class="{ active: item.id == nowplay_id }"
               
              >
            
                <p class="imgp">
                  <el-image
                    class="img"
                    :src="item.album.artist.img1v1Url"
                    lazy
                  ></el-image>
                </p>
                <p class="pname"  :style="{
                  color:  item.id == nowplay_id ? `${$store.state.lrccol.color}` : '',
                  fontSize:item.id  == nowplay_id ? 15+'px' : 13+'px',
                  fontWeight: 'bold',
               }" @click="playmp3(i, item)">{{ item.name }}</p>

                 <p v-if="item.mvid !=0" @click="getplayUrl(item)">
                   <img style="margin: 4px;width:25px;height:25px" src="../assets/MV.png" alt="">
                </p>
           
               <p  id="animcss1" v-if="item.id  == nowplay_id">
                <img src="../assets/likeon.png" alt="">
              </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="playbox">
          <Playmp3 @markParentLiBg="markParentLiBgFn" :page="ispage"></Playmp3>
        </div>
      </div>

      <el-pagination
        v-model:currentPage="page"
        v-model:page-size="limit"
        :page-sizes="[16, 32]"
        small="small"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

     <el-dialog
      v-model="MVVisible"
      title="鼠标移动此区域可拖动"
      width="1000px"
      draggable
    >
      <MVplay :src="mvsrc" @playended="playendedfn"></MVplay>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="closeMV">关闭</el-button>
          <el-button type="primary" @click="MVVisible = false"
            >后台播放</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script  setup>

import { useStore } from "vuex";
import { wyy_search_song, wyy_geturl,wyy_SingerMvPlay } from "../api/index.js";

import { Search } from "@element-plus/icons-vue";
import Playmp3 from "../components/play.vue";
import { ElMessage } from "element-plus";
import MVplay from "../components/playmv.vue";
const router = useRouter();
const store = useStore();
const keywords = ref("吟美人");
// const radio = ref(1)

const loading = ref(true);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`;

//分頁
let page = ref(1);
let limit = ref(16);
let total = ref(0);
let ispage = ref(true); //有分页



const nowplay_id = ref();
let serchData = ref([]);
let url= ref("");


//MV 
const MVVisible = ref(false);
const mvsrc = ref("");
onMounted(() => {
  get_search();
});

// const changeVal = (val) => {
//    console.log(val)
// };

const get_search = () => {
  let parms = {
    keywords: keywords.value,
    offset: page.value,
    limit: limit.value,
    timestamp:Date.parse(new Date())
  };
  wyy_search_song(parms)
    .then((res) => {
    
      total.value = res.result.songCount;
      serchData.value = res.result.songs;

      loading.value = false;
      //儲存播放的id集合
      let idsData = res.result.songs;
      let ids = idsData.map((item) => {
        return item.id;
      });
      //提交到數據中心
      store.commit("play/playIds", ids);
    
      nowplay_id.value = res.result.songs[0].id;
      let id = res.result.songs[0].id;
      let obj = {
        id: res.result.songs[0].id,
        name: res.result.songs[0].name,
        pic: res.result.songs[0].album.artist.img1v1Url,
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
 
  nowplay_id.value = item.id;
  let parms = {
    id: item.id,
  };
  wyy_geturl(parms)
    .then((res) => {
     if (isNull(res.data[0].url)) {
         url.value = res.data[0].url;
            let obj = {
                id: item.id,
                name: item.name,
                url: res.data[0].url,
                pic: item.album.artist.img1v1Url,
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



const markParentLiBgFn = (params) => {
  nowplay_id.value = params;
};



//分页
const handleSizeChange = (val) => {
  console.log(`${val} 新每页条数`);
  limit.value = val;
  get_search();
};
const handleCurrentChange = (val) => {
  console.log(`新当前页: ${val}`);
  page.value = val;
  get_search();

};


//获取播放地址MV
const getplayUrl = (item) => {
   nowplay_id.value = item.id;
  let parms = {
    id: item.mvid,
  };
  wyy_SingerMvPlay(parms)
    .then((res) => {
      mvsrc.value = res.data.url;
      MVVisible.value = true;
    })
    .catch((error) => {});
};
const closeMV = () => {
  MVVisible.value = false;
  mvsrc.value = "";
};
const playendedfn = () => {
  closeMV();
};


onUnmounted(() => {
    store.commit("play/save_obj", {});
    store.commit("play/setLyric", []);
});
</script>

<style scoped>
@import '../style/song.css'; 
.serchbox{
  width: 100%;
  height: 50px;
}
.item1{
  width: 800px;
}
</style>