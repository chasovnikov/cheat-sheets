
/**
 * «Символ» представляет собой уникальный идентификатор
 * Свойства, чьи ключи – символы, не перебираются циклом for..in
 * Object.keys(user) также игнорирует символы.
 * Object.assign копирует и символьные свойства
 */
// Создаём символ id с описанием (именем) "id"
let id = Symbol("id");
let id1 = Symbol("id");
alert(id == id1); // false

// Символы не преобразуются автоматически в строки
let id = Symbol("id");
alert(id); // TypeError: Cannot convert a Symbol value to a string
alert(id.toString()); // Symbol(id), теперь работает

/**
 * Символы позволяют создавать «скрытые» свойства объектов, 
 * к которым нельзя нечаянно обратиться и перезаписать их 
 * из других частей программы.
 */
 let id = Symbol("id");
 let user = {
   name: "Вася",
   [id]: 123        // квадратные скобки вокруг символа-свойства обязательны
 };

let clone = Object.assign({}, user);
alert( clone[id] );     // 123

/**
 * Обычно все символы уникальны, даже если их имена совпадают. 
 * Но иногда нужно, чтобы символы с одинаковыми именами были одной сущностью.
 * Для этого используются символы из глобального реестра
 */
// читаем символ из глобального реестра и записываем его в переменную
let id = Symbol.for("id"); // если символа не существует, он будет создан

// читаем его снова в другую переменную (возможно, из другого места кода)
let idAgain = Symbol.for("id");

// проверяем -- это один и тот же символ
alert( id === idAgain ); // true


// получаем символ по имени из глобального реестра
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// получаем имя по символу из глобального реестра
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id

/**
 * Существует множество «системных» символов, 
 * использующихся внутри самого JavaScript, и мы можем использовать их
 * 
 * Symbol.hasInstance
 * Symbol.isConcatSpreadable
 * Symbol.iterator
 * Symbol.toPrimitive - позволяет описать правила для объекта, 
 *      согласно которым он будет преобразовываться к примитиву
 * …и так далее.
 */