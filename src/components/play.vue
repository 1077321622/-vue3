<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2023-02-13 10:02:55
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
--> 


<template>
 
       <!-- {{$store.state.play.playobj}}-->
  <!-- {{$store.state.lrccol.color }} -->
  <audio
    id="audio"
    style="display: none !important"
    :src="$store.state.play.playobj.url"
    controls
  ></audio>

  <div class="playbox" >
    <!--扳机-->
    <div
      class="item1"
      v-show="isFlip"
      @click="isFlipUp"
      v-bind:style="{
        'background-image': 'url(' + $store.state.play.playobj.pic + ')',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'position': 'relative',
      }"
    >
      <div class="item2_box"></div>

      <div class="banji">
        <div class="banjimain" :class="[isplsyBtn ? '' : 'rotateNama']">
          <img src="../assets/banji.png" alt="" />
        </div>
        <div class="picbox">
          <img
            :class="[isplsyBtn ? '' : 'Rotation']"
            :src="$store.state.play.playobj.pic ? $store.state.play.playobj.pic :'http://3710666.cn/img/wyypng.png'"
            alt=""
          />
        </div>
      </div>
      <!--  {{$store.state.play.lrcs}} -->
    </div>
    <!---歌词-->
    <div
      class="item2"
      v-show="!isFlip"
      @click="isFlipUp"
      v-bind:style="{
        'background-image': 'url(' + $store.state.play.playobj.pic + ')',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'position': 'relative',
      }"
    >
      <div class="item2_box"></div>

      <div class="item2_lrc">
        <div class="lrcData">
          <ul id="topmian"   ref="lyricUL" v-show="$store.state.play.lrcs.length>0">
            <li
              v-for="(item, index) in $store.state.play.lrcs"
              :style="{
                 color: index == currentRow ? `${$store.state.lrccol.color}` : `#fff`,
                 fontSize:index == currentRow ? 16+'px' : 14+'px',
                 fontWeight:index == currentRow ? 'bold' : '',
               }"
              :key="index"
            >
            {{ item.text }}
            </li>
          </ul> 

          <h4 style="line-height: 600px;text-align: center;" v-show="$store.state.play.lrcs.length==0" direction="left">暂无歌词.....</h4>
        </div>
      </div>
    </div>

    <div class="playbtn">
     
      <el-progress
        :text-inside="true"
        color="red"
        :stroke-width="1"
        :percentage="musicallTime"
      />
      <div class="plays dis">
        <div class="upbox">
          <img src="../assets/up.png" alt="" @click="clickBtn('up')" />
        </div>
        <div class="centerbox">
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
        <div class="nextbox">
          <img src="../assets/next.png" alt="" @click="clickBtn('down')" />
        </div>
      </div>
    </div>
  </div>
 

</template>

<script  setup>
import { useStore } from "vuex";
import { getlrc, wyy_geturl } from "../api/index.js";
import { ElMessage } from "element-plus";
const store = useStore();

let MVVisible = ref(true); 

//数据
let isFlip = ref(false); //反转控制（班级和歌词）
let lyricCurrent = ref(0); //播放时间
let lyric = ref([]); //歌词
let currentRow = ref(-1); //当前高亮歌词
let musicallTime = ref(0); //j进度
let isplsyBtn = ref(true); //播放状态
//歌曲id
let id = computed(() => {
  return store.state.play.playobj.id;
});


//播放id集合 上下切换使用
let nowarr = computed(() => {
  return store.state.play.plsyid;
});

//播放完成 标记父组件选中的active
const emit = defineEmits(["markParentLiBg"]);

//是否有分页
const ispage = defineProps({
  page: Boolean,
});

//监听
watch(id, (newValue, oldValue) => {
  console.log("歌曲id发生变化" + newValue);
  lyric.value = [];
  //获取歌词
  currentRow.value = -1;
  lyricCurrent.value = 0;
  musicallTime.value = 0;
  playBtnStatus(true);
  //获取当前点击的歌词
  getlrcfn(newValue);
  //选中父组件中的li 添加active 的class
  emit("markParentLiBg", newValue);
});

