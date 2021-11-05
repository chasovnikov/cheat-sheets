
/*
Аутентификация с помощью куки:
При входе на сайт сервер отсылает в ответ HTTP-заголовок Set-Cookie для 
установки куки с идентификатором сессии («session identifier»).
Следующий запрос туда же посылает на сервер HTTP-заголовок Cookie.
Таким образом, сервер понимает, кто сделал запрос.
*/

//  получить доступ к куки
const cookie = document.cookie;     // cookie1=value1; cookie2=value2;...

// Запись в document.cookie обновит упомянутые куки, но не затронет остальные.
// Спецсимволы должны быть закодированы
let name = "my name";       // нужно: my%20name
let value = "John Smith";   // нужно: John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
alert(document.cookie); // ...; my%20name=John%20Smith

/*
Ограничения:
После encodeURIComponent пара name=value не должна занимать более 4Кб.
Количество куки на один домен ограничивается примерно 20+ (зависит от браузера)
*/


/// НАСТРОЙКИ КУКИ

document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT";
/*
path        - куки доступны для страниц под этим путём. Должен быть абсолютным. 
    По умолчанию используется текущий путь.

domain      - Домен доступный для наших куки (не любой домен). Работает для поддоменов.

expires     - Дата истечения срока действия куки, когда браузер удалит его автоматически.

max-age     - Альтернатива expires, срок действия куки в секундах с текущего момента.
    Куки без expires или max-age («session cookies») удалятся при закрытии браузера.
    Если установить прошедшую дату или (max-age <= 0), то куки будет удалено.

secure      - куки доступно только через HTTPS (куки: "user=John; secure").

samesite    - защита от XSRF-атаки (межсайтовая подделка запроса).
    samesite=strict (или, что то же самое, samesite без значения) - Куки не отправятся, 
        если пользователь пришёл не с этого же сайта.
    samesite=lax (мягкий вариант) - операции типа «переход по ссылке» позволяют 
        передавать куки, но что-то более сложное, например, сетевой запрос с другого сайта 
        или отправка формы, теряет куки.

httpOnly    - запрещает доступ к куки из JavaScript
*/

// expires: +1 день от текущей даты
document.cookie = "user=John; expires=" + new Date( Date.now() + 86400e3 ).toUTCString();

// удалим куки
document.cookie = "user=John; max-age=-1";

// установим опцию secure для куки (куки доступно только через HTTPS)
document.cookie = "user=John; secure";



/// ФУНКЦИИ ДЛЯ РАБОТЫ С КУКИ

// Возвращает куки с указанным name или undefined
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


// Устанавливает куки с именем name и значением value, с настройкой path=/ по умолчанию
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

// Пример использования:
setCookie('user', 'John', {secure: true, 'max-age': 3600});


// Удалить куки
function deleteCookie(name) {
  setCookie(name, "", {'max-age': -1});
}

// Операции обновления или удаления куки должны использовать те же путь и домен


/// СТОРОННИЕ КУКИ

// Куки называются сторонними, если они размещены с домена, отличающегося от страницы, 
//      которую посещает пользователь. Обычно используются для целей отслеживания 
//      посещаемых пользователем страниц и показа рекламы. 