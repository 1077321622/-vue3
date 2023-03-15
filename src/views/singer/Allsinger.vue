<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2023-02-16 15:26:01
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mian">
 



    <div class="mianbox dis">
      <div class="leftsinger">
        <el-tabs
          :tab-position="tabPosition"
          v-model="activeName"
          @tab-click="tabclick"
          class="demo-tabs"
        >
          <el-tab-pane :name="item" v-for="(item,index) in sigerData" :label="item" :key="index"> </el-tab-pane>
        </el-tabs>
      </div>
        
      <div class="rightsinger">
         <el-skeleton :rows="20" :loading="loading" animated />    
        <div class="demo-fit">
    
          <ul class="w3-ul w3-card-4">
        
         <li class="w3-bar "  v-for="(fit, index) in fits" :key="index" >
           
            <img :src="fit.picUrl" alt="" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
            <div class="w3-bar-item">
                <span class="w3-large">{{ fit.name }}</span><br>
                <span>音乐数量{{fit.musicSize}}</span>
            </div>
            <div class="box">
              <el-button @click="openinfo(fit.id)" :icon="MoreFilled" >信息</el-button>
               <el-button   @click="openHot(fit.id)" color="#626aef" plain  type="primary" :icon="List">专辑</el-button>
              <el-button @click="openMv(fit.id)" type="danger" plain :icon="WalletFilled" >MV</el-button>
            </div>
        </li>

    </ul>
           <el-divider />
           <el-pagination
              v-model:currentPage="page"
              v-model:page-size="limit"
              :page-sizes="[9, 18]"
              background
              :total="500"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
           
      </div>
    </div>

  </div>
</template>

<script  setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { wyy_artist } from "../../api/index.js";
import Cookies from "js-cookie";
import { useRoute, useRouter } from "vue-router";
import {List,MoreFilled,WalletFilled} from '@element-plus/icons-vue'
const sigerData=(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);
let page = ref(1);
let limit = ref(9);
const route = useRoute();
const router = useRouter();
const store = useStore();
const loading = ref(true);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
       `;
const activeName = ref("A");
const tabPosition = ref("left");
const fits = ref([]);
onMounted(() => {
   activeName.value= route.query.state ? route.query.state: activeName.value;
   wyy_artistData();
});
const tabclick = (pane, ev) => {
  loading.value = true;
  page.value =1;
  activeName.value = pane.props.name.toString();
  wyy_artistData();
};


const wyy_artistData = () => {
  let parms = {
    initial: activeName.value,
    offset: page.value,
    limit: limit.value,
  };
  wyy_artist(parms)
    .then((res) => {
      fits.value = res.artists;
      loading.value = false;
    })
    .catch((error) => {

    });
};

const openHot = (id) => {
  router.push({
    path: "./hotsinger",
    query: {
      id: id,
      state:activeName.value,
    },
  });
};

const openinfo = (id) => {
  router.push({
    path: "./singerinfo",
    query: {
      id: id,
       state:activeName.value,
    },
  });
};

const openMv=(id)=>{
  router.push({
    path: "./singermv",
    query: {
       id: id,
       state:activeName.value,
    },
  });
}

//分页
const handleSizeChange = (val) => {
  limit.value = val;
  wyy_artistData();
};
const handleCurrentChange = (val) => {
  page.value = val;
  wyy_artistData();

};
</script>

<style scoped>
.mianbox {
  width: 100%;
  height: 100%;
}
.leftsinger {
  width: 150px;
  height: 100%;
}
.demo-tabs {
  width: 150px;
  height: 100%;
}
.rightsinger {
  flex: 1;
  height: 100%;
}
.box{
  height: 65px;
  display: flex;
  margin-left: 300px;
}
.box .el-button{
  margin: 20px 10px;
}

.w3-card-4, .w3-hover-shadow:hover {
    box-shadow:none !important;
}
.w3-circle{
  border-radius: 15px;
}
</style>