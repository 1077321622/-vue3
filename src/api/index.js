/*
 * @Author: your name
 * @Date: 2022-03-02 16:55:54
 * @LastEditTime: 2022-12-29 14:45:58
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\api\index.js
 */
import http from '../plugins/http.js'
import Cookies from "js-cookie";
let cookie = Cookies.get("cookies")
//首页轮播
export function getBanner(parms){
 return http.get('banner',parms)
}

//登录
export function Login(parms){
    return http.post('login/cellphone',parms)
 }


 //游客登录
 export function Login1(parms){
   return http.post('login',parms)
}

/**
 * 说明 : 登录后调用此接口 , 传入相关信息,可以更新用户信息

必选参数 :

gender: 性别 0:保密 1:男性 2:女性

birthday: 出生日期,时间戳 unix timestamp

nickname: 用户昵称

province: 省份id

city: 城市id

signature：用户签名
 */
export function editUserinfo(parms){
   return http.post('user/update',parms)
}
 //退出
 export function logouOut(){
    return http.post('logout')
 }
   
// 获取用户信息 , 歌单，收藏，mv, dj 数量
 export function wyy_subcount(parms){
    return http.get(`user/subcount`,parms)
 }

 //  说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 export function wyy_playlist(parms){
    return http.get(`user/playlist`,parms)
 }
   
/**
 获取歌单所有歌曲
 说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
 必选参数 : id : 歌单 id
 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 可选参数 : offset : 默认值为0
 接口地址 : /playlist/track/all
 调用例子 : /playlist/track/all?id=24381616&limit=10&offset=1
 **/

 export function wyy_playlist_All(parms){
    return http.get(`playlist/track/all`,parms)
 }
   
/**
 说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
 必选参数 : id : 歌曲 id
 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 接口地址 : /check/music
 调用例子 : /check/music?id=33894312
 **/

 export function wyy_check_music(parms){
    return http.get(`check/music`,parms)
 }


/**
 获取音乐 url
说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,未登录状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
注 : 部分用户反馈获取的 url 会 403,hwaphon找到的解决方案是当获取到音乐的 id 后，将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
必选参数 : id : 音乐 id
可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
接口地址 : /song/url
调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312

 **/


export function wyy_geturl(parms){
   parms.level ="lossless"
    return http.get(`song/url/v1`,parms)
 }

/**

 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 必选参数 : id: 音乐 id
 接口地址 : /lyric
 调用例子 : /lyric?id=33894312
 返回数据如下图 : 获取歌词
 **/
 export function getlrc(parms){
    return http.get(`lyric`,parms)
 }
 


/**

 获取用户播放记录
 说明 : 登陆后调用此接口 , 传入用户 id, 可获取用户播放记录
 必选参数 : uid : 用户 id
 可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
 接口地址 : /user/record
 调用例子 : /user/record?uid=32953014&type=1

 **/


 export function wyy_nearplay(parms){
   return http.get(`user/record`,parms)
}

/**
 * 最近播放-歌曲
说明 : 调用此接口 , 可获得最近播放-歌曲

可选参数 : limit : 返回数量 , 默认为 100

接口地址 : /record/recent/song

调用例子 : /record/recent/song?limit=1
 */


export function wyy_nearplay1(parms){
   return http.get(`user/record`,parms)
}


/**

搜索
说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
必选参数 : keywords : 关键词
可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
接口地址 : /search
调用例子 : /search?keywords= 海阔天空

 **/

export function wyy_search(parms){
   return http.get(`user/search`,parms)
}


/**
### 获取每日推荐歌曲
说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
**接口地址 :** `/recommend/songs`
**调用例子 :** `/recommend/songs`
**/

export function wyy_recommend(parms){
   return http.get(`recommend/songs`,parms)
}
  
/**
说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
必选参数 : keywords : 关键词
可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
接口地址 : /search
调用例子 : /search?keywords= 海阔天空
 */


export function wyy_search_song(parms){
   return http.get(`search`,parms)
}
 /**
  * 
说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
接口地址 :** `/recommend/resource`
调用例子 :** `/recommend/resource`
**/ 


export function wyy_resource(parms){
   return http.get(`recommend/resource`,parms)
}

 /**
说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)
**必选参数 :** `uid`: 用户 id
**接口地址 :** `/likelist`
**调用例子 :** `/likelist?uid=32953014`
* */ 

export function wyy_likelist(parms){
   return http.get(`likelist`,parms)
}


