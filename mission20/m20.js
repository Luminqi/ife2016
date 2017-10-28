let textarea = document.getElementById("text");
let ipt = document.getElementById("key");
let btn = document.getElementsByTagName("button")[0];
let hobby = document.getElementById("hobby");
let textData = [];

let initTextarea = () => {
    addEvent(textarea, "blur", function(){
        let regexp = /^(?:\w*[\u000a\u002c\uff0c\u0020\u3000\u3001\u003b]*)+$/;
        if (!regexp.test(textarea.value)) {
            alert("文本格式有误");
        } else {
            textData = [...new Set(textarea.value.trim().split(/\s/))];
        }
    });
};

let initButton = () => {
    addEvent(btn, "click", function(){
        let regexp = /^\w*$/;
        if (regexp.test(ipt.value.trim())) {
            render();
        } else {
            alert("请输入正确的关键字");
        }
    })
};
let render = () => {
    let divs = "";
    let len = textData.length;
    let regexp = new RegExp(ipt.value.trim(), "g");
    for (let i = 0; i < len; i ++) {
        if(regexp.test(textData[i])) {
            divs += `<div>${textData[i]}</div>`
        }
    }
    hobby.innerHTML = divs;
};

let init = () => {
    initTextarea();
    initButton();
};
init();
