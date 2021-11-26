


// Область видимости переменных var ограничивается либо функцией, либо скриптом. 
// Для «var» не существует блочной области видимости
if (true) {
  var testVar = true;
  let testLet = true;
}
console.log(testVar);  // true, переменная существует вне блока i
console.log(testLet);  // Uncaught ReferenceError: test2 is not defined


// «var» допускает повторное объявление
var user = "Pete";
var user = "John";
alert(user); // John


// «var» обрабатываются в начале запуска функции («hoisting» (всплытие, поднятие))
// Объявления переменных «всплывают», но присваивания значений – нет.
function sayHi() {
  phrase = "Привет"; // (*)

  if (false) {
    var phrase;
  }

  alert(phrase);
}
sayHi();

  
