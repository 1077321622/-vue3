<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-29 17:01:29
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-12-30 12:00:16
 * @FilePath: \viteapp\src\components\pachongplay.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="mian">
    <div class="playpc">
      <div class="playtop">
        <div class="name">
          <marquee behavior="" direction=""> {{ name }} </marquee>
          <div  :class="[isplsyBtn ? '' : 'rotateNama loader-inner line-scale-pulse-out-rapid success']">
            <div v-for="(item, index) in 25" :key="index"></div>
          </div>
        </div>
      </div>
      <div class="plsybottom">
        <el-progress
          :text-inside="true"
          color="red"
          :stroke-width="1"
          :percentage="musicallTime"
        />
        <div class="playbtn">
          <img
            class="img1"
            src="../assets/b1.png"
            alt=""
            v-if="isplsyBtn"
            @click="seetingPlsy"
          />
          <img
            class="img2"
            src="../assets/b2.png"
            alt=""
            v-if="!isplsyBtn"
            @click="stropMusic"
          />
        </div>
      </div>
    </div>
  </div>

  <audio
    id="audio1"
    style="display: none !important"
    :src="path"
    controls
  ></audio>
</template>
  
  <script  setup>
import {ref,defineExpose} from 'vue'
import { useStore } from "vuex";
import { wyy_subcount } from "../api/index.js";
import Cookies from "js-cookie";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const store = useStore();

let musicallTime = ref(0); //进度
let lyricCurrent = ref(0); //播放时间
let isplsyBtn = ref(true); //播放状态
let color = ref("#ee5600"); //播放状态


let yinjieH = ref("15px"); //跳动音阶高度

let timemian = ref(null)//定时器

//接受父组件的参数
const props = defineProps({
  title: String,
  musicname:String,
});
const path = toRef(props, "title");

const name = toRef(props, "musicname");


 //随机颜色生成
 const rgb = () => {
   const r = Math.floor(Math.random()*256);
   const g = Math.floor(Math.random()*256);
   const b = Math.floor(Math.random()*256);
   return `rgb(${r},${g},${b})`;
}


//随机轨道高度
const randomNum = (min,max) => {
      const num = Math.floor(Math.random() * (max - min + 1)) + min
      return num
 } 


onMounted(() => {
  addlisfnpc();

  //随机颜色
  timemian.value =  setInterval(()=>{
    color.value = rgb();
    yinjieH.value = randomNum(10,50)+"px"
  },3000)
  
});


//销毁定时器
onUnmounted(() => {
 clearInterval(timemian);
});

//点击播放
const seetingPlsy = () => {
  playfn();
  playBtnStatus(false);
};

//点击暂停
const stropMusic = () => {
  strpfn();
  playBtnStatus(true);
};
const playfn = () => {
  let musicDom = document.getElementById("audio1");
  musicDom.play();
};

// 暂停
const strpfn = () => {
  let musicDom = document.getElementById("audio1");
  musicDom.pause();
};


//播放图片暂停控制
const playBtnStatus = (status) => {
  isplsyBtn.value = status;
};


//播放百分比
const GetPercent = (num, total) => {
  return Math.round((num / total) * 10000) / 100.0; // 小数点后两位百分比
};
//监听
const addlisfnpc = () => {
  let musicDom = document.getElementById("audio1");
  musicDom.addEventListener("timeupdate", function () {
    //获取音乐总时间
    let alltime = Math.floor(musicDom.duration);
    //用秒数来显示当前播放进度
    let timeDisplay = Math.floor(musicDom.currentTime); //获取实时时间
    // //计算播放百分比  显示歌曲进度
    musicallTime.value = GetPercent(timeDisplay, alltime);
    lyricCurrent.value = timeDisplay;
  });
  //开始
  musicDom.addEventListener(
    "play",
    function () {
      console.log("开始播放");
    },
    false
  );
  //暂停
  musicDom.addEventListener(
    "pause",
    function () {
      console.log("暂停");
    },
    false
  );

  musicDom.addEventListener(
    "ended",
    function () {
      console.log("播放结束");
      musicallTime.value = 0;
      playBtnStatus(true);
    },
    false
  );


};

