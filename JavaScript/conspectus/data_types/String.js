
 /**============ Тип данных String =============
 * Строки неизменяемы
 * Строки в JavaScript кодируются в UTF-16
 * Можно перебрать строку посимвольно, используя for..of
 * 3 вида кавычек:
 */
let str = "Двойные кавычки";       // Применяются в JSON
let str2 = 'Одинарные кавычки тоже подойдут';
let phrase = `Обратные кавычки позволяют встраивать переменные ${str} 
и могут занимать более одной строки`;
let longString = "Двойные и одинарные кавычки \
могут быть многострочными \
с помощью экранирования обратным слэшем." 

// механика обратных кавычек
let userName = "Ilya";
alert( `hello ${userName}` );   // hello Ilya
alert( `hello ${1}` );      // hello 1
alert( `hello ${"name"}` ); // hello name


let str = `Hello`;
// получаем первый символ
str[0]            // H
str.charAt(0)     // H
str[1000]         // undefined    !!!
str.charAt(1000)  // ''           !!! Отличие charAt() от []
// получаем последний символ
str[str.length - 1] // o


'Interface'.toUpperCase(); // INTERFACE
'Interface'.toLowerCase(); // interface

'Widget'.indexOf('id', 3); // -1, индекс подстроки, начиная поиск с позиции 3
    ~'Widget'.indexOf('id', 3); // 0, то же, что -(-1+1)
'Widget'.lastIndexOf('e', 3); //, поиск от конца к началу, начиная с индекса 3

"Midget".includes("id", 3); // false, поиск подстроки с позиции 3
"Widget".startsWith("Wid"); // true, поиск начала строки
"Widget".endsWith("get"); // true, поиск конца строки

let arr = 'Вася, Петя, Маша, Саша'.split(', ', 2); // [Вася, Петя]

let str = "stringify";
str.slice(3, 5);         // "in", строка от 3 до 5
str.substring(2, 6);     // "ring"
    str.substring(6, 2); // "ring"
str.substr(3, 2);        // "in", строка от 3 длинной 2 (устаревший метод)
/**
 * Формально у метода substr есть небольшой недостаток: 
 * он описан не в собственно спецификации JavaScript, 
 * а в приложении к ней — Annex B
 */


// Вернуть код символа в UTF-16
"z".codePointAt(0); // 122
"Z".codePointAt(0); // 90
// "Z" < "z"  (90 < 122) - сравнение идет по коду

// Создаёт символ по его коду
String.fromCodePoint(90); // Z
// используя \u с шестнадцатеричным кодом символа:
String.fromCodePoint('\u005a'); // Z

/**
 * Правильное сравнение.
 * Сравнение в соответствии с ПРАВИЛАМИ языка (а не по коду):
 * -1, если str < str2.
 * 1, если str > str2.
 * 0, если str === str2.
 */
 str.localeCompare(str2);
'Österreich'.localeCompare('Zealand'); // -1

/**
 * String.fromCodePoint и str.codePointAt 
 * правильно работают с СУРРОГАТНЫМИ ПАРАМИ в отличие от
 * похожим методов String.fromCharCode и str.charCodeAt
 */

/**
 * Диакритические знаки и нормализация
 */
// после S добавить специальный символ «точка сверху» (код \u0307)
alert( 'S\u0307' ); // Ṡ
alert( 'S\u0307\u0323' ); // Ṩ

let s1 = 'S\u0307\u0323'; // Ṩ, S + точка сверху + точка снизу
let s2 = 'S\u0323\u0307'; // Ṩ, S + точка снизу + точка сверху
alert( `s1: ${s1}, s2: ${s2}` );
alert( s1 == s2 ); // false, хотя на вид символы одинаковы (?!)
/**
 * Для решения этой проблемы есть алгоритм «юникодной нормализации», 
 * приводящий каждую строку к единому «нормальному» виду.
 * Его реализует метод str.normalize().
 */
 alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true

 
