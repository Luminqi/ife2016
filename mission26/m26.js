let realshipList = [];

function Spaceship(id) {
    this.id = id;
    this.energy = 100;
    this.status = false;  // default status is stop

};
Spaceship.prototype.dynamicalSys = function(command) {
    if (command === "stop") {
        this.status = false;
        console.log(this);
    }
    if (command === "fly") {
        this.status = true;
        let f = () => {
            this.energy -= 10;
            console.log(this);
            if (this.status && this.energy > 0) {
                setTimeout(f, 1000);
            } else {
                this.status = false;
                console.log(this);
            }
        };
        setTimeout(f, 1000);
        // setTimeout(() => {
        //     this.energy -= 10;
        //     console.log(this);
        //     console.log(this.energy);
        //     console.log(this.status);
        //     if (this.status && this.energy > 0) {
        //         setTimeout(this.dynamicalSys("fly"), 1000);
        //     } else {
        //         this.status = false;
        //         console.log(this.status);
        //     }
        // }, 1000)
    }
};

Spaceship.prototype.energySys = function() {
    let f = () => {
        if (this.energy < 100) {
            this.energy += 5;
            setTimeout(f, 1000)
        }
    };
    setTimeout(f, 1000);
}

Spaceship.prototype.destroyShip = function() {
    console.log("destroy ship" + this.id);
    realshipList.splice(this.id - 1, 1);
    let that = this; //this = null 出错，this是常量
    that = null;
}

Spaceship.prototype.receiver = function(order) {
    console.log("receive order success");
    if (order.id === this.id) {
        if (order.command !== "destroy") {
            this.dynamicalSys(order.command);
            this.energySys();
        } else {
            this.destroyShip();
        }
    }
}


//
// let s1 = new Spaceship();
// s1.dynamicalSys("fly");
// setTimeout(s1.dynamicalSys.bind(s1), 5000, "stop");
// setTimeout(s1.dynamicalSys.bind(s1), 10000, "fly");



function Commander() {
    this.orderList = [];
    this.shipList = [];
};
Commander.prototype.getvalidId = function() {
    let idList = [],
        validId = 1;
    for (let ship of this.shipList) {
        idList.push(ship.id);
    }
    while (idList.includes(validId)) {
        validId ++;
    }
    return validId;
}
Commander.prototype.create = function(order) {
    this.shipList.splice(order.id - 1, 0, new Spaceship(order.id));
    // realshipList.splice(order.id - 1, 0, new Spaceship(order.id));
}
Commander.prototype.destroy = function(order) {
    this.shipList.splice(order.id - 1, 1);
}
Commander.prototype.fly = function(order) {
    this.shipList[order.id - 1].status = true;
}
Commander.prototype.stop = function(order) {
    this.shipList[order.id - 1].status = false;
}
// commander.emitter(1, "fly");
Commander.prototype.emitter = function(id, command) {
    let order = {
        id,
        command
    };//ES6
    this.orderList.push(order);
    this[command].call(this, order);
    if (command !== "create") {
        for (let ship of realshipList) {  //emitter the order to the realship
            // ship.receiver(order)
            mediator(ship).receiver(order);
        }
    }
}

// let c1 = new Commander();
// c1.emitter(1, "create");
// console.log(c1.shipList);
// c1.emitter(2, "create");
// console.log(c1.shipList);
// c1.emitter(1, "fly");
// console.log(c1.shipList);
// // setTimeout(console.log, 25000, c1.shipList);
// setTimeout(c1.emitter.bind(c1), 10000, 2, "fly");
// setTimeout(c1.emitter.bind(c1), 15000, 1, "stop");

//ES6 proxy
let mediator = function (ship) {
    let num = Math.floor(Math.random() * 10 + 1);
    return new Proxy(ship, {
        get(target, property) {
            if (property === "receiver") {
                console.log(num);
                if (num > 3){
                    return function(order) {
                        setTimeout(target.receiver.bind(target), 1000, order);
                    };
                } else {
                    return function() {
                        console.log("fail to receive signal");
                    };
                }
            }
        }
    });
};

//
// let ship1 = new Spaceship(3);
// mediator(ship1).receiver({id: 3, command: "fly"});


let $universe = $("#universe");
let $commander = $("#wrap");
let $create = $("#create");
let extend = function(obj, extension) {
    for ( let key in extension) {
        obj[key] = extension[key];
    }
};

// Object.setPrototypeOf($commander, new Commander());
extend($commander, new Commander());

$commander.click(function(event) {
    switch (event.target.id) {
        case "create":
            if ($commander.shipList.length < 4) {
                var id = $commander.getvalidId().toString();// var allows declare id repeatly.
                $universe.append($(`<div class = ship id = ${id}>${id}<br>100<br>%</div>`));
                $commander.append($(`<div id = c${id}>对${id}号飞船发号指令</div>`));
                $(`#c${id}`).append($("<button id = 'fly'>开始飞行</button>")).append($("<button id = 'stop'>停止飞行</button>"))
                            .append($("<button id = 'destroy'>销毁</button>"));
                $commander.emitter(parseInt(id), event.target.id);

                let realship = $(`#${id}`);
                extend(realship, $commander.shipList[id-1]);

                realship.destroyShip = function() {
                    console.log("destroy ship" + this.id);
                    realshipList.splice(this.id - 1, 1);
                    this.remove();
                };
                let originSys = realship.dynamicalSys;
                realship.dynamicalSys = function(command) {
                    let monitorStatus = new Proxy(this, {
                        set(target, prop, value) {
                            console.log(prop);
                            console.log(target.status);
                            console.log(value);
                            if (prop === "status" && target.status !== value) {
                                if (value) {
                                    target.removeClass("stop");
                                    target.addClass("fly");
                                } else {
                                    target.addClass("stop");
                                }
                            }
                            Reflect.set(target, prop, value);
                            if (prop === "energy") {
                                target.html(`${target.id}<br>${target.energy}<br>%`);
                            }
                        }
                    });
                    originSys.apply(monitorStatus, arguments);
                    // if (this.status) {
                    //     this.removeClass("stop");
                    //     this.addClass("fly");
                    // } else {
                    //     // let position = this.position();
                    //     // console.log(position.left, position.top);
                    //     // this.css({"left": position.left, "top": position.top});
                    //     this.addClass("stop");
                    // }
                }
                realshipList.push(realship);
            } else {
                console.log("can't create ship, maximum number of ships is 4");
            }
            break;
        case "fly":
            var id = event.target.parentNode.id.substring(1);
            $commander.emitter(parseInt(id), event.target.id);
            break;
        case "stop":
            var id = event.target.parentNode.id.substring(1);
            $commander.emitter(parseInt(id), event.target.id);
            break;
        case "destroy":
            var id = event.target.parentNode.id.substring(1);
            $(`#c${id}`).remove();
            $commander.emitter(parseInt(id), event.target.id);
            break;
    }
});
