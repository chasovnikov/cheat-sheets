/**
 * 2 способа вставить js-файл в HTML-документ.
 * 'use strict' в старых браузерах.
 * Имена переменных.
 * Перечисление типов данных.
 * BigInt: мат. операции, смешивание с другими типами, применение унарного опер-ра "+".
 * null, undefined, typeof.
 * Модальные окна: promt, alert, confirm
 * Явное преобразование типов.
 * Приведение к числу.
 * Приведение к Boolean.
 * Примеры разных преобразований типов.
 * Присваивание переменных. Инкремент. Декремент.
 * Побитовые операторы.
 */


// Программы на JS м.б. вставлены в любое место HTML-документа с помощью тега <script>.

// <!DOCTYPE HTML>
// <html>
// <body>
//   <p>Перед скриптом...</p>

//   <script>
//     alert( 'Привет, мир!' );
//   </script>

//   <p>...После скрипта.</p>
// </body>
// </html>

// Можно подключить JS из файла:
// <script src="/path/to/script.js"></script>
// Но в одном теге <script> нельзя использовать одновременно атрибут src и код внутри.



/**
 * В старых браузерах консоль не учитывает use strict, 
 * там нужно для этого «оборачивать» код в функцию, вот так:
 */
 (function() {
    'use strict';
  
    // ...ваш код...
  })()  // создание и сразу вызов функции (блок с локальной видимостью)


// Так можно присваивать
let user = 'John', age = 25, message = 'Hello';

// Имена переменных могут начинаться с "$", "_" и букв, но далее могут идти еще и цифры.


/**================== Типы данных ===================================
 *  String, Boolean, Number, BigInt, Symbol, Object, null, undefined
 */


/**
 * null     - отсутствие объектного значения. 
 *           В отличие от undefined не является свойством глобального объекта. 
 *           В API часто присутствует в местах где ожидается объект, но подходящего объекта нет.
 * 
 * undefined - неопределённость. Является свойством глобального объекта.
 * 
 * Обычно 
 *      null       - используется как "пустое" значение, 
 *      undefined  – для проверок, была ли переменная назначена
 */
typeof null        // object (не "null" из соображений обратной совместимости)
typeof undefined   // undefined
null === undefined // false
null  == undefined // true

// возвращает тип аргумента
typeof val;     // как оператор
typeof(val);    // как функция
typeof Math     // "object"
typeof null     // "object"
typeof alert    // "function"


/**
 * Модальные окна.
 *      Блокируют выполнение скриптов, пока окно не будет закрыто.
 * Являются методами объекта Window.
 */
/**
 * prompt - окно с полем для ввода.
 * 
 * result = window.prompt(message, default)
 * @param message {string | undefined} Сообщение в окне. Необязательно
 * @param default {string | undefined} Значение по умолчанию. Необязательно
 * 
 * @returns string (OK) | null (CANCEL)
 */
let age = prompt('Сколько тебе лет?', 100);

/**
 * alert - окно с сообщение.
 * 
 * window.alert(message)
 * @param message {any | undefined} Сообщение в окне. Необязательно
 */
alert(`Тебе ${age} лет!`); // Тебе 100 лет!

/**
 * confirm - окно с выбором ответа "Ок/Отмена".
 * 
 * result = window.confirm(message)
 * @param message {string | undefined} Cообщение в окне. Необязательно
 * 
 * @returns boolean
 */
let isBoss = confirm("Ты здесь главный?");


/**
 * Преобразование типов
 * 
 * Явные преобразования:
 */
String(123);
Number("123z");
Boolean('sds');

/**
 * Приведение к числу:
 *      undefined    -	NaN
 *      null         -	0
 *      true / false -	1 / 0
 *      string	    - Пробельные символы по краям обрезаются. Далее, 
 *          если остаётся пустая строка, то получаем 0, иначе из непустой 
 *          строки «считывается» число. При ошибке результат NaN.
 */
// Неявное преобразование к числу с помощью унарного оператора
let str = "121fg";
let num = +str; // NaN

/** 
 * Приведение к Boolean:
 * Приводятся к false:
 *      0,
 *      -0,
 *      "",
 *      null,
 *      undefined,
 *      NaN
 * Все остальные значения становятся true.
 *      "0", -  true (не пустая строка)
 *      " "  -  true (не пустая строка)
 */

