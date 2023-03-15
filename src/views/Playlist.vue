<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2023-02-16 16:19:16
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mian">
       <div class="hottype">
            <ul>
                <li v-for="(item,index) in tags"   v-bind:class="{ tagsactive: item.id == nowplay_id }" :key="index"   @click="clicktag(item.id,item.name)">{{item.name}}</li>
            </ul>
       </div>

       <div class="playlists">
        <el-skeleton :rows="30" :loading="loading2" animated />
                    <div class="w3-card-4" style="padding: 10px 10px;" 
                    v-for="(item,index) in playlists"  :key="index">
                    <header class="w3-container w3-light-grey">
                        <h4 class="line1" :title="item.name">{{item.name}}</h4>
                    </header>
                    <div class="w3-container">
                        <p class="tagbox">
                            <el-tag v-for="(item1,index1) in item.tags" :key="index1" class="ml-2" type="success">{{item1}}</el-tag>
                        </p>
                        <hr>
                        <img :src="item.coverImgUrl" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                        <p class="line1" :title="item.description" v-html="item.description"></p><br>
                      
                    </div>
                 
                    <button style=" padding: 0.15em 16px;"  @click="openSong(item.id)" class="w3-button w3-block w3-dark-grey">查看歌单专辑</button>
                </div>

       </div>
        <div style="clear: both;"></div>
         <el-pagination
              v-model:page-size="limit"
              :page-sizes="[9, 18]"
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

import { wyy_typehot ,wyy_select} from "../api/index.js";
import Cookies from "js-cookie";
const router = useRouter();

let nowplay_id = ref(5001);
let tagsName = ref("")
const tags = ref([])
const playlists = ref([])
const loading2 = ref(true)

let page = ref(1);
let limit = ref(9);
let total = ref(0);
onMounted(() => {
  getwyy_typehot();
});


const clicktag=(id,name)=>{
    nowplay_id.value = id;
      tagsName.value =name
      getwyy_typehot();
}
const getwyy_typehot = () => {
   wyy_typehot().then((res) => {
        tags.value =res.tags;
      
        
        getwyy_select()
    }).catch((error) => {

    });
};

const getwyy_select = () => {
    let params ={
        cat:tagsName.value,
         offset: page.value,
            limit: limit.value,
    }
   wyy_select(params).then((res) => {
         console.log(res)
         playlists.value =res.playlists;
         total.value =res.total;
         loading2.value=false;
    }).catch((error) => {

    });
};

//分页
const handleSizeChange = (val) => {
  limit.value = val;
  getwyy_select();
};
const handleCurrentChange = (val) => {
  page.value = val;
  getwyy_select();

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
.hottype ul li{
    display: inline-block;
    padding: 5px 10px;
    font-size: 15px;
    color: #333;
    font-weight: bold;
    margin: 10px 10px;
    border-radius: 3px;
    cursor: pointer;
}
.tagsactive{
  border-bottom: 3px solid red;
}

.tagbox{
 padding: 5px 0px;
} 
.playlists{
  width: 800px;
  margin: 10px auto;
}
</style>