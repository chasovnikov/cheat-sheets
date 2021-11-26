
// Замыкание – это функция, которая получает доступ у внешним переменным

// Пример
// Функция получает текущее значение внешних переменных
let name = "John";
function sayHi() {
  alert("Hi, " + name);
}
name = "Pete";
sayHi();        // "Pete", не "John"


// Вызов ф-ии создает лексическое окружение
// Все лексические окружения содержит две вещи:
//  1. Специальный внутренний объект Environment Record с локальными переменными
//      Переменная – это свойство объекта Environment Record
//  2. Ссылку на внешнее окружение

/*
Когда код хочет получить доступ к переменной – сначала происходит поиск 
во внутреннем лексическом окружении, затем во внешнем, затем в следующем 
и так далее, до глобального.
*/


function makeCounter() {
  let count = 0;
  // функция запоминает ссылку на внешнее окружение
  return function() {
    return count++;
  };
}
let counter1 = makeCounter();
let counter2 = makeCounter();
alert( counter1() ); // 0
alert( counter1() ); // 1
alert( counter2() ); // 0 (независимо) новое лексическое окружение


// For, while
// У каждой итерации цикла своё собственное лексическое окружение
for (let i = 0; i < 10; i++) {
  // {i: value}
}
alert(i); // Ошибка, нет такой переменной


// Блоки кода
{
  // сделать какую-нибудь работу с локальными переменными, которые не должны быть видны снаружи

  let message = "Hello";

  alert(message); // Hello
}
alert(message); // Ошибка: переменная message не определена


// Старый способ создания лексического окружения на уровне блоков кода.
// immediately-invoked function expressions» (аббревиатура IIFE)
// что означает функцию, запускаемую сразу после объявления.
(function() {
  let message = "Hello";
  alert(message); // Hello
})();

// Пути создания IIFE
(function() {
  alert("Скобки вокруг функции");
})();

(function() {
  alert("Скобки вокруг всего");
}());

!function() {
  alert("Выражение начинается с логического оператора NOT");
}();

+function() {
  alert("Выражение начинается с унарного плюса");
}();


// колбэк для arr.filter(callback)
function inBetween(a, b) {
    return function (item) {
        return item >= a && item <= b;
    }
}
alert( [1, 2, 3, 4, 5, 6, 7].filter(inBetween(3, 6)) ); // 3,4,5,6


// пример замыкания
let c = 34;
function asd() {
    let a = 'df';
    function fg() {
        let b = 'cv';
        function vbf() {
            return c + 1;
        }
        return vbf();
    }
    return fg();
}
console.log( asd() );   // 35
console.log( fg()() );      // Uncaught ReferenceError: fg is not defined


// пример замыкания
let c = 34;
function asd() {
    let a = 'df';
    return function fg() {
        let b = 'cv';
        return function vbf() {
            return c + 1;
        }
    }
}
console.log( asd()()() );   // 35