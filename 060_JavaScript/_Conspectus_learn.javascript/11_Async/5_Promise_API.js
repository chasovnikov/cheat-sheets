// В классе Promise есть 5 статических методов

// Promise API ----------------------------------------

// Принимает массив промисов (может принимать любой перебираемый объект)
// Ждёт завершения всех промисов
// Возращает массив результатов (порядок результатов соотв-ет порядку промисов)
// Ошибка в одном промисе завершит весь Promise.all
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000)), // 3
  4, // можно передавать не-промисы (передаётся в итоговый массив «как есть»)
  5,
]).then(console.log); // [1,2,3,4,5]

// Ещё пример
// Массив fetch-ей
const urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig',
];

Promise.all(urls.map(url => fetch(url))).then(responses =>
  responses.forEach(response => console.log(`${response.url}: ${response.status}`))
);

// Promise.all ничего не делает для отмены fetch (в случае ошибки),
//    так как в промисах вообще нет концепции «отмены»
//    Прерывание запроса делается с помощью AbortController

// Promise.allSettled ------------------------------------

// всегда ждёт завершения всех промисов (даже если ошибка)
// В массиве результатов будет:
//    {status:"fulfilled", value:результат}   для успешных завершений,
//    {status:"rejected", reason:ошибка}      для ошибок
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url',
];

Promise.allSettled(urls.map(url => fetch(url))).then(results => {
  results.forEach((result, num) => {
    if (result.status == 'fulfilled') {
      console.log(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == 'rejected') {
      console.log(`${urls[num]}: ${result.reason}`);
    }
  });
});

// Promise.race -------------------------------------

// Выполняем самый быстрый промис
Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Ошибка!')), 2000)),
  new Promise(resolve => setTimeout(() => resolve(3), 1000)),
])
  .then(console.log) // 3
  .catch(console.error);

// Promise.resolve/reject -------------------------

// Нужны, что бы использововать then,
// но редко используются, так как async/await делают их не нужным

// Создаёт успешно выполненный промис с результатом value
Promise.resolve(value);
// То же самое, что:
new Promise(resolve => resolve(value));

// Создаёт промис, завершённый с ошибкой error
Promise.reject(error);
// То же самое, что:
new Promise((resolve, reject) => reject(error));
