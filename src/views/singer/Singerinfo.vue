<!--
 * @Author: your name
 * @Date: 2022-04-07 16:28:41
 * @LastEditTime: 2023-02-16 15:52:05
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\singer\Singerinfo.vue
-->
<template>
  <div class="mian w3-row-padding w3-margin-top">

      <el-page-header content="歌手集合/信息" @back="goBack" />
      <Title title="资料介绍"></Title>
      <p class="info mr20 w3-third w3-justify">
         {{briefDesc}}
      </p>
       <Title title="创作介绍"></Title>
       <ul>
         <li v-for="(item,index) in introduction" :key="index">
           <p class="mr20 ">{{item.ti}}</p>
           <p class="mr20 "  v-html="item.txt"></p>
         </li>
       </ul>
      <Title title="其他"></Title>
       <div class="topicData">
         <div class="mianbox" v-for="(item,index) in topicData" :key="index">
             <div>
               <img :src="item.coverUrl" alt="">
            </div>
            <p>{{item.mainTitle}}</p>
            <p>{{item.recmdContent}}</p>
            <el-tag class="ml-2" v-for="(item1,index1) in item.tags" :key="index1" style="margin:3px" type="success">{{item1}}</el-tag> 
         </div>
       </div>
 </div>
</template>

<script  setup>
import { ref ,onMounted} from "vue";
import { useStore } from "vuex";
import { wyy_SingerInfo } from "../../api/index.js";
import Cookies from "js-cookie";
import { useRoute, useRouter } from "vue-router";
import Title from '../../components/Title.vue'

const route = useRoute();
const router = useRouter();
const store = useStore();

let briefDesc = ref('')
let introduction=ref([])
let topicData=ref([])

onMounted(() => {
  getwyy_SingerInfo();
});

const getwyy_SingerInfo = () => {
  let parms={
     id: route.query.id,
  }
   wyy_SingerInfo(parms).then((res) => {
      briefDesc.value=res.briefDesc;
      introduction.value=res.introduction;
      topicData.value =res.topicData;
    }).catch((error) => {

    });
};
const goBack = () => {
  router.push({
    path: "./allsinger",
    query: {
      state:route.query.state
    },
  });
  
};



</script>

<style scoped>
.info{
  color: #999;
  font-size: 13px;
}

ul li p{
   color: #999;
  font-size: 13px;
}
.mianbox{
  width: 200px;
 float: left;
 margin: 10px;
}
.mianbox img{
  width: 200px;
  height: 100px;
}
.mianbox  p{
    color: #666;
  font-size: 13px;
}
</style>