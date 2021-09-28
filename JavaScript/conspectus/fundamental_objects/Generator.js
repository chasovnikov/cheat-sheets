
/**
 * Generator - это объект, возвращаемый функцией-генератором и 
 *      соответствующий как "Итерируемому" протоколу, так и протоколу "Итератор".
 * Этот объект не может быть инстанциирован напрямую.
 * 
 * Generator.prototype.next()
 *      Возвращает значение, полученное выражением yield.
 * 
 * Generator.prototype.return()
 *      Возвращает заданное значение и заканчивает генератор.
 * 
 * Generator.prototype.throw()
 *      Выдаёт ошибку генератора.
 * 
 * function* f(…) или function *f(…)
 */
function* generateSequence() {
    yield 1;
    yield 2;
    // yield 3;     // для for..of (return не нужен)
    return 3;
}
let generator = generateSequence();
alert(generator); // [object Generator]

let one = generator.next();
alert(JSON.stringify(one)); // {value: 1, done: false}

let two = generator.next();
alert(JSON.stringify(two)); // {value: 2, done: false}

let three = generator.next();
alert(JSON.stringify(three)); // {value: 3, done: true}


// перебор через for..of игнорирует последнее значение, при котором done: true
for(let value of generator) {
    alert(value); // 1, затем 2
}


let sequence = [0, ...generateSequence()];
alert(sequence); // 0, 1, 2, 3

// Генераторы были добавлены, в частности, с целью упростить создание перебираемых объектов
let range = {
    from: 1,
    to: 5,
  
    *[Symbol.iterator]() { // краткая запись для [Symbol.iterator]: function*()
      for(let value = this.from; value <= this.to; value++) {
        yield value;
      }
    }
};
alert( [...range] ); // 1,2,3,4,5


/**
 * Композиция генераторов.
 * 
 * yield* позволяет «вкладывать» генераторы один в другой.
 * yield* делегирует выполнение другому генератору.
 */
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {    
    yield* generateSequence(48, 57); // 0..9    
    yield* generateSequence(65, 90); // A..Z    
    yield* generateSequence(97, 122); // a..z

    // yield* generateSequence(48, 57) вместо
    // for (let i = 48; i <= 57; i++) yield i;

    // yield* generateSequence(65, 90) вместо
    // for (let i = 65; i <= 90; i++) yield i;

    // yield* generateSequence(97, 122) вместо
    // for (let i = 97; i <= 122; i++) yield i;
}

let str = '';
for(let code of generatePasswordCodes()) {
    str += String.fromCharCode(code);
}
alert(str); // 0..9A..Za..z


/**
 * yield – дорога в обе стороны
 */
function* gen() {
    // Передаём вопрос во внешний код и ожидаем ответа
    let result = yield "2 + 2 = ?"; // (*)
  
    alert(result);
}
let generator = gen();
let question = generator.next().value;  // <-- yield возвращает значение
generator.next(4);                      // --> передаём результат в генератор

function* gen() {
    let ask1 = yield "2 + 2 = ?";
  
    alert(ask1); // 4
  
    let ask2 = yield "3 * 3 = ?"
  
    alert(ask2); // 9
  }
  
  let generator = gen();
  
  alert( generator.next().value ); // "2 + 2 = ?"
  
  alert( generator.next(4).value ); // "3 * 3 = ?"
  
  alert( generator.next(9).done ); // true


/**
 * generator.throw
 * Ошибка, которая проброшена в генератор на строке (2), 
 *      приводит к исключению на строке (1) с yield
 */
function* gen() {
    try {
      let result = yield "2 + 2 = ?"; // (1)
  
      alert("Выполнение программы не дойдёт до этой строки, потому что выше возникнет исключение");
    } catch(e) {
      alert(e); // покажет ошибку
    }
}
let generator = gen();
let question = generator.next().value;
generator.throw(new Error("Ответ не найден в моей базе данных")); // (2)
// можно так:
// try {
//     generator.throw(new Error("Ответ не найден в моей базе данных"));
// } catch(e) {
//     alert(e); // покажет ошибку
// }