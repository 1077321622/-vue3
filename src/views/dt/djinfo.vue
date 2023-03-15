<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2023-01-03 17:56:04
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mian">
       <el-page-header content="主播电台/详情列表" @back="goBack" />
        <el-collapse v-model="activeNames" >
              <el-skeleton :rows="5"  :loading="loading1" animated /> 
                  
                     <el-collapse-item title="电台详情" name="1">
                      <div class="djinfo dis mr20">

                      
                        <div class="left">
                            <img :src="datainfo.picUrl" alt="">
                        </div>
                        <div class="right">
                            <span class="span1">电台</span><span class="span2">{{datainfo.name}}</span> 
                            <div class="dis imgbox">
                                <img class="img1" :src="authorpic" alt="">
                                <p class="author">{{author}}</p>
                            </div>
                            <div class="dy">
                            <p>
                                <span style="color:#fff" >订阅{{subCount}}</span>
                            </p>
                            </div>
                            <div class="infobox mr20">
                                <span class="category">{{datainfo.category}}</span>
                                <span class="desc">{{datainfo.desc}}</span>
                            </div>
                        </div>
                </div>
            </el-collapse-item>      
           
        
        </el-collapse>

    

         <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
       <div>
           <Title title="节目列表"></Title>
               <div class="dis">
                    <div class="musicbox">
                          <el-skeleton :rows="15"  :loading="loading2" animated />
                        <div class="mr20">
                        <el-scrollbar height="620px">
                        <ul>
                            <li
                            v-for="(item, i) in programs"
                            :key="i"
                            v-bind:class="{ active: item.mainTrackId == nowplay_id }"
                            @click="playmp3(i, item)"
                            >
                            <p class="imgp">
                                <el-image
                                class="img"
                                :src="item.coverUrl"
                                lazy
                                ></el-image>
                            </p>
                            <p class="pname"   :style="{
                                color:item.mainTrackId == nowplay_id ? `${$store.state.lrccol.color}` : '',
                                fontSize:item.mainTrackId == nowplay_id ? 15+'px' : 13+'px',
                                fontWeight: 'bold',
                            }">{{ item.name }}</p>
                            <p class="nums">
                                <span>播放{{item.listenerCount}}</span>
                                 <span>赞{{item.likedCount}}</span>
                            </p>
                            <p  id="animcss1" v-if="item.mainTrackId == nowplay_id" >
                                <img src="../../assets/likeon.png" alt="">
                            </p>
                            
                            </li>
                        </ul>
                        </el-scrollbar>
                        </div>
                    </div>
                    <div class="playbox">
                        <van-sticky :offset-top="70">
                                <Playmp3 @markParentLiBg="markParentLiBgFn" :page="ispage"></Playmp3>
                        </van-sticky>
                    </div>
                    </div>
        
       </div>
         <el-pagination
              v-model:currentPage="page"
              v-model:page-size="limit"
              :page-sizes="[18, 36]"
              background
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
  </div>
</template>

<script  setup>

import { useStore } from "vuex";
import { wyy_dtinfo ,wyy_dtjiemu,wyy_geturl} from "../../api/index.js";
import Cookies from "js-cookie";

import Title from '../../components/Title.vue'
import Playmp3 from "../../components/play.vue";
const router = useRouter();
const route = useRoute();
const store = useStore();
let cookie = Cookies.get("cookies")
const activeNames = ref(['1'])
const loading1 = ref(true)
const loading2 = ref(true)
const datainfo =ref({})
let ispage = ref(true); //有分页


//作者
let author = ref("");
let authorpic =  ref("");
let subCount =  ref("");
let programs = ref([])//DJ节目

let page = ref(1);
let limit = ref(18);
let total = ref(0);
//当前播放id
let nowplay_id = ref(-1);
let url = ref("");

onMounted(() => {
  
  getinfo();
  getdnlistData()
});

