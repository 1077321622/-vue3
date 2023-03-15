<!--
 * @Author: your name
 * @Date: 2022-03-07 15:50:16
 * @LastEditTime: 2023-02-09 16:25:31
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\one.vue
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
    <div class="banners">
      <el-carousel autoplay interval="5000" type="card" initial-index="1">
        <el-skeleton :loading="loading" :rows="6" animated />
        <el-carousel-item v-for="item in banners" :key="item">
          <!-- <img :src="item.imageUrl" height="300px" alt="" /> -->
          <el-image  class="img"  :src="item.imageUrl"   lazy ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>


  <el-row style="margin:20px;">
    <Title title="个人信息"></Title>
    <el-col :span="4">
      <el-card>
        <img
          :src="store.state.login.userinfo.profile.avatarUrl"
          class="image"
        />
    
   
        <div style="padding: 14px">
          <span>{{ store.state.login.userinfo.profile.nickname }}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="userEdit">修改昵称</el-button>
          </div>
        </div>
      </el-card>
    </el-col>

    
  </el-row>



 <!--昵称修改-->
 <el-dialog v-model="centerDialogVisible" title="昵称修改" width="30%" center>
   <el-input v-model="nickname" placeholder="请输入昵称" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="getuserEdit">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>


  
</template>
<script  setup>
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { editUserinfo, getBanner } from "../api/index.js";
import Cookies from "js-cookie";
import Title from "../components/Title.vue";
let cookie = Cookies.get("cookies");
const centerDialogVisible = ref(false);
const nickname = ref("");
const store = useStore(); 

 onMounted(async() => {
    let res = await  getBannerData();
     banners.value = res.banners;
});
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

const banners = ref([]);
const userEdit = () => {
  centerDialogVisible.value =true;
};

const getuserEdit = () => {
  if(nickname.value ==''){
    ElMessage.error("昵称不能为空");
    return;
  }
  let parms = {
    nickname: nickname.value,
    gender:0,
    birthday:1525918298004,
    province:440000,
    city:440300,
    signature:"是我爱死了昨天",
  };
   editUserinfo(parms).then((res) => {
    ElMessage.success("由于接口问题，昵称依然没有变化，修改失败，");
    centerDialogVisible.value =false;
   }).catch((error) => {
    ElMessage.error(error);
    centerDialogVisible.value =false;
  });
};

const  getBannerData = () => {
    return new Promise((resolve, reject) => {
      getBanner().then((res) => {
        resolve(res);
       loading.value = false;
     }).catch((error) => {
         reject(error);
     });
   
   });

};




</script>

<style scoped>
.banners {
  width: 90%;
  height: 250px;
  margin: 10px auto;
}
.banners img {
  width: 100%;
  height: 250px;
}
.image {
  width: 5rem;
  height: 5rem;
}
</style>