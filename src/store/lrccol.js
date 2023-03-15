/*
 * @Author: your name
 * @Date: 2022-03-07 10:23:41
 * @LastEditTime: 2022-12-30 10:09:20
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\store\login.js
 */

export default {
    namespaced: true,
    state: {
        color:"#c45656"
    },
    mutations: {
       changeCol(state,getdata){
        state.color = getdata;
       }
     
    },
    actions: {
       
    }
}
