
/**
 * Document Object Model (DOM) - объектная модель документа 
 *      (каждый HTML|XML-тег является объектом)
 */


/// НАВИГАЦИЯ ПО ВСЕМ DOM-УЗЛАМ (включая текстовые узлы и комментарии).

/* 
document
document.documentElement        - соответ-ет  <html>
document.body                   - <body>
document.head                   - <head>
elem.parentNode                      - родитель
elem.previousSibling
elem.nextSibling   - предыдущ. и последующ. сосед
elem.childNodes                      - список всех детей
elem.firstChild
elem.lastChild          - первый и последний дочерн. элем-ы
 */
const childs = document.body.childNodes;
elem.childNodes[0] === elem.firstChild;     // true
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild;     // true
// Проверка наличия дочерних узлов
elem.hasChildNodes();



/// НАВИГАЦИЯ ТОЛЬКО ПО ЭЛЕМЕНТАМ (исключая текстовые узлы и комментарии)

// elem.parentElement           - родитель
// elem.previousElementSibling  - предыдущ.
// elem.nextElementSibling      - следующ.
// elem.firstElementChild
// elem.lastElementChild
// elem.children                - дети
// elem.childElementCount   - elem.children.length

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



/// НАВИГАЦИЯ ПО ТАБЛИЦАМ

// table.rows                   - коллекция строк <tr>
// thead/tbody/tfoot.rows       - коллекция строк <tr> секции
// table.caption/tHead/tFoot    - <caption>, <thead>, <tfoot>
// table.tBodies                - <tbody>
// tr.cells             - коллекция ячеек <td> и <th> внутри <tr>
// tr.sectionRowIndex   - номер строки <tr> в текущ.секции <thead>/<tfoot>/<tbody>
// tr.rowIndex          - номер строки <tr> в таблице
// td.cellIndex         - номер ячейки в строке <tr>



/// DOM-коллекции

// Коллекция - это не массив, поэтому методы для массива на них раб-ть не будут
// Не используйте цикл for..in для перебора коллекций



/// ВЫБОР ЭЛЕМЕНТОВ ДОКУМЕНТА

// Поиск элем-ов в DOM по селекторам CSS:
//      .querySelector()
//      .querySelectorAll()     - возр. итерир. объект NodeList
// В querySelectorAll() NodeList - "пассивный" (длина и содержимое не может изменяться)

// div          - любой элемент <div>
// #nav         - id="nav"
// .warning     - class="warning"
// p[lang="fr"] - <p lang="fr">
// *[name="x"]  - атрибут name="x"
// #long span   - любой потомок <span> внутри элемента c id="long"
// #long>span   - любой дочерний <span> элемента c id="long"
// body>h1:first-child - первый дочерний <h1> эл-та <body>
// img + p.caption     - эл. <p class="caption">, идущий сразу после <img>
// h2 ~ p       - <p> после <h2> и явл-ся родственным ему
// button, input[type="button"]     // Все <button> и <input type="button">
let spinner = document.querySelector('#spinner');       // возр. первый совпад.эл-т или null
let titles = document.querySelectorAll('h1, h2, h3');

// querySelector() и querySelectorAll() реализ. для классов Document и Element:
let elem = spinner.querySelector('#elem');              // возр. только потомки эл-та

// closest() - метод в классе Element. В отличие от querySelector() ищет выше по дереву
// полезен, когда вы регистр. обр-к соб. на высок. уровне в дереве документа

// Найти ближайший объемл-й <a>, кот-й имеет href
let hyperlink = event1.target.closest('a[href]');

// вернуть true, если эл-т "е" нах-ся внутри спискового HTML-элемента
elem.closest('ul,ol,dl') !== null;

// matches() - проверка
// вернуть true, если е - заголовочный HTML-элемент
elem.matches('h1,h2,h3,h4,h5,h6');



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
//      document.forms       - все  <form>
//      document.images      - все <img>
//      document.links       - все <a>, имеющим href
// Эти св-ва ссылаются на объекты HTMLCollection 
//      (в отлич. от NodeList мог. индекс-ся по идентиф-ру или по имени элемента)
let addr = document.forms.address;      // <form id="address">



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



