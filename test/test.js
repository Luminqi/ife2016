var singleton = function( fn ){
    var result;
    return function(){
        console.log(this, arguments);
        console.log(result);
        return result || (result = fn .apply(this, arguments));
    }
};

var createMask = singleton( function(){
    return document.body.appendChild( document.createElement('div') );
});

createMask();

createMask();


var eventTarget = function() {
    var handlers = {};
    return {  //
        addHandler: function(type, handler) {
            if(typeof handlers[type] === "undefined") {
                handlers[type] = [];
            }
            handlers[type].push(handler);
        },
        fire: function(type) {
            if(handlers.hasOwnProperty(type)) {
                var arr = handlers[type];
                for (var i = 0, len = arr.length; i < len; i ++) {
                    arr[i](); //
                }
            }
        },
        removeHandler: function(type, handler) {
            if(handlers[type] instanceof Array) {
                var arr = handlers[type];
                for(var i = 0, len = arr.length; i < len; i ++ ) {
                    if(arr[i] === handler) {
                        break;
                    }
                }
                handlers[type].splice(i, 1);
            }
        }
    }
}

let a = eventTarget(),
    b = eventTarget();
console.log(a === b);
console.log(a.fire == b.fire);


//singleton
var eventTarget1 = (function() {
    var handlers = {};
    var instance;
    function init() {
        return {
            addHandler: function(type, handler) {
                if(typeof handlers[type] === "undefined") {
                    handlers[type] = [];
                }
                handlers[type].push(handler);
            },
            fire: function(type) {
                if(handlers.hasOwnProperty(type)) {
                    var arr = handlers[type];
                    for (var i = 0, len = arr.length; i < len; i ++) {
                        arr[i](); //
                    }
                }
            },
            removeHandler: function(type, handler) {
                if(handlers[type] instanceof Array) {
                    var arr = handlers[type];
                    for(var i = 0, len = arr.length; i < len; i ++ ) {
                        if(arr[i] === handler) {
                            break;
                        }
                    }
                    handlers[type].splice(i, 1);
                }
            }
        }
    }
    return {
        getInstance: function() {
            if(!instance) {
                instance = init();
            }
            return instance;
        }
    }
})();

let c = eventTarget1.getInstance();
let d = eventTarget1.getInstance();
console.log(c == d);
console.log(c.fire === d.fire);

let e = eventTarget1,
    f = eventTarget1;
console.log(e === f);
