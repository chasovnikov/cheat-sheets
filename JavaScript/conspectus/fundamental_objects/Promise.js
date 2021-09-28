
/**
 * Promise(Обещание) - предназначено для упрощения асинхронного программирования.
 * Объекты Promise позволяют выражать вложенные колбэки в виде цепочки.
 * Фундаментальный факт асинхронного программирования: оно нарушает обработку исключений.
 * Объекты Promise стандартизируют методику обработки 
 * ошибок и предлагают способ корректного распространения ошибок через цепочку объектов.
 * Их нельзя использовать для представления повторяющихся асинхронных вычислений.
 * Promise может находиться в трёх состояниях:
 *      1) ожидание (pending): начальное состояние, не исполнен и не отклонён.
 *      2) исполнено (fulfilled): операция завершена успешно.
 *      3) отклонено (rejected): операция завершена с ошибкой.
 * Внутренние свойства:
 *      state («состояние») — вначале "pending" («ожидание»), потом меняется 
 *          на "fulfilled" («выполнено успешно») при вызове resolve или 
 *          на "rejected" («выполнено с ошибкой») при вызове reject.
 *      result («результат») — вначале undefined, далее изменяется на value 
 *          при вызове resolve(value) или на error при вызове reject(error).
 * Может быть что-то одно: либо результат, либо ошибка.
 * На завершённых промисах обработчики запускаются сразу.
 * Методы для обработки результата:
 *      .then/.catch/.finally
 * Статич.методы:
 *  Promise.all(iterable)
 *      Ожидает исполнения всех промисов или отклонения любого из них.
 *      Завершается с ошибкой, если она возникает в любом из переданных промисов.
 *      Promise.all ничего не делает для их отмены, так как в промисах вообще нет 
 *          концепции «отмены».
 *      Promise.all(iterable) разрешает передавать не-промисы в 
 *          iterable (перебираемом объекте)
 *  Promise.allSettled(iterable)
 *      Ожидает завершения всех полученных промисов (в отличие от all()).
 *  Promise.race(iterable)
 *      Ожидает исполнения или отклонения любого из полученных промисов.
 *  Promise.reject(reason)
 *      Возвращает промис, отклонённый из-за reason.
 *  Promise.resolve(value)
 *      Возвращает промис, исполненный с результатом value.
 */
let promise = new Promise(function(resolve, reject) {
    // функция-исполнитель (executor)
});
/**
 * executor, когда получает рез-т, должен вызывать один из этих колбэков:
 *      resolve(value) — если работа завершилась успешно, с результатом value.
 *      reject(error) — если произошла ошибка, error – объект ошибки.
 */

promise.then(
    function(result) { /* обработает успешное выполнение */ },
    function(error) { /* обработает ошибку, но лучше использовать .catch() */ }
);

// пример
let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
});
  
// resolve запустит первую функцию, переданную в .then
promise.then(
    result => alert(result), // выведет "done!" через одну секунду
    error => alert(error) // не будет запущена
);

// Если заинтересованы только в результате успешного выполнения
promise.then(alert); // выведет "done!" спустя одну секунду
// Если заинтересованы только в ошибке
promise.then(null, alert);

// .catch(f) это тоже самое, что .then(null, f)
promise.catch(alert); // выведет "Error: Ошибка!" спустя одну секунду

/**
 * Обработчик, вызываемый из finally, не имеет аргументов.
 * Обработчик finally «пропускает» результат или ошибку дальше, к последующим обработчикам.
 */
new Promise((resolve, reject) => {
    setTimeout(() => resolve("result"), 2000)
  })
    .finally(() => alert("Промис завершён"))
    .then(result => alert(result)); // <-- .then обработает результат


// Вместо вложенных колбэков
const p = new Promise( (resolve, reject) => {
    setTimeout(() => {
        console.log('Preparing data...');
        const backenData = {
            server: 'aws',
            port: 2000,
            status: 'working',
        };
        resolve(backenData);
    }, 2000);
});

p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data.modified = true;
            resolve(data);
            // reject(data);
        }, 2000);
    });
})
    .then(clientData => {
        console.log('Data received', clientData);
        clientData.fromPromise = true;
        return clientData;
    })
    .then(data => {
        console.log('Modified', data);        
    })
    .catch(err => console.log('Error: ', err))    // вызывется, если указан reject()
    .finally(() => console.log('Finally'));       // вызывается в любом случае


// лаконичная альтернатива setTimout-у
const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
};

sleep(2000).then(() => console.log('After 2 sec'));

Promise.all( [sleep(2000), sleep(5000)] )
    .then(() => {       // сработает после всех промисов в массиве
        console.log('All promises');
    });

Promise.race( [sleep(2000), sleep(5000)] )
    .then(() => {       // сработает после первого промиса в массиве
        console.log('All promises');
    });


/**
 * Обработчики промисов .then/.catch/.finally всегда асинхронны. Это
 * означает, что они начнут выполнятся только после того, как
 * выполнится весь неасинхронный код ("очередь микрозадач").
 */



/**
 * async
 * Результат ф-ии будет оборачиваться в завершившийся успешно промис
 * Обязывает ф-ию всегда возвращать промис.
 * Позволяет использовать await в теле этой функции.
 */
async function f() {
    return 1;       // здесь вернёт Promise.resolve(1)
}
f().then(alert); // 1


/**
 * await заставит интерпретатор ждать до тех пор, пока промис не выполнится.
 * «Синтаксический сахар» для получения результата промиса, более наглядный, 
 *      чем promise.then.
 * Работает только внутри async–функций.
 * Как и promise.then, await позволяет работать с промис–совместимыми объектами.
 */
let value = await promise;

// await нельзя использовать на верхнем уровне вложенности (вне функции).
(async () => {
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();
    // ...
  })();

// await выбрасывает исключение (как throw), если код завершается с ошибкой.
async function f() {
  await Promise.reject(new Error("Упс!"));
}

// ловля ошибки с await
async function f() {

    try {
        let response = await fetch('http://no-such-url');
    } catch(err) {
            alert(err); // TypeError: failed to fetch
    }
}
f();
// или
async function f() {
    let response = await fetch('http://no-such-url');
}
// f() вернёт промис в состоянии rejected
f().catch(alert); // TypeError: failed to fetch // (*)

/**
 * Получить ссылку на AsyncFunction для установления:
 *      явл-ся пришедшие идентификаотры асинхронными.
 */
const AsyncFunction = (async () => {}).constructor;