//监听当前播放的是哪一句 显示高亮
watch(lyricCurrent, (newValue, oldValue) => {
  lyric.value.forEach((element, index) => {
    if (lyricCurrent.value == element.time) {

       //if( index>10 ){
        setTimeout(() => {
          document.getElementById("topmian").style.marginTop = -index * 28 + "px";
          //  document.getElementById("topmian").style.transform = `translateY(${495- (28 * (index + 1))}px)`
          }, 200);
      // }
    
      currentRow.value = index;
    }

 

  });
});

//组件加载完毕
onMounted(() => {
  //监听audio播放器
  addlisfn();
  //获取歌词
  getlrcfn(id);


});

//翻转控制歌词扳机
const isFlipUp = () => {
  isFlip.value = !isFlip.value;
};

//监听
const addlisfn = () => {
  let musicDom = document.getElementById("audio");
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
      document.getElementById("topmian").style.marginTop = 0 + "px";
      playBtnStatus(true);
      clickBtn('down')
    },
    false
  );
};


 const clickBtn= (status)=>{
    let nowLen = nowarr.value.length;
     {//下一曲
     if (status=='down') {
         if (nowLen == 0) {
            ElMessage.error("暂无下一曲");
          } else if (nowLen > 0) {
            let i = getIndex(nowarr.value, id.value);
            //判断当前id是不是 数组中的最后一个 如果是表示已经是最后一曲
            if (nowarr.value[nowLen - 1] == id.value) {
              if (ispage.page) {
                ElMessage.error("本页暂无下一曲");
              } else {
                ElMessage.error("暂无下一曲");
              }
              emit("markParentLiBg", id.value);
            } else {
              clearUrl();
              playmp3(nowarr.value[i + 1]);
            }
          }
      //上一曲    
     } else if(status=="up")
         if (nowLen == 0) {
            ElMessage.error("暂无上一曲");
          } else if (nowLen > 0) {
             //获取当前播放歌曲在数组中的下标
            let i = getIndex(nowarr.value, id.value);
              //判断当前id是不是 数组中的第一个 如果是表示已经是第一曲
            if (nowarr.value[0] == id.value) {
              ElMessage.error("暂无上一曲");
               emit("markParentLiBg", id.value);
            } else {
              clearUrl();
              playmp3(nowarr.value[i - 1]);
            }
          }
     }
  
 }



//播放
const playmp3 = (id) => {
  //自动切换的时候只储存了歌舞id 没用储存背景图片，设置一张默认图片
  let pic = "http://3710666.cn/img/wyypng.png";
  let parms = {
    id: id,
  };
  wyy_geturl(parms)
    .then((res) => {
      if (!res.data[0].url) {
        ElMessage.error("未获取到播放地址，请手动切换下一曲");
        store.commit("play/save_obj", {});
        store.commit("play/setLyric", []);
      } else {
        let obj = {
          id: id,
          name: "",
          url: res.data[0].url,
          pic: pic,
        };
        store.commit("play/save_obj", obj);
        //获取到播放地址，自动播放
        setTimeout(() => {
          playfn();
          playBtnStatus(false);
        }, 700);
      }
    })
    .catch((error) => {});
};

//播放图片暂停控制
const playBtnStatus = (status) => {
  isplsyBtn.value = status;
};

//清空播放地址
const clearUrl = () => {
  let musicDom = document.getElementById("audio");
  musicDom.src = "";
};