/**
 * String(thing)
 * new String(thing)
 * @param {any} thing Всё, что может быть преобразовано в строку
 * 
 * Свойства:
 * String.prototype
 *      Позволяет добавлять свойства к объекту String.
 * 
 * Статические методы:
 * 
 * String.fromCharCode()
 *      Возвращает строку, созданную из указанной последовательности значений Юникода.
 * String.fromCodePoint() 
 *      Возвращает строку, созданную из указанной последовательности кодовых точек Юникода.
 * String.raw() 
 *      Возвращает строку, созданную из сырой шаблонной строки.
 * 
 * Методы, унаследованные из Function:
 *      apply, call, toSource, toString
 * 
 * Динамические методы:
 * 
 * String.prototype.at(index) 
 *      Возвращает символ (ровно одну кодовую единицу UTF-16) по указанному индексу. 
 *      Принимает отрицательные целые числа, которые отсчитываются от последнего строкового символа.
 * 
 * String.prototype.charAt(index)
 *      Возвращает символ (ровно одну кодовую единицу UTF-16) по указанному индексу.
 * 
 * String.prototype.charCodeAt(index)
 *      Возвращает число, которое является значением кодовой единицы UTF-16 по заданному индексу.
 * 
 * String.prototype.codePointAt(pos)
 *      Возвращает неотрицательное целое число Number, которое является значением кодовой точки 
 *      кодовой точки в кодировке UTF-16, начиная с указанной позиции.
 * 
 * String.prototype.concat(str [, ...strN ])
 *      Объединяет текст двух (или более) строк и возвращает новую строку.
 * 
 * String.prototype.includes(searchString [, position])
 *      Определяет, содержит ли вызывающая строка searchString.
 * 
 * String.prototype.endsWith(searchString [, length])
 *      Определяет, заканчивается ли строка символами строки searchString.
 * 
 *      ОТРЕДАКТИРОВАТЬ:
 * 
 * String.prototype.indexOf(searchValue [, fromIndex])
Returns the index within the calling String object of the first occurrence of searchValue, or -1 if not found.

String.prototype.lastIndexOf(searchValue [, fromIndex])
Returns the index within the calling String object of the last occurrence of searchValue, or -1 if not found.

String.prototype.localeCompare(compareString [, locales [, options]])
Returns a number indicating whether the reference string compareString comes before, after, or is equivalent to the given string in sort order.

String.prototype.match(regexp)
Used to match regular expression regexp against a string.

String.prototype.matchAll(regexp)
Returns an iterator of all regexp's matches.

String.prototype.normalize([form])
Returns the Unicode Normalization Form of the calling string value.

String.prototype.padEnd(targetLength [, padString])
Pads the current string from the end with a given string and returns a new string of the length targetLength.

String.prototype.padStart(targetLength [, padString])
Pads the current string from the start with a given string and returns a new string of the length targetLength.

String.prototype.repeat(count)
Returns a string consisting of the elements of the object repeated count times.

String.prototype.replace(searchFor, replaceWith)
Used to replace occurrences of searchFor using replaceWith. searchFor may be a string or Regular Expression, and replaceWith may be a string or function.

String.prototype.replaceAll(searchFor, replaceWith)
Used to replace all occurrences of searchFor using replaceWith. searchFor may be a string or Regular Expression, and replaceWith may be a string or function.

String.prototype.search(regexp)
Search for a match between a regular expression regexp and the calling string.

String.prototype.slice(beginIndex[, endIndex])
Extracts a section of a string and returns a new string.

String.prototype.split([sep [, limit] ])
Returns an array of strings populated by splitting the calling string at occurrences of the substring sep.

String.prototype.startsWith(searchString [, length])
Determines whether the calling string begins with the characters of string searchString.

String.prototype.substring(indexStart [, indexEnd])
Returns a new string containing characters of the calling string from (or between) the specified index (or indeces).

String.prototype.toLocaleLowerCase( [locale, ...locales])
The characters within a string are converted to lowercase while respecting the current locale.

For most languages, this will return the same as toLowerCase().

String.prototype.toLocaleUpperCase( [locale, ...locales])
The characters within a string are converted to uppercase while respecting the current locale.

For most languages, this will return the same as toUpperCase().

String.prototype.toLowerCase()
Returns the calling string value converted to lowercase.

String.prototype.toString()
Returns a string representing the specified object. Overrides the Object.prototype.toString() method.

String.prototype.toUpperCase()
Returns the calling string value converted to uppercase.

String.prototype.trim()
Trims whitespace from the beginning and end of the string. Part of the ECMAScript 5 standard.

String.prototype.trimStart()
Trims whitespace from the beginning of the string.

String.prototype.trimEnd()
Trims whitespace from the end of the string.

String.prototype.valueOf()
Returns the primitive value of the specified object. Overrides the Object.prototype.valueOf() method.

String.prototype.@@iterator()
Returns a new iterator object that iterates over the code points of a String value, returning each code point as a String value.
 */