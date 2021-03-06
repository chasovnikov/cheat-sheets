/**
 * Fetch API предоставляет интерфейс для получения ресурсов (в том числе по сети).
 * 
 * let promise = fetch(url, [options]);   // GlobalFetch.fetch
 *      создать запрос и получить данные
 * 
 * @param {string} url     – URL для отправки запроса.
 * @param {object} options – дополнительные параметры:
 *      method  – HTTP-метод,
 *      headers – объект с запрашиваемыми заголовками (не все заголовки разрешены),
 *      body – тело запроса (текст, FormData, BufferSource, Blob или UrlSearchParams).
 *      signal - для прерывания запроса.
 * @returns Promise
 * 
 * Два этапа получения ответа:
 * 1. После прихода заголовков ответа от сервера выполняется promise c объектом Response.
 *      Можем проверить статус HTTP-запроса и определить, выполнился ли он успешно, 
 *      а также посмотреть заголовки, но пока без тела ответа:
 *          response.headers - похожий на Map объект с HTTP-заголовками.
 *          response.status  - HTTP-статус.
 *          response.ok      - возр. true, если если HTTP-статус в диапазоне 200-299.
 * 2. Для получения тела ответа нам нужно использовать дополнительный вызов метода. 
 * Response предоставляет методы для доступа к телу ответа:
 *  response.text()         – возвращает как обычный текст,
 *  response.json()         – в формате JSON,
 *  response.formData()     – как объект FormData,
 *  response.blob()         – как Blob (бинарные данные с типом),
 *  response.arrayBuffer()  – как ArrayBuffer (низкоуровн. представление бин. данных),
 *  response.body – это объект ReadableStream (считывание тела запроса по частям).
 * Мы можем выбрать только один метод чтения ответа.
 * 
 * Спецификации fetch() отличаются от jQuery.ajax() тремя основными способами:
 * 1) Промис, возвращённый из fetch(), не будет отвергнут при статусе ошибки HTTP. 
 *      Оно будет разрешаться нормально (со статусом ok установленным в false), и будет 
 *      отклоняться только при сбое в сети или если что-то помешало завершению запроса.
 * 2) fetch() может получать межсайтовые куки-файлы; таким образом вы можете установить 
 *      межсайтовую сессию используя fetch.
 * 3) fetch() не будет посылать куки-файлы, если только не указано credentials: 
 *      'same-origin'.
 */

let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);
if (response.ok) {
  let json = await response.json();
} else {
  alert("Ошибка HTTP: " + response.status);
}

// То же самое без await, с использованием промисов:
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));


/**
 * Заголовки ответа.
 * 
 * Хранятся в объекте response.headers.
 * Можем использовать такие же методы, как с Map, чтобы получить 
 *      заголовок по его имени или перебрать заголовки в цикле:
 */
let response = await fetch('https://...javascript.info/commits');
// получить один заголовок
alert(response.headers.get('Content-Type'));     // application/json; charset=utf-8
// перебрать все заголовки
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}


/**
 * Заголовки запроса.
 * 
 * Есть список запрещённых HTTP-заголовков, которые мы не можем установить:
Accept-Charset, Accept-Encoding
Access-Control-Request-Headers
Access-Control-Request-Method
Connection
Content-Length
Cookie, Cookie2
Date
DNT
Expect
Host
Keep-Alive
Origin
Referer
TE
Trailer
Transfer-Encoding
Upgrade
Via
Proxy-*
Sec-*
 * Эти заголовки обеспечивают достоверность данных и корректную работу протокола HTTP, 
 *      поэтому они контролируются исключительно браузером.
 * 
 * Для установки заголовка запроса в fetch мы можем использовать опцию headers.
 */
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});


/**
 * POST-запросы.
 * 
 * Для отправки необходимо использовать fetch параметры:
 * method   – HTTP метод, например POST,
 * body     – тело запроса, одно из списка:
 *      строка              (например, в формате JSON),
 *      объект FormData     для отправки данных как form/multipart,
 *      Blob/BufferSource   для отправки бинарных данных,
 *      URLSearchParams     для отправки данных в кодировке x-www-form-urlencoded.
 */
