/*
 * @Author: your name
 * @Date: 2022-03-09 10:20:42
 * @LastEditTime: 2022-03-14 14:26:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\store\play.js
 */


export default {
    namespaced: true,
    state: {
        //歌曲id集合
         plsyid:[],
          //当前播放胡音乐 url 名字 背景图片
         playobj:{
              id:"",
              name:"",
              url:"",
              pic:"",
         },
         lrcs:[],//歌詞
      
    },
    mutations: {

        //歌單下面的歌曲id
        playIds(state,getdata){
            state.plsyid = getdata;
        },
     
        //当前播放胡音乐 url 名字 背景图片
        save_obj(state,getdata){
            state.playobj = getdata;
        },

        //當前播放格策
        setLyric(state,getdata){
            state.lrcs = getdata;
        },

     
    },
    actions: {
       
    }
}
