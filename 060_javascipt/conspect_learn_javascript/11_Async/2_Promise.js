new Promise(function (resolve, reject) {
  // функция-исполнитель (executor)
  setTimeout(() => resolve('done'), 1000);
  // setTimeout(() => reject(new Error("Whoops!")), 1000);
}).then(
  result => console.log(result), // 1-й аргумент then обработает успешное выполнение
  error => console.log(error) // 2-й аргумент then обработает ошибку
);

/* Вызов одного из колбэков по завершении executor-а:
resolve(value) — если работа завершилась успешно, с результатом value.
reject(error) — если произошла ошибка, error – объект ошибки.
*/

// Объект promise имеет внутренние свойства (мы не имеем к ним прямого доступа):
// state  («состояние»):
//    pending   - («ожидание»)
//    fulfilled - («выполнено успешно») при вызове resolve
//    rejected  - («выполнено с ошибкой») при вызове reject
// result   («результат»):
//    undefined - вначале
//    value     - при вызове resolve(value)
//    error     - при вызове reject(error)

// Исполнитель должен вызвать что-то одно: resolve или reject.
// Состояние промиса может быть изменено только один раз.
// Все последующие вызовы resolve и reject будут проигнорированы
let promise = new Promise(function (resolve, reject) {
  resolve('done');

  reject(new Error('…')); // игнорируется
  setTimeout(() => resolve('…')); // игнорируется
});

// Вызывайте reject с объектом Error (или унаследованный от него)

// resolve или reject могут быть вызваны сразу:
let promise = new Promise(function (resolve, reject) {
  // задача, не требующая времени
  resolve(123); // мгновенно выдаст результат: 123
});

promise.then(
  result => alert(result), // 1-й аргумент then обработает успешное выполнение
  error => alert(error) // 2-й аргумент then обработает ошибку
);

// .catch(f) это то же самое, что promise.then(null, f)
promise.catch(alert);

// finally
new Promise((resolve, reject) => {
  /* сделать что-то, что займёт время, и после вызвать resolve/reject */
})
  // выполнится, когда промис завершится, независимо от того, успешно или нет
  .finally(() => 'остановить индикатор загрузки')
  .then(
    result => 'показать результат',
    err => 'показать ошибку'
  );

// Пример
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
  });
}

// Применение:
let promise = loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js');
promise.then(
  script => alert(`${script.src} загружен!`),
  error => alert(`Ошибка: ${error.message}`)
);
promise.then(script => alert('Ещё один обработчик...'));
