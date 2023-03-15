
import http from '../plugins/pachong/http.js'
import Cookies from "js-cookie";
let cookie = Cookies.get("cookies")
//快四
export function getKS(parms){
 return http.get('kuaisi',parms)
}

//快四URL
export function kuaisierl(parms){
    return http.get('kuaisierl',parms)
}

export function get2tingType(parms){
   return http.get('type',parms)
  }
  
  //获取首页类型
  export function gethome(parms){
    return http.get('home',parms)
   }
   

  