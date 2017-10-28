let ipt = document.querySelector("#ipt");
let txtarea = document.querySelector("#text");
let btn = document.querySelector("button");
let tag = document.querySelector("#tag");
let hobby = document.querySelector("#hobby");
let tagData = [];
let hobbyData = [];
let renderTag = () => {
    let divs = "";
    let len = tagData.length;
    for (let i = 0; i < len; i ++) {
        divs += `<div>${tagData[i]}</div>`
    }
    tag.innerHTML = divs;
}
let isTagValid = () => {
    let regexp = /^([a-zA-Z0-9]*)([\s\uff0c\u002c]?)$/;
    let match = regexp.exec(ipt.value);
    if (!match) {
        alert("请输入正确的Tag");
    } else if (match[2] && match[1].length !== 0) {
        tagData.push(match[1]);
        tagData = [...new Set(tagData)];
        if (tagData.length > 10) {
            tagData = tagData.slice(1,tagData.length);
        }
        renderTag();
    }
};
let hover = () => {
    let e = eventUtil.getEvent(event);
    let target = eventUtil.getTarget(e);
    switch(e.type) {
        case "mouseover":
            if(target.id !== "tag" && target.className !== "del") {
                target.innerHTML = "点击删除" + target.innerHTML;
                target.style.background = "red";
                addClass(target, "del");
            }
            break;
        case "mouseout":
            if(target.id !== "tag" && target.className == "del") {
                target.innerHTML = target.innerHTML.slice(4);
                target.style.background = "blue";
                removeClass(target, "del");
            }
            break;
    }
}
let initInput = () => {
    eventUtil.addHandler(ipt, "keyup", isTagValid);
    eventUtil.addHandler(tag, "mouseover", hover);
    eventUtil.addHandler(tag, "mouseout", hover);
};

initInput();
