let queueData = [15, 11, 65, 44, 26, 10, 11, 20, 30, 24, 55];
let inp = document.getElementsByTagName("input")[0];
let oup = document.getElementById("queue");
let btns = document.getElementById("button");
let status = false;
let bubbleSort = () => {
    let arrs = [];
    let len = queueData.length;
    let index = 0;
    for (let i = 0; i < len; i ++) {
        for(let j = 0; j < len - i -1; j ++) {
            if(queueData[j] > queueData[j + 1]) {
                let temp = queueData[j + 1];
                queueData[j + 1] = queueData[j];
                queueData[j] = temp;
                arrs[index] = queueData.concat();
                index++;
            }
        }
    }
    return arrs;
};
// let quickSort1 = (arr) => {
//     if (arr.length <= 1) {return arr;}
//     let pivotIndex = Math.floor(arr.length / 2);
//     let pivot = arr.splice(pivotIndex, 1)[0];
//     let left = [];
//     let right = [];
//     for (var i = 0; i < arr.length; i ++) {
//         if (arr[i] < pivot) {
//             left.push(arr[i]);
//         } else {
//             right.push(arr[i]);
//         }
//     }
//     arrs[index] = left.concat([pivot], right);
//     index ++;
//     return quickSort(left).concat([pivot], quickSort(right));
// };
let sortbyQuick = () => {
    queueData = quickSort(queueData);
};
let isNumvalid = () => {
    let regexp = /^100$|^[1-9][0-9]$/;
    if (!regexp.test(inp.value.trim())) {
        status = true;
        if (document.getElementsByTagName("span").length === 0) {
            let hint = document.createTextNode("请输入正确的数字(10-100)");
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
        divs += `<div style = "height: ${queueData[i]*2}px">${queueData[i]}</div>`
    }
    oup.innerHTML = divs;
};
let renderQue2 = (arr) => {
    let id = setTimeout(function(){
        let current = arr.shift();
        let len = current.length;
        let divs = "";
        for (let i = 0; i < len; i ++) {
            divs += `<div style = "height: ${current[i]*2}px">${current[i]}</div>`
        }
        oup.innerHTML = divs;
        if (arr.length > 0) {
            setTimeout(arguments.callee, 100);
        }
    },100)
    if(arr.length === 0) {
        clearTimeout(id);
    }
};
let renderQue3 = (arr) => {
    let id = setTimeout(function(){
        let current = arr.shift();
        let len = current.length;
        let divs = "";
        for (let i = 0; i < len; i ++) {
            divs += `<div style = "height: ${current[i]*2}px">${current[i]}</div>`
        }
        oup.innerHTML = divs;
        if (arr.length > 0) {
            renderQue3(arr);
        } else {
            clearTimeout(id);
        }
    },100)
};
let btnFuc = (e = window.event) => {
    if (status) return;
    let inpvl = inp.value;
    target = e.target || e.srcElement;
    switch (target.innerHTML) {
        case "左侧入":
            if(queueData.length <= 60) {
                queueData.unshift(inpvl);
                renderQue();
            } else {
                alert("元素个数不能超过60");
            }
            break;
        case "右侧入":
            if(queueData.length <= 60) {
                queueData.push(inpvl);
                renderQue();
            } else {
                alert("元素个数不能超过60");
            }
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
        case "冒泡排序":
            let arrs = bubbleSort();
            renderQue3(arrs);
            break;
        case "快速排序":
            sortbyQuick();
            renderQue();
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
