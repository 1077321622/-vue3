/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-02-16 11:38:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-02-16 14:25:13
 * @FilePath: \viteapp\src\views\qufeng\debounce_throttle.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
  // 防抖
  debounce: function (fn, delay) {
    // 时间期限
    var delays = delay || 200;
    var timer;
    // 闭包
    return function () {
      // 考虑作用域，上下文环境，apply需要用到this对象
      var th = this;
      // 接收的参数用 ES6 中的 rest 参数统一存储到变量 args 中。arguments就是传入的参数数组,而且个数可以不确定的传回给fn（不确定函数到底有多少个参数，用arguments来接收）
      var args = arguments;
      // 判断还在定时，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        timer = null;
        // 执行方法
        fn.apply(th, args);
      }, delays);
    };
  },
  
  // 节流 定时器 + 时间戳
  throttle: function(func, delay) {
    var timer = null
    var startTime = Date.now()
    return function() {
      // 结束时间
      var curTime = Date.now()
      // 间隔时间 = 延迟的时间 - （结束时间戳 - 开始时间戳）
      var interval = delay - (curTime - startTime)
      var th = this
      var args = arguments
      clearTimeout(timer)
      if(interval <= 0) {
        // 证明可以触发了
        func.apply(th, args)
        // 重新计算开始时间
        startTime = Date.now()
      } else {
        // 继续等待
        timer = setTimeout(func, interval)
      }
    }
  }
}
