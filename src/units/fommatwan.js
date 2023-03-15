/*
 * @Author: your name
 * @Date: 2022-04-11 17:30:02
 * @LastEditTime: 2022-04-11 17:38:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \viteapp\src\units\fommatwan.js
 */
/**
 * 
 * @param value 数字值
 */



let fromnum = function fromnum (value) {
    const newValue = ['', '', '']
    let fr = 1000
    let num = 3
    let text1 = ''
    let fm = 1
    while (value / fr >= 1) {
      fr *= 10
      num += 1
    }
    if (num <= 4) { // 千
      newValue[0] = parseInt(value / 1000) + ''
      newValue[1] = '千'
    } else if (num <= 8) { // 万
      text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
  
      fm = text1 === '万' ? 10000 : 10000000
      if (value % fm === 0) {
        newValue[0] = parseInt(value / fm) + ''
      } else {
        newValue[0] = parseFloat(value / fm).toFixed(2) + ''
      }
      newValue[1] = text1
    } else if (num <= 16) { // 亿
      text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
      text1 = (num - 8) / 4 > 1 ? '万亿' : text1
      text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
    
      fm = 1
      if (text1 === '亿') {
        fm = 100000000
      } else if (text1 === '千亿') {
        fm = 100000000000
      } else if (text1 === '万亿') {
        fm = 1000000000000
      } else if (text1 === '千万亿') {
        fm = 1000000000000000
      }
      if (value % fm === 0) {
        newValue[0] = parseInt(value / fm) + ''
      } else {
        newValue[0] = parseFloat(value / fm).toFixed(2) + ''
      }
      newValue[1] = text1
    }
    if (value < 1000) {
      newValue[0] = value + ''
      newValue[1] = ''
    }
    return newValue.join('')
  }

 export default {
    fromnum
 }