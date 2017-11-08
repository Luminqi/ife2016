let  list = document.getElementById("list");
let ipt = document.getElementById("ipt");
let btndel = document.getElementById("del");
let btnadd = document.getElementById("add");
let btnser = document.getElementById("search");
let  foldList = (e) => {
    event = e || window.event;
    target = event.target || event.srcElement;
    let chosen = $(".choose")[0];
    if(chosen) {
        removeClass(chosen, "choose");
    }
    addClass(target, "choose");
    if (hasClass(target, "hide")) {
        removeClass(target, "hide");
        //如果设置为show，并在css中设置样式，会导致由于祖先元素class为show（.show ul），.hide ul的特殊性不够，无法隐藏内部嵌套的li。
    } else {
        addClass(target, "hide");
    }
};
let deleteDom = () => {
    let chosen = $(".choose")[0];
    if (chosen) {
        chosen.outerHTML = "";
    }
};
let addDom = () => {
    let chosen = $(".choose")[0];
    if (ipt.value && chosen) {
        let textNode = document.createTextNode(ipt.value);
        let li = document.createElement("li");
        li.appendChild(textNode);
        let ul = chosen.getElementsByTagName("ul")[0];
        if (ul) {
            ul.appendChild(li);
        } else {
            let newul = document.createElement("ul");
            newul.appendChild(li);
            chosen.appendChild(newul);
        }
    }
};
let search = () => {
    if(ipt.value) {
        let lis = document.getElementsByTagName("li");
        for (let li of lis) {
            if(li.firstChild.nodeValue.trim() === ipt.value.trim()) {
                let chosen = $(".choose")[0];
                if(chosen) {
                    removeClass(chosen, "choose");
                }
                addClass(li, "choose");
                $(li).parents().filter("hide").removeClass("hide");
                break;
            }
        }
    }
};
let init = () => {
    addEvent(list, "click", foldList);
    addEvent(btndel, "click", deleteDom);
    addEvent(btnadd, "click", addDom);
    addEvent(btnser, "click", search);
};

init();
