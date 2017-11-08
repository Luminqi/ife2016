let root = document.getElementById("root");
let btnpre = document.getElementById("preOrder");
let btnin = document.getElementById("inOrder");
let btnpost = document.getElementById("postOrder");
let ipt = document.getElementById("ipt");
let btndel = document.getElementById("del");
let btnadd = document.getElementById("add");
let divs = [];
let preOrder = (node = root) => {
    if (node !== null) {
        let childs = node.children;
        let len = childs.length;
        divs.push(node);
        for (let i = 0; i < len; i++){
            preOrder(childs[i]);
        }
    }
};
let inOrder = (node = root) => {
    if(node !== null) {
        let childs = node.children;
        let len = childs.length;
        if(len > 0) {
            inOrder(childs[0]);
        }
        divs.push(node);
        for (let i = 1; i < len; i++){
            inOrder(childs[i]);
        }
    }
};
let postOrder = (node = root) => {
    if(node !== null) {
        let childs = node.children;
        let len = childs.length;
        for (let i = 0; i < len; i++){
            postOrder(childs[i]);
        }
        divs.push(node);
    }
};
let render = () => {
    if(document.getElementsByClassName("search").length !== 0) {
        document.getElementsByClassName("search")[0].className = "";
    }
    setTimeout(function() {
        if(document.getElementsByClassName("cur").length !== 0) {
            document.getElementsByClassName("cur")[0].className = "";
        }
        let current = divs.shift();
        if (ipt.value && current.firstChild.nodeValue.trim() === ipt.value.trim()) {
            current.className = "search";
        } else {
            current.className = "cur";
        }
        if(divs.length === 0 && document.getElementsByClassName("search").length === 0) {
            alert("Can't find " + ipt.value);
        }
        if(divs.length > 0 && current.className !== "search") {
            setTimeout(arguments.callee, 500);
        }
    },500);
};
let init = (f) => {
    return function() {
        divs = [];
        f();
        render();
    };
};
let choose = (e) => {
    let event = e || window.event;
    let target = event.target || event.srcElement;
    if (document.getElementsByClassName("choose").length !== 0) {
        document.getElementsByClassName("choose")[0].className = "";
    }
    target.className = "choose";
};
let deleteDom = () => {
    if (document.getElementsByClassName("choose").length === 1) {
        document.getElementsByClassName("choose")[0].outerHTML = "";
    }
};
let addDom = () => {
    if (ipt.value && document.getElementsByClassName("choose").length === 1) {
        let textNode = document.createTextNode(ipt.value);
        let div = document.createElement("div");
        div.appendChild(textNode);
        document.getElementsByClassName("choose")[0].appendChild(div);
    }
};
let initBtns = () => {
    addEvent(btnpre, "click", init(preOrder));
    addEvent(btnin, "click", init(inOrder));
    addEvent(btnpost, "click", init(postOrder));
    addEvent(root, "click", choose);
    addEvent(btndel, "click", deleteDom);
    addEvent(btnadd, "click", addDom);
};

initBtns();
