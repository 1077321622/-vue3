<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2022-12-28 14:18:04
 * @LastEditors: “1077321622@qq.com” lzr448470520
 * @LastEditTime: 2023-03-16 17:47:53
 * @FilePath: \viteapp\src\views\qufeng\songlist.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="mian dis">
    
      <el-skeleton :rows="20" :loading="loading" animated />
      <!-- <div id="container">
      <div class="wrapper"  v-for="(item,index) in  qflist" :key="index"  @click="golist(item.tagId)">
        <div class="item">
          <img :src="item.picUrl" />
          <span class="information">
            <strong> {{item.tagName}}</strong>
            <h6>{{item.showText}}</h6>
          </span>
        </div>
      </div>
      </div> -->

      <div style="margin:0 auto;width: 100%;">
        <Pubuliu
        :imageData="qflist"
        :columnCount="radio"
        :columnGap="columnGap"
        backgroundColor="#f4f4f4"
        @handrowImg="golist"
        />
     </div>


     <div style="margin-left: 20px;">
       <div>
       <h3>显示模式</h3>
        <div>

          <el-radio-group v-model="radio">
              <el-radio :label="3">每行3个</el-radio>
              <el-radio :label="4">每行4个</el-radio>
              <el-radio :label="5">每行5个</el-radio>
              <el-radio :label="6">每行6个</el-radio>
              <el-radio :label="7">每行7个</el-radio>
            </el-radio-group>
        </div>

       </div>

       <div >
        <h3>间距调整</h3>
        <el-input v-model="columnGap" max="20" min="10" maxlength="2"></el-input>
       </div>
     </div>


    </div>
  </template>
  
  <script  setup>

  import { useStore } from "vuex";
  import { wyy_song_list } from "../../api/index.js";
  import Pubuliu from './pubuliu.vue'

  const store = useStore();
  const radio = ref(3)
  const columnGap = ref(10)
  

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