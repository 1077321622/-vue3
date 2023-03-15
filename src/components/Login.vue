<!--
 * @Author: your name
 * @Date: 2022-03-04 17:33:01
 * @LastEditTime: 2023-03-15 10:59:32
 * @LastEditors: “1077321622@qq.com” lzr448470520
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\components\Login.vue
-->

<template>
  <div class="logo">
    <div class="logo_center">
      <div class="logo_pic">
        <p class="p1"><img src="" alt="" /></p>
        <p class="p2">vue3( setup 语法糖)开发听歌系统</p>
      </div>
      <div class="logo_input">
        <el-input
          v-model="username"
          type="password"
          class="username"
          placeholder="请输入163邮箱账号"
        >
          <template #suffix>
            <el-icon class="el-input__icon"><Stamp /></el-icon>
          </template>
        </el-input>

        <el-input
          v-model="password"
          type="password"
          class="pass"
          placeholder="请输入密码"
        >
        </el-input>

        <div class="btn">
          <button class="btn" @click="gologin">登录</button>
          <!-- <el-button type="success" style="width: 100%; height: 100%" plain @click="gologin">
            登录</el-button
          > -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Login,Login1 } from "../api/index.js";
import { ElMessage } from "element-plus";
//l路由引入
import { useStore } from "vuex";
import Cookies from "js-cookie";
const username = ref("lzr10773216222022@163.com");
const password = ref("Lzr448470520");
const router = useRouter();
const store = useStore();
//登录
const gologin = () => {
  let parms = {
    //手机号登录
    // phone: username.value,
    // password: password.value, 
    //邮箱登录1111111
    email: username.value,
    password: password.value, 

  };
//
  Login1(parms)
    .then((res) => {
      console.log(res);
      if (res.code == 200) {
        Cookies.set("cookies", res.cookie);
        store.commit("login/userInfo", res);
        router.push({
          path: "/",
          query: {},
        });
      } else if (res.code == 502) {
        ElMessage.error(res.message);
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
     ElMessage.error(error.message);
    //  alert(1)
    // let res = {"level":10,"listenSongs":30013,"userPoint":{"userId":32953014,"balance":350,"updateTime":1672105151036,"version":10,"status":1,"blockBalance":0},"mobileSign":false,"pcSign":false,"profile":{"privacyItemUnlimit":{"area":true,"college":true,"gender":true,"age":true,"villageAge":true},"avatarDetail":null,"backgroundImgIdStr":"109951163792144631","birthday":768931200000,"accountStatus":0,"vipType":11,"userType":0,"createTime":1407747900967,"avatarUrl":"http://p1.music.126.net/axewGX7u9P9Iuqjep-3mmQ==/109951165601796681.jpg","mutual":false,"followed":false,"remarkName":null,"authStatus":0,"detailDescription":"","experts":{},"expertTags":null,"djStatus":0,"gender":0,"province":440000,"city":440300,"defaultAvatar":false,"avatarImgId":109951165601796690,"backgroundImgId":109951163792144620,"backgroundUrl":"http://p1.music.126.net/WLTBvNL_l9ZKlslFwaCM9Q==/109951163792144631.jpg","nickname":"binaryify","avatarImgIdStr":"109951165601796681","description":"","userId":32953014,"signature":"~","authority":0,"followeds":65,"follows":19,"blacklist":false,"eventCount":17,"allSubscribedCount":0,"playlistBeSubscribedCount":4,"avatarImgId_str":"109951165601796681","followTime":null,"followMe":false,"artistIdentity":[],"cCount":0,"inBlacklist":false,"sDJPCount":0,"playlistCount":18,"sCount":0,"newFollows":19},"peopleCanSeeMyPlayRecord":false,"bindings":[{"expiresIn":2147483647,"refreshTime":1592285666,"bindingTime":1426295169224,"tokenJsonStr":null,"expired":false,"url":"","userId":32953014,"id":28098251,"type":1},{"expiresIn":2628968,"refreshTime":1507142393,"bindingTime":1407747883151,"tokenJsonStr":null,"expired":true,"url":"http://weibo.com/u/5144142752","userId":32953014,"id":18574366,"type":2}],"adValid":false,"code":200,"newUser":false,"recallUser":false,"createTime":1407747900967,"createDays":3060,"profileVillageInfo":{"title":"村民证","imageUrl":"https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9934738295/8467/c211/0aeb/b58d49e20733e4712bd5710d42be4b04.png","targetUrl":"https://sg.music.163.com/g/cloud-card/result?fromNative=1&skipAni=1&full_screen=true&signUserId=2FD03A3386D39BA43281E6A158E5E954"}}

    // store.commit("login/userInfo", res);
    //     router.push({
    //       path: "/",
    //       query: {},
    //     });

    });
};
</script>
<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 100%;
  // background: url("../assets/login/logobj.png");
  background: firebrick;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .logo_center {
    width: 395px;
    height: 435px;
    background: #fff;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 8px;
    .logo_pic {
      width: 100%;
      height: 170px;
      position: relative;
      .p1 {
        width: 120px;
        height: 95px;
        background: url("../assets/login/logopic.png");
        position: absolute;
        top: 25px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        position: relative;
      }
      .p2 {
        width: 100%;
        height: 20px;
        text-align: center;
        position: absolute;
        top: 140px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        color: #606266;
        font-size: 15px;
      }
    }
    .logo_input {
      width: 70%;
      margin: 20px auto 0px auto;
      .pass {
        margin-top: 20px;
      }
      button {
        width: 100%;
        margin-top: 10px;
        --glow-color: rgb(217, 176, 255);
        --glow-spread-color: rgba(191, 123, 255, 0.781);
        --enhanced-glow-color: rgb(231, 206, 255);
        --btn-color: rgb(100, 61, 136);
        border: 0.25em solid var(--glow-color);
        padding: 1em 3em;
        color: var(--glow-color);
        font-size: 15px;
        font-weight: bold;
        background-color: var(--btn-color);
        border-radius: 1em;
        outline: none;
        box-shadow: 0 0 1em 0.25em var(--glow-color),
          0 0 4em 1em var(--glow-spread-color),
          inset 0 0 0.75em 0.25em var(--glow-color);
        text-shadow: 0 0 0.5em var(--glow-color);
        position: relative;
        transition: all 0.3s;
      }

      button::after {
        pointer-events: none;
        content: "";
        position: absolute;
        top: 120%;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: var(--glow-spread-color);
        filter: blur(2em);
        opacity: 0.7;
        transform: perspective(1.5em) rotateX(35deg) scale(1, 0.6);
      }

      button:hover {
        color: var(--btn-color);
        background-color: var(--glow-color);
        box-shadow: 0 0 1em 0.25em var(--glow-color),
          0 0 4em 2em var(--glow-spread-color),
          inset 0 0 0.75em 0.25em var(--glow-color);
      }

      button:active {
        box-shadow: 0 0 0.6em 0.25em var(--glow-color),
          0 0 2.5em 2em var(--glow-spread-color),
          inset 0 0 0.5em 0.25em var(--glow-color);
      }

      .btn:hover::before {
        transform: translateX(0);
      }
    }
  }
}
</style>