/**
 * 说明 : 调用此接口,可获取歌手分类列表
必选参数 : cat : 即 category Code,歌手类型,默认 1001,返回华语男歌手数据
可选参数 :
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,如 /artist/list?cat=1001&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列
 */

export function wyy_artist(parms){
   return http.get(`artist/list`,parms)
}


/**
歌手热门50首歌曲
说明 : 调用此接口,可获取
必选参数 :
id : 歌手 id
接口地址 : /artist/top/song
调用例子 : /artist/top/song?id=6452
 */

export function wyy_hotSinger(parms){
   return http.get(`artist/top/song`,parms)
}

/*
说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
**必选参数 :** `id`: 歌手 id
**接口地址 :** `/artist/desc`
**调用例子 :** `/artist/desc?id=6452` ( 周杰伦 )
*/


export function wyy_SingerInfo(parms){
   return http.get(`artist/desc`,parms)
}


/*
### 获取歌手 mv
说明 : 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 , 具体 mv 播放地址可调
用`/mv`传入此接口获得的 mvid 来拿到 , 如 :
`/artist/mv?id=6452`,`/mv?mvid=5461064`
**必选参数 :** `id`: 歌手 id, 可由搜索接口获得
**接口地址 :** `/artist/mv`
**调用例子 :** `/artist/mv?id=6452`
*/


export function wyy_SingerMv(parms){
   return http.get(`artist/mv`,parms)
}

//获取MV URL
export function wyy_SingerMvPlay(parms){
   return http.get(`mv/url`,parms)
}

/*
### 最新 mv
说明 : 调用此接口 , 可获取最新 mv
**可选参数 :** `area`: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
**可选参数 :** `limit`: 取出数量 , 默认为 30
**接口地址 :** `/mv/first`
**调用例子 :** `/mv/first?limit=10`
*/

export function wyy_AllMv(parms){
   return http.get(`mv/all`,parms)
}




/*
### 网易出品mv
说明 : 调用此接口 , 可获取网易出品 mv
**可选参数 :** `limit`: 取出数量 , 默认为 30
`offset`: 偏移数量 , 用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0
**接口地址 :** `/mv/exclusive/rcmd`
**调用例子 :** `/mv/exclusive/rcmd?limit=10`
*/


export function wyy_fromWy(parms){
   return http.get(`mv/exclusive/rcmd`,parms)
}

/*
mv 评论
说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
必选参数 : id: mv id
可选参数 : limit: 取出评论数量 , 默认为 20
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
接口地址 : /comment/mv
调用例子 : /comment/mv?id=5436712
*/


export function wyy_mvnum(parms){
   return http.get(`comment/mv`,parms)
}



/*
### 推荐 mv
说明 : 调用此接口 , 可获取推荐 mv
**接口地址 :** `/personalized/mv`
**调用例子 :** `/personalized/mv`
*/

export function wyy_personalized(parms){
   return http.get(`personalized/mv`,parms)
}
/*
### mv 排行
说明 : 调用此接口 , 可获取 mv 排行
**可选参数 :** `limit`: 取出数量 , 默认为 30  
`area`: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部  
`offset`: 偏移数量 , 用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认
为 0
**接口地址 :** `/top/mv`
**调用例子 :** `/top/mv?limit=10`
*/

export function wyy_topmv(parms){
   return http.get(`top/mv`,parms)
}

/*
### 电台 - 分类
说明 : 登陆后调用此接口 , 可获得电台类型
**接口地址 :** `/dj/catelist`
**调用例子 :** `/dj/catelist`
*/
export function wyy_dtType(parms){
   return http.get(`dj/catelist`,parms)
}

/*
### 电台 - 类别热门电台
**可选参数 :**
`limit` : 返回数量 , 默认为 30
`offset` : 偏移数量，用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0
`cateId`: 类别 id,可通过 `/dj/category/recommend` 接口获取
**接口地址 :** `/dj/radio/hot`
**调用例子 :** `/dj/radio/hot?cateId=2001`(创作|翻唱) `/dj/radio/hot?cateId=10002` (3D|电子)
*/

export function wyy_dtTypeList(parms){
   return http.get(`dj/radio/hot`,parms)
}

// /dj/program
/*
### 电台 - 详情
说明 : 登陆后调用此接口 , 传入`rid`, 可获得对应电台的详情介绍
**必选参数 :** `rid`: 电台 的 id
**接口地址 :** `/dj/detail`
**调用例子 :** `/dj/detail?rid=336355127` ( 对应 ' 代码时间 ' 的详情介绍 )
*/

