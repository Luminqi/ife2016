

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
let aqiData = {};
let aqi_city = document.getElementById("aqi-city-input"),
    aqi_value = document.getElementById("aqi-value-input"),
    aqi_table = document.getElementById("aqi-table"),
    add_btn =  document.getElementById("add-btn");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    let city = aqi_city.value.trim();
    let index = aqi_value.value.trim();
    aqiData[city] = parseInt(index);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    let keys = Object.keys(aqiData);
    let len = keys.length;
    let aqi_list = `
        <tr>
          <td>城市</td><td>空气质量</td><td>操作</td>
        </tr>
        `;
    for (let i = 0; i < len; i ++) {
        aqi_list += `
        <tr>
            <td>${keys[i]}</td><td>${aqiData[keys[i]]}</td><td><button>删除</button></td>
        </tr>
        `;
    }
    aqi_table.innerHTML = aqi_list;
    console.log(aqi_list);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    let regcity = /^[\u4E00-\u9FA5a-zA-z]+$/;
    let regvalue = /^\d+$/;
    if(!regcity.test(aqi_city.value.trim()) || aqi_city.value.trim() === "") {
        alert("1")
    } else if (!regvalue.test(aqi_value.value.trim()) || aqi_value.value.trim() === "") {
        alert("2")
    } else {
        addAqiData()
        renderAqiList();
    }
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    let event = e || window.event;
    let target = event.target || event.srcElement;
    if(target.nodeName.toUpperCase() === "BUTTON") {
        let city = target.parentNode.previousSibling.previousSibling.childNodes[0].nodeValue;
        delete aqiData[city];
    }
    renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  addEvent(add_btn, "click", addBtnHandle);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  addEvent(aqi_table, "click", delBtnHandle);

}

init();
