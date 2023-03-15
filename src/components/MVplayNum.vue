<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2022-12-23 14:54:05
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="">
       <div class="listpl">
           <ul>
                <el-skeleton :rows="18" :loading="loading" animated />
                <div v-if="liatdata.length>0">
                        <li v-for="(item,index) in liatdata" :key="index">
                            <div class="dis"> 
                                <p class="c606266col"> {{index+1}}</p> <p class="c606266col ml10">{{item.content}}</p>
                            </div>
                            <div  class="listmain" v-for="(item1,index1) in item.beReplied" :key="index1">
                                <div class="dis">
                                        <img :src="item1.user.avatarUrl"  alt="">
                                        <p style="margin-left:8px">{{item1.user.nickname}}</p>
                                </div>
                                <p class="twopol">{{item1.content}}</p>
                            </div>
                        </li>
                </div>
                <div v-else>
                    <el-empty description="该mv暂无评论" />
                </div>
           </ul>
       </div>
         <el-pagination
            v-model:currentPage="page"
            v-model:page-size="limit"
            :page-sizes="[11,22]"
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
import { wyy_mvnum } from "../api/index.js";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const loading = ref(true)

 const props= defineProps({
   id:Number
});

 const id = toRef(props, 'id');
 const liatdata = ref([])


let page = ref(1);
let limit = ref(11);
let total =ref(0);
onMounted(() => {
    getwyy_mvnum();
});

const getwyy_mvnum = () => {
    let params={
        id:id.value,
        offset: page.value,
        limit: limit.value,
    }
   wyy_mvnum(params).then((res) => {
      loading.value=false;
      liatdata.value =  res.comments;
      total.value =res.total
    }).catch((error) => {

    });
};


//分页
const handleSizeChange = (val) => {
  limit.value = val;
  getwyy_mvnum();
};
const handleCurrentChange = (val) => {
  page.value = val;
  getwyy_mvnum();
};
</script>

<style scoped>
.listmain{
    margin: 5px;
}
.listmain .dis img{
    width: 40px;
    height: 40px;
    border-radius: 100%;
}

.listmain .dis p{
    line-height: 40px;
}
.twopol{
    color: #909399;
    font-size: 14px;
}
.c606266col{
    color: #79bbff;
    font-size: 15px;
    line-height: 30px;
    font-weight: bold;
}
ul li{
    margin: 20px 0px;
    border-bottom: 1px solid #eee;
}
</style>