/// СОДЕРЖИМОЕ ТЕКСТОВОГО УЗЛА (nodeValue/data)

// <body>Привет <!-- Комментарий --></body>
let text = document.body.firstChild.data;       // Привет
let comment = text.nextSibling.data;            // Комментарий


/// elem.textContent    - просто текст (без тегов)
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



/// АТРИБУТЫ И СВОЙСТВА

// можно создавать свои св-ва:
document.body.myData = {                    
  name: 'Caesar',
  title: 'Imperator'
};
// можно добавлять свои методы:
document.body.sayTagName = function() {
  alert(this.tagName);
};
// Для нестандартных атрибутов DOM-свойства не создаются при парсинге, но они доступны
// Методы для доступа ко всем свойствам:
//      elem.hasAttribute(name)     - провер. наличие атрибута
//      elem.getAttribute(name)     - получает значение атрибута
//      elem.setAttribute(name)     - устан. значение атрибута
//      elem.removeAttrbute(name)   - удаляет атрибут
//      elem.attributes       - получ. все атрибуты (итерир.коллекц. Attr со св-ми name, value)

// <body something="non-standard">
alert(document.body.getAttribute('something'));     // non-standard

/* Все атрибуты, начинающиеся с префикса «data-», зарезервированы для использования 
программистами. Они доступны в свойстве dataset.*/
// <body data-about="Elephants"></body>
alert(document.body.dataset.about);     // Elephants
// data-order-state  ->  dataset.orderState.



/// ИЗМЕНЕНИЕ ДОКУМЕНТА

// document.createElement(tag)      - создать нов. эл-т
// document.createTextNode(text)    - создать новый текстовый узел

// document.body.append(div)        - вставить div в конец body
// elem.prepend(...)    - встав. в начало узла elem
// elem.before(...)     - встав. перед узлом elem
// elem.after(...)      - встав. после узла elem
// elem.replaceWith(...)    - заменяет узел elem
// elem.remove()            - удаляет

// elem.insertAdjacentHTML(where, html) - вставл. узлы как HTML
//      where: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'

// <div id="div"></div>
div.insertAdjacentHTML('beforebegin', '<p>Привет</p>');
div.insertAdjacentHTML('afterend', '<p>Пока</p>');
/* Получим: 
<p>Привет</p>
    <div id="div"></div>
<p>Пока</p> 
*/

// elem.insertAdjacentText(where, text)     – text вставляется «как текст», вместо HTML,
// elem.insertAdjacentElement(where, elem)  – вставляет элемент elem.

// elem.cloneNode(true)     - "глубокий" клон со всеми атрибутами и дочерн. элем-ми
// elem.cloneNode(false)    - клон без дочерн. элем-ов


// DocumentFragment
//      - спец. DOM-узел, кот-й служит обёрткой для передачи списка узлов
{/* <ul id="ul"></ul> */}
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }
  return fragment;
}
ul.append(getListContent()); 
// будет:
/*
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
*/
// Альтернатива:
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }
  return result;
}
ul.append(...getListContent()); // append + оператор "..." = друзья!



/// УСТАРЕВШИЕ МЕТОДЫ
parentElem.appendChild(node);                // Добавл. node в конец дочерн. элем-ов parentElem
parentElem.insertBefore(node, nextSibling);  // Встав. node перед nextSibling в parentElem
parentElem.replaceChild(node, oldChild); //Замен. oldChild на node среди дочерних элементов parentElem
parentElem.removeChild(node); //Удаляет node из parentElem

// document.write
//      - добавить HTML на страницу до завершения её загрузки.
// Вызов document.write работает только во время загрузки страницы.
/*если нам нужно динамически добавить много текста в HTML, 
и мы находимся на стадии загрузки, и для нас очень важна скорость, это может помочь*/