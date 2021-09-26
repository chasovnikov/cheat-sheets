
/**
 * В JavaScript функция – это значение с типом данных Объект.
 * Их свойства:
 *    name    – имя функции. Обычно берётся из объявления функции, но если там нет – 
 *              JavaScript пытается понять его из контекста.
 *    length  – количество аргументов в объявлении функции (spread-оператор не считается).
 * Также функции могут содержать дополнительные свойства (пользовательские).
 * Функции-конструкторы являются обычными функциями. Но есть два соглашения:
 *    Имя функции-конструктора должно начинаться с большой буквы.
 *    Функция-конструктор должна вызываться при помощи оператора "new".
 * У стрелочных функций нет "this" и «arguments» (Это отлично подходит для декораторов, 
 *      когда нам нужно пробросить вызов с текущими this и arguments)
 * Замыкание - это когда внутри одной ф-ии объявл. другую и возращ. её из 
 *      контекста наружной (все внутренние ф-ии видят аргументы 
 *      и локальные переменные внеш-й ф-ии).
 */

// функция-конструктор
function User(name) {
    this.name = name;
    this.isAdmin = false;
}
let user = new User("Вася");

let user = new function() {
    this.name = "Вася";
    this.isAdmin = false;
    // ...другой код для создания пользователя
    // возможна любая сложная логика и выражения
    // локальные переменные и т. д.
};


// Проверить, вызвана ли функция при помощи оператора new или без него
function User() {
    alert(new.target);
}
User(); // undefined
new User(); // function User { ... }

// так можно сделать, чтобы функцию можно было вызывать как с, так и без new:
function User(name) {
    if (!new.target) {       // в случае, если вы вызвали без оператора new
      return new User(name); // ...добавим оператор new за вас
    }
  
    this.name = name;
  }

/**
 * return с объектом возвращает объект, 
 * в любом другом случае конструктор вернёт this
 */
function SmallUser() {
    this.name = "Вася";
    
    return { name: "Godzilla" };
    // return 'fgbgt';              // new SmallUser().name  ->  "Вася"
    // return 3424;                 // new SmallUser().name  ->  "Вася"
}
alert( new SmallUser().name );  // "Godzilla"


// нет аргументов -> можно не ставить скобки
let user = new User; // считается плохой практикой

// В функции-конструторе можно создавать методы
function User(name) {
    this.name = name;
  
    this.sayHi = function() {
      alert( "Меня зовут: " + this.name );
    };
  }


// свойство «length» содержит количество параметров функции в её объявлении
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2


// добавим свойство counter для отслеживания общего количества вызовов:
function sayHi() {
  alert("Hi");

  // давайте посчитаем, сколько вызовов мы сделали
  sayHi.counter++;
}
sayHi.counter = 0; // начальное значение
sayHi(); // Hi
sayHi(); // Hi
alert( `Вызвана ${sayHi.counter} раза` ); // Вызвана 2 раза




/**
 * Named Function Expression или NFE – это термин для Function Expression,
 *    у которого есть имя
 * Особенности имени здесь:
 *    Оно позволяет функции ссылаться на себя же.
 *    Оно не доступно за пределами функции.
 */
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // использует func, чтобы снова вызвать себя же
  }
};
sayHi(); // Hello, Guest
// А вот так - не cработает:
func(); // Ошибка, func не определена (недоступна вне функции)


/**
 * Синтаксис "new Function"
 * let func = new Function([arg1, arg2, ...argN], functionBody);
 *      arg1...argN     - аргументы
 *      functionBody    - тело функции
 * 
 * Они не могут использовать внешние локальные переменные (только через аргументы).
 * new Function позволяет превратить любую строку в функцию. 
 * Например, можно получить новую функцию с сервера и затем выполнить её.
 */
let sum = new Function('a', 'b', 'return a + b');
alert( sum(1, 2) ); // 3

let str = 'return a + b';     // код, полученный с сервера динамически ...
let func = new Function(str);
func();

function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}
getFunc()(); // ошибка: value не определен

// Эти объявления ниже эквивалентны:
new Function('a', 'b', 'return a + b'); // стандартный синтаксис
new Function('a, b', 'return a + b'); // через запятую в одной строке


// Цепочка вызовов:
const add = x => y => x + y;
add(3)(6);    // 9

// Рекурсия:
const add = x => y => add(x + y);
const a1 = add(5);
const a2 = a1(2);
const a3 = a2(3);
const a4 = a1(1);
const a5 = a2(10);
console.log(a1, a2, a3, a4, a5);

const res = add(1)(4)(8)(8);
console.log(res);



/**
 * setTimeout  - запуск функции через время
 * 
 * let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
 *    func|code   - Функция или строка кода для выполнения
 *    delay       - Задержка перед запуском в миллисекундах (по умолчанию – 0).
 *    arg1, arg2… - Аргументы, передаваемые в функцию
 * 
 * setTimeout(func, 0)  - вызов функции будет запланирован сразу после выполнения текущего кода
 */
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}
setTimeout(sayHi, 1000, "Привет", "Джон"); // Привет, Джон (через секунду)


let timerId = setTimeout(() => alert('Привет'), 1000);
clearTimeout(timerId);    // Отмена запуска


/**
 * setInterval  - запуск функции с интервалом времени
 * 
 * let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
 *    func|code   - Функция или строка кода для выполнения
 *    delay       - Задержка перед запуском в миллисекундах (по умолчанию – 0).
 *    arg1, arg2… - Аргументы, передаваемые в функцию
 * 
 * Реальная задержка между вызовами func с помощью setInterval меньше, чем указано в коде!
 * Это нормально, потому что время, затраченное на выполнение func, 
 * использует часть заданного интервала времени
 */
let timerId = setInterval(() => alert('tick'), 2000); // повторить с интервалом 2 секунды

// остановить вывод через 5 секунд
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);

clearInterval(timerId);  // Остановка setInterval


// Рекурсивный setTimeout гарантирует фиксированную задержку в отличие от setInterval
/** вместо:
let timerId = setInterval(() => alert('tick'), 2000);
*/
let timerId = setTimeout(function tick() {
  alert('tick');
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);



setTimeout(
  user.sayHi.bind(user)     // Привязка теряющегося this
  , 1000); // Привет, undefined!


/**
 * Каррирование или карринг (currying) — это преобразование функции с множеством аргументов 
 *      в набор вложенных функций с одним аргументом.
 * multiply(a, b, c)   —>   multiply(a)(b)(c)
 */


/**
 * Частичное применение – мы создаём новую функцию,
 *    фиксируя некоторые из существующих параметров
 * 
 * Возвращает «привязанный вариант» функции func, 
 *    фиксируя контекст this и первые аргументы arg1, arg2…, если они заданы
 * func.bind(context, [arg1], [arg2], ...)
 *      context       - фиксированный this
 *      [arg1], ...   - фиксированные (первые) аргументы
 */
function mul(a, b) {
  return a * b;
}
let double = mul.bind(null, 2);
// фиксируя null как контекст, и 2 – как первый аргумент
alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10