let user = {
  name: 'John',
  surname: 'Smith'
};

let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});

let result = await response.json();
alert(result.message);



async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      })
      .catch(
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }
  let results = await Promise.all(jobs);

  return results;
}



/**
 * Свой fetch (упрощенная внутренняя реализация).
 */
const message = document.getElementById('message');
const fetch = url => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => { // событие запускается, когда изменяется readyState 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) resolve(xhr.responseText);
            else reject(`Status Code: ${xhr.status}`);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
});
// Usage
fetch('/person')
    .then(body => message.innerHTML = body)
    .catch(err => message.innerHTML = err);


/**
 * FormData
 * 
 * let formData = new FormData([form]);
 * 
 * formData.append(name, value) – добавляет поле с именем name и значением value,
 * formData.append(name, blob, fileName) – добавляет поле для загрузки файла 
 *      <input type="file">, fileName - имя файла,
 * formData.delete(name) – удаляет поле с заданным именем name,
 * formData.get(name) – получает значение поля с именем name,
 * formData.has(name) – проверка наличия поля,
 * formData.set(name, value) - похож на formData.append, 
 *      но гарантирует, что поле будет одно с таким же имменем
 * formData.set(name, blob, fileName) -//-
 * 
 * Если в fetch указан объект FormData в свойстве тела запроса body, то 
 *  он будет закодирован и отправлен с заголовком 
 *  Content-Type: form/multipart.
 * 
 * Отправка простой формы:
 * <form id="formElem">
    <input type="text" name="name" value="John">
    <input type="text" name="surname" value="Smith">
    <input type="submit">
  </form>
 */
formElem.onsubmit = async (e) => {
    e.preventDefault();   // убирает действие события по умолчанию

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
      body: new FormData(formElem)
    });

    let result = await response.json();

    alert(result.message);
};


/**
 * Отправка формы с Blob-данными
 * 
 * Удобнее отправлять изображение не отдельно, а в составе формы, 
 *      добавив дополнительные поля для имени и другие метаданные.
 * Кроме того, серверы часто настроены на приём именно форм, а не просто бинарных данных.
 * 
 *   <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>
     <input type="button" value="Отправить" onclick="submit()">
 */
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(
          resolve => canvasElem.toBlob(resolve, 'image/png'));

      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }



/**
 * Fetch: ход загрузки.
 * 
 * fetch позволяет отслеживать процесс ПОЛУЧЕНИЯ данных, но в отличие от 
 *      XMLHttpRequest у него нет способа отслеживать процесс ОТПРАВКИ.
 * Для отслеживания можно испол-ть response.body (ReadableStream («поток для чтения»)).
 */
// Примерный код
const reader = response.body.getReader();
while(true) {
  // done – true, когда чтение закончено, иначе false.
  // value – типизированный массив данных ответа Uint8Array.
  const {done, value} = await reader.read();
  if (done) {
    break;
  }
  console.log(`Получено ${value.length} байт`);
}


// Полный рабочий пример
// Шаг 1: начинаем загрузку fetch, получаем поток для чтения
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Шаг 2: получаем длину содержимого ответа
const contentLength = +response.headers.get('Content-Length');

// Шаг 3: считываем данные:
let receivedLength = 0; // количество байт, полученных на данный момент
let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }
  chunks.push(value);
  receivedLength += value.length;

  console.log(`Получено ${receivedLength} из ${contentLength}`);
}

// Шаг 4: соединим фрагменты в общий типизированный массив Uint8Array
let chunksAll = new Uint8Array(receivedLength); // Создаем массив того же типа заданной длины
let position = 0;
for(let chunk of chunks) {
  chunksAll.set(chunk, position); // Копирование каждого фрагмента друг за другом
  position += chunk.length;
}

// Шаг 5: декодируем Uint8Array обратно в строку
let result = new TextDecoder("utf-8").decode(chunksAll);

