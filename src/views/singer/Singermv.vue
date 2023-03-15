<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2022-12-30 15:44:43
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
    <el-page-header content="歌手集合/MV" @back="goBack" />


    <div  class="listbox" style="margin-top: 10px;height:100%">
      <ul>
        <li
          v-for="(item, index) in listData"
          :key="index"
          @click="getplayUrl(item.id)"
          v-bind:class="{ active1: item.id == nowplay_id }"
        >
          <div class="imgbox">
          
            <el-image
                 style="margin-top:55px"
                  class="img  cw3-round"
                  :src="item.imgurl"
                  lazy
               ></el-image>
          </div>
          <p class="name">{{ item.name }}</p>
          <div class="pbox">
           <p class="playbtn">立即播放</p>

          </div>
          <!-- <div class="play">
            <img src="../../assets/b1.png" alt="" />
          </div>
           -->
          <p class="munwan dis">
               <img src="../../assets/b1.png" alt="">
               <span>{{ item.playCount }}</span>
           </p>
           <p class="ml-2  pl"  @click.stop="lookpl(item.id)">MV评论</p>
        </li>
      </ul>
 
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

         <!--评论-->
     <el-drawer v-model="drawer" size="50%" title="MV评论" >
       <div v-if="drawer">
         <MVplayNum :id="nowplay_id"></MVplayNum>
       </div>
    </el-drawer>

  </div>
</template>

<script  setup>
import { ref, onMounted, onUnmounted } from "vue";
import { wyy_SingerMv, wyy_SingerMvPlay } from "../../api/index.js";
import { useRoute, useRouter } from "vue-router";
import MVplay from "../../components/playmv.vue";
import MVplayNum from "../../components/MVplayNum.vue";
import FMMUN from "../../units/fommatwan.js";
const route = useRoute();
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
const router = useRouter();
const listData = ref([]);
//MV
const MVVisible = ref(false);
const mvsrc = ref("");
const nowplay_id = ref("");
const drawer = ref(false)
onMounted(() => {
  getMv();
});

const getMv = () => {
  let parms = {
    id: route.query.id,
  };
  wyy_SingerMv(parms).then((res) => {
        let dataList = res.mvs;
        for(var i=0;i<dataList.length;i++){
             dataList[i].playCount = FMMUN.fromnum(dataList[i].playCount)
        }
        listData.value = dataList;
        loading.value = false;
    })
    .catch((error) => {});
};

//获取播放地址
const getplayUrl = (id) => {
  nowplay_id.value = id;
  let parms = {
    id: id,
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
//播放逻辑end
const goBack = () => {
   router.push({
    path: "./allsinger",
    query: {
      state:route.query.state
    },
  });
};


//评论
const lookpl =(id)=>{
   drawer.value =true
   nowplay_id.value = id;
}
onUnmounted(() => {
  
});
</script>

<style scoped>
@import '../../style/mv.css';
</style>