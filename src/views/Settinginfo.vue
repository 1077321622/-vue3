<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2023-02-16 14:59:00
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mian">
      <ul>
            <h2>服务端</h2>
                <li class="w3-panel w3-card w3-yellow "> 1.本项目基于开源node.js版本网易云api为服务端</li>
                <li class="w3-panel w3-card w3-yellow">2.腾讯云服务器部署后端api接口，启用pm2进程守护4000端口</li>
            <h2>客户端</h2>
                <li class="w3-panel w3-card w3-yellow"> 1.基于vue3.2版本</li>
                <li class="w3-panel w3-card w3-yellow">2.前端UI使用ElementUI plus,路由vue-router@4，状态管理 vuex@next，css处理器sass 网络请求库axios </li>
             <h2>主要知识点以及描述</h2>
             <li> * 路由部分，路由匹配，对未匹配的路由进行404页面跳转处理,未登录的情况下，统一返回登录页面，否则匹配路由跳转</li>
             <li>
                  * http请求，配置统一的拦截器，响应前后处理，封装统一的api.js,每页页面引入，结构 需要的api使用即可
             </li>
            <li>
                 *封装统一的播放组件，默认播放第一首，将获取到的整页音乐id储存，监听播放状态，播放完成，自动播放下一曲，同时判断最后一曲以及第一曲，以及本页有无分页的情况，做对应提示，由于部分音乐由于数据问题，
                 无法获取到url，做对应提示处理。
            </li>
            <li>
                总结，比起2.0开发，确实效率提高，编译速度更快。本demo作为vue3.2练手项目 ，可能存在一些bug,持续修复中。有空持续更新优化其他模块
            </li>
            <h3>优化点</h3>
            <li>
                1.使用unplugin-auto-import自动引入vue vue-router相关插件优化了每页页面不需要依依引入ref reactive toref torefs .....等
            </li>
            <li>
                2.曲风栏目下的曲风分类，鼠标移入的时候添加防抖处理，原先如果你1秒内滑动几次就调用几次，现在不管鼠标移入几次，1秒内只会发送一次请求
            </li>
            <h3>更新</h3>
            <li >
                1.爬虫专区，使用node.js 的express框架，结合request 请求模块  cheerio解析， iconv乱码处理 完成对 目标网站
                <a href="www.2ting.net" target="_blank">www.2ting.net</a>的爬取
            </li>
      </ul>


  </div>
</template>

<script  setup>

import { useStore } from "vuex";
import { wyy_subcount } from "../api/index.js";
import Cookies from "js-cookie";

const router = useRouter();
const store = useStore();

onMounted(() => {
  
});


</script>

<style scoped>


</style>