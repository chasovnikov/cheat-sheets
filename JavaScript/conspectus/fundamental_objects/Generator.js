
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

// Генераторы добавлены, в частности, с целью упростить создание перебираемых объектов
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


/**
 * Из лекций Шемсединова
 */
function* counter(begin, end, delta = 1) {
    let value = begin;
    while (end > value) {
        value += delta;
        // if (value > end) return;
        // yield value;
        const back = yield value;
        if (back) value += back;
        console.log({ back });
    }
}

const c = counter(0, 30, 12);
const val1 = c.next();      // {value: 12, done: false}   back: undefined
const val2 = c.next();      // {value: 24, done: false}   back: undefined
// const val3 = c.next();      // {value: undefined, done: true}
const val3 = c.next(150);      // {value: undefined, done: true}  back: 150
const val4 = c.next();      // {value: undefined, done: true}
console.log({c, val1, val2, val3, val4});


function* ids(...args) {
    let i =0;
    while (args.length > i) {
        const id = args[i++];
        if (id === undefined) return undefined;
        yield id;
    }
}
const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
for (const val of id) {
    console.log({val});
}
// можно использовать спрэд-оператор
console.log(...id);

/**
 * В массиве или Set есть свой Symbol.iterator. И его будет возращать yield*.
 */
function* genFn() {
    yield* [10, 20, 30];
    // yield* new Set([10, 20, 30]);
}
const c = genFn();
const val1 = c.next();
const val2 = c.next();
const val3 = c.next();
const val4 = c.next();
console.log({c, val1, val2, val3, val4});


function* gen1() {
    yield 10;
    yield 20;
    yield 30;
}
function* gen2() {
    yield 40;
    yield 50;
    yield 60;
}
function* genFn() {
    yield* gen1();
    yield* gen2();
}
console.log('[...genFn()] =', [...genFn()]);


/**============== Асинхронные итераторы и генераторы =======================
 * 
 * Чтобы сделать объект итерируемым асинхронно:
 *    1) Используется Symbol.asyncIterator вместо Symbol.iterator.
 *    2) next() должен возвращать промис.
 *    3) Чтобы перебрать такой объект, используется цикл "for await (let item of iterable)".
 */
let range = {
  from: 1,
  to: 5,

  // for await..of вызывает этот метод один раз в самом начале
  [Symbol.asyncIterator]() { // (1)
    // ...возвращает объект-итератор:
    // далее for await..of работает только с этим объектом,
    // запрашивая у него следующие значения вызовом next()
    return {
      current: this.from,
      last: this.to,

      // next() вызывается на каждой итерации цикла for await..of
      async next() { // (2)
        // должен возвращать значение как объект {done:.., value :...}
        // (автоматически оборачивается в промис с помощью async)

        // можно использовать await внутри для асинхронности:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }

})()


// Оператор расширения ... не работает асинхронно

// Асинхронные генераторы
async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

    // ура, можно использовать await!
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1, потом 2, потом 3, потом 4, потом 5
  }

})();


// Можно использовать синх.ген-р с промисом
function* ids(...args) {
    let i = 0;
    while (args.length > i) {
        const i = args[i++];
        if (id === undefined) return Promise.resolve(-1);
        yield Promise.resolve(id);
    }
}
const id = ids(1011, 1078, 1292, 1731, undefined, 1501, 1550);
Promise.all([...id]).then(console.log);     // здесь можно "...", т.к. синхр.