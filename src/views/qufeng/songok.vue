<template>
    <div class="mian">
        <Title title="曲风-偏好"></Title>

         <div class="qflist1">
          <ul>
            <li v-for="(item,index) in    qflist" :key="index" @click="golist(item.tagId)" @mouseover="mouseOver(item.tagId)"
             v-bind:class="{ active1: item.tagId == nowplay_id }" >
              <p class="tagName">  {{item.tagName}}</p>
            </li>
          </ul>
         </div>

         <!-- <Title title="曲风-专辑"></Title> -->

         <div id="container">
          <el-skeleton :rows="20" :loading="loading" animated />
          <div class="wrapper"  v-for="(item,index) in    qfdatazj" :key="index" @click="golistzj(item.id)">
            <div class="item">
              <img :src="item.picUrl" />
              <span class="information">
                <h5>{{item.type}}</h5>
                <strong> {{item.company}}</strong>
              </span>
            </div>
          </div>

       </div>

         <!-- <div class="qflist zj">
       
          <ul>
            <li v-for="(item,index) in    qfdatazj" :key="index" @click="golistzj(item.id)"  v-bind:style="{
                'background-image': 'url(' + item.blurPicUrl + ')',
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
              }">
              <p class="tagName">  {{item.name}}</p>
            </li>
          </ul>
         </div> -->

       <el-pagination
        v-model:currentPage="page"
        v-model:page-size="limit"
        :page-sizes="[10, 20]"
        small="small"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </template>
  
  <script  setup>

import AntiShake from './debounce_throttle.js';
 
import Title from '../../components/Title.vue'
import { useStore } from "vuex";
import { wyy_song_ok ,wyy_song_zj} from "../../api/index.js";
import Cookies from "js-cookie";
const router = useRouter();
const store = useStore();
  //分頁
let page = ref(0);
let limit = ref(10);
let total = ref(0);

let loading =ref(true)
let qflist = ref([])
let qfdatazj = ref([])
let nowplay_id = ref(-1);


 let objid = reactive(
    {id: 1000}
 )

  onMounted(() => {
    getwyy_song_list()
  });
  
  const getwyy_song_list = () => {

    wyy_song_ok().then((res) => {
         qflist.value =res.data.tagPreferenceVos;
         nowplay_id.value = res.data.tagPreferenceVos[0].tagId;
         objid.id =res.data.tagPreferenceVos[0].tagId
         getwyy_song_zj(res.data.tagPreferenceVos[0].tagId)
       }).catch((error) => {
  
      });
  };



//  const mouseOver=(tagId)=>{
//     getwyy_song_zj(tagId)
//     objid.id =tagId;
//  }

//这里使用防抖效果处理
const mouseOver =AntiShake.debounce(function (tagId) {
     nowplay_id.value = tagId;
     getwyy_song_zj(tagId)
     objid.id =tagId;
 }, 1000);


const  getwyy_song_zj= (tagId)=>{
        let parms={
            tagId:tagId,
            sort:0,
            cursor:page.value,
            size:limit.value,
        }
       wyy_song_zj(parms).then((res) => {
        loading.value =false;
        qfdatazj.value = res.data.albums;
        total.value = res.data.page.total;
        page.value =  res.data.page.cursor;
       }).catch((error) => {
        loading.value =false;
      });
}
  const golist = (tagId) => {
    router.push({
        path:"./slist",
            query: {
              tagId: tagId,
         },
    })

};

const golistzj=(id)=>{
    router.push({
        path:"./msdel",
            query: {
               songsId: id,
         },
    })
}

     //分页
const handleSizeChange = (val) => {
  console.log(`${val} 新每页条数`);
  limit.value = val;
  getwyy_song_zj( objid.id);
};
const handleCurrentChange = (val) => {
  console.log(`新当前页: ${val}`);
  page.value = val;
  getwyy_song_zj( objid.id);
};

  </script>
  
  <style scoped>
    @import '../../style/song.css';
    @import '../../style/qufen.css';
    .qflist1{
      width: 100%;
      padding-bottom: 30px;
    }
    .qflist1 ul li{
      display: inline-block;
      padding: 10px 20px;
      margin: 20px;
      color: #999;
      background: #f4f4f4;
      cursor: pointer;
    }
  .zj{
    padding-bottom: 20px;;
  }
  .qflist ul li{
    width: 280px;
    height: 150px;
    margin: 10px 10px;
    display: inline-block;
    cursor: pointer;
    transition: all 0.5s;
    overflow: hidden;
  }


  .qflist ul li .tagName{
    text-align: center;
    line-height: 150px;
    color: #fff;
    font-size: 25px;
    font-weight: normal;
  }
 
  </style>