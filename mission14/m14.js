var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

/*
在注释下方编写代码
遍历读取aqiData中各个城市的数据
将空气质量指数大于60的城市显示到aqi-list的列表中
*/

//js
var gtData = [], j = 0, list = "";
for(var i in aqiData) {
    if(aqiData[i][1] >= 20) {
        gtData[j] = aqiData[i];
        j ++;
    }
}
var compare = function(x, y) {
    return y[1] - x[1];
}
gtData.sort(compare);
var len = gtData.length;
for(var i = 0; i < len; i ++) {
    var k = i + 1;
    list += "<li> 第" + k.toString() + "名：" + gtData[i][0] + "," + gtData[i][1] + "</li>";
}
document.getElementById("aqi-list").innerHTML = list;


//ramda
var comparech =  function(x, y) {
    return x[0].localeCompare(y[0], "zh");
}
var filtData = R.filter(R.compose(R.lte(20), R.last)); //filter index greater than 20
var nameindexSort = R.sortWith([R.descend(R.prop(1)), comparech]);//sort according to the indx and the name
var finalData = R.compose(nameindexSort, filtData);
console.log(finalData(aqiData));
