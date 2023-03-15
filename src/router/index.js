/*
 * @Author: your name
 * @Date: 2022-03-02 14:13:42
 * @LastEditTime: 2022-12-30 14:19:33
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\router\index.js
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// import HelloWorld from '../components/HelloWorld.vue'
import notFount from '../components/404.vue'

//const routerHistory = createWebHistory() //脚手架默认带的

const routerHistory = createWebHashHistory()

// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由
const router = createRouter({
  history: routerHistory,
  routes: [

    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue'),//这里是核心： center作为容器组件，包含左右菜单和右侧的router-view，所以下面的子组件实际是显示在router-view
      redirect: { path: "/userinfo" },   //输入路由center会重定向到userinfo页面
      children: [
        {
          path: "/userinfo",
          name: "userinfo",
          component: () => import("../views/Userinfo.vue"),
        },
        {
          path: "/mysong",
          name: "mysong",
          component: () => import("../views/MySong.vue"),//根据你的菜单结构引入
        },
        {
          path: "/msdel",
          name: "MySong_del",
          component: () => import("../views/MySong_del.vue"),//我的歌单详情页
        },
        {
          path: "/nearplay",
          name: "nearplay",
          component: () => import("../views/Nearplay.vue"),//我的最近播放
        },
        {
          path: "/serch",
          name: "serch",
          component: () => import("../views/Serch.vue"),//搜索
        },
        {
          path: "/daytc",
          name: "daytc",
          component: () => import("../views/Daytc.vue"),//今日推荐歌曲
        },
        {
          path: "/daysongs",
          name: "daysongs",
          component: () => import("../views/Daysongs.vue"),//今日推荐歌单
        },

       
        {
          path: "/allsinger",
          name: "allsinger",
          component: () => import("../views/singer/Allsinger.vue"), //全部歌手
        },
        {
          path: "/hotsinger",
          name: "hotsinger",
          component: () => import("../views/singer/Hotsinger.vue"),//热门歌手50曲
        },
        {
          path: "/singermv",
          name: "singermv",
          component: () => import("../views/singer/Singermv.vue"),//热门歌手50曲
        },
        {
          path: "/singerinfo",
          name: "Singerinfo",
          component: () => import("../views/singer/Singerinfo.vue"),///歌手信息
        },
        {
          path: "/allmv",
          name: "allmv",
          component: () => import("../views/mv/Allmv.vue"),//全部mv
        },
        {
          path: "/fromWyMv",
          name: "fromWyMv",
          component: () => import("../views/mv/FromWyMv.vue"),//网易mv
        },
        {
          path: "/personalizedmv",
          name: "personalizedmv",
          component: () => import("../views/mv/Personalizedmv.vue"),//推存mv
        },
        {
          path: "/topmv",
          name: "topmv",
          component: () => import("../views/mv/Topmv.vue"),// mv 排行
        },
        {
          path: "/dt",
          name: "dt",
          component: () => import("../views/dt/index.vue"),//电台
        },
        {
          path: "/djinfo",
          name: "djinfo",
          component: () => import("../views/dt/djinfo.vue"),//电台详情页列表
        },
        {
          path: "/playlist",
          name: "playlist",
          component: () => import("../views/Playlist.vue"),//歌单总汇
        },
        {
          path: "/dt24",
          name: "dt24",
          component: () => import("../views/dt/Dt24.vue"),//### 电台 -推荐电台
        },
        //爬虫 开始
        {
          path: "/othermusic",
          name: "othermusic",
          component: () => import("../views/pachong/Othermusic.vue"),//### 快四
        },
        {
          path: "/2tingtype",
          name: "2tingtype",
          component: () => import("../views/pachong/2tingtype.vue"),//### 分类
        },
          //爬虫 结束
        {
          path: "/settinginfo",
          name: "settinginfo",
          component: () => import("../views/Settinginfo.vue"),//### 心痛信息
        },
        //曲风

        {
          path: "/songlist",
          name: "songlist",
          component: () => import("../views/qufeng/songlist.vue"),//### 曲风分类
        },
        {
          path: "/songok",
          name: "songok",
          component: () => import("../views/qufeng/songok.vue"),//### 偏好曲风
        },
        {
          path: "/slist",
          name: "slist",
          component: () => import("../views/qufeng/slist.vue"),//### 曲风-歌曲
        },
        
      ],
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login.vue'),
      meta: {
        title: '登录',
        index: 1,
        requireAuth: false
      }
    },

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../components/404.vue'),
    }
  ]
})
router.beforeEach((to, form, next) => {
  const isLogin = localStorage.getItem('userinfo');

  if (!isLogin && to.path !== '/login') {
    next("/login")
  } else if (isLogin && to.path === "/login") {
    //登录后，在路由修改不能返回登录，必须点击退出可以返回登录页
    next({
      path: '/'
    });
  } else {
    next()
  }


})

export default router;