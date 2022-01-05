/**
 * При ошибке в блоке try {…} скрипт не «падает», и мы получаем
 *      возможность обработать ошибку внутри catch
 * err (можно использовать любое имя) содержит объект ошибки
 *      с подробной информацией о произошедшем.
 * try..catch работает только для ошибок, возникающих во время выполнения кода,
 *      но не во время чтения. Поэтому он не сработает, если код синтаксически
 *      неверен, например, содержит несовпадающее количество фигурных скобок
 * Чтобы поймать исключение внутри запланированной функции, try..catch должен
 *      находиться внутри самой этой функции.
 */
try {
  noSuchVariable; // скрипт упадёт тут
} catch (e) {
  // Имя ошибки:
  console.log(e.name); // ReferenceError
  // Текстовое сообщение о деталях ошибки:
  console.log(e.message); // noSuchVariable is not defined
  // Стэк вызовов:
  console.log(e.stack); // ReferenceError: noSuchVariable is not defined ...
  console.log(e); // ReferenceError: noSuchVariable is not defined ...
} finally {
  // выполнится в любом случае
}

//  Если нам не нужны детали ошибки, в catch можно её пропустить:
try {
  // ...
} catch {
  // ...
}

// Конструкция try..finally без секции catch также полезна
try {
  // ...
} finally {
  // завершить это, даже если все упадёт
}

// try..catch работает синхронно
try {
  // функция выполняется позже, когда движок уже покинул конструкцию try..catch
  setTimeout(function () {
    noSuchVariable; // скрипт упадёт тут
  }, 1000);
} catch (e) {
  console.log(e); // не сработает
}

// Генерация собственных ошибок (trow) -------------------
function readData() {
  let json = '{ "age": 30 }'; // данные неполны

  try {
    let user = JSON.parse(json);
    if (!user.name) {
      throw new SyntaxError('Данные неполны: нет имени');
    }

    blabla(); // неожиданная ошибка

    console.log(user.name);
  } catch (e) {
    // ...
    if (e.name != 'SyntaxError') {
      throw e; // проброс исключения (не знаю как это обработать)
    }
    console.log('JSON Error: ' + e.message);
  }
}

// Внешний try..catch
try {
  readData();
} catch (e) {
  alert('Внешний catch поймал: ' + e); // поймал!
}

// Глобальный catch --------------------------
// в Node.js для этого есть:
process.on('uncaughtException');
// А в браузере:
window.onerror = function (message, url, line, col, error) {
  alert(`${message}\n В ${line}:${col} на ${url}`);
};
function readData() {
  badFunc(); // Ой, что-то пошло не так!
}
readData();

/**
 * Существуют также веб-сервисы, которые предоставляют логирование
 *      ошибок для таких случаев, такие как https://errorception.com
 *      или http://www.muscula.com.
 */

/**
 * Расширение Error -----------------------------------------
 * Лучше наследоваться от Error
 */
// Наши ошибки должны поддерживать базовые свойства: message, name и stack

// "Псевдокод" встроенного класса Error, определённого самим JavaScript
class Error {
  constructor(message) {
    this.message = message;
    this.name = 'Error'; // (разные имена для разных встроенных классов ошибок)
    this.stack = stack; // стек вызовов. Нестандартное свойство, но обычно поддерживается
  }
}

class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends MyError {}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super('Нет свойства: ' + property);
    this.property = property;
  }
}

// name корректное
alert(new PropertyRequiredError('field').name); // PropertyRequiredError

// Применение
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError('age');
  }
  if (!user.name) {
    throw new PropertyRequiredError('name');
  }
  return user;
}

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    alert('Неверные данные: ' + err.message); // Неверные данные: Нет свойства: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
  } else if (err instanceof SyntaxError) {
    alert('Ошибка синтаксиса JSON: ' + err.message);
  } else {
    throw err; // неизвестная ошибка, повторно выбросит исключение
  }
}
// вместо (err instanceof SyntaxError) можно
//      } else if (err.name == "SyntaxError") {
// Версия с instanceof лучше, если в будущем нужно расширить ValidationError.

// ---------------------------------------------
const sum = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return [null, a + b];
  } else {
    // для совместимости контракта синхронных ф-ий с контрактом колбэков (асинхр.)
    return [new Error('a and b should be numbers')];
  }
};

// на колбэках
const sum = (a, b, callback) => {
  if (typeof a === 'number' && typeof b === 'number') {
    callback(null, a + b);
  } else {
    callback(new Error('a and b should be numbers'));
  }
};

sum(2, 3, (err, result) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(result);
});

// обработка ошибок с промисами
const sum = (a, b) =>
  new Promise((resolve, reject) => {
    if (typeof a === 'number' && typeof b === 'number') {
      resolve(a + b);
    } else {
      reject(new Error('a and b should be numbers'));
    }
  });

sum(2, 3)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err.message);
  });

// async-await
const sum = async (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else {
    throw new Error('a and b should be numbers');
  }
};

(async () => {
  try {
    console.log(await sum(2, 3));
  } catch (e) {
    console.log(message);
  }
})();
