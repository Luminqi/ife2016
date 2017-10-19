/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  let y = dat.getFullYear();
  let m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  let returnData = {};
  let dat = new Date("2016-01-01");
  let datStr = ''
  for (let i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

let aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
let chartData = {};

// 记录当前页面的表单选项
let pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

let timesel = document.getElementById("form-gra-time");
let citysel = document.getElementById("city-select");
let wrap = document.getElementById("aqi-chart-wrap");
let colors = [];
/**
 * 渲染图表
 */
function colorsel(value) {
    switch (true) {
        case value < 50:
            return "#00FFFF";
        case value < 100:
            return "#00FF99";
        case value < 150:
            return "#00FF00";
        case value < 200:
            return "#77FF00";
        case value < 250:
            return "#BBFF00";
        case value < 300:
            return "#FFFF00";
        case value < 350:
            return "#FFBB00";
        case value < 400:
            return "#FF8800";
        case value < 450:
            return "#FF5511";
        case value <= 500:
            return "#FF0000";
    }
}
function renderChart() {
    let divs = "";
    let times = Object.keys(charData);
    for (let i = 0; i < times.length; i++) {
        let height = charData[times[i]];
        let color = colorsel(height);
        divs += `<div style = "height: ${height}px;background: ${color}" title = "time:${times[i]} aqi:${charData[times[i]]}"></div>`
    }
    let classreg = /day|week|month/;
    if (classreg.test(wrap.className)) {
        wrap.className = "";
    }
    addClass(wrap, pageState.nowGraTime);
    wrap.innerHTML = divs;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化

  // 设置对应数据

  // 调用图表渲染函数
  let checkboxes = timesel.getElementsByTagName("input");
  let len = checkboxes.length;
  let timescale;
  for( let i = 0; i < len; i ++) {
      if(checkboxes[i].checked === true) {
          timescale = checkboxes[i].value;
          break;
      }
  }
  if(pageState.nowGraTime !== timescale) {
      pageState.nowGraTime = timescale;
      initAqiChartData();
      renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化

  // 设置对应数据

  // 调用图表渲染函数
  let selop = citysel.options[citysel.selectedIndex];
  let selcity = selop.text;
  if(pageState.nowSelectCity !== selcity) {
      pageState.nowSelectCity = selcity;
      initAqiChartData();
      renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    addEvent(timesel, "click", graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
    let cities = Object.keys(aqiSourceData);
    let len = cities.length;
    let options = "";
    for (let i = 0; i < len; i ++) {
        options += "<option>" + cities[i] + "</option>";
    }
    citysel.innerHTML = options;
    addEvent(citysel, "click", citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {

  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  let selop = citysel.options[citysel.selectedIndex];
  let selcity = selop.text;
  charData = aqiSourceData[selcity];
  pageState.nowSelectCity = selcity;
  let checkboxes = timesel.getElementsByTagName("input");
  let len = checkboxes.length;
  let timescale;
  for( let i = 0; i < len; i ++) {
      if(checkboxes[i].checked === true) {
          timescale = checkboxes[i].value;
          break;
      }
  }
  if(timescale === "week") {
      let datearry = Object.keys(charData);
      let len = datearry.length;
      let firstday = new Date(datearry[0]);
      let dayofweek = firstday.getDay();
      let weekdata = {}, count = 1, index = 0;
      weekdata["week" + count] = 0;
      if(dayofweek === 0) {
          weekdata["week" + count] = charData[datearry[0]];
          len = len - 1;
          count ++;
          index = 1;
      } else {
          let days = 8 - dayofweek;
          for (let i = 0; i < days; i ++) {
              weekdata["week" + count] += charData[datearry[i]];
              console.log(charData[datearry[i]]);
          }
          weekdata["week" + count] = Math.round(weekdata["week" + count]/days);
          len = len - days;
          count ++;
          index = days;
      }
      while(len > 0) {
          weekdata["week" + count] = 0;
          if (len >= 7) {
              for (let i = 0; i < 7; i ++) {
                  weekdata["week" + count] += charData[datearry[index++]];
              }
              weekdata["week" + count] = Math.round(weekdata["week" + count]/7);
              len = len - 7;
              count ++;
          } else {
              for (let i = 0; i < len; i ++) {
                  weekdata["week" + count] += charData[datearry[index++]];
              }
              weekdata["week" + count] = Math.round(weekdata["week" + count]/len);
              len = 0;
          }

      }
      charData = weekdata;
      pageState.nowGraTime = "week";
  }
  if(timescale === "month") {
      let regmonth = /^\d{4}-(\d{2})-\d{2}$/;
      let datearry = Object.keys(charData);
      let len = datearry.length;
      let monthdate = {}, index = {};
      for(let i = 0; i < len; i ++) {
          let month = regmonth.exec(datearry[i])[1];
          if (monthdate.hasOwnProperty(month)){
              monthdate[month] += charData[datearry[i]];
              index[month]++;
          }
          else {
              monthdate[month] = charData[datearry[i]];
              index[month] = 1;
          }
      }
      let months = Object.keys(monthdate);
      for(let i = 0; i < months.length; i ++) {
          monthdate[months[i]] = Math.round(monthdate[months[i]] / index[months[i]]);
      }
      charData = monthdate;
      pageState.nowGraTime = "month";
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
