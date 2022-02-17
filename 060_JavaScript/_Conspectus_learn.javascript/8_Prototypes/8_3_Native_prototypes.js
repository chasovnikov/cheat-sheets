// Встроенные прототипы

// Методы хранятся в прототипах (Array.prototype, Object.prototype, Date.prototype и т.д.)
// Сами объекты хранят только данные (элементы массивов, свойства объектов, даты)
// Примитивы также хранят свои методы в прототипах объектов-обёрток

let obj = {};
alert(obj); // "[object Object]". Это покажет встроенный метод toString прототипа Object

alert(obj.__proto__ === Object.prototype); // true
// obj.toString === obj.__proto__.toString == Object.prototype.toString

// Значения null и undefined не имеют объектов-обёрток\

// ---------------------- // Массивы
let arr = [1, 2, 3];

// наследует ли от Array.prototype?
alert(arr.__proto__ === Array.prototype); // true

// затем наследует ли от Object.prototype?
alert(arr.__proto__.__proto__ === Object.prototype); // true

// и null на вершине иерархии
alert(arr.__proto__.__proto__.__proto__); // null

// ---------------------- // Функции
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true, наследует от Object

// ---------------------- // Изменение встроенных прототипов
// Встроенные прототипы можно изменять
// Если добавить метод к String.prototype, метод становится доступен ДЛЯ ВСЕХ СТРОК:
String.prototype.show = function () {
    alert(this);
};
'BOOM!'.show(); // BOOM!

// В современном программировании есть только один случай,
//      в котором одобряется изменение встроенных прототипов. Это создание полифилов.

// ---------------------- // Заимствование у прототипов
let obj = {
    0: 'Hello',
    1: 'world!',
    length: 2,
};

obj.join = Array.prototype.join;

alert(obj.join(',')); // Hello,world!
