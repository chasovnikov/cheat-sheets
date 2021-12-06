// Объекты могут быть созданы с помощью функции-конструктора new F().

// Свойство F.prototype (не путать с [[Prototype]]) устанавливает[[Prototype]]
//      для новых объектов при вызове new F()
// Значение F.prototype должно быть либо объектом, либо nul

let animal = {
    eats: true,
};

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit('White Rabbit'); //  rabbit.__proto__ == animal

alert(rabbit.eats); // true

// F.prototype используется только в момент вызова new F()

// У каждой функции по умолчанию уже есть свойство "prototype" (объект с конструтором)

function Rabbit() {}
// Rabbit.prototype = { constructor: Rabbit };

alert(Rabbit.prototype.constructor == Rabbit); // true

let rabbit = new Rabbit(); // наследует от {constructor: Rabbit}
alert(rabbit.constructor == Rabbit); // true

// Можем использовать свойство constructor для создания нового объекта
let rabbit2 = new rabbit.constructor('Black Rabbit');

// Если перезаписать prototype, то constructor может быть утерян
function Rabbit() {}
Rabbit.prototype = {
    jumps: true,
};

let rabbit = new Rabbit();
alert(rabbit.constructor === Rabbit); // false
