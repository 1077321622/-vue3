<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2023-01-03 17:56:31
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mian">
       <Title title="推荐电台"></Title> 
         <div class="listdata">
        <ul>
            <el-skeleton  :loading="loading"  :rows="15" />
            <li  v-for="(item,index) in list" :key="index" @click="getDtlist(item.id)">
                <div class="dis">
                    <div class="item1">
                    <img :src="item.picUrl" alt="">
                </div>
                
                <div class="item2">
                        <h3>{{item.name}}</h3>
                        <p class="desc">{{item.copywriter}}</p>
                        <p class="subCount"> 订阅{{item.playCount}}次</p>
                </div>
                
                </div>
            </li>
            
        </ul>
   </div>

    <Title title="今日优选"></Title> 
         <div class="listdata">
        <ul>
            <el-skeleton  :loading="loading"  :rows="15" />
            <li  v-for="(item,index) in daylist" :key="index" @click="getDtlist(item.id)">
                <div class="dis">
                    <div class="item1">
                    <img :src="item.picUrl" alt="">
                </div>
                
                <div class="item2">
                        <h3>{{item.name}}</h3>
                        <p class="desc">{{item.rcmdText}}</p>
                        <p class="subCount"> 订阅{{item.playCount}}次</p>
                </div>
                
                </div>
            </li>
            
        </ul>
   </div>


  </div>
</template>

<script  setup>
import { useStore } from "vuex";
import { wyy_dj24,wyy_dayChage } from "../../api/index.js";
import Title from '../../components/Title.vue'
const router = useRouter();
const store = useStore();

const loading = ref(true)
const list= ref([])
const daylist= ref([])
onMounted(() => {
    getlist24();
    getwyy_dayChage();
});

const getlist24 = () => {
   wyy_dj24().then((res) => {
          list.value =res.djRadios;
         loading.value=false
    }).catch((error) => {

    });
};

const getwyy_dayChage = () => {
    wyy_dayChage().then((res) => {
          daylist.value =res.data;
          loading.value=false
    }).catch((error) => {

    });
};

//详情
const getDtlist=(id)=>{
    router.push({
        path:"./djinfo",
            query: {
                djid: id,
                isback:0
         },
    })
}


</script>

<style lang="scss" scoped>


/* listdata*/
.listdata{
    width: 100%;
    margin-top: 20px;
    ul li{
        width: 30%;
        height: 150px;
        display: inline-block;
        margin: 10px 1%;
        border-bottom: 1px solid #e7e7e7;
        cursor: pointer;
        .item1{
            width: 145px;
            height: 100%;
            img{
               width: 140px;
               height: 140px;
               margin: 2px;
            }
        }
        .item2{
            flex: 1;
            height: 150px;
            margin-left: 10px;
            h3{
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
            }
            .subCount{
                margin-top: 10px;
                font-size: 14px;
                color: #999;
            }
            .desc{
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:3;
                font-size: 13px;
                color: #666;
                line-height: 20px;
                margin-top: 10px;
            }
        }
    }
}

</style>