// Обработчики промисов .then/.catch/.finally всегда асинхронны
const promise = Promise.resolve();
promise.then(() => console.log('промис выполнен'));
console.log('код выполнен');
// код выполнен (показывается первым)
// промис выполнен

// Это происходит потому, что когда промис выполнен, его обработчики
//    .then/catch/finally попадают в  «очередь микрозадач (microtask queue)»

// Если важен порядок выполнения
Promise.resolve()
  .then(() => alert('промис выполнен!'))
  .then(() => alert('код выполнен'));

// Необработанные ошибки ----------------------------

let promise = Promise.reject(new Error('Ошибка в промисе!'));
setTimeout(() => promise.catch(err => alert('поймана')), 1000);
// Ошибка в промисе!
window.addEventListener('unhandledrejection', event => alert(event.reason));
// Теперь, при запуске, мы сначала увидим «Ошибка в промисе!», а затем «поймана».
// событие unhandledrejection возникает, когда очередь микрозадач завершена:
//    движок проверяет все промисы и, если какой-либо из них в состоянии «rejected»,
//    то генерируется это событие
