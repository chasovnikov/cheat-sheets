
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
 * 
 * Арность - кол-во параметров ф-ии (свойство length)
 */

/**
 * Function Declaration можно использовать во всем скрипте 
 * или блоке кода, если функция объявлена в блоке.
 * В строгом режиме, когда Function Declaration находится в блоке {...}, 
 * функция доступна везде внутри блока. Но не снаружи него.
 */
function sayHi() {
    //...
}

/**
 * Function Expression создаётся, когда выполнение доходит до него, 
 * и затем уже может использоваться.
 */
let sayHi = function() {
    //...
};      // ";" обязательна, т.к. здесь - выражение

// Функции-«колбэки» - функции, передаваемые в аргументы другой функции
function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}
ask(
    "Вы согласны?",
    function() { alert("Вы согласились."); },
    function() { alert("Вы отменили выполнение."); }
);

/**
 * "Стрелочные" функции.
 * Не имеют this.
 * Не имеют arguments.
 * Не могут быть вызваны с new.
 * Нет super.
 */
let sum = (a, b) => a + b;
let sum = a => a + b;
let sum = (a, b) => {
    return a + b;       // return обязателен с {}
};
  
// функция-конструктор
function User(name) {
    this.name = name;
    this.isAdmin = false;
}
let user = new User("Вася");

