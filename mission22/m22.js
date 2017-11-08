let root = document.getElementById("root");
let btnpre = document.getElementById("preOrder");
let btnin = document.getElementById("inOrder");
let btnpost = document.getElementById("postOrder");
let divs = [];

let preOrder = (node = root) => {
    if(node !== null) {
        divs.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
};
let inOrder = (node = root) => {
    if(node !== null) {
        inOrder(node.firstElementChild);
        divs.push(node);
        inOrder(node.lastElementChild);
    }
};
let postOrder = (node = root) => {
    if(node !== null) {
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        divs.push(node);
    }
};
let render = () => {
    setTimeout(function() {
        if(document.getElementsByClassName("cur").length !== 0) {
            document.getElementsByClassName("cur")[0].className = "";
        }
        let current = divs.shift();
        current.className = "cur";
        if(divs.length > 0) {
            render();
        }
    },500)
};
let init = (f) => {
    return function() {
        divs = [];
        f();
        render();
    };
};
let initBtns = () => {
    addEvent(btnpre, "click", init(preOrder));
    addEvent(btnin, "click", init(inOrder));
    addEvent(btnpost, "click", init(postOrder));
};

initBtns();
