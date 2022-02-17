// Задать типы
const a1 = true;
const a2 = 'cnhjrf';
const a3 = 45;
const a4 = [1, 3, 5]; // 1 вариант
const a5 = [1, 3, 5]; // 2 вариант
const a6 = ['df', 'fg', 'gg'];
const a7 = ['df', 23, 34];

let a8 = 34; // любой
// a8 = 'hello';
// a8 = false;

let unusable = undefined; // undefined или null
let undef = undefined; // еще вариант
let nul = null;
let arr1 = [1, 2, 3]; // Только для чтения
let matrix = [
  [1, 2],
  [3, 4],
];
let union = 'text'; // строка или число или null или undefined

let obj = { a: 1 }; // необязательное свойство "а"

let [first, second, ...rest] = [1, 2, 3, 4];

let { one, two } = {
  one: 'text',
  two: 1,
};

// Приведение типов переменных

let someValue = 'this is a string';
let strLength1 = someValue.length;
let strLength2 = someValue.length; // еще вариант

// ========== Функции
// Какие типы в аргументах и какие возращают?

function say(name) {
  console.log(name);
}
say('vasia');

function func() {
  return;
}

function throwError(message = 'text') {
  throw new Error(message);
}
