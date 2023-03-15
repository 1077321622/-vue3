<template>
  <!-- <el-container
    class="layout-container-demo"
    style="height: 100%; border: 1px solid #eee"
  >
    
    <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
      <el-scrollbar>
        <el-menu
         :default-openeds="['1']"  
           active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          default-active="1-1"
     
          @select="selectTab"
          >
        
           <el-sub-menu
            v-for="(item, index) in menusList"
            :key="index"
            :index="index + ''"
          >
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.label }}</span>
            </template>
            <el-menu-item
              v-for="(child, chi) in item.children"
              :index="child.name"
              :key="chi"
            >
              <span>{{ child.label }}</span>
            </el-menu-item>
          </el-sub-menu>
         
       
        </el-menu>
      </el-scrollbar>


    </el-aside>

	
    </el-container>

 -->

  <el-container
    class="layout-container-demo"
    style="height: 100%; border: 1px solid #eee"
  >
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu
            router
            unique-opened
            :default-active="activeTabName"
            active-text-color="#ffd04b"
            :background-color="color"
            text-color="#fff"
            class="el-menu-vertical-demo"
            :default-openeds="['0']"
            @select="changeTab"
          >
            <el-sub-menu
              v-for="(item, index) in menusList"
              :key="index"
              :index="index + ''"
            >
              <template #title>
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.label }}</span>
              </template>

              <el-menu-item
                v-for="(child, chi) in item.children"
                :index="child.name"
                :key="chi"
              >
                <span>{{ child.label }}</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-header class="header">

          <div class="minabox">
              <div class="colors">
                 <el-color-picker v-model="color" size="large"  @change='changeColors'/>
                  <p style="font-size:12px">主题</p>
              </div>
          </div>
        
          <div class="toolbar">
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px; color: #fff"
                ><setting
              /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="logoutfn">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>{{ $store.state.login.userinfo.profile.nickname }}</span>
          </div>

          
        </el-header>
        <!-- 这里是重点！！！ -->
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script  setup>
import { useStore } from "vuex";
import Cookies from "js-cookie";
import {
  Setting,
  Histogram,
  ZoomIn,
  PictureFilled,
  Platform,
  Opportunity,
  VideoCameraFilled,
  Headset,
  CopyDocument,
  Mute
} from "@element-plus/icons-vue";
//l路由引入
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
let col = computed(() => {
  return store.state.lrccol.color
});



const color = ref('#C20C0C')
//默认显示第一个菜单  监听路由的变化，即使刷新页面也还是上一次点击的菜单
let activeTabName = ref("");
watch(
  () => router.currentRoute.value.name,
  (newValue, oldValue) => {
    activeTabName.value = newValue;
  },
  { immediate: true }
);

watch(col, (newValue, oldValue) => {
     color.value =newValue;
});

const menusList = [
  {
    icon: "Histogram",
    label: "个人中心",
    children: [
      {
        name: "userinfo",
        label: "我的信息",
        path: "/userinfo",
      },
      {
        name: "mysong",
        label: "我的歌单",
        path: "/mysong",
      },
                                                                  
      {
        name: "nearplay",
        label: "最近播放",
        path: "/nearplay",
      },
    ],
  },

  {
    icon: "Histogram",
    label: "曲风栏目",
    children: [
      {
        name: "songlist",
        label: "曲风分类",
        path: "/songlist",
      },
      {
        name: "songok",
        label: "偏好曲风",
        path: "/songok",
      },
     
    ],
  },

  {
    icon: "Platform",
    label: "歌曲搜索",
    children: [
      {
        name: "serch",
        label: "搜索列表",
        path: "/serch",
      },
    ],
  },

  {
    icon: "PictureFilled",
    label: "今日推荐",
    children: [
      {
        name: "daytc",
        label: "推荐歌曲",
        path: "/daytc",
      },
      {
        name: "daysongs",
        label: "推荐歌单",
        path: "/daysongs",
      },

    ],
  },
{
    icon: "CopyDocument",
    label: "精品歌单",
    children: [
      {
        name: "playlist",
        label: "歌单专区",
        path: "/playlist",
      },

    ],
  },

  {
    label: "歌手专区",
    icon: "Management", 
    children: [
      {
        name: "allsinger",
        label: "歌手集合",
        path: "/allsinger",
      },
    ],
  },

  {
    label: "MV专区",
    icon: "VideoCameraFilled", 
    children: [
      {
        name: "allmv",
        label: "全部mv",
        path: "/allmv",
      },
       {
        name: "fromWyMv",
        label: "网易出品",
        path: "/fromWyMv",
      },
     {
        name: "personalizedmv",
        label: "推存mv",
        path: "/personalizedmv",
      },

     {
        name: "topmv",
        label: " mv 排行",
        path: "/topmv",
      },
      
    ],
  },
  {
    label: "电台专区",
    icon: "Headset", 
    children: [
      {
        name: "dt",
        label: "主播电台",
        path: "/dt",
      },
        {
        name: "dt24",
        label: "推荐电台",
        path: "/dt24",
      }
    ],
  },
    {
    label: "爬虫专区",
    icon: "Odometer", 
    children: [
      {
        name: "othermusic",
        label: "爱听",
        path: "/othermusic",
      },
      {
        name: "2tingtype",
        label: "舞曲",
        path: "/2tingtype",
      },
    ],
  },
  
  {
    icon: "Opportunity",
    label: "系统管理",
    children: [
      {
        name: "settinginfo",
        label: "版本信息",
        path: "/settinginfo",
      },
    ],
  },
];

const changeTab = (path) => {
  router.push({
    path: path,
  });
};
const logoutfn = () => {
  Cookies.remove("cookies");
  localStorage.removeItem("userinfo");
  router.push({
    path: "/login",
  });
};

const changeColors=(val)=>{
    color.value =val;
    store.commit("lrccol/changeCol", val);
}
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
   background:  v-bind(color) !important;
  color: #fff;
}
.layout-container-demo .el-aside {
  width: 240px;
  background:  v-bind(color) !important;
  border-right: solid 1px #e6e6e6;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  position: absolute;
  display: inline-flex;
  align-items: center;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
.el-sub-menu {
  list-style: none;
  margin: 0;
  padding-left: 0;
  border-bottom: 1px solid #fdf6ec0d;
}
.minabox{
   width: 800px;
  height: 100%;
  display: flex;
}
.colors{
  width: 200px;
  height: 100%;

}

</style>