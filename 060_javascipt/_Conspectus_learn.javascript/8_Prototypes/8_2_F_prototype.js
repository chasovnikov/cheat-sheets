// У функций есть свойство "prototype" (объект с конструтором)
// Rabbit.prototype = { constructor: Rabbit };
function Rabbit(name) {
    this.name = name;
}
alert(Rabbit.prototype.constructor == Rabbit); // true

// Объекты, созданные ф-ией-конструтором, наследуют prototype ф-ии
let rabbit = new Rabbit();
alert(rabbit.constructor == Rabbit); // true

// Можем использовать свойство constructor для создания нового объекта
let rabbit2 = new rabbit.constructor('Black Rabbit');

// Если перезаписать prototype, то constructor может быть утерян
// Значение prototype должно быть ОБЪЕКТ или NULL
function Rabbit() {}
Rabbit.prototype = {
    jumps: true,
};

let rabbit = new Rabbit();
alert(rabbit.constructor === Rabbit); // false

// ----------------------- // По задачам
// Присвоение нового значения prototype не влияет на прототип уже СУЩЕСТВУЮЩИХ объектов
