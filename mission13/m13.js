/*
 在注释下方写下代码
 给按钮button绑定一个点击事件
 在事件处理函数中
 获取aqi-input输入的值，并显示在aqi-display中
 */

//js
// var btn = document.getElementById("button");
// var ipt = document.getElementById("aqi-input");
// var spn = document.getElementById("aqi-display");
// var display = function() {
//     spn.innerHTML = ipt.value;
// };
// addEvent(btn,"click", display);

//jquery
// $(function(){
//     $("#button").click(function(){
//         $("#aqi-display").html($("#aqi-input").val());
//     })
// })


//fp
var btn = document.getElementById("button");
var ipt = document.getElementById("aqi-input");
var spn = document.getElementById("aqi-display");
var display = function() {
    spn.innerHTML = ipt.value;
};
// addEvent(btn,"click", display);
var bcd = R.curry(addEvent);
bcd(btn)("click")(display);
