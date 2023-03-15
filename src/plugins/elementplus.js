/*
 * @Author: your name
 * @Date: 2022-03-02 16:24:12
 * @LastEditTime: 2022-12-23 15:17:39
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\plugins\elementplus.js
 */
//1完整引入elementui plus 3

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'




//2按需引入
// import {ElementPlus} from 'element-plus'
// import 'element-plus/dist/index.css'

export default  function(app){
    //1完整引入elementui plus 3
    app.use(ElementPlus)


    //  //3按需引入
    //  app.use(ElementPlus)
}