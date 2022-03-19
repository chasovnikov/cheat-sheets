
/*
Декоратор – это обёртка вокруг функции, которая изменяет поведение последней. 
Основная работа по-прежнему выполняется функцией.
*/

/// Кеширующий декоратор
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // создание одного ключа из arguments
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments);
    cache.set(key, result);

    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);
console.log( worker.slow(3, 5) ); // работает
console.log( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)



/// Декоратор-шпион
// сохраняет все вызовы функции в своём свойстве calls
function spy(func) {

  function wrapper(...args) {
    wrapper.calls.push(args);
    return func.apply(this, arguments);
  }

  wrapper.calls = [];

  return wrapper;
}

// произвольная функция или метод
function work(a, b) {
  alert( a + b ); 
}

work = spy(work);
work(1, 2);         // 3
work(4, 5);         // 9
for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}



/// Задерживающий декоратор
// задерживает каждый вызов f на ms миллисекунд
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);
f1000("test"); // показывает "test" после 1000 мс



/// Декоратор debounce
// гарантирует, что последующие вызовы будут игнорироваться в течение ms
// полезен для функций, которые получают/обновляют данные
function debounce(f, ms) {
  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  }
}

let f = debounce(alert, 1000);
f(1); // выполняется немедленно
f(2); // проигнорирован
setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout( () => f(4), 1100); // выполняется
setTimeout( () => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)



/// Тормозящий (throttling) декоратор
// возвращает обёртку, передавая вызов в f не более одного раза в ms миллисекунд. 
// Те вызовы, которые попадают в период «торможения», игнорируются.
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

function f(a) {
  console.log(a)
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано