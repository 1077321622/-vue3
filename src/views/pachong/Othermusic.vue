<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2023-01-04 16:05:06
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
     <div class="mian">
         <div class="lbox">
            <Title title="最新舞曲 大家在听 "></Title>
            <div style="width:1000px;margin:10px 0px">
              <el-tabs
              v-model="activeName"
              type="card"
              class="demo-tabs"
              @tab-click="handleClick"
            >
              <el-tab-pane v-for="(item,index) in hometype" :key="index" :label="item.title" :name="item.path"></el-tab-pane>
            </el-tabs>
          
            </div>
            <el-scrollbar height="700px">
              <el-skeleton :rows="30" :loading="loading" animated />     
               <ul>
                <li v-for="(item,index) in datalist" :key="index" @click="geturl(item.path,item.title)"  v-bind:class="{ active: item.title == nowplay_title }"
               >
                    <p class="index">{{index+1}}</p>
                    <p class="name">{{item.title}}</p>
                    <p class="time">{{item.time}}</p>
                    <p class="size">{{item.size}}</p>
                    <p class="Service"><el-icon color="red"><Service /></el-icon></p>
                </li>
               </ul>
               </el-scrollbar>

         </div>

         <div class="rbox">
          <van-sticky :offset-top="70">
              <Paly :title="url" :musicname="name"    ref="childRef"></Paly>
           </van-sticky>

      
         </div>
     </div>
     <div class="page">
    <el-pagination
          v-model:currentPage="page"
          small="small"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
   </div>
   </template>
   
   <script  setup>
import { ElMessage } from "element-plus";
import Title from "../../components/Title.vue";
import Paly  from "../../components/pachongplay.vue";
import { useStore } from "vuex";
import { getKS ,kuaisierl,gethome} from "../../api/index_pachong.js";

import Cookies from "js-cookie";
import { useRoute, useRouter } from "vue-router";


   const activeName = ref('/K4_id_1.html')
  let page = ref(1);
  let total = ref(0);

  const router = useRouter();
  const store = useStore();

  const loading = ref(true)

  let hometype = ref([])
  let pathobj = reactive(
    {path:"/L/K4_id_1.html"}
  );

  let datalist = ref([])
  let url = ref("");
  let name = ref("");

  let nowplay_title = ref(""); //名字
  const childRef = ref()

   onMounted(() => {
     getgethome()
     getlistgetKS ()
   });

   //获取类型
   const getgethome  = () => {
      gethome().then((res) => {
           hometype.value = res.list;
       }).catch((error) => {
   
       });
   };

   const handleClick = (tab) => {
      activeName.value=tab.paneName;
      handlist(tab.paneName)
    }
   const handlist  = (path) => {
      page.value =1;
      if(path=='/hits.html'){
        ElMessage.success("敬请期待,排行榜正在开发中");
        return false
      }
      pathobj.path = path;
       getlistgetKS();
   };

   //获取数据
   const getlistgetKS  = () => {
 
    let query={
        path: pathobj.path,
        page:page.value
    }
     getKS(query).then((res) => {
          datalist.value = res.list;
          total.value = Number(res.total);
          loading.value =false
       }).catch((error) => {
   
       });
   };

 //分页

 const handleCurrentChange = (val) => {
  page.value = val;
  getlistgetKS();
};

   //获取url 
   const geturl  = (path,title) => {
    nowplay_title.value = title;
    name.value =title;
    let query= {
      path:path,
    }
    kuaisierl(query).then((res) => {
         url.value = res.list;
         //获取到url  //通知子组件播放
         setTimeout(()=>{
          childRef.value.seetingPlsy()    
         },500)
       }).catch((error) => {
   
       });
  
   };

   

   </script>
   
   <style scoped>
   @import '../../style/pclist.css';
   .page{
    margin: 35px;
  }

   </style>