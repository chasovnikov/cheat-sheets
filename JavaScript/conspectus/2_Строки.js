/**============ Тип данных String =============
 * Строки неизменяемы
 * Строки в JavaScript кодируются в UTF-16
 * 3 вида кавычек
 * Можно перебрать строку посимвольно, используя for..of
 */
 let str = "Привет"; // Применяются в JSON
 let str2 = 'Одинарные кавычки тоже подойдут';
 let phrase = `Обратные кавычки позволяют встраивать переменные ${str} 
     и могут занимать 
     более одной строки`;     

let name = "Ilya";
alert( `hello ${name}` );   // hello Ilya
alert( `hello ${1}` );      // hello 1
alert( `hello ${"name"}` ); // hello name


let str = `Hello`;

// получаем первый символ
alert( str[0] );            // H
alert( str.charAt(0) );     // H

alert( str[1000] );         // undefined    !!!
alert( str.charAt(1000) );  // ''           !!!
// получаем последний символ
alert( str[str.length - 1] ); // o


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
str.slice(3, 5); // "in", строка от 3 до 5
str.substring(2, 6); // "ring"
    str.substring(6, 2); // "ring"
str.substr(3, 2); // "in", строка от 3 длинной 2
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