// 主动暴露childMethod方法
defineExpose({ seetingPlsy })



</script>
  
 <style scoped >
.playpc {
  width: 100%;
  background: #010813;
}
.playpc .playtop {
  width: 100%;
  height: 150px;
  color: #fff;
  overflow: hidden;
}
.playpc .plsybottom {
  width: 100%;
  height: 50px;
}
.playbtn {
  width: 100%;
  height: 48px;
  margin-top: 1px;
  position: relative;
}
.playbtn .img1 {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  cursor: pointer;
}
.playbtn .img2 {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  cursor: pointer;
}
.name {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
/*动态分析图标*/
.line-scale-pulse-out-rapid.success > div {
  background: v-bind("color");
}

.line-scale-pulse-out-rapid > div {
  width: 13px;
  height:v-bind("yinjieH");
  margin-right: 2px;
  display: inline-block;
  vertical-align: middle;
  -webkit-animation: line-scale-pulse-out-rapid 0.9s -0.5s infinite cubic-bezier(0.11, 0.49, 0.38, 0.78);
  animation: line-scale-pulse-out-rapid 0.9s -0.5s infinite cubic-bezier(0.11, 0.49, 0.38, 0.78);
}
.line-scale-pulse-out-rapid > div:nth-child(2),
.line-scale-pulse-out-rapid > div:nth-child(4) {
  -webkit-animation-delay: -0.25s !important;
  animation-delay: -0.25s !important;
}
.line-scale-pulse-out-rapid > div:nth-child(1),
.line-scale-pulse-out-rapid > div:nth-child(5) {
  -webkit-animation-delay: 0s !important;
  animation-delay: 0s !important;
}
.line-scale-pulse-out-rapid > div:nth-child(2),
.line-scale-pulse-out-rapid > div:nth-child(8) {
  -webkit-animation-delay: -0.25s !important;
  animation-delay: -0.25s !important;
}
.line-scale-pulse-out-rapid > div:nth-child(1),
.line-scale-pulse-out-rapid > div:nth-child(15) {
  -webkit-animation-delay: 0s !important;
  animation-delay: 0s !important;
}

.line-scale-pulse-out-rapid > div:nth-child(16),
.line-scale-pulse-out-rapid > div:nth-child(12) {
  -webkit-animation-delay: -0.25s !important;
  animation-delay: -0.25s !important;
}
.line-scale-pulse-out-rapid > div:nth-child(23),
.line-scale-pulse-out-rapid > div:nth-child(20) {
  -webkit-animation-delay: 0s !important;
  animation-delay: 0s !important;
}
@-webkit-keyframes line-scale-pulse-out-rapid {
  0%,
  90% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
  80% {
    -webkit-transform: scaley(0.3);
    transform: scaley(0.3);
  }
}
@keyframes line-scale-pulse-out-rapid {
  0%,
  90% {
    -webkit-transform: scaley(1);
    transform: scaley(1);
  }
  80% {
    -webkit-transform: scaley(0.3);
    transform: scaley(0.3);
  }
}




@-webkit-keyframes line-scale-pulse-out-rapid {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.Rotation {
  -webkit-transform: line-scale-pulse-out-rapid(360deg);
  animation: line-scale-pulse-out-rapid 8s linear infinite;
  -moz-animation: line-scale-pulse-out-rapid 8s linear infinite;
  -webkit-animation: line-scale-pulse-out-rapid 8s linear infinite;
  -o-animation: line-scale-pulse-out-rapid 8s linear infinite;
  overflow: hidden;
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 100%;
  box-shadow: 0.0625rem 0px 0.5625rem 0.5625rem #ff572230;
}
.rotateNama {
  z-index: 9;
}
</style>