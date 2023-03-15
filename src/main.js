/*
 * @Author: your name
 * @Date: 2022-03-02 11:00:53
 * @LastEditTime: 2022-12-23 15:16:52
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
//全局样式
import './style/index.scss'
//UI
import ElementPlus from './plugins/elementplus'



import * as ElIconModules from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Vant from './plugins/Vant'
//路由
import router from './router'
//状态
import store from './store'

//main.js:

const app = createApp(App)
// 获取原型
const prototype = app.config.globalProperties
// 绑定参数
prototype.version = '网亦云vue3.2开发版本'
app.use(router)
app.use(store)


app.use(Vant)
app.use(ElementPlus, {
    size: 'small',
    locale: zhCn
  })

  Object.keys(ElIconModules).forEach(function(key) {
    app.component(ElIconModules[key].name, ElIconModules[key])
  })  
app.mount('#app')