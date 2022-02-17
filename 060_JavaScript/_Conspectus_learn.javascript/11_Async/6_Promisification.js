// Промисификация - это процесс преобразования функций, основанный на cb ,
//    в функции, которые возвращают объект Promise

// Пример: ф-ия с колбэком
function loadScript(src, callback) {
  // Код ...
}

// Промисификация (передаем вызов loadScript() в объект промиса)
const loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// использование:
loadScriptPromise('path/script.js').then(/*...*/);

// Функция-помощник
function promisify(f) {
  return function (...args) {
    // возвращает функцию-обёртку
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        // наш специальный колбэк для f
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // добавляем колбэк в конец аргументов f

      f.call(this, ...args); // вызываем оригинальную функцию
    });
  };
}

// использование:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(/*...*/).then(/*...*/);

// promisify(f, true), чтобы получить массив результатов [res1, res2, ...]
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        // наш специальный колбэк для f
        if (err) {
          return reject(err);
        } else {
          // делаем resolve для всех results колбэка, если задано manyArgs
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// использование:
f = promisify(f, true);
// f(...).then(arrayOfResults => ..., err => ...)
