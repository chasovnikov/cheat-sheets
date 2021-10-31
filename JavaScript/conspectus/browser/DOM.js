
/**
 * В соответствии с объектной моделью документа («Document Object Model», коротко DOM), 
 *      каждый HTML|XML-тег является объектом.
 * 
 * Например, document.body – объект для тега <body>.
 */
document.body.style.background = 'red';                      // сделать фон красным
setTimeout(() => document.body.style.background = '', 3000); // вернуть назад

/**
 * По историческим причинам пробелы и перевод строки перед тегом <head> игнорируются.
 * Если мы записываем что-либо после закрывающего тега </body>, 
 *      браузер автоматически перемещает эту запись в конец body, 
 *      поскольку спецификация HTML требует, чтобы всё содержимое было внутри <body>. 
 *      Поэтому после закрывающего тега </body> не может быть никаких пробелов.
 */


/**
 * Навигация по DOM-элементам (включая текстовые узлы и комментарии).
 * 
 * Основные ссылки, по которым можно переходить между узлами DOM:
document
document.documentElement        - соответ-ет  <html>
document.body                   - <body>
document.head                   - <head>
parentNode                      - родитель
previousSibling | nextSibling   - предыдущ. и последующ. сосед
childNodes                      - содержит список всех детей
firstChild | lastChild          - первый и последний дочерн. элем-ы
 */
const childs = document.body.childNodes;
elem.childNodes[0] === elem.firstChild;
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild;
// Проверка наличия дочерних узлов
elem.hasChildNodes();


/// НАВИГАЦИЯ ТОЛЬКО ПО ЭЛЕМЕНТАМ (исключая текстовые узлы и комментарии)
// parentElement
// previousElementSibling | nextElementSibling
// firstElementChild      | lastElementChild
// children


/// НАВИГАЦИЯ ПО ТАБЛИЦАМ
// table.rows                   - коллекция строк <tr>
// thead/tbody/tfoot.rows       - коллекция строк <tr> секции
// table.caption/tHead/tFoot    - <caption>, <thead>, <tfoot>
// table.tBodies                - <tbody>
// tr.cells             - коллекция <td> и <th> внутри <tr>
// tr.sectionRowIndex   - номер строки <tr> в текущ.секции <thead>/<tfoot>/<tbody>
// tr.rowIndex          - номер строки <tr> в таблице
// td.cellIndex         - номер ячейки в строке <tr>


/// DOM-коллекции
// Коллекция - это не массив, поэтому методы для массива на них раб-ть не будут
// Не используйте цикл for..in для перебора коллекций


/// ВЫБОР ЭЛЕМЕНТОВ ДОКУМЕНТА
// .querySelector() и .querySelectorAll() - поиск элем-ов в DOM по селекторам CSS:
// div          - любой элемент <div>
// #nav         - эл. с id="nav"
// .warning     - эл-ы с class="warning"
// p[lang="fr"] - <p lang="fr">
// *[name="x"]  - эл-ы с name="x"
// #long span   - любой потомок <span> элемента c id="long"
// #long>span   - любой дочерний <span> элемента c id="long"
// body>h1:first-child - первый дочерний <h1> эл-та <body>
// img + p.caption     - эл. <p class="caption">, идущий сразу после <img>
// h2 ~ p       - <p> после <h2> и явл-ся родственным ему
// button, input[type="button"]     // Все <button> и <input type="button">
let spinner = document.querySelector('#spinner');       // возр. первый совпад.эл-т или null
let titles = document.querySelectorAll('h1, h2, h3');   // возр. итерир. объект NodeList
// В querySelectorAll() NodeList - "пассивный" (длина и содержимое не может изменяться)

// querySelector() и querySelectorAll() реализ. для классов Document и Element:
let elem = spinner.querySelector('#elem');              // возр. только потомки эл-та

// closest() - метод в классе Element. В отличие от querySelector() ищет выше по дереву
// полезен, когда вы регистр. обр-к соб. на высок. уровне в дереве документа

// Найти ближайший объемл-й <a>, кот-й имеет href
let hyperlink = event.target.closest('a[href]');

// вернуть true, если эл-т "е" нах-ся внутри спискового HTML-элемента
function insideList(e) {
    return e.closest('ul,ol,dl') !== null;
}

// matches() - проверка
// вернуть true, если е - заголовочный HTML-элемент
function isHeading(e) {
    return e.matches('h1,h2,h3,h4,h5,h6');
}


/// СТАРЫЕ МЕТОДЫ ВЫБОРА ЭЛЕМЕНТОВ
// Строка, указ-я в id - это глобальная переменная (плохой стиль)
// <div id="elem-content">Элемент</div>
// <script>
  // elem - ссылка на элемент с id="elem"
  elem.style.background = 'red';
// </script>

// Возр. "активный"(длина и содержимое может меняться) NodeList (кроме getElementById())
// подобен      document.querySelector('#sect1')
let sect1 = document.getElementById('sect1');

// подобен      document.querySelectorAll('*[name="color"]')
let colors = document.getElementsByName('color');

