let queueData = [];
let inp = document.getElementsByTagName("input")[0];
let oup = document.getElementById("queue");
let btns = document.getElementById("button");
let status = false;
let isNumvalid = () => {
    let regexp = /^\d*$/;
    if (!regexp.test(inp.value.trim())) {
        status = true;
        if (document.getElementsByTagName("span").length === 0) {
            let hint = document.createTextNode("请输入正确的数字");
            let span = document.createElement("span");
            span.appendChild(hint);
            insertAfter(span, inp);
        }

    } else {
        status = false;
        if (document.getElementsByTagName("span").length !== 0){
            let span = document.getElementsByTagName("span")[0];
            inp.parentNode.removeChild(span);
        }

    }
};
let renderQue = () => {
    let len = queueData.length;
    let divs = "";
    for (let i = 0; i < len; i ++) {
        divs += `<div>${queueData[i]}</div>`
    }
    oup.innerHTML = divs;
};
let btnFuc = (e = window.event) => {
    if (status) return;
    let inpvl = inp.value;
    target = e.target || e.srcElement;
    switch (target.innerHTML) {
        case "左侧入":
            queueData.unshift(inpvl);
            renderQue();
            break;
        case "右侧入":
            queueData.push(inpvl);
            renderQue();
            break;
        case "左侧出":
            if(queueData.length !== 0) {
                let firnum = queueData.shift();
                renderQue();
                alert(firnum);
            }
            break;
        case "右侧出":
            if(queueData.length !== 0) {
                let lastnum = queueData.pop();
                renderQue();
                alert(lastnum);
            }
            break;
        default:
            break;
    }
};
let initInput = () => {
    addEvent(inp, "blur", isNumvalid);
};
let initOutput = () => {
    addEvent(btns, "click", btnFuc);
};

let init = () => {
    initInput();
    initOutput();
};

init();
