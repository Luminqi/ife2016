/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
var source = document.getElementById("source");
var btn = document.getElementById("sort-btn");
var data = [];
function getData() {
    var lis = source.getElementsByTagName("li");
    var len = lis.length
    for (var i = 0; i < len; i ++) {
        data[i] = [lis[i].childNodes[0].nodeValue.trim().slice(0,2), parseInt(lis[i].childNodes[1].childNodes[0].nodeValue)];
    }
    return data;
}
/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
    data.sort(function(x, y) {
        if(x[1] === y[1]) {
            return x[0].localeCompare(y[0], "zh");
        } else{
            return y[1] - x[1];
        }
    })
    return data;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
    var list = "";
    var len = data.length;
    for(var i = 0; i < len; i ++) {
        var k = i + 1;
        list += "<li> 第" + k.toString() + "名：" + data[i][0] + "," + data[i][1] + "</li>";
    }
    document.getElementById("resort").innerHTML = list;
}

function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}


function init() {
  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
  addEvent(btn, "click", btnHandle);
}

init();

//jquery
function getData1() {
    var $lis = $("li", "#source");
    var txt = $lis.text();
    var reg = /([\u4E00-\u9FA5]+)空气质量\：\s*(\d+)/g;
    var i = 0;
    while(reg.lastIndex < txt.length -1) {
        var match = reg.exec(txt);
        console.log(match, reg.lastIndex);
        data[i++] = [match[1], parseInt(match[2])];
    }
    return data;
}