// подобен      document.querySelectorAll('h1')
let heading = document.getElementsByTagName('h1');

// подобен      document.querySelectorAll('.tooltip')
let tooltips = document.getElementsByClassName('tooltip');


/// ПРЕДВАРИТЕЛЬНО ВЫБРАННЫЕ ЭЛЕМЕНТЫ
// Свойства класса Document:
//      images      - все <img>
//      forms       - все  <form>
//      links       - все <a>, имеющим href
// Эти св-ва ссылаются на объекты HTMLCollection (в отлич. от NodeList мог. 
//      индекс-ся по идентиф-ру или по имени элемента)
let addr = document.forms.address;      // <form id="address">


/// СТРУКТУРА И ОБХОД ДОКУМЕНТА
// Свойства объектов Element:
//      parentNode   - ссылка на родителя элемента
//      children     - объект NodeList, содерж-й эл-ты типа Element (но не Text, Comment)
//      childElementCount   - children.length
//      firstElementChild
//      lastElementChild
//      nextElementSibling      - элементы непосредственно до
//      previousElementSibling  - элементы непосредственно после

// Оба выражения: 2-й дочерн.эл-т типа Element 1-го дочерн.эл-та объекта Document
let a = document.children[0].children[1];
let b = document.firstElementChild.firstElementChild.nextElementSibling;

// рекурс-й обход в глубину док-а с вызовом указ-й ф-и для каждого элемента
function traverse(e, f) {
    f(e);
    for(let child of e.children) {
        traverse(child, f);
    }
}
function traverse2(e, f) {
    f(e);
    let child = e.firstElementChild;

    while(child !== null) {
        traverse2(child, f);
        child = child.nextElementSibling;
    }
}



/// КЛАССЫ DOM-УЗЛОВ (в порядке наследования от друг друга: от страшего к млад.)
// EventTarget  - корневой класс. Объекты не создаются. Это основа для событий над эл-ми
// Node         - основа для DOM-узлов. Объекты не создаются
// Element      - базовый класс для DOM-элем-в
// HTMLElement  - баз. класс для всех остальных HTML-элементов
//      От него наслед.:
//      HTMLInputElement    - класс для тега <input>
//      HTMLBodyElement     - класс для <body>
//      HTMLAnchorElement   - класс для <a>

// Text, Comment - наслед-ся от Node

// SVGElement   - наслед-ся от Element

// Узнать имя класса DOM-узла:
alert( document.body.constructor.name );    // HTMLBodyElement
alert( document.body );                     // [object HTMLBodyElement]
alert( document.body instanceof HTMLBodyElement );  // true
alert( document.body instanceof HTMLElement );      // true
alert( document.body instanceof Element );          // true
alert( document.body instanceof Node );             // true
alert( document.body instanceof EventTarget );      // true


// console.dir(elem) выводит элемент в виде DOM-объекта, что удобно для анализа его свойств.

/// Свойство "nodeType" (устаревш.)
// elem.nodeType == 1   для узлов-элементов
// elem.nodeType == 2   для текстовых узлов
// elem.nodeType == 3   для объектов документа
// ...


// Тег: nodeName и tagName
alert( document.body.nodeName );    // BODY (nodeName - для любых узлов Node)
alert( document.body.tagName );     // BODY (tagName - только для элементов Element)

// <body><!-- комментарий -->
// для комментария
alert( document.body.firstChild.tagName ); // undefined (не элемент)
alert( document.body.firstChild.nodeName ); // #comment
// for document
alert( document.tagName ); // undefined (не элемент)
alert( document.nodeName ); // #document


/// innerHTML: получает и изменяет содержимое элемента
// Свойство innerHTML есть только у узлов-элементов.
document.body.innerHTML = 'Новый BODY!';
// Вставленный через innerHTML тег <script> не запускается


// outerHTML: получает и заменяет HTML элемента целиком
alert(elem.outerHTML); // <div id="elem">Привет <b>Мир</b></div>


// nodeValue/data: содержимое текстового узла

// Привет
//  <!-- Комментарий -->
let text = document.body.firstChild;
alert(text.data);                   // Привет
let comment = text.nextSibling;
alert(comment.data);                // Комментарий


/// textContent: просто текст (без тегов)
// в отличие от innerHTML втавляет КАК ЕСТЬ (даже теги могут отображ-ся в тексте)
// <h1>Срочно в номер!</h1><p>Марсиане атаковали человечество!</p>
alert(news.textContent);        // Срочно в номер! Марсиане атаковали человечество!


/// Свойство hidden (работает как style="display:none")
// <div id="elem">Мигающий элемент</div>
setInterval(() => elem.hidden = !elem.hidden, 1000);


/// Другие св-ва DOM-элементов:
// value - значения для <input>,<select>,<textarea> (HTMLInputElement, HTMLSelectElement, ...)
// href  - адрес ссылки "href" для <a href="..."> (HTMLAnchorElement)
// id    - значение атрибута id (HTMLElement)
// ...
// <input type="text" id="elem" value="значение">
alert(elem.type);     // "text"
alert(elem.id);       // "elem"
alert(elem.value);    // значение