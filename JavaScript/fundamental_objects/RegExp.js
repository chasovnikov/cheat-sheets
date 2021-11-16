
/**
 * Регулярные выражения.
 * В JavaScript регулярные выражения также являются объектами.
 * Методы для работы с ними:
 * RegExp:
 *      exec(str) - поиск сопоставления в строке. Возращ. array или null.
 *      test(str) - поиск сопоставления строке. Возвращает true или false.
 * String:
 *      match(regexp)       - возр. совпадения строки с regexp.
 *      replace(regexp|...) - возр. строку с сопоставлениями, заменёнными на заменитель.
 *      search([regexp]) -  поиск сопоставления между regexp и этим объектом String.
 *      split([separator[, limit]]) - разбивает объект String на массив строк 
 *              путём разделения строки указанной подстрокой.
 * Описание правил составления регул. выраж. см. в файле Regexp.txt
 */
// 2 способа создать regexp:
// 1-й способ:   /pattern/flags
let re = /ab+c/;             // лучше для производит-ти, чем 2-й способ

// 2-й способ:   new RegExp(pattern, flags)
let re = new RegExp("ab+c"); // испол-ся, если regexp будет изменяться


/**
 * regexObj.exec(str)
 * 
 * Возращ. array или null:
 *      в первом элементе содержит сопоставленный текст, 
 *      а в последующих элементах — текст, захваченный при сопоставлении круглыми скобками
 */
let re = /кайф,\s(сплющь).+?(вши)/ig;
let result = re.exec('Эх, чужд кайф, сплющь объём вши, грызя цент.');
// ["кайф, сплющь объём вши", "сплющь", "вши"]


/**
 * regexObj.test(str)
 * 
 * Возвращает true или false.
 */
function testinput(re, str){
    var midstring;
    if (re.test(str)) {
      midstring = ' содержит ';
    } else {
      midstring = ' не содержит ';
    }
    console.log(str + midstring + re.source);
  }