export function wyy_dtinfo(parms){
   return http.get(`dj/detail`,parms)
}

/*
### 电台 - 节目
说明 : 登陆后调用此接口 , 传入`rid`, 可查看对应电台的电台节目以及对应的 id, 需要
注意的是这个接口返回的 mp3Url 已经无效 , 都为 null, 但是通过调用 `/song/url` 这
个接口 , 传入节目 id 仍然能获取到节目音频 , 如 `/song/url?id=478446370` 获取代
码时间的一个节目的音频
**必选参数 :** `rid`: 电台 的 id
**可选参数 :**
`limit` : 返回数量 , 默认为 30
`offset` : 偏移数量，用于分页 , 如 :( 页数 -1)\*30, 其中 30 为 limit 的值 , 默认为 0
`asc` : 排序方式,默认为 `false` (新 => 老 ) 设置 `true` 可改为 老 => 新 
**接口地址 :** `/dj/program`
**调用例子 :** `/dj/program?rid=336355127&limit=40` ( 对应 ' 代码时间 ' 的节目列表 )
*/
export function wyy_dtjiemu(parms){
   return http.get(`dj/program`,parms)
}


/*
热门歌单分类
说明 : 调用此接口,可获取歌单分类,包含 category 信息
接口地址 : /playlist/hot
调用例子 : /playlist/hot
*/

export function wyy_typehot(parms){
   return http.get(`playlist/hot`,parms)
}


/*
歌单 ( 网友精选碟 )
说明 : 调用此接口 , 可获取网友精选碟歌单
可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
接口地址 : /top/playlist
调用例子 : /top/playlist?limit=10&order=new
*/


export function wyy_select(parms){
   return http.get(`top/playlist`,parms)
}

/*
### 推荐电台
**调用例子 :** `/dj/recommend``
*/

export function wyy_dj24(parms){
   return http.get(`dj/recommend`,parms)
}

/*
### 电台 - 今日优选
说明 : 登陆后调用此接口, 可获得电台今日优选
**接口地址 :** `/dj/today/perfered`
**调用例子 :** `/dj/today/perfered`
*/

export function wyy_dayChage(parms){
   return http.get(`dj/today/perfered`,parms)
}

export function wyy_creategd(parms){
   return http.get(`playlist/create`,parms)
}


/**
 * 
 *说明: 调用此接口获取曲风列表及其对应的 tagId
接口地址: /style/list
调用例子: /style/list
 
 */


export function wyy_song_list(){
   return http.get(`style/list`)
}

/**
 * 曲风偏好
说明: 登录后调用此接口获取我的曲风偏好

接口地址: /style/preference

调用例子: /style/preference
 */

export function wyy_song_ok(){
   return http.get(`style/preference`)
}


/**
 * 曲风-歌曲
说明: 调用此接口可以获取该曲风对应的歌曲

接口地址: /style/song

必选参数: tagId: 曲风 ID

可选参数 : size : 返回数量 , 默认为 20

cursor : 返回数据的 cursor, 默认为 0 , 传入上一次返回结果的 cursor,将会返回下一页的数据

sort: 排序方式，0: 按热度排序，1: 按时间排序

调用例子: /style/song?tagId=1000 /style/song?tagId=1010&sort=1
 */

export function wyy_song_detail(parms){
   return http.get(`style/song`,parms)
}



/*
曲风-专辑
说明: 调用此接口可以获取该曲风对应的专辑

接口地址: /style/album

必选参数: tagId: 曲风 ID

可选参数 : size : 返回数量 , 默认为 20

cursor : 返回数据的 cursor, 默认为 0 , 传入上一次返回结果的 cursor,将会返回下一页的数据

sort: 排序方式，0: 按热度排序，1: 按时间排序

调用例子: /style/album?tagId=1000 /style/album?tagId=1010&sort=1 */


export function wyy_song_zj(parms){
   return http.get(`style/album`,parms)
}



/***-------------------------------------------------------------- */
 // post调用方式 
//  let parms ={
//     phone:phones.value,
//     password:passwords.value
// }
// Login(parms).then((res) => {

// }).catch((error) => {

// });

/***-------------------------------------------------------------- */

//get 调用方式

// let parms = {
//     id: id,
//     cookie: cook,
// };
// //检查音乐是否可用
// isPlay(parms).then((res) => {
//    if (res.success) {
//       
//    } else {
//        
//    }
// }).catch((error) => {
//    
// });