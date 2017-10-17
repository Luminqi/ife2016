// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}
// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === "[object Function]";
}
//判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
function isPlain(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

//insertAfter
function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
      }
    else{
        parent.insertBefore(newElement,targetElement.nextSibling);
      }
   }

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject (source) {
    var result = source, i, j;//var result = source; var i; var j;声明了i和j,但是没有赋值
    if (!source //如果source是空字符串，0，null， NaN， undefined，则返回true；如果source是对象，非空字符串,非零数值（包括Infinity）
        || source instanceof Number
        || source instanceof String
        || source instanceof Boolean) {
        return result;
    } else if (isArray(source)) {
        result = [];
        for (i in source) { // i 返回数组下标的字符串：“0”， “1”等等
            result[i] = arguments.callee(source[i]); //是否可以换成arguments.callee
        }
    } else if (isPlain(source)) {
        result = {};
        for (j in source) { //j 返回对象属性名的字符串
            if (source.hasOwnProperty(j)) { //判断属性是否在实例中存在
                result[j] = arguments.callee(source[j]);
            }
        }
    }
    return result;
}


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组(但是包括空的数组元素)
function uniqArray(arr) {
    var obj1 = {};
    var obj2 = {};
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var key = arr[i];
        if (key !== "" && key != " "){ //去除空字符串和仅仅包含一个空格的字符串!!!!!!!!!!!
            if (!obj1[key] && typeof(key) === "string") { //判断key属性是否已经存在且key为字符串，因为 1 和 ‘1’标识相同的属性名。
                result.push(key);
                obj1[key] = true;
            }
            else if (!obj2[key] && typeof(key) === "number") {
                result.push(key);
                obj2[key] = true;
            }
        }
    }
    return result;
}


//实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var patten = /\s/;
    var str_len = str.length;
    for( var i = 0; i < str_len; i ++) {
        if(!patten.test(str.charAt(i))) {
            break;
        }
    }
    for(var j = str_len; j > 0; j --){
        if(!patten.test(str.charAt(j-1))) {
            break;
        }
    }
    if(i >= j) {
        return "";
    }
        return str.substring(i,j);
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    var i, j=arr.length;
    for(i = 0; i < j; i++) {
        fn(arr[i], i);
    }
}


// 获取一个对象里面第一层元素的数量，返回一个整数
var getObjectLength = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({
            toString: null
        }).propertyIsEnumerable('toString'),
        dontEnums = [  //不考虑自己修改属性的enumerable特性
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {    //   函数声明只能创建局部函数,这里用函数表达式可以创建全局函数；
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('getObjectLength called on non-object');
        }

        var result = [],
            prop, i;

        for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
            }
        }
        return result.length;
    };
})(); //?为什么去了最后的括号，会导致return 后面的函数被当成字符串返回呢。



// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var elementclasses = element.className.split(/\s+/);
    var j = 1;
    for(var i in elementclasses) {
        if(elementclasses[i] === newClassName) {
            j = 0;
            break;
        }
    }
    if(j) {
        elementclasses.push(newClassName);
        element.className = elementclasses.join(" ");
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var elementclasses = element.className.split(/\s+/);
    var pos = -1;//splice(-1,1)不删除任何项
    for (var i in elementclasses) {
        if(elementclasses[i] === oldClassName) {
            pos = i;
            break;
        }
    }
    elementclasses.splice(pos,1);//splice会改变原始数组，返回删除的项！
    element.className = elementclasses.join(" ");
}


// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var actualLeft = element.offsetLeft;
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current != null) { //这个判断不够好，见JS高级程序设计P509.P515表示这样也行。。。
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return {actualLeft:actualLeft, actualTop:actualTop}
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var pattern = /^([\w\.\+\-])+@([\w\-]+\.)+\w{2,10}$/;
    return pattern.test(emailStr);
}

 // 判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^1\d{10}$/;
    return pattern.test(phone);
}

