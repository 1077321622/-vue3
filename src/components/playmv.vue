<!--
 * @Author: your name
 * @Date: 2022-03-08 11:17:50
 * @LastEditTime: 2022-12-23 14:54:15
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\views\模板.vue
-->

<template>
  <div class="mvbox">
        <video :src="playurl" id="video" controls="controls"></video>
  </div>
</template>

<script  setup>

const emit = defineEmits(["playended"]);
const props = defineProps({
  src: String,
});
const playurl = toRef(props, 'src');
onMounted(() => {
        var elevideo = document.getElementById("video");//获取video标签
	    elevideo.addEventListener('ended', function () { //video视频播放结束监听
	        console.log("播放结束");
             emit("playended");
	    }, false);

        elevideo.addEventListener('play', function () { //video视频播放结束监听
	        console.log("播放开始");
	    }, false);

        

});

</script>
<style scoped>
.mvbox{
    width: 100%;
    height: 400px;
    background: #000;
}
video{
    width: 100%;
    height: 100%;
}
</style>