let user = new function() {
    this.name = "Вася";
    this.isAdmin = false;
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
    
    return { name: "Godzilla" };    // new SmallUser().name  ->  "Godzilla"
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
alert(many.length); // 2 ("...more" не считаются)


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



// new Function('аргумент1', 'аргумент2', '...', 'тело функции')
let sum = new Function('a', 'b', 'return a + b');
alert( sum(1, 2) ); // 3


// имеет доступ только к глобальным переменным
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


/// ЗАМЫКАНИЕ
// - использование ф-ии, определяемой внутри другой функции и возвращаемой ею.
// Возращение объекта вложенной ф-ии из ф-ии, внутри которой он был определён.
let scope = 'global scope';
function checkscope() {
    let scope = 'local scope';
    function f() {          // scope не передается через аргумент
        return scope;
    }
    return f;               // возр. объекта вложенной ф-ии
}
let s = checkscope()();     // 'local scope'

// Закрытый доступ к переменной counter:
let uniqueInteger = (function() { // опред. и вызы. закрыт. состояние ф-ии ниже
    let counter = 0;
    return function() {
        return counter++;
    };
}());       // вызов ф-ии

// отдельные области видимости
function counter() {
    let n = 0;
    return {
        count: function() {
            return n++;
        },
        reset: function() {
            n = 0;
        }
    };
}
let c = counter(), d = counter();   // каждый вызов counter() созд. нов. обл. видим-ти
c.count();      // 0
d.count();      // 0: счетчики независимы
c.reset();      // сброс
c.count();      // 0: сбросилось
d.count();      // 1: не сбросилось

// можно комбинировать замыкания с геттерами и сеттерами:
function counter(n) {
    return {
        get count() {
            return n++;     // локальная переменная не объявляется
        },
        set count(m) {
            if (m > n) n = m;
            else throw Error('счетчик можно устанавливать только в большее значение');
        },
    };
}
let c = counter(1000);
c.count;            // 1000
c.count;            // 1001
c.count = 2000;
c.count;            // 2000
c.count = 2000;     // Error: ...


/// МЕМОЗАЦИЯ
// - сохранение результатов выполнения функций для предотвращения повторных вычислений



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



/**
 * Интроспекция
 */
const types = [
    Function,
    (async () => {}).constructor,        // AsyncFunction
    (function* () {}).constructor,       // GeneratorFunction
    (async function* () {}).constructor, // AsyncGeneratorFunction
];
const output = types.map(item => ({
    name: item.name,
    type: typeof item,                  // у все function
    ctr: item.constructor.name,         // у все Function
    item,
}));
console.table(output);



/**
 * fun.call(thisArg[, arg1[, arg2[, ...]]])
 *      вызывает функцию с указанным значением this и со СПИСКОМ аргументов.
 * 
 * ОТЛИЧИЕ ОТ apply:
 *      call() принимает список аргументов
 *      apply() - одиночный массив аргументов
 */
function f(arg) {
    alert(arg);
    alert(this);
}
f('abc');             // abc, [object Window]
f.call('123', 'abc'); // abc, 123


/**
 * fun.apply(thisArg, [argsArray])
 *      вызывает функцию с указанным значением this и аргументами, 
 *      предоставленными в виде МАССИВА
 */
function f() {
    alert(this);
    for (var i = 0; i < arguments.length; i++) {
        alert(arguments[i]);
    }
}
f(1, 2, 3);                   // [object Window], 1, 2, 3
f.apply('abc', [1, 2, 3, 4]); // abc, 1, 2, 3, 4


/**
 * bind - привязка ф-ии к объекту.
 * bind - создаёт "обёртку" над функцией, которая подменяет контекст 
 *      этой функции. Поведение похоже на call и apply, но, в отличие 
 *      от них, bind не вызывает функцию, а лишь возвращает "обёртку", 
 *      которую можно вызвать позже.
 * 
 * bind() создаёт новую "привязанную функцию" (ПФ).
 * ПФ имеет следующие внутренние ( скрытые ) свойства:
 *      [[BoundTargetFunction]] - оборачиваемый  (целевой ) функциональный объект
 *      [[BoundThis]] - значение, которое всегда передаётся в качестве значения 
 *          this при вызове обёрнутой функции.
 *      [[BoundArguments]] - список значений, элементы которого используются 
 *          в качестве первого аргумента при вызове оборачиваемой функции.
 *      [[Call]] - внутренний метод. Выполняет код (функциональное выражение), 
 *          связанный с функциональным объектом. 
 * Когда ПФ вызывается, исполняется её метод [[Call]] с аргументами 
 *      Call(target, boundThis, args).
 *          target   -    [[BoundTargetFunction]];
 *          boundThis   -    [[BoundThis]];
 *          args  -   [[BoundArguments]].
 */
function f() {
    alert(this);
}
var wrapped = f.bind('abc');
f();         // [object Window]
wrapped();   // abc

// от Флэнагана
function f(y) {
    return this.x + y;      // нужна привязка
}
const o = { x: 1 };
let g = f.bind(o);
g(2);                       // 3
let p = { x: 10, g };
p.g(2);                     // 3 (g по-прежнему привязана к o, не р)


/**
 * Также bind умеет подменять не только контекст, но и аргументы функции, 
 * осуществляя каррирование:
 */
function add(a, b) {
    return a + b;
}
var addOne = add.bind(null, 1);
alert(add(1, 2));   // 3
alert(addOne(2));   // 3


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



/**
 * Синтаксис "new Function"
 * 
 * let func = new Function([arg1, arg2, ...argN], functionBody)
 * 
 * Главное отличие от других способов объявления функции, 
 *      в том, что функция создаётся «на лету» из строки.
 */
let sum = new Function('a', 'b', 'return a + b');
alert( sum(1, 2) );         // 3

// Без аргументов
let sayHi = new Function('alert("Hello")');
sayHi();                    // Hello

// Аргументы могут быть объявлены через запятую в одной строке.
new Function('a', 'b', 'return a + b');      // стандартный синтаксис
new Function('a, b', 'return a + b');        // через запятую в одной строке

/**
 * Обычно функция запоминает, где родилась, в специальном свойстве 
 *      [[Environment]]. Это ссылка на лексическое окружение (Lexical Environment), 
 *      в котором она создана.
 * Но когда функция создаётся с использованием new Function, в её [[Environment]] 
 *      записывается ссылка не на внешнее лексическое окружение, 
 *      в котором она была создана, а на глобальное. 
 *      Поэтому такая функция имеет доступ ТОЛЬКО к глобальным переменным
 *      (но НЕ ВНЕШНИИМ).
 */
function getFunc() {
  let value = "test";
  let func = new Function('alert(value)');
  
  return func;
}
getFunc()(); // ошибка: value не определено



/// АРГУМЕНТЫ И ПАРАМЕТРЫ ФУНКЦИЙ
// параметры по умолчанию
function f(a, b) {
    b = b || 10;                 // старый способ задания
}
function f1(a, b = 10) {}        // значение по умолч. в списке параметров
function f2(a, b = a * 2) {}     // допустипы выражения в списке параметров


/// ПАРАМЕТРЫ ОСТАТКА (rest-оператор) И СПИСКИ АРГУМЕНТОВ ПЕРЕМЕННОЙ ДЛИНЫ
// Rest-оператор собирает остальные параметры в массив
// он должен быть последним в списке параметров
function sum(a, b, ...rest) {
    console.log(rest);  
    return a + b;
}
sum(1, 2, 3, 4, 5);      // => 3;  rest -> [3, 4, 5]


/// ОБЪЕКТ ARGUMENTS
// - подобен массиву. Содержит аргументы, переданные в ф-ию.
// arguments — это локальная переменная, доступная внутри любой (нестрелочной) функции.
// нет св-в и методов массивов, кроме length

// arguments можно преобразовать в обычный массив:
const args = Array.from(arguments);
const args = [...arguments];
function foo(...args) {
  return arguments;
}
foo(1, 2, 3); // { "0": 1, "1": 2, "2": 3 }


/// ДЕСТРУКТУРИЗАЦИЯ АРГУМЕНТОВ Ф-ИИ В ПАРАМЕТРЫ
function vector( [x1, y1], [x2, y2]) {      // распаковать 2 арг-та в 4 парам-ра
    return [x1 + x2, y1 + y2];
}