//查找当前播放id下标 (用来查找当前歌曲的上一首下一首)
const getIndex = (arr, item) => {
  if (Array.prototype.indexOf()) {
    return arr.indexOf(item);
  } else {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === irem) {
        return i;
      } else {
        return -1;
      }
    }
  }
};
//获取歌词
const getlrcfn = (id) => {
  let parms = {
    id: id,
  };
  getlrc(parms)
    .then((res) => {
      var lrc = res.lrc.lyric;
      let arr = lrc.split("\n");
      let row = arr.length;
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i];
        let temp_arr = temp_row.split("]");
        let text = temp_arr.pop();
        temp_arr.forEach((element) => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":");
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]);
          obj.time = s;
          obj.text = text;
          lyric.value.push(obj);
        });
      }
      //储存歌词，防止歌词丢失
      store.commit("play/setLyric", lyric);
      // lyric.value.sort(sortRule());
    })
    .catch((error) => {});
};

const sortRule = (a, b) => {
  return a.time - b.time;
};
//播放百分比
const GetPercent = (num, total) => {
  return Math.round((num / total) * 10000) / 100.0; // 小数点后两位百分比
};
/**
 * 公共播放
 */
const playfn = () => {
  let musicDom = document.getElementById("audio");
  musicDom.play();
};
// 暂停
const strpfn = () => {
  let musicDom = document.getElementById("audio");
  musicDom.pause();
};

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

onUnmounted(() => {
    store.commit("play/save_obj", {});
    store.commit("play/setLyric", []);
});
</script>

<style lang="scss" scoped>
.playbox {
  width: 100%;
  height: 100%;
  background: #e4e7ed;
  position: relative;
  cursor: pointer;
}
.playbox .item1 {
  width: 100%;
  height: 560px;
  background: #4a4c50;
  position: absolute;
  top: 0px;
  left: 0px;
  .item2_box {
    width: 100%;
    height: 100%;
    background: inherit;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    -o-filter: blur(20px);
    filter: blur(20px);
    // filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
  }
  .banji {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
  }
}
.playbox .playbtn {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  cursor: pointer;
  background-image: #000;
  .plays {
    width: 100%;
    margin-top: 14px;
    height: 40px;
    .upbox {
      width: 40px;
      height: 100%;
      margin-left: 10px;
      img {
        margin: 4px;
      }
    }
    .centerbox {
      flex: 1;
      position: relative;
      .img1 {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
      }
      .img2 {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
      }
    }
    .nextbox {
      width: 40px;
      height: 100%;

      margin-right: 10px;
      img {
        margin: 4px;
      }
    }
  }
}
.playbox .item2 {
  width: 100%;
  height: 560px;
  position: absolute;
  background: #e4e7ed;
  top: 0px;
  left: 0px;
  .item2_box {
    width: 100%;
    height: 100%;
    background: inherit;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    -o-filter: blur(20px);
    filter: blur(20px);
    // filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
  }
  .item2_lrc {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
}

.lrcData {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 495px;
  overflow: hidden;
  margin-top: 2px;
}
.lrcData ul li {
  height: 28px;
  line-height: 28px;
  text-align: center;
  font-size: 0.9375rem;
  font-family: "LED";
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: bold;
  
}
/*扳机*/
.banjimain {
  width: 100%;
  height: 9.375rem;
  position: relative;
  transition-duration: 1s;
  transition-property: all;
  transition-timing-function: ease;
  transition-delay: 0s;
  z-index: 9;
}
.banjimain img {
  position: absolute;
  top: 1.6875rem;
  left: 5.75rem;
  height: 7.875rem;
}
.picbox {
    width: 18.625rem;
    height: 17.625rem;
    position: absolute;
    top: -1.75rem;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;
    border: 2.75rem solid #000;
    border-radius: 100%;
    }
.picbox img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

/*动画 */

/** */
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
.Rotation {
  -webkit-transform: rotate(360deg);
  animation: rotation 8s linear infinite;
  -moz-animation: rotation 8s linear infinite;
  -webkit-animation: rotation 8s linear infinite;
  -o-animation: rotation 8s linear infinite;
  overflow: hidden;
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 100%;
  box-shadow: 0.0625rem 0px 0.5625rem 0.5625rem #ff572230;
}
.rotateNama {
  transform: rotate(30deg);
  z-index: 9;
}


</style> 