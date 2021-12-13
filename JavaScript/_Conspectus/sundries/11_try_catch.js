
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
    // код...
} catch (err) {
    // обработка ошибки
}


/**
 * Свойства объекта ошибки:
 *      name    - Имя ошибки
 *      message - Текстовое сообщение о деталях ошибки 
 *      stack   - (в нек. окружениях) Текущий стек вызова
 */

//  Если нам не нужны детали ошибки, в catch можно её пропустить:
try {
   // ...
} catch { //  <-- без (err)
   // ...
}


/**
 * Технически в качестве объекта ошибки можно передать что угодно.
 * В JavaScript есть встроенные конструкторы для стандартных ошибок: 
 *      Error, SyntaxError, ReferenceError, TypeError и другие.
 */
let error = new Error(message);
alert(error.name); // Error
alert(error.message); //  Ого, ошибка! o_O
// или
let error = new SyntaxError(message);
let error = new ReferenceError(message);
let json = '{ "age": 30 }'; // данные неполны


// генерация ошибок через throw:
let json = '{ "age": 30 }'; // данные неполны
try {

let user = JSON.parse(json); // выполнится без ошибок, но нужно выкинуть error

if (!user.name) {
    throw new SyntaxError("Данные неполны: нет имени"); // (*)
}

alert( user.name );

} catch(e) {

    if (e.name == "SyntaxError") {
        alert( "JSON Error: " + e.message );
    /**
     * Блок catch должен обрабатывать только те ошибки, которые ему известны, 
     *      и «пробрасывать» все остальные.
     */
    } else {
        throw e; // проброс (*)
    }
}


function readData() {
    let json = '{ "age": 30 }';
  
    try {
      // ...
      blabla(); // ошибка!
    } catch (e) {
      // ...
      if (e.name != 'SyntaxError') {
        throw e; // проброс исключения (не знаю как это обработать)
      }
    }
}
  
try {
    readData();
} catch (e) {
    alert( "Внешний catch поймал: " + e ); // поймал!
}


// finally срабатывает при любом выходе из try..catch, в том числе и return.
try {
    // ... пробуем выполнить код...
} catch(e) {
    // ... обрабатываем ошибки ...
} finally {
    // ... выполняем всегда ...
}


try {
    alert( 'try' );
    if (confirm('Сгенерировать ошибку?')) BAD_CODE();
  } catch (e) {
    alert( 'catch' );
  } finally {
    alert( 'finally' );
  }


/**
 * try..finally
 * Ошибка всегда выпадает наружу, но finally отрабатывает до того, 
 *      как поток управления выйдет из функции
 */
function func() {
    // начать делать что-то, что требует завершения (например, измерения)
    try {
      // ...
    } finally {
      // завершить это, даже если все упадёт
    }
}


/**
 * Глобальный catch.
 * В Node.js для этого есть process.on("uncaughtException").
 * А в браузере:
 */
window.onerror = function(message, url, line, col, error) {
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
 * Расширение Error.
 * Лучше наследоваться от Error.
 */

// "Псевдокод" встроенного класса Error, определённого самим JavaScript
class Error {
    constructor(message) {
      this.message = message;
      this.name = "Error"; // (разные имена для разных встроенных классов ошибок)
      this.stack = stack;  // стек вызовов. Нестандартное свойство, но обычно поддерживается
    }
  }

class MyError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("Нет свойства: " + property);
    this.property = property;
  }
}

// name корректное
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
  
// Применение
function readUser(json) {
    let user = JSON.parse(json);
  
    if (!user.age) {
      throw new PropertyRequiredError("age");
    }
    if (!user.name) {
      throw new PropertyRequiredError("name");
    }  
    return user;
}
  
try {
    let user = readUser('{ "age": 25 }');
} catch (err) {
    if (err instanceof ValidationError) {
      alert("Неверные данные: " + err.message); // Неверные данные: Нет свойства: name
      alert(err.name); // PropertyRequiredError
      alert(err.property); // name
    } else if (err instanceof SyntaxError) {
      alert("Ошибка синтаксиса JSON: " + err.message);
    } else {
      throw err; // неизвестная ошибка, повторно выбросит исключение
    }
}
// вместо (err instanceof SyntaxError) можно
//      } else if (err.name == "SyntaxError") {
// Версия с instanceof лучше, если в будущем нужно расширить ValidationError.


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
const sum = (a, b) => new Promise((resolve, reject) => {
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


