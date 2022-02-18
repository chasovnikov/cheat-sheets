// async перед объявлением функции/метода:
//    1. Обязывает её всегда возвращать промис.
//    2. Позволяет использовать await в теле этой функции.

async function f() {
  return 1; // Равносильно: return Promise.resolve(1);
}

// Теперь можно применять then()
f().then(console.log()); // 1

// Await --------------------------

// await заменяет then
async function f() {
  let promise = new Promise(resolve => setTimeout(() => resolve('готово!'), 1000));

  // Вместо: promise.then(result => console.log);
  let result = await promise; // будет ждать, пока промис не выполнится
  console.log(result);
}

f();

// await нельзя использовать в обычных функциях
// await нельзя использовать на верхнем уровне вложенности
// await работает с «thenable»–объектами

// Обработка ошибок ---------------------------------

async function f() {
  await Promise.reject(new Error('Упс!')); // Равносильно:  throw new Error("Упс!");
}

// Можно использовать try..catch
async function f() {
  try {
    let response = await fetch('http://no-such-url');
  } catch (err) {
    alert(err);
  }
}

f();

// -------------------------
// async/await отлично работает с Promise.all
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  // ...
]);
