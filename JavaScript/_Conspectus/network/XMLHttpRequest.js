
/**
 * XMLHttpRequest.open(method, url[, async[, user[, password]]]);
 *      это встроенный в браузер объект, который даёт возможность делать 
 *      HTTP-запросы к серверу без перезагрузки страницы.
 * @param {string} method:
 *      GET     - получение данных
 *      POST    - создание
 *      PUT     - полное обновление элемента
 *      PATCH   - частиное обновление элемента
 *      DELETE  - удаление
 * 
 * В отличие от fetch позволяет отслеживать прогресс отправки на сервер и
 *      поддерживается старыми браузерами.
 * 
 * XMLHttpRequest имеет два режима работы: синхронный и асинхронный.
 */

/**
 * Асинхронный
 *  (синхронный: если в open() установлен async --> false. Тогда send() заблокирует прогу.
 *  запрос на другой домен или установка таймаута, недоступны для синхронных запросов.)
 */

// 1. Создаём новый XMLHttpRequest-объект
let xhr = new XMLHttpRequest();


// 2. Настраиваем его: GET-запрос по URL /article/.../load
// xhr.open(method, URL, [async, user, password])
xhr.open('GET', '/article/xmlhttprequest/example/load');
// xhr.open('GET', '/article/xmlhttprequest/example/load', false);  // синхронно


/**
 * Указать ожидаемый тип ответа:
 *      "" (по умолчанию)   – строка,
 *      "text"              – строка,
 *      "arraybuffer"       – ArrayBuffer (для бинарных данных),
 *      "blob"              – Blob (для бинарных данных, смотрите в Blob),
 *      "document"          – XML-документ (может использовать XPath и другие XML-методы),
 *      "json"              – JSON (парсится автоматически).
 */
xhr.responseType = 'json';      // хотим ответ json


// Задать таймаут. По истечении прервется запрос и произойдет событие timeout
xhr.timeout = 10000;    // недоступен для синхронных запросов


/**
 * Текущее состояние можно посмотреть в свойстве xhr.readyState
 *      UNSENT           = 0;   // исходное состояние
 *      PENED            = 1;   // вызван метод open
 *      HEADERS_RECEIVED = 2;   // получены заголовки ответа
 *      LOADING          = 3;   // ответ в процессе передачи (данные частично получены)
 *      DONE             = 4;   // запрос завершён
 * Состояние 3 повторяется каждый раз, когда получена часть данных.
 */
xhr.onreadystatechange = function() {   // событие: изменение состояния запроса
    if (xhr.readyState == 3) {
      // загрузка
    }
    if (xhr.readyState == 4) {
      // запрос завершён
    }
  };


// Отмена запроса
xhr.abort();    // генерируется событие abort, а xhr.status устанавливается в 0.


// 4. Этот код сработает после того, как мы получим ответ сервера
// событие: получен какой-либо ответ
xhr.onload = function() {
  if (xhr.status >= 299) {
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
  } else {
    alert(`Готово, получили ${xhr.response.length} байт`);
  }
};


// запускается периодически во время загрузки ответа
xhr.onprogress = function(event) {
    // event.loaded - количество загруженных байт
    // event.lengthComputable --> true, если сервер присылает: Content-Length
    // event.total - количество байт всего (если lengthComputable --> true)
  if (event.lengthComputable) {
    alert(`Получено ${event.loaded} из ${event.total} байт`);
  } else {
    alert(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
  }

};


// событие: запрос не может быть выполнен
xhr.onerror = function() {
  alert("Запрос не удался");
};


// Устанавливает заголовок запроса Content-Type: application/json
xhr.setRequestHeader('Content-Type', 'application/json');   // отменить невозможно.
xhr.setRequestHeader('X-Auth', '123');
xhr.setRequestHeader('X-Auth', '456');
// заголовок получится такой:
// X-Auth: 123, 456


// Возвращает значение заголовка ответа (кроме Set-Cookie и Set-Cookie2).
xhr.getResponseHeader('Content-Type');
// Между заголовками всегда стоит перевод строки в два символа "\r\n" (независимо от ОС)
let headers = xhr
  .getAllResponseHeaders()
  .split('\r\n')
  .reduce((result, current) => {
    let [name, value] = current.split(': ');
    result[name] = value;
    return result;
  }, {});
// headers['Content-Type'] = 'image/png'


// 3. Отсылаем запрос
xhr.send();


/**
 * POST, FormData
 * 
<form name="person">
  <input name="name" value="Петя">
  <input name="surname" value="Васечкин">
</form>
 */
// заполним FormData данными из формы
let formData = new FormData(document.forms.person);
formData.append("middle", "Иванович");      // добавим ещё одно поле
let xhr = new XMLHttpRequest();
xhr.open("POST", "/article/xmlhttprequest/post/user");
xhr.send(formData);
xhr.onload = () => alert(xhr.response);

// Для формата JSON
let xhr = new XMLHttpRequest();
let json = JSON.stringify({
  name: "Вася",
  surname: "Петров"
});
xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhr.send(json);


/**
 *      xhr.upload
 * 
 * - объект, без методов, только для отслеживания событий отправки.
 *      Он генерирует события, похожие на события xhr, но только во время 
 *      отправки данных на сервер:

loadstart   – начало загрузки данных.
progress    – генерируется периодически во время отправки на сервер.
abort       – загрузка прервана.
error       – ошибка, не связанная с HTTP.
load        – загрузка успешно завершена.
timeout     – вышло время, отведённое на загрузку (при установленном свойстве timeout).
loadend     – загрузка завершена, вне зависимости от того, как – успешно или нет.
 */
xhr.upload.onprogress = function(event) {
  alert(`Отправлено ${event.loaded} из ${event.total} байт`);
};
xhr.upload.onload = function() {
  alert(`Данные успешно отправлены.`);
};
xhr.upload.onerror = function() {
  alert(`Произошла ошибка во время отправки: ${xhr.status}`);
};


/**
 * Пример из реальной жизни: загрузка файла на сервер с индикацией прогресса:
<input type="file" onchange="upload(this.files[0])">
 */
function upload(file) {
  let xhr = new XMLHttpRequest();

  // отслеживаем процесс отправки
  xhr.upload.onprogress = function(event) {
    console.log(`Отправлено ${event.loaded} из ${event.total}`);
  };

  // Ждём завершения: неважно, успешного или нет
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("Успех");
    } else {
      console.log("Ошибка " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}


/**
 * Запросы на другой источник.
 * Точно так же, как и при работе с fetch, по умолчанию на другой источник 
 *      не отсылаются куки и заголовки HTTP-авторизации. 
 * Чтобы это изменить, установите xhr.withCredentials в true:
 */
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('POST', 'http://anywhere.com/request');
// ...



/**
 * Еще пример
 */
function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.open(method, url);     // откроет новое соединение

        xhr.responseType = 'json';      // хотим ответ json
        xhr.setRequestHeader('Content-Type', 'applicaton/json'); // для отправки POST

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };
        
        xhr.onerror = () => {
            console.log(xhr.response);
        };
        
        xhr.send( JSON.stringify(body) );
    });
}

const requestURL = 'https://jsonplaceholder.typicode.com/users';

sendRequest('GET', requestURL)
    .then(data => console.log(data))
    .catch(err => console.log(err));

const body = {
    name: 'Vasia',
    age: 26,
};

sendRequest('POST', requestURL, body)
    .then(data => console.log(data))
    .catch(err => console.log(err));