const getinfo = () => {
    let parms ={
         rid: route.query.djid,
    }
   wyy_dtinfo(parms).then((res) => {
        datainfo.value = res.data;
        author.value =res.data.dj.nickname;
        authorpic.value =res.data.dj.avatarUrl;
        subCount.value = res.data.subCount
        loading1.value=false;
    }).catch((error) => {

    });
};

//分页
const handleSizeChange = (val) => {
  limit.value = val;
  getdnlistData();
};
const handleCurrentChange = (val) => {
  page.value = val;
  getdnlistData();

};
const getdnlistData=()=>{
     let parms ={
            rid: route.query.djid,
            offset: page.value,
            limit: limit.value,
     }
     wyy_dtjiemu(parms).then((res) => {
       loading2.value=false;
       programs.value = res.programs;
       total.value =res.count;
      //儲存播放的id集合
        let idsData = res.programs;
        let ids = idsData.map((item) => {
            return item.mainTrackId;
        });
        //提交到數據中心
        store.commit("play/playIds", ids);
        nowplay_id.value = res.programs[0].mainTrackId;
        let id = res.programs[0].mainTrackId;
        let obj = {
            id: res.programs[0].mainTrackId,
            name:res.programs[0].name,
            pic: res.programs[0].coverUrl,
        };
      
        getfristUrl(id, obj);

    }).catch((error) => {

    });
}
const markParentLiBgFn = (params) => {
  nowplay_id.value = params;
};

//默认播放第一曲
const getfristUrl = (id, obj1) => {
  let parms = {
     id: id,
     cookie:cookie
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

  nowplay_id.value = item.mainTrackId;
  let parms = {
     id: item.mainTrackId,
     cookie:cookie
  };
  wyy_geturl(parms)
    .then((res) => {
      if (isNull(res.data[0].url)) {
        url.value = res.data[0].url;
        let obj = {
          id: item.mainTrackId,
          name: item.name,
          url: res.data[0].url,
          pic: item.coverUrl,
        };
        store.commit("play/save_obj", obj);
      } else {
          notNest()
      }
    })
    .catch((error) => {});
};

const isNull = (params) => {
  if (params == null || params == "null" || params.length == 0 || params == "" ) {
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
  
  //区别从什么类型页面进来   route.query.isback==0 那不需要参数跳转回去
  if (route.query.isback ==0) {
       router.go(-1)
  } else {
       router.push({
        path: "./dt",
        query: {
        mark:route.query.mark
      },
    });
  }

}

onUnmounted(() => {
    store.commit("play/save_obj", {});
    store.commit("play/setLyric", []);
});
</script>

<style lang="scss" scoped>
@import '../../style/song.css';
.djinfo{
    width: 100%;
    height: 100%;
    .left{
        width: 200px;
        height: 200px;
        img{
             width: 200px;
             height: 200px;
        }
    }
    .right{
         flex: 1;
         margin-left: 20px;
        .span1{
            background: red;
            padding: 3px;
            color: #fff;
        }
        .span2{
            margin-left: 10px;
            font-weight: bold;
        }
        .dy{
            width: 108px;
            height: 31px;
            background: rgb(54, 148, 202);
            margin-top: 10px;
            line-height: 31px;
            border-radius: 5px;
            padding: 3px;
            color: #fff;
        }
        .infobox .category{
                color: #cc0000;
                border-color: #cc0000;
                border: 1px solid;
                padding: 3px 6px;
              
        }
      .desc{
        font-size: 13px;
        color: #999;
        line-height: 30px;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:3;
    }
    }
}
 .imgbox .img1{
     width: 40px;
     height: 40px;
     margin-top: 10px;
   
 }
  .imgbox  .author{
        height: 40px;
        line-height:55px;
        margin-left: 10px;
        font-size: 13px;
        color: #666;
     }

   .nums span{
       font-size: 13px;
       margin-left: 10px;
       line-height: 40px;
   }  
</style>