// Готово!
let commits = JSON.parse(result);
alert(commits[0].author.login);

// если результат нам нужен в бинарном виде вместо строки
let blob = new Blob(chunks);



/**
 * Fetch: прерывание запроса
 * 
 * Для таких целей существует специальный встроенный объект: AbortController, 
 *      который можно использовать еще и для других асинхронных задач.
 * AbortController – масштабируемый, он позволяет отменить несколько вызовов 
 *      fetch одновременно.
 */
let controller = new AbortController();
/**
 * экземпляр AbortSignal, который может быть использован для 
 *      коммуникаций/останова DOM запросов.
 */
let signal = controller.signal;
// срабатывает при вызове controller.abort()
signal.addEventListener('abort', () => alert("отмена!"));
controller.abort();     // отмена!
alert(signal.aborted);  // true


// прервать через 1 секунду
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);
try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // обработать ошибку от вызова abort()
    alert("Прервано!");
  } else {
    throw err;
  }
}


// Параллельные запросы
let urls = [/*...*/];       // список URL для параллельных fetch
let controller = new AbortController();
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));
let results = await Promise.all(fetchJobs);
// если откуда-то вызвать controller.abort(),
// то это прервёт все вызовы fetch


/**
 * Можем использовать один AbortController для остановки собственных асинхронных 
 *      задач вместе с fetch. Нужно лишь слушать его событие abort.
 */
let urls = [/*...*/];
let controller = new AbortController();
let ourJob = new Promise((resolve, reject) => { // наша задача
//   ...
  controller.signal.addEventListener('abort', reject);
});
let fetchJobs = urls.map(url => fetch(url, { // запросы fetch
  signal: controller.signal
}));
// ожидать выполнения нашей задачи и всех запросов
let results = await Promise.all([...fetchJobs, ourJob]);
// вызов откуда-нибудь ещё:
// controller.abort() прервёт все вызовы fetch и наши задачи

/**
 * Был кейс когда работал с редакс-сагой, есть кнопка которая делает фетч 
 * чтобы запросить данные, и вот если клиент будет тыкать на нее 100500 
 * раз то пошлётся 100500 запросов на сервер и он их все будет обрабатывать, 
 * нам такое поведение совершено не нужно, поэтому мы проверяем если промис 
 * еще в состоянии пендинг и запрос отсылается еще раз, то мы отменяем 
 * предыдущий дабы не перенагружать лишний раз интернет клиента, тем более 
 * подгружать данные на телефоне более затратно чем с десктопа
 */


/**
 * Fetch: запросы на другие сайты.
 * fetch на другой веб-сайт завершится неудачей.
 * Запросы на другой источник – отправленные на другой домен (или даже поддомен), 
 *      или протокол, или порт – требуют специальных заголовков от удалённой стороны.
 * Эта политика называется «CORS»: Cross-Origin Resource Sharing 
 *      («совместное использование ресурсов между разными источниками»).
 */
try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // Failed to fetch
}

/**
 * Простые запросы
 * это запрос, удовлетворяющий следующим условиям:
Простой метод: GET, POST или HEAD
Простые заголовки – разрешены только:
    Accept,
    Accept-Language,
    Content-Language,
    Content-Type со значением application/x-www-form-urlencoded, 
        multipart/form-data или text/plain.

 * «простой запрос» может быть сделан через <form> или <script>, 
        без каких-то специальных методов.
 * Любой другой запрос считается «непростым».
 */
/**
 * Когда мы делаем непростой запрос, браузер посылает 
 *      предзапрос («preflight»), запрашивая разрешения на запрос.
 */

/**
 * CORS для простых запросов
 * 
 * При запросе на другой источник браузер всегда ставит «от себя» заголовок Origin,
 *      содержащий источник (домен/протокол/порт), без пути.
 * ответа сервера, который разрешает доступ:
 *      200 OK
 *      Content-Type:text/html; charset=UTF-8
 *      Access-Control-Allow-Origin: https://javascript.info
 */

