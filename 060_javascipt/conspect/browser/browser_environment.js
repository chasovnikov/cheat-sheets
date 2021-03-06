/**
 * Window
 *      выступает в 2 ролях:
 *  Глобальный объект для JavaScript.
 *  Представляет собой окно браузера и располагает методами для управления им.
 */

function sayHi() {
  alert("Hello");
}
// глобальные функции доступны как методы глобального объекта:
window.sayHi();

alert(window.innerHeight);      // внутренняя высота окна браузера


/**
 * Document Object Model(DOM) – объектная модель документа.
 *      Описывает структуру документа, манипуляции с контентом и события
 * 
 * Спецификация CSSOM для стилей.
 * CSSOM используется вместе с DOM при изменении стилей документа.
 * 
 * 
 * BOM (Browser Object Model) - Объектная модель браузера
 *       Разные функции браузера: setTimeout, alert, location и так далее
 * 
 * Например:
 *  Объект Navigator даёт информацию о самом браузере и операционной системе. 
 *      navigator.userAgent – информация о текущем браузере,
 *      navigator.platform  – информация о платформе (Windows/Linux/Mac и так далее).
 * 
 *  Объект Location (есть как св-во у Window, Document) 
 *      представляет собой адрес (URL) объекта, с которым он связан. 
 *  Его св-ва:
 *      href        - URL целиком. При изменении переходит на нов. страницу
 *      protocol    - протокол текщ. URL, включая ":"
 *      host        - имя хоста, ":" и порт
 *      hostname    - домен текущего URL
 *      port        - номер порта
 *      pathname    - первый "/" после хоста с последующим URL
 *      search      - "?" с последюущим параметром URL
 *      hash        - "#" с последующим идентификатором
 *      username    - имя польз-ля перед именем домена
 *      password    - пароль перед именем домена
 *      origin      - (только чтение) протокол, хост и порт
 * Значения этих св-в представлены в DOMString (UTF-16 String).
 * 
 * Location не имеет унаследованных методов, но реализует методы URLUtils.
 */

// Этот пример создаёт ссылку и использует её свойство href
// Корректная альтернатива - использовать document.location или window.location текущего URL
var url = document.createElement('a');
url.href = 'https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container';
console.log(url.href);      // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
console.log(url.protocol);  // https:
console.log(url.host);      // developer.mozilla.org
console.log(url.hostname);  // developer.mozilla.org
console.log(url.port);      // (пустой - https подразумевает порт 443)
console.log(url.pathname);  // /en-US/search
console.log(url.search);    // ?q=URL
console.log(url.hash);      // #search-results-close-container
console.log(url.origin);    // https://developer.mozilla.org


alert(location.href);                      // показывает текущий URL
if (confirm("Перейти на Wikipedia?")) {
  location.href = "https://wikipedia.org"; // перенаправляет браузер на другой URL
}

// Методы Location:
/*
*/
window.location.assign(url);   // загрузку и отображение нового документа по указанному URL
window.location.reload();      // перезагружает ресурс из текущего URL 
window.location.replace();     // заменяет текущий ресурс на новый
window.location.toString();    // Возвращает DOMString, содержащий URL. Синоним URLUtils.href


/**
 * Открытие окон и методы window.
 * 
 * Всплывающее окно («попап» – от англ. Popup window)
 * 
 * Всплывающее окно блокируется в том случае, если вызов window.open произошёл 
 *      не в результате действия посетителя.
 * 
 * Открыть окно с указанным URL:
 */
// попап заблокирован
window.open('https://javascript.info');

// попап будет показан
button.onclick = () => window.open('https://javascript.info');


/// document.write(str)
// дописывает текст в текущее место HTML ещё до того, как браузер построит из него DOM.
// использование считается плохим стилем
// быстрее innerHTML и вставляет текст "как есть" (без корректировки браузером)



