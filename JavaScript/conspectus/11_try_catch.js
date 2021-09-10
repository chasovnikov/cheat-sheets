
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