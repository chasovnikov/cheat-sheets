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
 * @returns Promise
 * 
 * Два этапа получения ответа:
 * 1. После прихода заголовков ответа от сервера выполняется promise c объектом Response.
 *      Можем проверить статус HTTP-запроса и определить, выполнился ли он успешно, 
 *      а также посмотреть заголовки, но пока без тела ответа.
 * 2. Для получения тела ответа нам нужно использовать дополнительный вызов метода.
 * 
 * Response предоставляет методы для доступа к телу ответа:
 *  response.text() – читает ответ и возвращает как обычный текст,
 *  response.json() – декодирует ответ в формате JSON,
 *  response.formData() – возвращает ответ как объект FormData,
 *  response.blob() – возвращает объект как Blob (бинарные данные с типом),
 *  response.arrayBuffer() – возвращает ответ как ArrayBuffer 
 *      (низкоуровневое представление бинарных данных),
 *  response.body – это объект ReadableStream, с помощью которого можно считывать 
 *      тело запроса по частям.
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
if (response.ok) {                      // если HTTP-статус в диапазоне 200-299
  let json = await response.json();     // получаем тело ответа в формате JSON
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
/**
 * Так как посылаем JSON, то используем правильный Content-Type для JSON: 
 *      application/json (заголовок Content-Type по умолчанию text/plain;charset=UTF-8.)
 */


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