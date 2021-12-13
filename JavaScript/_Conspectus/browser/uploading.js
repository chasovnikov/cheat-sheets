
// У жизненного цикла HTML-страницы есть три важных события:

// 1. DOMContentLoaded     – построено DOM-дерево, еще не загружены внешние ресурсы
// 2. load                 – загружен HTML и внешние ресурсы
// 3. beforeunload/unload  – пользователь покидает страницу
//      beforeunload   - можем проверить, сохранил ли он изменения и что-то спросить
//      unload         - польз-ль почти ушёл, но мы всё ещё можем запустить нек-е операции


// Скрипты (<script>) блокируют DOMContentLoaded, кроме
// скриптов с async и сгенерир. динамически


// beforeunload. Может отменить переход на другую страницу:
window.onbeforeunload = function() {
    return false;
};


// unload. Можно послать собранные данные, например, статистику:
let analyticsData = { /* объект с собранными данными */ };

window.addEventListener("unload", function() {
    navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
});


// document.readyState показывает текущее состояние загрузки
// Есть три возможных значения:
//      "loading"       – документ загружается.
//      "interactive"   – документ полностью прочитан. Происходит до DOMContentLoaded
//      "complete"      – документ и ресурсы загружены. Происходит до window.onload


// событие readystatechange генерируется при изменении состояния
document.addEventListener('readystatechange', () => console.log(document.readyState))

// Посмотреть порядок событий
log('начальный readyState:' + document.readyState);
document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));
window.onload = () => log('window onload');
{/* <iframe src="iframe.html" onload="log('iframe onload')"></iframe> */}
{/* <img src="http://en.js.cx/clipart/train.gif" id="img"> */}
img.onload = () => log('img onload');
/*
Типичный вывод:
[1] начальный readyState:loading
[2] readyState:interactive
[2] DOMContentLoaded
[3] iframe onload
[4] img onload
[4] readyState:complete
[4] window onload
*/ 


/// АСИНХРОННЫЕ СКРИПТЫ
/// Атрибуты defer и async (грузят скрипт в фоновом режиме)
// <script defer scr="1.js"><script>    - отложит выполнение до полн. готов-ти док-а
// <script async scr="2.js"><script>    - скрипт абсолютно не зависим
// сообщают браузеру, что в сценарии не применяетя метод document.write()
// Когда есть оба атрибута, приоритет имеет async
// async скрипты запускаются не по порядку расположения в документе (в отличие от defer)

// Скрипты с type="module" по умолч. как с атрибутом defer, но это можно изменить
//      добавив атрибут async

// Простая альтернатива атрибутам async и defer - размещение скриптов в конце HTML-файла


/// ДИНАМИЧЕСКИ ЗАГРУЖАЕМЫЕ СКРИПТЫ
// по умолч-ю ведут себя как async.
// Для загрузки скрипта по действию польз-ся использ-я import() (для модулей)
// Если модули не используются, то помещаем <script> в <head> документа:
function importScripts(url) {
    return new Promise((resolve, reject) => {
        let s = document.createElement('script');
        s.onload = () => resolve();
        s.onerror = (e) => reject();
        s.src = url;
        document.head.append(s);
    })
}
// или
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script);

// Изменить порядок загрузки на порядок как в документе (async = false)
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
script.async = false;       // !
document.body.append(script);



/// ЗАГРУЗКА РЕСУРСОВ: onload и onerror
// error    – событие: во время загрузки сторонних ресурсов произошла ошибка.

let img = document.createElement('img');
img.src = "https://js.cx/clipart/train.gif";

img.onload = function() {
  alert(`Изображение загружено, размеры ${img.width}x${img.height}`);
};

img.onerror = function() {
  alert("Ошибка во время загрузки изображения");
};


// Кросс-доменный доступ (доступ к скрипту с другого домена (напр., для выявления ошибок))
// Разрешить кросс-доменный доступ: поставить тегу <script> атрибут crossorigin, 
//      и, кроме того, удалённый сервер должен поставить специальные заголовки.
// Три уровня кросс-доменного доступа:
// 1. Атрибут crossorigin отсутствует   – доступ запрещён
// 2. crossorigin="anonymous"       – доступ разрешён, если сервер отвечает с заголовком 
//      Access-Control-Allow-Origin со значениями * или наш домен. Куки не отправляются
// 3. crossorigin="use-credentials"     – разрешён, если сервер отвечает с заголовками 
//      Access-Control-Allow-Origin со значением наш домен и 
//      Access-Control-Allow-Credentials: true. Куки отправляются