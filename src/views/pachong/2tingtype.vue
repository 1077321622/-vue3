
<template>
    <div class="mian">
    
        <div class="typebox">
          <el-scrollbar height="800px">
            <ul>
              
              <li v-for="(item,index) in leftmenu" :key="index"  @click="handli(item.name,item.id)"  v-bind:class="{ active1: item.id == clickid }">
                  <h4>{{item.name}}</h4>
              </li>
             
           </ul> 
           </el-scrollbar>
          
        </div>
        <div class="lbox">
          <el-scrollbar height="800px">
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
  
  import Title from "../../components/Title.vue";
  import Paly  from "../../components/pachongplay.vue";
  import { useStore } from "vuex";
  import { get2tingType ,kuaisierl} from "../../api/index_pachong.js";
  import Cookies from "js-cookie";
  import { useRoute, useRouter } from "vue-router";

//分頁
let page = ref(1);
let total = ref();

const router = useRouter();
const store = useStore();
const loading = ref(true)

let datalist = ref([])
let url = ref("");
let name = ref("");

let nowplay_title = ref(""); //名字
const childRef = ref()


//左侧菜单

let clickid =ref(1);

//左边点击名字
let keyname = ref("民歌");

//左边菜单明细
let leftmenu = ref([
    {name:"民歌",id:1},
    {name:"葫芦丝",id:2},
    {name:"古筝",id:3},
    {name:"萨克斯",id:4},
    {name:"抖音",id:5},
    {name:"贴面",id:6},
    {name:"靠步",id:7},
    {name:"小拉",id:8},
    {name:"水兵舞",id:9},
    {name:"牛仔",id:10},
    {name:"拉丁",id:11},
    {name:"二步摇",id:12},
    {name:"新年舞曲",id:13},
    {name:"圣诞节",id:14},
    {name:"发烧",id:15},
    {name:"幽雅",id:16},
    {name:"对唱",id:17},
    {name:"二胡",id:18},
    {name:"笛子",id:19},
    {name:"粤语",id:20},
    {name:"闽南语",id:21},
    {name:"藏歌",id:22},
    {name:"印度",id:23},
    {name:"乐队",id:24},
    {name:"经典",id:25},
    {name:"鬼步舞",id:26},
])


  onMounted(() => {
    getlistgetKS ()
  });
  
  //点击类型

  const handli = (name,id)=>{
    keyname.value = name;
    clickid.value =id;
    page.value =1;
    getlistgetKS()
  }


const handleCurrentChange = (val) => {
  page.value = val;
  getlistgetKS();
};


  //获取数据
  const getlistgetKS  = () => {
    let query={
        key: encodeURIComponent(keyname.value),
        p:page.value
    }
    get2tingType(query).then((res) => {
         datalist.value = res.list;
         total.value = Number(res.total);
         loading.value =false
      }).catch((error) => {
  
      });
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
  
  <style scoped lang="scss">
@import '../../style/pclist.css';
.typebox{
    width: 150px;
    background:  #d9ecff;
}
.typebox ul li{
    width: 100%;
    height: 40px;
    background: #F2F6FC;
    margin: 2px 0px;
    cursor: pointer;
    h4{
        line-height: 23px;
        text-align: center;
        font-size: 15px;
    }
}
.active1{
    background: #c20c0c !important;
    color: #fff !important;
}
.page{
  margin: 35px;
}

</style>