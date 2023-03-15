<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2022-12-28 14:18:04
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-22 16:36:16
 * @FilePath: \viteapp\src\views\qufeng\songlist.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="mian">

      <el-skeleton :rows="20" :loading="loading" animated />
      <div id="container">
      <div class="wrapper"  v-for="(item,index) in  qflist" :key="index"  @click="golist(item.tagId)">
        <div class="item">
          <img :src="item.picUrl" />
          <span class="information">
            <strong> {{item.tagName}}</strong>
            <h6>{{item.showText}}</h6>
          </span>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script  setup>

  import { useStore } from "vuex";
  import { wyy_song_list } from "../../api/index.js";
  import Cookies from "js-cookie";
  const router = useRouter();
  const store = useStore();
  let loading =ref(true)
  let qflist = ref([])
  onMounted(() => {
    getwyy_song_list()
  });
  
  const getwyy_song_list = () => {

    wyy_song_list().then((res) => {
         qflist.value =res.data;
         loading.value =false
       }).catch((error) => {
  
      });
  };

  const golist = (tagId) => {
    router.push({
        path:"./slist",
            query: {
              tagId: tagId,
         },
    })

};

   

  </script>
  
  <style scoped>
   @import '../../style/qufen.css';

  </style>