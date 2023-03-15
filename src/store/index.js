/*
 * @Author: your name
 * @Date: 2022-03-02 15:20:21
 * @LastEditTime: 2022-03-29 10:16:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\store\index.js
 */
import { createStore } from 'vuex'
import login from './login'
import play from './play'
import lrccol from './lrccol'
const store = createStore({
  state: {
    userInfo: {
      name:'wyy3.2'
    },
  },
  mutations: {
   
    sername(state, name){
      state.userInfo.name = name
    },

  
  },
  actions: {
   
  },
  getters: {
  
  },
  modules: {
    login,
    play,
    lrccol
  },
})
 
export default store