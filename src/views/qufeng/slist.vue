
<template>
    <div
      class="mian"
      v-loading="loading"
      element-loading-text="Loading..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-page-header content="曲风/歌曲" @back="goBack" />
      <div class="dis">
        <div class="musicbox">
          <div class="mr20">
            <el-scrollbar height="820px">
            <ul>
              <li
                v-for="(item, i) in songsAll"
                :key="i"
                v-bind:class="{ active: item.id == nowplay_id }"
                @click="playmp3(i, item)"
              >
                <p class="imgp">
                  <el-image class="img" :src="item.al.picUrl" lazy></el-image>
                </p>
                <p class="pname"   :style="{
                    color: item.id == nowplay_id? `${$store.state.lrccol.color}` : '',
                    fontSize:item.id == nowplay_id ? 15+'px' : 13+'px',
                    fontWeight: 'bold',
                 }">{{ item.name }}</p>
                <p   id="animcss1" v-if="item.id == nowplay_id">
                  <img src="../../assets/likeon.png" alt="">
                </p>
              </li>
            </ul>
            </el-scrollbar>
          </div>
        </div>
        <div class="playbox">  
          <van-sticky :offset-top="70">
             <Playmp3 @markParentLiBg="markParentLiBgFn"  :page="ispage"></Playmp3>
          </van-sticky>
        </div>
      </div>
    </div>

   <div style="margin:20px;">
    <el-pagination
        v-model:currentPage="page"
        v-model:page-size="limit"
        :page-sizes="[15, 30]"
        small="small"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
   </div>
    <!-- {{ $store.state.play.plsyid}}
    -->
  </template>
  
  <script  setup>
  
  import { useStore } from "vuex";
  import Playmp3 from "../../components/play.vue";
  import { wyy_song_detail, wyy_geturl } from "../../api/index.js";
  
  import { ElMessage } from "element-plus";
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
let page = ref(0);
let limit = ref(15);
let total = ref(0);
let ispage = ref(true); //有分页

  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  
  const loading = ref(true);
  const songsAll = ref([]);
 
  //当前播放id
  let nowplay_id = ref(-1);
  let url = ref("");
  
  onMounted(() => {
    getsongs();
  });
 
  const markParentLiBgFn = (params) => {
    nowplay_id.value = params;
  };
  
  //获取歌单下面的歌曲列表
  const getsongs = () => {

    let parms ={
        size:limit.value,
        tagId:route.query.tagId,
        cursor:page.value
   }
   wyy_song_detail(parms)
      .then((res) => {
        total.value = res.data.page.total;
        page.value =  res.data.page.cursor;
        songsAll.value = res.data.songs;
        loading.value = false;
        //儲存播放的id集合
        let idsData = res.data.songs;
        let ids = idsData.map((item) => {
          return item.id;
        });
        //提交到數據中心
        store.commit("play/playIds", ids);
        nowplay_id.value = res.data.songs[0].id;
        let id = res.data.songs[0].id;
        let obj = {
          id: res.data.songs[0].id,
          name: res.data.songs[0].name,
          pic: res.data.songs[0].al.picUrl,
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
          notNest();
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
            pic: item.al.picUrl,
          };
          store.commit("play/save_obj", obj);
        } else {
        }
      })
      .catch((error) => {
        notNest();
      });
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
  
  const goBack = () => {
    router.go(-1);
  };
  onUnmounted(() => {
      store.commit("play/save_obj", {});
      store.commit("play/setLyric", []);
  });


  //分页
const handleSizeChange = (val) => {
  console.log(`${val} 新每页条数`);
  limit.value = val;
  getsongs();
};
const handleCurrentChange = (val) => {
  console.log(`新当前页: ${val}`);
  page.value = val;
  getsongs();
};

  </script>
  <style scoped>
  @import '../../style/song.css';
  </style>