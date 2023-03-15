/*
 * @Author: your name
 * @Date: 2022-03-02 11:00:53
 * @LastEditTime: 2022-12-23 14:49:57
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\vite.config.js
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import styleImport, { VantResolve } from 'vite-plugin-style-import';
import AutoImport from "unplugin-auto-import/vite" //自动引入插件vue vue-router
//const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  //別名配置
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //     'comp': path.resolve(__dirname, 'src/components'),
  //     'style': path.resolve(__dirname, 'src/style'),
  //     'api': path.resolve(__dirname, 'src/api'),
  //     'utils': path.resolve(__dirname, 'src/utils'),
  //     'views': path.resolve(__dirname, 'src/views'),
  //     'routers': path.resolve(__dirname, 'src/routers'),
  //     'config': path.resolve(__dirname, 'src/config'),
  //   },

  // },
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),

    AutoImport ({
      imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关api(需要pinia的话这里需要引入pinia)
    })


  ],
  base: './', //打包必须配置上，不然页面空白
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  }
})
