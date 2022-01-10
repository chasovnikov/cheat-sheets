// Промисы: обработка ошибок
// .catch перехватывает все виды ошибок в промисах: будь то вызов reject() или ошибка,
//    брошенная в обработчике при помощи throw

// простой пример
fetch('https://no-such-server.blabla') // ошибка: нет такого сайта
  .then(response => response.json())
  .catch(console.error); // TypeError: failed to fetch (текст может отличаться)

// reject или trow
new Promise((resolve, reject) => {
  // reject(new Error('Ошибка!')); // работает
  // throw new Error('Ошибка!'); // можно и так, но есть нюанс (ниже)

  setTimeout(() => {
    reject(new Error('Сработает!')); // .catch() сработает
    // throw new Error('Не сработает!'); // .catch() не сработает с alert в браузере
  }, 1000);
}).catch(alert); // alert!!

// throw работает и в .then
// .then может быть после .catch
new Promise(resolve => resolve('ок'))
  .then(result => {
    throw new Error('Ошибка!'); // генерируем ошибку
  })
  .catch(error => console.error('Ошибка обработана, продолжить работу'))
  .then(() => console.log('Управление перейдёт в следующий then'));

// trow внутри .catch перебросит ошибку к следующему .catch
new Promise((resolve, reject) => {
  throw new Error('Ошибка!');
})
  .catch(error => {
    if (error instanceof URIError) {
      // обрабатываем ошибку
    } else {
      console.error('Не могу обработать ошибку');

      throw error; // пробрасывает в следующий catch
    }
  })
  .then(() => console.log('Этот .then не выполнится'))
  .catch(error => console.error(`Неизвестная ошибка: ${error}`))
  .then(() => console.log('Управление перейдёт в следующий then'));

// В браузере мы можем поймать необработанные ошибки, используя событие 'unhandledrejection'
window.addEventListener('unhandledrejection', function (event) {
  // объект события имеет два специальных свойства:
  console.log(event.promise); // [object Promise] - промис, который сгенерировал ошибку
  console.log(event.reason); // Error: Ошибка! - объект ошибки, которая не была обработана
});