/// ПРОСТРАНСТВО ИМЕН В СКРИПТАХ
// Без модульности все скрипты в док-е ведут себя как части одного большого скрипта
//      В этом случае возможны конфликты имен
// Объявления "var" и "function" на верхн.ур-е создают св-ва в глобальном объекте
//      в отличие от "const", "let", "class"


/// ВЫПОЛНЕНИЕ ПРОГРАММЫ JAVASCRIPT
// Если есть <iframe>, то код встроенного док-а может считаться отдельной программой JS
// Выполнение программы JS происходит в два этапа
// 1. Загруж-ся содержимое док-а и код из <script>, выполн-ся скрипты
// 2. Асинхронные и управляемые события
// Указанные два этапа можно разбить на след. шаги:
// Шаг 1. Браузер созд. объект Document, начинает синтакс. анализ страницы и добавл. узлы
//      document.readyState  ->  loading
// Шаг 2. <script> без async, defer или type="module" добавл-ся в док. и запускается.
//      Синтакс. анализ-р приостановит работу
// Шаг 3. Если <script> имеет async, то синтакс анализ-р не приостанв. работу
// Шаг 4. Когда док. проанализирован document.readyState  -> interactive (взаимодействует)
// Шаг 5. <script> с defer выполн-ся в порядке появления в док-е
// Шаг 6. Иниц-ся событие DOMContentLoaded для Document. Gереход от синхр. к асинхр. этапу
// Шаг 7. Док. проанал-н и полностью загружен.
//      document.readyState  ->  complete
//      Иниц-ся событие load для Window
// Шаг 8. Обработчики событий вызыв-ся асинх-но в ответ на события



/// ПОТОКОВАЯ МОДЕЛЬ JS СТОРОНЫ КЛИЕНТА
// JavaScript - однопоточный язык
// Web-Worker - фоновый поток для выполнения задач без блок-я польз-го интерф-са
// Код в-воркера взаимод-ет с гланым потоком и другими ворк-ми через события асинх.сообщ.


/// ВВОД И ВЫВОД ПРОГРАММЫ
// Источники входных данных:
//      URL док-а:              document.URL
//      HTTP-заголовок Cookie:  document.cookie
//      Инф-я о браузере:       navigator (navigator.userAgent, navigator.language, ...)
//      Размеры дисплея:        screen  (screen.width, screen.height)


/// ОШИБКИ В ПРОГРАММЕ
// ...


/// ПОЛИТИКА ОДИНАКОВОГО ИСТОЧНИКА (the same-origin policy)
// Обычно использ-ся для <iframe>:
// скрипты могут читать св-ва док-ов того же источника, где нах-ся сам скрипт
// Источник (origin) опред-ся как протокол, хост и порт URL, откуда док. был загружен


/// МЕЖСАЙТОВЫЕ СКРИПТЫ     (cross-site scripting - XSS)
// - категория проблем безопасности, когда атакующий внедряет HTML-деск-ы в целевой сайт
// Уязвимость появл-ся при динамически генерир. содерж. док-а без предварит. очистки данных

// Пример: на целевой веб-сайте (приветствие пользователя по имени)
// <script>
let name = new URL(document.URL).searchParams.get("name");
document.querySelector('h1').innerHTML = "Hello " + name;
// </script>
// Страница предназначена для вызова URL-ом вида:
// http://www.example.com/greet.html?name=David
// Отобразит: "Hello David"
// Но, если такой параметр запроса
// name=%3Cimg%20src=%22x.png%22%20onload=%22alert(%27hacked%27)%22/%3E
// это внедрид в док. код
//  Hello <img scr="x.png" onload="alert('hacked')"/>
// Появл.модал.окна демонстрирует возмож-ть выполнения произвольного кода

// Предотвращение атак XSS: удаление HTML-дескрипторов из неннадежных данных
name = name
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

// Еще один подход: отображение ненадежных данных в <iframe> с атрибутом sandbox
