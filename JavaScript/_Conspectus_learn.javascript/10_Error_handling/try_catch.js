try {
  // код...
} catch (err) {
  // обработка ошибки
} finally {
  // выполнится в любом случае
}

// Чтобы try..catch работал, код должен быть выполнимым
// Он не сработает, если код синтаксически неверен

// try..catch работает синхронно
// функция выполняется позже, когда движок уже покинул конструкцию try..catch
try {
  setTimeout(function () {
    noSuchVariable; // скрипт упадёт тут
  }, 1000);
} catch (e) {
  console.log(e); // не сработает
}

// Объект ошибки -----------------

// Для всех встроенных ошибок этот объект имеет свойства:
//  name     - Имя ошибки. Например, для неопределённой переменной это "ReferenceError".
//  message  - Текстовое сообщение о деталях ошибки.
//  stack    - Стэк вызовов
try {
  noSuchVariable; // скрипт упадёт тут
} catch (e) {
  console.log(e.name); // ReferenceError
  console.log(e.message); // noSuchVariable is not defined
  console.log(e.stack); // ReferenceError: noSuchVariable is not defined ...
  console.log(e); // ReferenceError: noSuchVariable is not defined ...
}

// Блок «catch» без переменной ----------------
// Если нам не нужны детали ошибки, в catch можно её пропустить:
try {
  // ...
} catch {
  // ...
}

// Использование «try…catch» --------------------

let json = '{ некорректный JSON }';
try {
  let user = JSON.parse(json); // JSON.parse генерирует ошибку
  console.log(user.name); // не сработает
} catch (e) {
  // ...выполнение прыгает сюда
  console.log('Извините, в данных ошибка, мы попробуем получить их ещё раз.');
  console.log(e.message);
}

// Генерация собственных ошибок (trow) ------------------

// Что если json синтаксически корректен, но не содержит необходимого свойства name
let json = '{ "age": 30 }'; // данные неполны
try {
  let user = JSON.parse(json); // <-- выполнится без ошибок

  if (!user.name) {
    throw new SyntaxError('Данные неполны: нет имени'); // (*)
  }

  console.log(user.name);
} catch (e) {
  console.log('JSON Error: ' + e.message); // JSON Error: Данные неполны: нет имени
}

// Проброс исключения -------------------------
// Блок catch должен обрабатывать только те ошибки, которые ему известны,
// и «пробрасывать» все остальные.
/*
Техника «проброс исключения» выглядит так:
 • Блок catch получает все ошибки.
 • В блоке catch(err) {...} мы анализируем объект ошибки err.
 • Если мы не знаем как её обработать, тогда делаем throw err.
*/
function readData() {
  let json = '{ "age": 30 }'; // данные неполны

  try {
    let user = JSON.parse(json);
    if (!user.name) {
      throw new SyntaxError('Данные неполны: нет имени');
    }

    blabla(); // неожиданная ошибка

    alert(user.name);
  } catch (e) {
    // ...
    if (e.name != 'SyntaxError') {
      throw e; // проброс исключения (не знаю как это обработать)
    }
    alert('JSON Error: ' + e.message);
  }
}

// Внешний try..catch
try {
  readData();
} catch (e) {
  alert('Внешний catch поймал: ' + e); // поймал!
}

// try…catch…finally ---------------------------
// Если секция есть, то она выполняется в любом случае

// Переменные внутри try..catch..finally локальны
// Блок finally срабатывает при любом выходе из try..catch, в том числе и return
function func() {
  try {
    return 1;
  } catch (e) {
    /* ... */
  } finally {
    alert('finally'); // выполняем всегда
  }
}

alert(func()); // сначала срабатывает alert из finally, а затем этот код

// Конструкция try..finally без секции catch также полезна
function func() {
  try {
    // ...
  } finally {
    // завершить это, даже если все упадёт
  }
}

// Глобальный catch --------------------------

// в Node.js для этого есть process.on("uncaughtException")
// А в браузере мы можем присвоить функцию специальному свойству window.onerror,
// которая будет вызвана в случае необработанной ошибки.
window.onerror = function (message, url, line, col, error) {
  // ...
};

/*
Существуют также веб-сервисы, которые предоставляют логирование ошибок для таких случаев, 
такие как https://errorception.com или http://www.muscula.com.
Они работают так:
1. Мы регистрируемся в сервисе и получаем небольшой JS-скрипт (или URL скрипта) от них для 
вставки на страницы.
2. Этот JS-скрипт ставит свою функцию window.onerror.
3. Когда возникает ошибка, она выполняется и отправляет сетевой запрос с информацией о ней в сервис
4. Мы можем войти в веб-интерфейс сервиса и увидеть ошибки.
*/
