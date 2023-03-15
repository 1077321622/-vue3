/*
 * @Author: your name
 * @Date: 2022-03-07 10:23:41
 * @LastEditTime: 2022-03-08 09:53:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\store\login.js
 */

export default {
    namespaced: true,
    state: {
        userinfo:JSON.parse(localStorage.getItem('userinfo')),  //防止用户刷新页面 ，让数据一只存在 只要不清除缓存的情况下
    },
    mutations: {
        userInfo(state,getdata){
            localStorage.setItem('userinfo',JSON.stringify(getdata));
            //如果用户提交了，不刷新页面 从store中取值是存在的
            state.userinfo= getdata;
        },
     
    },
    actions: {
       
    }
}