// 实现一个简单的Query
// function $(selector) {
//     var regid = /^#[\w\.\-]+$/;
//     var regclass = /^\.[\w\.\-]+.$/;
//     var regname = /^[a-zA-z]+$/;
//     var regattr = /^([a-zA-z]+)?\[([\w\.\-]+)(?:=(['"])?(\w+)\3)?\]$/;
//     var selectors = [];
//     var element = document;
//     selectors = selector.split(/\s+/);
//     for(var i in selectors){
//         if(selectors[i]) {
//             if(regid.test(selectors[i])) {
//                 selectors[i] = selectors[i].slice(1);
//                 byId(selectors[i]);
//             }
//             else if(regclass.test(selectors[i])) {
//                 selectors[i] = selectors[i].slice(1);
//                 byClass(selectors[i]);
//             }
//             else if(regname.test(selectors[i])) {
//                 byName(selectors[i]);
//             }
//             else if(regattr.exec(selectors[i])) {
//                 match = regattr.exec(selectors[i]);
//                 byAttr(selector[i]);
//             }
//         }
//     }
//     if(element == document){
//         element = null;
//     }
//     return element;
//
//     function byId(id) {
//         if(i == 0){
//             element = document.getElementById(id);
//         }
//         else {
//             var elements = element.getElementsByTagName("*");
//             var count = elements.length;
//             for(var j = 0; j < count; j ++) {
//                if(elements[j].id ===  id && elements[j].nodeType == 1) {
//                    element = elements[j]
//                    break;
//                }
//             }
//         }
//     }
//     function byName(tagname) {
//         tagname == tagname.toLowerCase();
//         if(i == 0){
//             var elements =  document.getElementsByTagName(tagname);
//             element = elements[0];
//         }
//         else {
//             var elements = element.getElementsByTagName("*");
//             var count = elements.length;
//             for(var j = 0; j < count; j ++) {
//                if(elements[j].nodeName.toLowerCase() === tagname) {
//                    element = elements[j]
//                    break;
//                 }
//             }
//         }
//     }
//     function byClass(classname) {
//         var elements = element.getElementsByTagName("*");
//         var count = elements.length;
//         for(var j = 0; j < count; j ++) {
//            if(elements[j].className ===  classname && elements[j].nodeType == 1) {
//                element = elements[j]
//                break;
//            }
//         }
//     }
//     function byAttr(attr) {
//         if(match[1]) {
//             byName(match[1]);
//         }
//         if(match[4]) {
//             var elements = element.getElementsByTagName("*");
//             var count = elements.length;
//             for(var j = 0; j < count; j ++) {
//                if(elements[j].getAttribute(match[2]) === match[4] && elements[j].nodeType == 1) {
//                    element = elements[j]
//                    break;
//                }
//             }
//         }
//         else {
//             var elements = element.getElementsByTagName("*");
//             var count = elements.length;
//             for(var j = 0; j < count; j ++) {
//                 if(elements[j].nodeType == 1) {
//                     if(elements[j].getAttribute(match[2])) {
//                         element = elements[j]
//                         break;
//                     }
//                 }
//             }
//         }
//     }
// }

// // 可以通过id获取DOM对象，通过#标示，例如
// $("#adom"); // 返回id为adom的DOM对象
//
// // 可以通过tagName获取DOM对象，例如
// $("a"); // 返回第一个<a>对象
//
// // 可以通过样式名称获取DOM对象，例如
// $(".classa"); // 返回第一个样式定义包含classa的对象
//
// // 可以通过attribute匹配获取DOM对象，例如
// $("[data-log]"); // 返回第一个包含属性data-log的对象
//
// $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象
//
// // 可以通过简单的组合提高查询便利性，例如
// $("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, type, listener) {
    if(element.addEventListener) {
        element.addEventListener(type, listener, false);
    } else if(element.attachEvent) {
        element.attachEvent("on" + type, listener);
    } else {
        element["on" + type] = listener;
    }
}


// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, type, listener) {
    if(element.removeEventListener) {
        element.removeEventListener(type, listener, false);
    } else if(element.detachEvent) {
        element.detachEvent("on" + type, listener);
    } else {
        element["on" + type] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(e){
        event = e || window.event;
        if(event.keyCode === 13) {
            listener.call(element, event); // 在element上调用listener函数并传入参数event（事件对象）
        }
    });
}

//接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法

// $.on = function (selector, type, listener) {
//     return addEvent($(selector), type, listener);
// };
//
// $.un = function (selector, type, listener) {
//     return removeEvent($(selector), type, listener);
// };
//
// $.click = function (selector, listener) {
//     return addClickEvent($(selector), listener);
// };
//
// $.enter = function (selector, listener) {
//     return addEnterEvent($(selector), listener);
// };