// Примеры:
"" + 1 + 0 // "10"
"" - 1 + 0 // -1
true + false // 1
6 / "3" // 2
"2" * "3" // 6
4 + 5 + "px" // "9px"
"$" + 4 + 5 // "$45"
"4" - 2 // 2
"4px" - 2 // NaN
7 / 0 // Infinity
"  -9  " + 5 // "  -9  5"
"  -9  " - 5 // -14
undefined + 1 // NaN 
" \t \n" - 2 // -2 


/**
 * Так можно:
 */
let c = 3 - (a = b + 1);
a = b = c = 2 + 2;
n += 5; // n = n + 5
n *= 7; // n = n * 7
counter++; // постфиксная форма инкремента
++counter; // префиксная форма инкремента
counter--; // постфиксная форма декремента
--counter; // префиксная форма декремента


/**
 * Оператор "запятая"
 * Позволяет вычислять несколько выражений.
 * Каждое выражение выполняется, но возвращается результат только последнего.
 */
 let a = (1 + 2, 3 + 4);
 alert( a ); // 7 (результат вычисления 3 + 4)
 // три операции в одной строке с помощью оператора "запятая"
for (a = 1, b = 3, c = a * b; a < 10; a++) { }


/**
 * Сравнение с null и undefined
 */
null === undefined; // false
null == undefined; // true
alert( null > 0 );  // false
alert( null == 0 ); // false (null равен нестрого только undefined)
alert( null >= 0 ); // true (сравнения преобразуют null в 0)

alert( undefined > 0 ); // false
alert( undefined < 0 ); // false
alert( undefined == 0 ); // false

/**
 * Оператор объединения с null "??"
 * Возвращает первый аргумент, если он не null/undefined, иначе второй
 */
let a = b ?? "b - пусто";
let a = b ?? с ?? d ?? "пусто";


/**
 * Сборка мусора по принципу достижимости: удаляются объекты, 
 *    которые стали недостижимы.
 * «Достижимые» значения – это те, которые доступны или используются. 
 *    Они гарантированно находятся в памяти.
 * Не могут быть удалены:
 *    Локальные переменные и параметры текущей функции.
 *    Переменные и параметры других функций в текущей цепочке вложенных вызовов.
 *    Глобальные переменные.
 *    (некоторые другие внутренние значения)
 *    Любое другое значение считается достижимым, 
 *        если оно доступно по ссылке или по цепочке ссылок
 */


/**
 * Методы у примитивов
 * Каждый примитив имеет свой собственный «объект-обёртку», 
 * которые называются: String, Number, Boolean и Symbol.
 * Некоторые языки, такие как Java, позволяют явное создание 
 * «объектов-обёрток» для примитивов при помощи такого синтаксиса 
 * как new Number(1) или new Boolean(false).
 * В JavaScript, это тоже возможно по историческим причинам, 
 * но очень не рекомендуется
 */
 alert( typeof 0 ); // "число"
 alert( typeof new Number(0) ); // "object"!
/**
 * С другой стороны, использование функций String/Number/Boolean 
 * без оператора new – вполне разумно и полезно. Они превращают значение 
 * в соответствующий примитивный тип
 */



/**
 * Глобальный объект хранит переменные, которые должны быть доступны 
 *      в любом месте программы.
 * Универсальное имя – globalThis.Но чаще на него ссылаются по-старому, 
 *      используя имя, характерное для данного окружения, 
 *      такое как window (браузер) и global (Node.js)
 */


/**
 * Помеченные операторы.
 * 
 * Пространство имен для меток не совпадает с пространством имен
 *      Для переменных и функций, поэтому вы можете использовать один и тот же
 *      идентификатор в качестве метки оператора и имени переменной или функции.* 
 * Два оператора могут иметь одну и ту же метку при условии, что они 
 *      не вложены друг в друга.
 * Любой оператор может иметь множество меток.
 */
mainloop: while(token !== null) {
    // Код опущен...
    continue mainloop; // Перейти к следующей итерации именованного цикла
    // Код опущен...
}

/**
 * Оператор break, используемый в одиночку, обеспечивает немедленное 
 *      завершение САМОГО ВНУТРЕННЕГО включающего оператора цикла или switch.
 * Когда оператор b reak используется с меткой, он вызывает переход в конец,
 *      или прекращение, включающего оператора, который имеет указанную метку.
 * break с меткой или без нее не способен передавать управление между границами функций. 
 */
