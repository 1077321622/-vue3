<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2022-12-28 10:22:14
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mian">
      <div class="dttype">
             <ul>
                 <li  v-for="(item,index) in typelist" :key="index"
                      v-bind:class="{ typeClass: item.id == typeindex }"
                      @click="handype(index,item.id)">
                     <img   class="img1" :src="item.pic56x56Url" alt="">
                     <p>{{item.name}}</p>
                 </li>
             </ul>
      </div>
    <Title title="热门电台"></Title> 
    <div class="listdata">
      <ul v-if="list.length>0">
           <el-skeleton  :loading="loading"  :rows="15" />
          <li  v-for="(item,index) in list" :key="index" @click="getDtlist(item.id)">
             <div class="dis">
                  <div class="item1">
                   <img :src="item.picUrl" alt="">
              </div>
            
              <div class="item2">
                    <h3>{{item.name}}</h3>
                    <p class="desc">{{item.desc}}</p>
                    <p class="subCount"> 订阅{{item.subCount}}次</p>
              </div>

             
             </div>
          </li>
        
      </ul>
       <el-empty  v-else description="暂无相关电台" />
   </div>
         <el-pagination
              v-model:currentPage="page"
              v-model:page-size="limit"
              :page-sizes="[12, 24]"
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
import { wyy_dtType,wyy_dtTypeList } from "../../api/index.js";
import Cookies from "js-cookie";
import Title from '../../components/Title.vue'
const router = useRouter();
const route = useRoute();
const store = useStore();

let page = ref(1);
let limit = ref(12);
let total = ref(0);

const loading = ref(true)
const typelist =ref([])
const list= ref([])
const typeindex =ref("")


onMounted(() => {
       typeindex.value= route.query.mark ? route.query.mark: typeindex.value;
     dttypeget()
});

const handype=(index,id)=>{
  typeindex.value = id;
  page.value=1;
  getlist();
}

//分类
const dttypeget = () => {
   wyy_dtType().then((res) => {
        typelist.value = res.categories
        typeindex.value = route.query.mark ? route.query.mark:  res.categories[0].id;
        getlist();
     
    }).catch((error) => {

    });
};
//分页
const handleSizeChange = (val) => {
  limit.value = val;
  getlist();
};
const handleCurrentChange = (val) => {
  page.value = val;
  getlist();

};
//列表
const getlist=()=>{
    let parms={
        cateId:typeindex.value,
           offset: page.value,
            limit: limit.value,
    }
   wyy_dtTypeList(parms).then((res) => {
        list.value =res.djRadios;
        total.value =res.count;
        loading.value=false
    }).catch((error) => {

    });
}

//详情
const getDtlist=(id)=>{
    router.push({
        path:"./djinfo",
            query: {
                djid: id,
                mark:typeindex.value,
         },
    })
}
</script>

<style lang="scss" scoped>

.dttype ul li{
    width: 70px;
    text-align: center;
    color: #888;
    display: inline-block;
    margin: 3px 5px;
    cursor: pointer;
   
    .img1{
        width: 70px;
        height: 50px; 
    }
    p{
        font-size: 13px;
        color: red;
        padding: 2px 0px;
        margin: 2px;
    }
}
.dttype ul li:hover{
    background: #f4f4f4;
}
.typeClass{
    background:#e3e7e7;
    border-radius: 5px;
}
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