//事件代理
// $.click("#list", clickListener);
// function delegateEvent(element, tag, eventName, listener) {
//     $.on(element, eventName, function (e) {
//         var event = e || window.event;
//         var target = event.target || event.srcElement;
//         if (target && target.tagName === tag.toUpperCase()) {  //tagName 属性返回元素的标签名。在 HTML 中，tagName 属性的返回值始终是大写的
//             listener.call(target, event);
//         }
//     });
// }
// delegateEvent("#list", "li", "click", clickListener);
// $.delegate = delegateEvent;

//ajax
function ajax(url, options) {
    var options = options || {};
    var data = stringifyData(options.data || {});
    var type = (options.type || 'GET').toUpperCase();
    var xhr;
    var eventHandlers = {
        onsuccess: options.onsuccess,
        onfail: options.onfail
    };

    try {
        if (type === 'GET' && data) {
            url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
            data = null;
        }

        xhr = getXHR();
        xhr.open(type, url, true);
        xhr.onreadystatechange = stateChangeHandler; //为什么放在open之后

        // 在open之后再进行http请求头设定
        if (type === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(data);
    }
    catch (ex) {
        fire('fail');
    }

    return xhr;//为什么要return xhr

    function stringifyData(data) {
        // 此方法只是简单示意性实现，并未考虑数组等情况。
        var param = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                param.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        return param.join('&');
    }

    function stateChangeHandler() {
        var stat;
        if (xhr.readyState === 4) {
            try {
                stat = xhr.status;
            }
            catch (ex) {
                // 在请求时，如果网络中断，Firefox会无法取得status
                fire('fail');
                return;
            }

            fire(stat);

            // http://www.never-online.net/blog/article.asp?id=261
            // case 12002: // Server timeout
            // case 12029: // dropped connections
            // case 12030: // dropped connections
            // case 12031: // dropped connections
            // case 12152: // closed by server
            // case 13030: // status and statusText are unavailable

            // IE error sometimes returns 1223 when it
            // should be 204, so treat it as success
            if ((stat >= 200 && stat < 300)
                || stat === 304
                || stat === 1223) {
                fire('success');
            }
            else {
                fire('fail');
            }

            /*
             * NOTE: Testing discovered that for some bizarre reason, on Mozilla, the
             * JavaScript <code>XmlHttpRequest.onreadystatechange</code> handler
             * function maybe still be called after it is deleted. The theory is that the
             * callback is cached somewhere. Setting it to null or an empty function does
             * seem to work properly, though.
             *
             * On IE, there are two problems: Setting onreadystatechange to null (as
             * opposed to an empty function) sometimes throws an exception. With
             * particular (rare) versions of jscript.dll, setting onreadystatechange from
             * within onreadystatechange causes a crash. Setting it from within a timeout
             * fixes this bug (see issue 1610).
             *
             * End result: *always* set onreadystatechange to an empty function (never to
             * null). Never set onreadystatechange from within onreadystatechange (always
             * in a setTimeout()).
             */
            window.setTimeout(
                function() {
                    xhr.onreadystatechange = new Function();
                    xhr = null;
                },
                0
            );
        }
    }

    function getXHR() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (e) {
                try {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
                catch (e) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }

    function fire(type) {
        type = 'on' + type;
        var handler = eventHandlers[type];

        if (!handler) {
            return;
        }
        if (type !== 'onsuccess') {
            handler(xhr);
        }
        else {
            //处理获取xhr.responseText导致出错的情况,比如请求图片地址.
            try {
                xhr.responseText;
            }
            catch(error) {
                return handler(xhr);
            }
            handler(xhr, xhr.responseText);
        }
    }
}

//检测浏览器支持是否支持相应的事件处理函数
function is( obj, type ) {
    return typeof obj === type;
}

var isEventSupported = (function() {

  var TAGNAMES = {
    'select': 'input', 'change': 'input',
    'submit': 'form', 'reset': 'form',
    'error': 'img', 'load': 'img', 'abort': 'img'
  };

  function isEventSupported( eventName, element ) {

    element = element || document.createElement(TAGNAMES[eventName] || 'div');
    eventName = 'on' + eventName;

    var isSupported = eventName in element;

    if ( !isSupported ) {
      if ( !element.setAttribute ) {
        element = document.createElement('div');
      }
      if ( element.setAttribute && element.removeAttribute ) {
        element.setAttribute(eventName, '');
        isSupported = is(element[eventName], 'function');

        if ( !is(element[eventName], 'undefined') ) {
          element[eventName] = undefined;
        }
        element.removeAttribute(eventName);
      }
    }

    element = null;
    return isSupported;
  }
  return isEventSupported;
})();