/**
 * Заголовки ответа
 * 
 * При запросе к другому источнику можно получить доступ только к «простым» заголовкам:
Cache-Control
Content-Language
Content-Type
Expires
Last-Modified
Pragma

Чтобы разрешить другие заголовки, сервер должен указать 
    Access-Control-Expose-Headers 
        со списком разрешенных заголовков.
 */

/**
 * «Непростые» запросы
 */
let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',                      // 1-я причина "непростого" запроса
  headers: {
    'Content-Type': 'application/json', // 2-я причина "непростого" запроса
    'API-Key': 'secret',                // 3-я причина "непростого" запроса
  }
});
/**
 * Шаг 1 (предзапрос  от браузера на сервер)
OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
 *
 * Шаг 2 (ответ сервера на предзапрос) 
 *      сервер перечислит разрешенные методы и заголовки
200 OK
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400           (кеширование разрешения на запрос)
 *
 * Шаг 3 (основной запрос)
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
 *
 * Шаг 4 (основной ответ)
Access-Control-Allow-Origin: https://javascript.info    (источник запроса)
 *
 * После этого можно прочитать ответ сервера.
 */

/**
 * Авторизационные данные 
 *      (credentials - куки и заголовки HTTP-аутентификации).
 * 
 * Запрос на другой источник по умолчанию не содержит авторизационных данных.
 * 
 * Включить отправку авторизационных данных:
 */
fetch('http://another.com', {
  credentials: "include"
});
/**
 * Согласие сервера:
200 OK
Access-Control-Allow-Origin: https://javascript.info    (источник запроса)
Access-Control-Allow-Credentials: true
 */


/**
 * Fetch API
 */
let promise = fetch(url, {
  method: "GET",        // POST, PUT, DELETE, etc.
  headers: {
    // значение этого заголовка обычно ставится автоматически,
    // в зависимости от тела запроса
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined,      // string, FormData, Blob, BufferSource или URLSearchParams
  referrer: "about:client", // или "", чтобы не послать заголовок Referer,
                            // или URL с текущего источника
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors",         // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default",     // no-store, reload, no-cache, force-cache или only-if-cached
  redirect: "follow",   // manual, error
  integrity: "",        // контрольная сумма, например "sha256-abcdef1234567890"
  keepalive: false,     // true
  signal: undefined,    // AbortController, чтобы прервать запрос
  window: window        // null
});
/**
 * HTTP-заголовок Referer - это URL-адрес страницы, с которой пришёл запрос.
 * Мы можем установить любое значение Referer при условии, что оно принадлежит 
 *      текущему источнику:
 * предположим, что мы находимся на странице https://javascript.info, тогда
 * referrer: "https://javascript.info/anotherpage"
 * 
 * Опция referrerPolicy устанавливает общие правила для Referer:

"no-referrer-when-downgrade"(по умолчанию) –  Referer отправляется всегда, 
    если не отправлять запрос из HTTPS в HTTP.
"strict-origin-when-cross-origin"  – в пределах текущего источника - полный Referer, 
    на другой источник - значение источника, 
    в случае HTTPS→HTTP - не отправлять ничего.
"origin-when-cross-origin"         – (как выше, кроме случая HTTPS→HTTP)
"no-referrer"   – не отправлять Referer.
"origin"        – отправлять в Referer только текущий источник, 
    например, http://site.com вместо http://site.com/path.
"same-origin"   – отправлять полный Referer в пределах текущего источника, 
    а для запросов на другой источник не отправлять его вообще.
"strict-origin" – отправлять только значение источника, 
    не отправлять Referer для HTTPS→HTTP запросов.
"unsafe-url"    – всегда отправлять полный URL-адрес в Referer, 
    даже при запросах HTTPS→HTTP.
 */
/**
 * mode – это защита от нечаянной отправки запроса на другой источник:

"cors"(по умолчанию) – позволяет делать такие запросы так, как описано в Fetch: запросы на другие сайты,
"same-origin"        – запросы на другой источник запрещены,
"no-cors"            – разрешены только простые запросы на другой источник.
 */