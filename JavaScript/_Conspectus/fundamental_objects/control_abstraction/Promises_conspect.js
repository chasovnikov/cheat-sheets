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
 */

new Promise((resolve, reject) => {
  // функция-исполнитель (executor)
  // Успешное завершение
  setTimeout(() => resolve('done'), 1000); // передается в 1й аргумент .then()

  // Завершение с ошибкой
  // reject(new Error('…')); // передается в 1й аргумент .then() или в .catch()

  // Можно вызвать что-то одно: resolve или reject
  reject(new Error('…')); // игнорируется
  setTimeout(() => resolve('…')); // игнорируется
})
  // выполнится, когда промис завершится, независимо от того, успешно или нет
  .finally(() => 'остановить индикатор загрузки')
  .then(
    result => 'показать результат' // обработка результата
    // err => 'показать ошибку' // 2-й аргумент then () используется вместо catch()
  )
  .then(result => 'еще результат')
  // .catch(f) это то же самое, что promise.then(null, f)
  .catch(err => 'показать ошибку'); // обработка ошибок

// --------------------------------------
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
