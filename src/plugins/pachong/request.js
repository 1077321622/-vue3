/*
 * @Author: your name
 * @Date: 2022-03-02 16:41:03
 * @LastEditTime: 2023-02-28 16:29:22
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\plugins\request.js
 */
import axios from 'axios';
export function request(config) {
  // 创建axios的实例
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URLPACHONG,
    timeout: 20000,
  
  })
  // 请求拦截器配置
  instance.interceptors.request.use(config => {
    //  config.headers['xhrFields'] = { withCredentials: true }
      return config
    }, error => {
      return Promise.error(error)
    }
  )
  // 响应拦截器配置
  instance.interceptors.response.use(response => {
    return response.data
  }, error => {
    // switch (error.response.data.code) {
    //   case 400:
    //     console.log("无权访问")
    //     router.push({path: '/login'})
    //     break
    //   case 404:
    //     console.log("404啦")
    //     router.push({path: '/404'})
    //     break
    //   default:
    //     return Promise.reject(error)
    // }
  
    return Promise.reject(error)
    
  })
  // 发送真正的网络请求
  return instance(config);
}
export default request;