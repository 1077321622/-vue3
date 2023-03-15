/*
 * @Author: your name
 * @Date: 2022-03-15 11:11:24
 * @LastEditTime: 2022-04-20 19:33:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\plugins\Vant.js
 */


import 'vant/lib/index.css';
import { Sticky } from 'vant';
export default  function(app){
    //  //3按需引入
    app.use(Sticky);
}